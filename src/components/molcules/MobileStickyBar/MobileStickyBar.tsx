import styled from "styled-components";
import Flex from "@/components/atoms/Flex";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export type MobileStickyBarProps = {
  $top?: number; // sticky로 붙을 위치의 px단위
  $bottom?: number; // sticky로 붙을 위치의 px단위
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

/**
 *
 * sticky 동작 안될 땐, 해당 컴포넌트 하위요소에
 * overflow: auto 및 flex:1 속성 확인해보기
 *
 * [예시]
 * <MobileStickyBar> ... </MobileStickyBar>
 * <div style={{ overflow: 'auto', flex: 1 }}> ... </div>
 *
 */

const FIXED_HEIGHT = 48;
const MobileStickyBar = ({
  children,
  $top = FIXED_HEIGHT,
  $bottom,
  style,
}: MobileStickyBarProps) => {
  const { isDesktop } = useMediaQuery();

  return (
    !isDesktop && (
      <Container $top={$top} $bottom={$bottom} style={style}>
        {children}
      </Container>
    )
  );
};

export default MobileStickyBar;

const Container = styled(Flex)<{ $top: number; $bottom?: number }>`
  position: sticky;
  width: 100%;

  top: ${({ $top }) => $top / 16}rem;

  bottom: ${({ $bottom }) => {
    if (typeof $bottom !== "undefined") {
      return `${$bottom / 16}rem`;
    }
    return "auto";
  }};

  z-index: 8;

  background-color: #fff;
`;
