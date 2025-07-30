import React from "react";
import styled, { type CSSProperties } from "styled-components";
import { type ColorType } from "@/styles/theme";
import { type IconType } from "@/components/atoms/Icon/iconList";
import Flex from "@/components/atoms/Flex";
import Typo from "@/components/atoms/Typo";
import Icon from "@/components/atoms/Icon";

type SizeType = "small" | "large";
export type StateType =
  | "default"
  | "brand"
  | "danger"
  | "positive"
  | "warning"
  | "highlight"
  | "black";

type BadgeProps = {
  $size?: SizeType;
  $state?: StateType;
  $icon?: IconType;
  children?: React.ReactNode;
  $nowrap?: boolean; // true일 때 줄바꿈 금지
  style?: CSSProperties;
};

const colorMap: Record<StateType, { bg: ColorType; ft: ColorType }> = {
  default: {
    bg: "backgroundDefaultStrong",
    ft: "textDefaultNormal",
  },
  brand: {
    bg: "backgroundBrandWeak",
    ft: "textBrandNormal",
  },
  danger: {
    bg: "backgroundDangerWeak",
    ft: "textDangerNormal",
  },
  positive: {
    bg: "backgroundPositiveWeak",
    ft: "textPositiveNormal",
  },
  warning: {
    bg: "backgroundWarningWeak",
    ft: "textWarningNormal",
  },
  highlight: {
    bg: "backgroundHighlightWeak",
    ft: "textHighlightNormal",
  },
  black: {
    bg: "backgroundDefaultBlack",
    ft: "textDefaultOnColor",
  },
};

const Badge = ({
  $size = "small",
  $state = "default",
  $icon,
  $nowrap,
  children,
  style,
}: BadgeProps) => {
  return (
    <Container $state={$state} $size={$size} style={style}>
      <Flex $gap={{ column: 6 }}>
        {$icon && <Icon name={$icon} size={16} />}
        <Typo
          $color={colorMap[$state].ft}
          $nowrap={$nowrap}
          $variant={$size === "large" ? "label1Medium" : "label2Medium"}
        >
          {children}
        </Typo>
      </Flex>
    </Container>
  );
};

export default Badge;

const Container = styled.div<{ $state: StateType; $size: SizeType }>`
  display: flex;
  width: fit-content;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  background-color: ${({ $state, theme }) => theme.colors[colorMap[$state].bg]};
  word-break: break-all;
  padding: ${({ $size }) =>
    $size === "large" ? "0.375rem 0.5rem" : "0.25rem 0.5rem"};

  svg {
    color: ${({ $state, theme }) => theme.colors[colorMap[$state].ft]};
  }
`;
