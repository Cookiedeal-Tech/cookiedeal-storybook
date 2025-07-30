import { type ButtonHTMLAttributes, forwardRef } from "react";
import styled, { css } from "styled-components";
import Icon from "@/components/atoms/Icon";
import Typo from "@/components/atoms/Typo";
import { type IconType } from "@/components/atoms/Icon/iconList";
import { type TypoType } from "@/styles/theme";

type VariantType =
  | "solidPrimary"
  | "solidOnColor"
  | "solidDestructiive"
  | "outlinePrimary"
  | "outlineSecondary";

type StateType = "default" | "hover" | "pressed" | "disabled";

type VariantCSSType = Record<
  VariantType,
  Record<StateType, ReturnType<typeof css>>
>;

const buttonVariantMap: VariantCSSType = {
  solidPrimary: {
    default: css`
      background-color: ${({ theme }) => theme.colors.backgroundBrandNormal};
      color: ${({ theme }) => theme.colors.textDefaultOnColor};
      border: 1px solid ${({ theme }) => theme.colors.borderBrandNormal};
    `,
    hover: css`
      background-color: ${({ theme }) => theme.colors.backgroundBrandStrong};
      color: ${({ theme }) => theme.colors.textDefaultOnColor};
      border: 1px solid ${({ theme }) => theme.colors.backgroundBrandStrong};
    `,
    pressed: css`
      background-color: ${({ theme }) => theme.colors.backgroundBrandStronger};
      color: ${({ theme }) => theme.colors.textDefaultOnColor};
    `,
    disabled: css`
      background-color: ${({ theme }) => theme.colors.backgroundDisabledButton};
      color: ${({ theme }) => theme.colors.textDefaultOnColor};
      border: 1px solid ${({ theme }) => theme.colors.backgroundDisabledButton};
    `,
  },
  solidOnColor: {
    default: css`
      background-color: ${({ theme }) => theme.colors.backgroundDefaultNormal};
      color: ${({ theme }) => theme.colors.textBrandNormal};
      border: 1px solid ${({ theme }) => theme.colors.backgroundDefaultNormal};
    `,
    hover: css`
      background-color: ${({ theme }) => theme.colors.backgroundDefaultNormal};
      color: ${({ theme }) => theme.colors.textBrandNormal};
      border: 1px solid ${({ theme }) => theme.colors.backgroundDefaultNormal};
    `,
    pressed: css`
      background-color: ${({ theme }) => theme.colors.backgroundDefaultNormal};
      color: ${({ theme }) => theme.colors.textBrandNormal};
    `,
    disabled: css`
      background-color: ${({ theme }) => theme.colors.backgroundDisabledButton};
      color: ${({ theme }) => theme.colors.textDefaultOnColor};
      border: 1px solid ${({ theme }) => theme.colors.backgroundDisabledButton};
    `,
  },
  solidDestructiive: {
    default: css`
      background-color: ${({ theme }) => theme.colors.backgroundDangerNormal};
      color: ${({ theme }) => theme.colors.textDefaultOnColor};
      border: 1px solid ${({ theme }) => theme.colors.backgroundDangerNormal};
    `,
    hover: css`
      background-color: ${({ theme }) => theme.colors.backgroundDangerStrong};
      color: ${({ theme }) => theme.colors.textDefaultOnColor};
      border: 1px solid ${({ theme }) => theme.colors.backgroundDangerStrong};
    `,
    pressed: css`
      background-color: ${({ theme }) => theme.colors.backgroundDangerStronger};
      color: ${({ theme }) => theme.colors.textDefaultOnColor};
    `,
    disabled: css`
      background-color: ${({ theme }) => theme.colors.backgroundDisabledButton};
      color: ${({ theme }) => theme.colors.textDefaultOnColor};
      border: 1px solid ${({ theme }) => theme.colors.backgroundDisabledButton};
    `,
  },
  outlinePrimary: {
    default: css`
      background-color: ${({ theme }) => theme.colors.backgroundDefaultNormal};
      color: ${({ theme }) => theme.colors.textBrandNormal};
      border: 1px solid ${({ theme }) => theme.colors.borderBrandNormal};
    `,
    hover: css`
      background-color: ${({ theme }) => theme.colors.backgroundBrandWeaker};
      color: ${({ theme }) => theme.colors.textBrandNormal};
      border: 1px solid ${({ theme }) => theme.colors.borderBrandNormal};
    `,
    pressed: css`
      background-color: ${({ theme }) => theme.colors.backgroundBrandWeak};
      color: ${({ theme }) => theme.colors.textBrandNormal};
      border: 1px solid ${({ theme }) => theme.colors.borderBrandNormal};
    `,
    disabled: css`
      background-color: ${({ theme }) => theme.colors.backgroundDefaultNormal};
      color: ${({ theme }) => theme.colors.textDisabledNormal};
      border: 1px solid ${({ theme }) => theme.colors.borderDefaultWeaker};
    `,
  },
  outlineSecondary: {
    default: css`
      background-color: ${({ theme }) => theme.colors.backgroundDefaultNormal};
      color: ${({ theme }) => theme.colors.textDefaultNormal};
      border: 1px solid ${({ theme }) => theme.colors.borderDefaultNormal};
    `,
    hover: css`
      background-color: ${({ theme }) =>
        theme.colors.backgroundDefaultDifferentiate};
      color: ${({ theme }) => theme.colors.textDefaultNormal};
      border: 1px solid ${({ theme }) => theme.colors.borderDefaultNormal};
    `,
    pressed: css`
      background-color: ${({ theme }) =>
        theme.colors.backgroundDefaultStronger};
      color: ${({ theme }) => theme.colors.textDefaultNormal};
      border: 1px solid ${({ theme }) => theme.colors.borderDefaultNormal};
    `,
    disabled: css`
      background-color: ${({ theme }) => theme.colors.backgroundDefaultNormal};
      color: ${({ theme }) => theme.colors.textDisabledNormal};
      border: 1px solid ${({ theme }) => theme.colors.borderDefaultWeaker};
    `,
  },
};

