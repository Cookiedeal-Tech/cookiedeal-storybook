import { type HTMLAttributes } from "react";
import styled from "styled-components";
import Icon from "@/components/atoms/Icon";
import Typo from "@/components/atoms/Typo";
import Flex from "@/components/atoms/Flex";

type TagProps = {
  isDeletable?: boolean;
  nowrap?: boolean;
  children?: React.ReactNode;
  onDeleteClick?: () => void;
} & HTMLAttributes<HTMLDivElement>;

const Tag = ({
  isDeletable,
  children,
  onDeleteClick,
  nowrap = true, // 줄바꿈 안하는게 디폴트
  ...props
}: TagProps) => {
  return (
    <Container {...props}>
      <Flex $gap={{ column: 6 }}>
        <Typo
          $variant="label2Medium"
          $color="textDefaultNormal"
          $isDraggable={false}
          $nowrap={nowrap}
        >
          {children}
        </Typo>
        {isDeletable && (
          <Icon
            name="close"
            size={16}
            {...(onDeleteClick && { onClick: onDeleteClick })}
          />
        )}
      </Flex>
    </Container>
  );
};

export default Tag;

const Container = styled.div`
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme.colors.backgroundDefaultStrong};
  padding: 0.219rem 0.5rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundDefaultStronger};
  }
`;
