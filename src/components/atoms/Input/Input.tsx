import { useState, forwardRef, type InputHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import Icon from "../Icon";
import { type IconType } from "../Icon/iconList";
import Flex from "../Flex";
import Typo from "../Typo";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type InputProps = {
  $leftIcon?: IconType;
  $rightIcon?: IconType;
  onLeftIconClick?: () => void;
  onRightIconClick?: () => void;
  $align?: "left" | "right";
  $isFull?: boolean;
  $label?: { isRequired?: boolean; text: string | React.ReactNode }; // 위에 뜨는 라벨
  $message?: { type: "error" | "hint" | "default"; text?: string }; // 아래 뜨는 안내메시지
  $fixedWidth?: number; // 단위 px
  $rightText?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      $leftIcon,
      $rightIcon,
      onLeftIconClick,
      onRightIconClick,
      $align = "left",
      $isFull = true,
      $label,
      $fixedWidth,
      $message,
      $rightText,
      ...props
    },
    ref
  ) => {
    const [isFocus, setIsFocus] = useState<boolean>(false);

    const { isDesktop } = useMediaQuery();

    return (
      <Flex
        $align="start"
        $direction="column"
        $gap={{ row: 8 }}
        $isFull={$isFull}
      >
        {/* 라벨 */}
        {$label && (
          <Flex $justify="start" $gap={{ column: 2 }} $isFull>
            <Typo $variant={isDesktop ? "label2Bold" : "label2Bold"}>
              {typeof $label.text === "string" ? $label.text : $label.text}
            </Typo>
            {$label.isRequired && (
              <Typo
                $variant={isDesktop ? "label1Medium" : "label2Medium"}
                $color="textDangerNormal"
              >
                *
              </Typo>
            )}
          </Flex>
        )}

        {/* 인풋 */}
        <FakeDiv
          $isFull={$isFull}
          $isFocus={isFocus}
          $isError={!!$message && $message.type === "error"}
          $isHint={!!$message && $message.type === "hint"}
          $isDefault={!!$message && $message.type === "default"}
          $isDisabled={props.disabled ?? false}
          $fixedWidth={$fixedWidth}
        >
          <Flex $gap={{ column: 16 }}>
            {$leftIcon && (
              <div
                style={{ cursor: onLeftIconClick ? "pointer" : "default" }}
                {...(onLeftIconClick && { onClick: onLeftIconClick })}
              >
                <Icon size={20} color="iconDefaultWeak" name={$leftIcon} />
              </div>
            )}

            <StyledInput
              ref={ref}
              $align={$align}
              {...props}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
            />
            {$rightIcon && (
              <div
                style={{ cursor: onRightIconClick ? "pointer" : "default" }}
                {...(onRightIconClick && { onClick: onRightIconClick })}
              >
                <Icon size={20} color="iconDefaultWeak" name={$rightIcon} />
              </div>
            )}
            {$rightText && (
              <Typo $variant="body1Regular" $color="textDefaultNormal">
                {$rightText}
              </Typo>
            )}
          </Flex>
        </FakeDiv>

        {/* 메시지 */}
        {$message && (
          <Flex $justify="start" $isFull>
            <Typo
              $variant="caption1Regular"
              $color={
                $message?.type === "error"
                  ? "textDangerNormal"
                  : $message?.type === "hint"
                  ? "textPositiveNormal"
                  : "textDefaultWeak"
              }
            >
              {$message.text}
            </Typo>
          </Flex>
        )}
      </Flex>
    );
  }
);

Input.displayName = "Input";

export default Input;

const FakeDiv = styled.div<{
  $isFull: boolean;
  $isFocus: boolean;
  $isDisabled: boolean;
  $isError: boolean;
  $isHint: boolean;
  $isDefault: boolean;
  $fixedWidth?: number;
}>`
  padding: 0.6rem 0.75rem;
  background-color: ${({ theme }) => theme.colors.backgroundDefaultNormal};
  border-radius: 0.5rem;

  width: ${({ $isFull, $fixedWidth }) => {
    if ($fixedWidth) {
      return `${$fixedWidth / 16}rem`;
    } else if (!$fixedWidth && $isFull) {
      return "100%";
    } else {
      return "auto";
    }
  }};

  border: 1px solid;

  ${({ theme, $isFocus, $isError, $isHint }) => {
    if ($isError) {
      return css`
        border-color: ${theme.colors.borderDangerNormal};
      `;
    } else if ($isHint) {
      return css`
        border-color: ${theme.colors.textPositiveNormal};
      `;
    } else if ($isFocus) {
      return css`
        border-color: ${theme.colors.borderBrandNormal};
      `;
    }
    return css`
      border-color: ${theme.colors.borderDefaultWeak};
    `;
  }}

  ${({ $isDisabled, theme }) => {
    if ($isDisabled) {
      return css`
        background-color: ${theme.colors.backgroundDisabledInput};
      `;
    }
    return css``;
  }}

  &:hover {
    ${({ $isFocus, $isDisabled, $isError, theme }) => {
      // 보통 상황일 때만 hover 효과
      if (!$isFocus && !$isDisabled && !$isError) {
        return css`
          border: 1px solid ${theme.colors.borderDefaultNormal};
        `;
      }

      return css``;
    }}
  }
`;

const StyledInput = styled.input<{ $align: "left" | "right" }>`
  width: 100%;
  height: 1.625rem;
  margin-right: 0.125rem;
  flex: 1;
  text-align: ${({ $align }) => $align};
  color: ${({ theme }) => theme.colors.textDefaultStrong};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textDefaultWeaker};
  }

  /* Hide the number input spinner for various browsers */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield; /* Firefox */
  }
`;
