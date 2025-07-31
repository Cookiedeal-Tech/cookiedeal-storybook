import { useRef, useEffect, useState, useLayoutEffect } from "react";
import styled, { css } from "styled-components";
import Typo from "@/components/atoms/Typo";
import Icon from "@/components/atoms/Icon";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Portal from "@/components/atoms/Portal";

/**
 * 모달 case
 * 1) 데스크탑 (한가운데 뜸. 사이즈는 560/480/400)
 * 2) 모바일1 (아래쪽에 뜸. 양옆에 여백 조금 있고, 높이는 자동)
 * 3) 모바일2 (아래쪽에 뜸. 양옆에 여백 없이 꽉참) -> $isMobileFull = true
 * 4) 모바일3 (아래쪽에 뜸. 처음 열렸을땐 높이 50vh, 스크롤하면 100vh) => $isMobileBottomSheet = true
 */

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  $isFull?: boolean;
  children?: React.ReactNode;
  $title?: string;
  $size?: 560 | 480 | 400;
  $showCloseButton?: boolean;
  $isMobileBottomSheet?: boolean;
  $isCloseable?: boolean; // 외부영역 클릭 시 닫히게 할 건지
  $isMobileFullWidth?: boolean;
  $isMobileFullHeight?: boolean;

  $header?: React.ReactNode;
  $footer?: React.ReactNode;
};

/**
 *
 * PC/mobile 환경에 따라 형태가 자동 변환됩니다.
 *
 * (pc에선 화면 중앙에 뜨고, 모바일에선 full width + bottom sheet 형태)
 *
 */
const Modal = ({
  open,
  onClose,
  children,
  $title,
  $isFull = false,
  $size = 480,
  $showCloseButton = false,
  $isMobileBottomSheet = false,
  $header,
  $footer,
  $isCloseable = true,
  $isMobileFullWidth = false,
  $isMobileFullHeight = false,
}: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // dim 영역 클릭 시 close
  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    if ($isCloseable) {
      if (ref.current === e.target) {
        onClose();
      }
    }
  };

  // 외부(배경) 컴포넌트 스크롤 막기
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.cssText = `position: relative`;
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /**
   *
   * 모바일 BottomSheet 형태로 열렸을 때 필요한 요소들
   *
   * */
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false); // 스크롤 가능 여부
  const sheetRef = useRef<HTMLDivElement>(null);
  const handleScroll = () => {
    if (!sheetRef.current) return;
    const { scrollTop } = sheetRef.current;

    // 사용자가 스크롤을 내리면 isExpanded 상태를 true로 변경
    if (scrollTop > 0) {
      setIsExpanded(true);
    }
  };

  useLayoutEffect(() => {
    const checkScrollable = () => {
      if (!sheetRef.current) return;
      const { scrollHeight, clientHeight } = sheetRef.current;

      // 스크롤 가능한 경우
      setIsScrollable(scrollHeight > clientHeight);
    };

    checkScrollable();

    if (sheetRef.current) {
      sheetRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (sheetRef.current) {
        sheetRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [open]);

  if (!open) return null;

  return (
    <Portal selector="body">
      <Background open={open}>
        <div
          ref={ref}
          style={{ position: "relative", width: "100%", height: "100%" }}
          onClick={handleClose}
        >
          <Container
            $isFull={$isFull}
            $size={$size}
            $isMobileBottomSheet={$isMobileBottomSheet}
            $isExpanded={isExpanded}
            $isScrollable={isScrollable}
            $isMobileFullWidth={$isMobileFullWidth}
            $isMobileFullHeight={$isMobileFullHeight}
          >
            {$showCloseButton && (
              <CloseWrapper onClick={onClose}>
                <Icon name="close" />
              </CloseWrapper>
            )}

            {$title && (
              <Typo $variant={"subtitle1Bold"} $color="textDefaultStrong">
                {$title}
              </Typo>
            )}

            {$header && $header}
            <Body ref={sheetRef}>{children}</Body>
            {$footer && $footer}
          </Container>
        </div>
      </Background>
    </Portal>
  );
};

export default Modal;

const Background = styled.div<{ open: boolean }>`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  display: ${({ open }) => (open ? "block" : "none")};
`;
const Container = styled.div<{
  $isFull: boolean;
  $size: number;
  $isMobileBottomSheet: boolean;
  $isExpanded: boolean;
  $isScrollable: boolean;
  $isMobileFullWidth: boolean;
  $isMobileFullHeight: boolean;
}>`
  padding: 2rem;
  background-color: #fff;
  z-index: 10;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 0.5rem;
  row-gap: 1.5rem;
  box-shadow: 0px 16px 20px 0px #0000001f;

  min-width: 20vw;
  max-height: 85vh;
  width: ${({ $size }) => `${$size / 16}rem`};

  // 모바일 꽉찬 형태일 때
  ${({ theme }) => theme.device.belowTablet} {
    width: 100%;
    max-width: ${({ $isMobileFullWidth }) =>
      $isMobileFullWidth ? "100vw" : "92vw"};
    bottom: 0;
    top: ${({ $isMobileFullHeight }) => ($isMobileFullHeight ? "0" : "auto")};
    max-height: ${({ $isMobileFullHeight }) =>
      $isMobileFullHeight ? "100vh" : "80vh"};
    padding: 1.5rem;

    // 모바일에선 화면 중앙이 아닌 아래 쪽에 뜨도록 함
    transform: translateX(-50%);

    // bottom sheet 형태일 때
    ${({ $isMobileBottomSheet, $isExpanded, $isScrollable }) => {
      return $isMobileBottomSheet
        ? css`
            bottom: 0;
            top: auto;
            right: 0;
            left: 0;
            transform: none;
            max-width: 100vw;
            padding: 1.5rem;
            height: ${$isExpanded ? "100vh" : "50vh"};
            transition: height 0.3s ease-in-out;
            overflow-y: auto;

            height: ${$isScrollable
              ? $isExpanded
                ? "100vh"
                : "50vh"
              : "auto"};
          `
        : css``;
    }}
  }
`;

const Body = styled.div`
  width: 100%;
  height: auto;
  overflow: auto;

  // 이거 안주면 쓸모없는 스크롤이 생겨서
  /* padding: 0.5rem 0;  */
`;

const CloseWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 2rem;
  right: 2rem;
`;
