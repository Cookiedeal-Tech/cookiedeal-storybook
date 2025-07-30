"use client";

import { type InputHTMLAttributes, forwardRef } from "react";
import styled from "styled-components";
import Typo from "@/components/atoms/Typo";

type CheckboxProps = {
  label?: React.ReactNode;
  $isFull?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, $isFull = true, ...props }, ref) => {
    return (
      <Label $isFull={$isFull}>
        <StyledInput name="name" ref={ref} type="checkbox" {...props} />
        <Typo $variant="label1Medium" $color="textDefaultNormal">
          {label && label}
        </Typo>
      </Label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;

const Label = styled.label<{ $isFull: boolean }>`
  width: ${({ $isFull }) => ($isFull ? "100%" : "auto")};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 0.5rem;

  ${({ theme }) => theme.device.mobile} {
    column-gap: 0.4rem;
  }
`;
export const StyledInput = styled.input`
  /* 기본 체크박스를 숨김 */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  width: 1.125rem;
  height: 1.125rem;

  border: 1px solid ${({ theme }) => theme.colors.borderDefaultNormal};
  border-radius: 0.125rem;
  cursor: pointer;

  background-color: none; /* 기본 배경색 */
  position: relative;

  &:disabled {
    border-color: ${({ theme }) => theme.colors.borderDisabledNormal};
    cursor: not-allowed;

    &:checked {
      border: none;
      background-color: ${({ theme }) => theme.colors.backgroundDisabledButton};
    }
  }

  &:checked {
    background-color: ${({ theme }) => theme.colors.backgroundBrandNormal};
    border-color: ${({ theme }) => theme.colors.backgroundBrandNormal};

    &::after {
      content: "";
      display: block;
      width: 0.5rem; /* 체크표시 가로 크기 */
      height: 0.25rem; /* 체크표시 세로 크기 */
      border: solid white; /* 체크표시 색상 */
      border-width: 0 0 2.5px 2.5px; /* 체크표시 두께 */
      transform: rotate(-45deg); /* 체크표시 모양을 위한 회전 */
      position: absolute;
      top: 45%; /* 수직 가운데 정렬 */
      left: 50%; /* 수평 가운데 정렬 */
      transform: translate(-50%, -50%) rotate(-45deg); /* 가운데 정렬과 회전 적용 */
    }
  }

  ${({ theme }) => theme.device.mobile} {
    width: 1rem;
    height: 1rem;

    &:checked {
      &::after {
        width: 0.4rem; /* 체크표시 가로 크기 */
        height: 0.2rem; /* 체크표시 세로 크기 */
        border-width: 0 0 2px 2px; /* 체크표시 두께 */
      }
    }
  }
`;