const buttonSizeMap = {
  small: css`
    padding: 0.406rem 0.5rem;
    border-radius: 0.25rem;
  `,
  medium: css`
    padding: 0.563rem 1rem;
    border-radius: 0.375rem;
  `,
  large: css`
    padding: 0.6rem 1.375rem;
    border-radius: 0.5rem;
  `,
};

const buttonTypoMap: Record<keyof typeof buttonSizeMap, TypoType> = {
  small: "label3Bold",
  medium: "body2Bold",
  large: "body1Bold",
};

export type ButtonProps = {
  $leftIcon?: IconType;
  $rightIcon?: IconType;
  $isFull?: boolean;
  $variant?: keyof typeof buttonVariantMap;
  $size?: keyof typeof buttonSizeMap;
  children?: React.ReactNode;
  $fixedWidth?: number; // 단위 px
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      $variant = "solidPrimary",
      $isFull = false,
      $leftIcon,
      $rightIcon,
      $size = "medium",
      $fixedWidth,
      // type = 'button',
      children,
      ...props
    },
    ref
  ) => {
    const iconSizes = () => {
      switch ($size) {
        case "small":
          return 18;

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
        $fixedWidth={$fixedWidth}
        $variant={$variant}
        $isFull={$isFull}
        ref={ref}
        type={props.type || "button"}
        {...props}
      >
        <ChildContainer $size={$size}>
          {$leftIcon && <Icon size={iconSizes()} name={$leftIcon} />}
          {children && (
            <Typo
              $variant={buttonTypoMap[$size]}
              style={{ whiteSpace: "nowrap", lineHeight: 1.6 }}
            >
              {children}
            </Typo>
          )}
          {$rightIcon && (
            <Icon name={$rightIcon} size={$size === "small" ? 18 : 24} />
          )}
        </ChildContainer>
      </StyledButton>
    );
  }
);

Button.displayName = "Button";

export default Button;

const StyledButton = styled.button<ButtonProps>`
  font-weight: 700;
  width: ${({ $isFull, $fixedWidth }) => {
    if ($fixedWidth) return `${$fixedWidth / 16}rem`;
    else if ($isFull) return "100%";
    return "auto";
  }};

  ${({ $size = "medium" }) => {
    return buttonSizeMap[$size];
  }}

  ${({ $variant }) => {
    return buttonVariantMap[$variant!]["default"];
  }}


  &:not(:disabled):hover {
    ${({ $variant }) => buttonVariantMap[$variant!]["hover"]}
  }

  &:not(:disabled):active {
    ${({ $variant }) => buttonVariantMap[$variant!]["pressed"]}
  }

  &:disabled {
    cursor: not-allowed;
    ${({ $variant }) => buttonVariantMap[$variant!]["disabled"]}
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
