import styled, { css } from "styled-components";

type SizeType = "large" | "small";

type SwitchProps = {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  $size?: SizeType;
};

const Switch = ({
  checked,
  onChange,
  $size = "small",
  disabled = false,
}: SwitchProps) => {
  return (
    <ToggleWrapper {...(!disabled && { onClick: onChange })}>
      <ToggleInput
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={() => {
          if (!disabled) {
            onChange();
          }
        }}
      />
      <ToggleSlider $isChecked={checked} $size={$size} />
    </ToggleWrapper>
  );
};

export default Switch;

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const ToggleSlider = styled.span<{
  $isChecked: boolean;
  $size: SizeType;
}>`
  position: relative;
  display: inline-block;

  background-color: ${(props) =>
    props.$isChecked
      ? props.theme.colors.backgroundBrandNormal
      : props.theme.colors.backgroundDefaultStrongest};

  border-radius: 50px;
  transition: background-color 0.3s;

  ${({ $size }) => {
    if ($size === "small") {
      return css`
        width: 2.5rem;
        height: 1.5rem;
      `;
    } else {
      return css`
        width: 3.25rem;
        height: 2rem;
      `;
    }
  }}

  &:before {
    content: "";
    position: absolute;

    background-color: white;
    border-radius: 50%;
    transition: left 0.3s;

    ${({ $size, $isChecked }) => {
      if ($size === "small") {
        return css`
          width: 1.125rem;
          height: 1.125rem;
          top: 0.172rem;
          left: ${$isChecked ? "1.2rem" : "0.2rem"};
        `;
      } else {
        return css`
          width: 1.5rem;
          height: 1.5rem;
          top: 0.235rem;
          left: ${$isChecked ? "1.5rem" : "0.2rem"};
        `;
      }
    }}
  }
`;
