import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Flex from "@/components/atoms/Flex";
import Typo from "@/components/atoms/Typo";
import Icon from "@/components/atoms/Icon";
import Portal from "@/components/atoms/Portal";

export type OptionType = {
  label: any;
  value: any;
};

type SelectProps = {
  $label?: { isRequired?: boolean; text: string }; // 위에 뜨는 라벨
  $message?: { type: "error" | "hint"; text?: string }; // 아래 뜨는 안내메시지
  $options: OptionType[];
  onSelect?: (value: OptionType) => void;
  defaultValue?: number | string;
  $isFull?: boolean;
  $width?: number; // 단위 px
  $errorText?: string;
  disabled?: boolean;
  // value?: number | string;
  value?: any;
  className?: string;
};

const Select = ({
  $label,
  $options,
  onSelect,
  defaultValue,
  $isFull = false,
  $width,
  $errorText,
  disabled = false,
  value,
  className,
}: SelectProps) => {
  const [selectedOption, setSelectedOption] = useState<OptionType>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [optionPosition, setOptionPosition] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => {
    if (!disabled) {
      return setIsOpen((prev) => !prev);
    }
    return;
  };

  // 옵션 컨테이너에서 아이템 클릭
  const handleClickItem = (option: OptionType) => {
    setSelectedOption(option);
    setIsOpen(false);
    setOptionPosition(null);
    if (onSelect) {
      onSelect(option);
    }
  };

  // value prop이 변경될 때마다 selectedOption 업데이트
  useEffect(() => {
    if (value !== undefined && $options?.length > 0) {
      const target = $options.find((option) => option.value === value);
      if (target) {
        setSelectedOption(target);
      }
    }
  }, [value, $options]);

  // defaultValue를 설정한 경우
  useEffect(() => {
    if (defaultValue && !initialized) {
      const target = $options?.find((option) => option.value === defaultValue);

      setSelectedOption(target);
      if (onSelect && target) {
        onSelect(target);
      }

      setInitialized(true);
    }
  }, [defaultValue, $options, initialized, onSelect]);

  // 외부영역 클릭 시 닫기
  const handleClickOutside = (event: MouseEvent) => {
    // Portal로 렌더링된 옵션 컨테이너인지 확인
    const target = event.target as HTMLElement;
    const isOptionContainer = target.closest("[data-select-options]");

    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node) &&
      !isOptionContainer
    ) {
      setIsOpen(false);
      setOptionPosition(null);
    }
  };

  // isOpen이 true일 때 위치 계산
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setOptionPosition({
        top: rect.bottom + 8,
        left: rect.left,
        width: rect.width,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    // 스크롤 시 위치 업데이트
    const handleScroll = () => {
      if (isOpen && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setOptionPosition({
          top: rect.bottom + 8,
          left: rect.left,
          width: rect.width,
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isOpen]);

  return (
    <Container
      ref={containerRef}
      $isFull={$isFull}
      $direction="column"
      $gap={{ row: 8 }}
      $align="start"
      $width={$width}
    >
      {/* 라벨 */}
      {$label && (
        <Flex $justify="start" $gap={{ column: 2 }} $isFull>
          <Typo $variant="label2Bold">{$label.text}</Typo>
          {$label.isRequired && (
            <Typo $variant="label2Bold" $color="textDefaultWeak">
              (필수)
            </Typo>
          )}
        </Flex>
      )}

      <div style={{ position: "relative", width: "100%" }}>
        {/* 버튼 */}
        <SelectedWrapper
          ref={buttonRef}
          $justify="sb"
          $isOpen={isOpen}
          $isError={!!$errorText}
          $isDisabled={disabled}
          onClick={toggleOpen}
          {...(className && { className })}
        >
          {selectedOption ? (
            selectedOption.label
          ) : (
            <Typo $variant="body1Regular" $color="textDefaultWeak">
              선택하세요.
            </Typo>
          )}

          <Icon name={isOpen ? "up" : "down"} size={20} />
        </SelectedWrapper>
      </div>

      {/* 에러메시지 */}
      {$errorText && (
        <Typo $variant="caption1Regular" $color="borderDangerNormal">
          {$errorText}
        </Typo>
      )}

      {/* Portal을 통해 옵션 컨테이너 렌더링 */}
      {isOpen && (
        <Portal selector="body">
          <OptionContainerPortal
            data-select-options="true"
            $direction="column"
            style={{
              position: "fixed",
              top: optionPosition ? `${optionPosition.top}px` : "auto",
              left: optionPosition ? `${optionPosition.left}px` : "auto",
              width: optionPosition ? `${optionPosition.width}px` : "auto",
              zIndex: 9999,
            }}
          >
            {$options?.length > 0 ? (
              <Flex $direction="column" $isFull>
                {$options.map((option, index) => {
                  return (
                    <Item
                      key={
                        typeof option.value === "object" ? index : option.value
                      }
                      $justify="sb"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClickItem(option);
                      }}
                    >
                      <Typo $variant="body2Regular">{option.label}</Typo>
                      {option.value === selectedOption?.value && (
                        <Icon name="check" size={20} color="iconBrandNormal" />
                      )}
                    </Item>
                  );
                })}
              </Flex>
            ) : (
              <Typo $variant="body2Regular">no option</Typo>
            )}
          </OptionContainerPortal>
        </Portal>
      )}
    </Container>
  );
};

export default Select;

const Container = styled(Flex)<{ $isFull: boolean; $width?: number }>`
  position: relative;
  width: ${({ $isFull, $width }) => {
    if ($isFull) return "100%";
    else if ($width) return `${$width / 16}rem`;
    return "auto";
  }};

  min-width: ${({ $width, $isFull }) => {
    if ($isFull) return "100%";
    else if (!$width) return "17rem";
    return `${$width / 16}rem`;
  }};

  flex-shrink: 0; // 영역이 줄어들어도 안쪼그라들게

  // 모바일 임의처리
  ${({ theme }) => theme.device.mobile} {
    min-width: ${({ $width }) => ($width ? "auto" : "10rem")};
  }
`;

const SelectedWrapper = styled(Flex)<{
  $isError: boolean;
  $isDisabled: boolean;
  $isOpen: boolean;
}>`
  width: 100%;
  padding: 0.78rem 0.75rem;
  border: 1px solid;
  border-radius: 0.5rem;
  text-align: left;

  cursor: default;

  color: ${({ theme, $isDisabled }) =>
    $isDisabled
      ? theme.colors.textDisabledNormal
      : theme.colors.textDefaultNormal};

  background-color: ${({ theme, $isDisabled }) =>
    $isDisabled
      ? theme.colors.backgroundDisabledInput
      : theme.colors.backgroundDefaultNormal};

  border-color: ${({ theme, $isOpen, $isError, $isDisabled }) => {
    // 비활성화 테두리색상
    if ($isDisabled) {
      return theme.colors.borderDefaultWeaker;
    }
    // 드롭다운 열렸을 때 테두리색상
    else if ($isOpen) {
      return theme.colors.borderBrandNormal;
    }
    // 에러 테두리색상
    else if ($isError) {
      return theme.colors.borderDangerNormal;
    }
    // 평소 테두리색상
    return theme.colors.borderDefaultWeak;
  }};
`;

const OptionContainerPortal = styled(Flex)`
  padding: 0.5rem 0;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.08);
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
  box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.12);
`;

const Item = styled(Flex)`
  width: 100%;
  padding: 0.563rem 0.75rem;
  cursor: default;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundDefaultStrong};
  }
`;
