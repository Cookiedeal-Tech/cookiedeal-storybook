import { type ButtonHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import Icon from "@/components/atoms/Icon";
import Typo from "@/components/atoms/Typo";
import { type IconType } from "@/components/atoms/Icon/iconList";

const textButtonVariantMap = {
  primary: {
    default: css`
      background-color: transparent;
      color: ${({ theme }) => theme.colors.textBrandNormal};
    `,
    hover: css`
      background-color: ${({ theme }) => theme.colors.backgroundBrandWeaker};
      color: ${({ theme }) => theme.colors.textBrandNormal};
    `,
    pressed: css`
      background-color: ${({ theme }) => theme.colors.backgroundBrandWeak};
      color: ${({ theme }) => theme.colors.textBrandNormal};
    `,
    disabled: css`
      background-color: transparent;
      color: ${({ theme }) => theme.colors.textDisabledNormal};
    `,
  },
  secondary: {
    default: css`
      background-color: transparent;
      color: ${({ theme }) => theme.colors.textDefaultNormal};
    `,
    hover: css`
      background-color: ${({ theme }) =>
        theme.colors.backgroundDefaultDifferentiate};
      color: ${({ theme }) => theme.colors.textDefaultNormal};
    `,
    pressed: css`
      background-color: ${({ theme }) =>
        theme.colors.backgroundDefaultStronger};
      color: ${({ theme }) => theme.colors.textDefaultNormal};
    `,
    disabled: css`
      background-color: transparent;
      color: ${({ theme }) => theme.colors.textDisabledNormal};
    `,
  },
  faint: {
    default: css`
      background-color: transparent;
      color: ${({ theme }) => theme.colors.textDefaultWeak};
    `,
    hover: css`
      background-color: ${({ theme }) =>
        theme.colors.backgroundDefaultDifferentiate};
      color: ${({ theme }) => theme.colors.textDefaultWeak};
    `,
    pressed: css`
      background-color: ${({ theme }) => theme.colors.backgroundDefaultPressed};
      color: ${({ theme }) => theme.colors.textDefaultWeak};
    `,
    disabled: css`
      background-color: transparent;
      color: ${({ theme }) => theme.colors.textDisabledNormal};
    `,
  },
};

const textButtonSizeMap = {
  small: css`
    border-radius: 0.375rem;
    font-size: 0.75rem;
  `,
  medium: css`
    border-radius: 0.375rem;
    font-size: 0.875rem;
  `,
  large: css`
    border-radius: 0.5rem;
    font-size: 1rem;
  `,
};

type TextButtonProps = {
  $leftIcon?: IconType;
  $rightIcon?: IconType;
  $isFull?: boolean;
  $variant?: keyof typeof textButtonVariantMap;
  $size?: keyof typeof textButtonSizeMap;
  children?: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const TextButton = ({
  $variant = "primary",
  $isFull = false,
  $leftIcon,
  $rightIcon,
  $size = "medium",
  type = "button",
  children,
  ...props
}: TextButtonProps) => {
  const iconSizes = () => {
    switch ($size) {
      case "small":
        return 16;

      case "medium":
        return 20;

      case "large":
        return 24;

      default:
        return 20;
    }
  };

  return (
    <StyledButton
      $size={$size}
      $variant={$variant}
      $isFull={$isFull}
      {...props}
    >
      <ChildContainer $size={$size}>
        {$leftIcon && <Icon size={iconSizes()} name={$leftIcon} />}
        {children && (
          <Typo
            $variant={$size === "large" ? "label1Medium" : "label2Medium"}
            $nowrap
          >
            {children}
          </Typo>
        )}
        {$rightIcon && <Icon size={iconSizes()} name={$rightIcon} />}
      </ChildContainer>
    </StyledButton>
  );
};

export default TextButton;

const StyledButton = styled.button<TextButtonProps>`
  font-weight: 700;
  width: ${({ $isFull }) => ($isFull ? "100%" : "auto")};
  padding: 0.125rem 0.25rem;

  ${({ $size = "medium" }) => {
    return textButtonSizeMap[$size];
  }}

  ${({ $variant }) => {
    return textButtonVariantMap[$variant!]["default"];
  }}


  &:not(:disabled):hover {
    ${({ $variant }) => textButtonVariantMap[$variant!]["hover"]}
  }

  &:not(:disabled):active {
    ${({ $variant }) => textButtonVariantMap[$variant!]["pressed"]}
  }

  &:disabled {
    cursor: not-allowed;
    ${({ $variant }) => textButtonVariantMap[$variant!]["disabled"]}
  }
`;

const ChildContainer = styled.div<{
  $size: "small" | "medium" | "large";
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  column-gap: ${({ $size }) => {
    switch ($size) {
      case "small": {
        return "0.25rem";
      }
      case "medium": {
        return "0.375rem";
      }
      case "large": {
        return "0.5rem";
      }
      default:
        return;
    }
  }};

  // 아이콘 색상
  svg {
    color: currentColor;
  }
`;
