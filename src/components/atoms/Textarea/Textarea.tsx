import styled from "styled-components";
import Flex from "@/components/atoms/Flex";
import Typo from "@/components/atoms/Typo";
import React, { type TextareaHTMLAttributes } from "react";

type TextareaProps = {
  // 위에 뜨는 라벨
  $label?: {
    isRequired?: boolean;
    text?: React.ReactNode;
    rightSection?: React.ReactNode;
  };
  $message?: { type: "error" | "hint"; text?: string | React.ReactNode };
  $isFull?: boolean;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = ({
  $label,
  $message,
  $isFull = true,
  ...props
}: TextareaProps) => {
  return (
    <Flex
      $align="start"
      $direction="column"
      $gap={{ row: 8 }}
      $isFull={$isFull}
    >
      {/* 라벨 */}
      {$label && (
        <Flex $justify="sb" $isFull>
          <Flex $justify="start" $gap={{ column: 2 }} $isFull>
            <Typo $variant="label2Bold">{$label.text}</Typo>
            {$label.isRequired && (
              <Typo $variant="label2Bold" $color="textDangerNormal">
                *
              </Typo>
            )}
          </Flex>

          {$label.rightSection && $label.rightSection}
        </Flex>
      )}

      <FakeDiv
        $isError={!!$message && $message.type === "error"}
        $isDisabled={props.disabled ?? false}
        $isFull={$isFull}
      >
        <StyledTextarea rows={props.rows ? props.rows : 5} {...props} />
      </FakeDiv>

      {!!$message && $message.text && (
        <Typo
          $variant="caption1Regular"
          $color={
            $message.type === "error" && !props.disabled
              ? "textDangerNormal"
              : "textDefaultWeak"
          }
        >
          {$message.text}
        </Typo>
      )}
    </Flex>
  );
};

export default Textarea;

const StyledTextarea = styled.textarea`
  resize: none;
  width: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textDefaultWeak};
    ${({ theme }) => theme.typos.body1Regular}
  }
`;

const FakeDiv = styled.div<{
  $isError: boolean;
  $isDisabled: boolean;
  $isFull: boolean;
}>`
  width: ${({ $isFull }) => ($isFull ? "100%" : "auto")};
  padding: 0.75rem;
  border-radius: 0.5rem;
  background-color: ${({ theme, $isDisabled }) =>
    $isDisabled
      ? theme.colors.backgroundDisabledInput
      : theme.colors.backgroundDefaultNormal};
  border: 1px solid;

  border-color: ${({ $isError, $isDisabled, theme }) => {
    if ($isDisabled) {
      return theme.colors.borderDefaultWeaker;
    } else if ($isError) {
      return theme.colors.borderDangerNormal;
    }
    return theme.colors.borderDefaultWeak;
  }};
`;
