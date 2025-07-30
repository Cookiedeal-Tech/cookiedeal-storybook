import styled, { type CSSProperties } from "styled-components";
import Typo from "@/components/atoms/Typo";

type ChipProps = {
  checked: boolean;
  onClick: () => void;
  children: React.ReactNode;
  style?: CSSProperties;
};

const Chip = ({ checked, onClick, children, style }: ChipProps) => {
  return (
    <Container
      $isChecked={checked}
      onClick={onClick}
      {...(!!style && { style })}
    >
      <Typo
        $variant="label2Medium"
        $color={checked ? "textDefaultOnColor" : "textDefaultNormal"}
        $isDraggable={false}
      >
        {children}
      </Typo>
    </Container>
  );
};

export default Chip;

const Container = styled.div<{ $isChecked: boolean }>`
  border-radius: 6.25rem;
  padding: 0.5rem 0.75rem;
  background-color: ${({ theme, $isChecked }) =>
    $isChecked
      ? theme.colors.backgroundBrandNormal
      : theme.colors.backgroundDefaultStrong};
`;
