import styled, { css } from "styled-components";

const alignMap = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
};
const justifyMap = {
  ...alignMap,
  sb: "space-between",
};

export type FlexProps = {
  $width?: number | "full"; // px단위
  $isFull?: boolean;
  $direction?: "row" | "column";
  $justify?: keyof typeof justifyMap;
  $align?: keyof typeof alignMap;
  $gap?: { column?: number; row?: number }; // px단위
  $order?: number;
  $flex?: number;
};

const Flex = styled.div<FlexProps>`
  display: flex;
  width: ${({ $width, $isFull }) => {
    if ($isFull) return "100%";
    else {
      if ($width && typeof $width === "number") {
        return `${$width / 16}rem`;
      } else if ($width && $width === "full") {
        return "100%";
      } else {
        return "auto";
      }
    }
  }};

  ${({ $order }) =>
    $order &&
    css`
      order: ${$order};
    `}

  // 가로정렬이 기본값
  flex-direction: ${({ $direction }) => ($direction ? $direction : "row")};

  // 좌측정렬이 기본값
  justify-content: ${({ $justify }) => css`
    ${justifyMap[$justify ?? "start"]}
  `};

  // 가운데정렬이 기본값
  align-items: ${({ $align }) => css`
    ${alignMap[$align ?? "center"]}
  `};

  ${({ $gap }) =>
    $gap?.column &&
    css`
      column-gap: ${$gap.column / 16}rem;
    `};
  ${({ $gap }) =>
    $gap?.row &&
    css`
      row-gap: ${$gap.row / 16}rem;
    `};

  ${({ $flex }) =>
    $flex &&
    css`
      flex: ${$flex};
    `}
`;

export default Flex;
