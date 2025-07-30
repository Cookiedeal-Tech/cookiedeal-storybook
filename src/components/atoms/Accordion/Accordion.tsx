"use client";

import { useState } from "react";
import styled from "styled-components";
import Icon from "@/components/atoms/Icon/Icon";
import Typo from "@/components/atoms/Typo";
import type { ColorType } from "@/styles/theme";

export type ContentType = {
  id: number;
  title: string | React.ReactNode;
  content: string | React.ReactNode;
};

type Props = {
  items: ContentType[];
  $bgColor?: ColorType;
  $isShadow?: boolean;
  $isBorder?: boolean;
  $hasQMark?: boolean;
};

const Accordion = ({
  items,
  $bgColor,
  $isShadow = true,
  $isBorder = false,
  $hasQMark = false,
}: Props) => {
  const [openId, setOpenId] = useState(items[0].id);

  return (
    <Container $bgColor={$bgColor} $isShadow={$isShadow} $isBorder={$isBorder}>
      {items.map((item, index) => {
        const isOpen = openId === item.id;

        return (
          <Row key={item.id} onClick={() => setOpenId(item.id)}>
            <HeadContainer>
              <HeadWrapper $isOpen={isOpen}>
                <Typo $variant="body2Bold" $color="textDefaultStrong">
                  {$hasQMark ? (
                    <span style={{ color: "#0549CC", marginRight: "0.5rem" }}>
                      Q
                    </span>
                  ) : (
                    `${item.id + 1}. `
                  )}
                  {item.title}
                </Typo>
              </HeadWrapper>
              <Icon
                size={24}
                color="iconDefaultNormal"
                name={isOpen ? "up" : "down"}
              />
            </HeadContainer>
            {!$isBorder && <Divider />}
            {$isBorder && index !== items.length - 1 && <Divider />}

            <BodyWrapper $isOpen={isOpen}>
              <Typo $variant="body2Regular">{item.content}</Typo>
            </BodyWrapper>
          </Row>
        );
      })}
    </Container>
  );
};

export default Accordion;

const Container = styled.div<{
  $bgColor?: ColorType;
  $isShadow?: boolean;
  $isBorder?: boolean;
}>`
  display: flex;
  flex-direction: column;
  background-color: ${({ $bgColor, theme }) =>
    $bgColor ? theme.colors[$bgColor] : "#fff"};
  box-shadow: ${({ $isShadow }) =>
    $isShadow ? "0px 2px 8px 0px #0000001f" : "none"};
  border-radius: 0.5rem;
  width: 100%;

  border: ${({ $isBorder, theme }) =>
    $isBorder ? `1px solid ${theme.colors.borderDefaultWeaker}` : "none"};
`;

const Row = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const HeadContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  padding: 1rem;
`;
const HeadWrapper = styled.div<{ $isOpen: boolean }>`
  color: ${({ theme }) => theme.colors.textDefaultNormal};
  flex: 1;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BodyWrapper = styled.div<{ $isOpen: boolean }>`
  padding: 1rem;
  display: ${(props) => (props.$isOpen ? "block" : "none")};

  .strong {
    font-weight: 700;
  }

  a {
    color: ${({ theme }) => theme.colors.textBrandNormal};
    text-decoration: underline;
  }
`;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.borderDefaultWeaker};
`;
