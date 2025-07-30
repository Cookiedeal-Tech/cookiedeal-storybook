import { type InputHTMLAttributes } from "react";
import styled from "styled-components";

type RadioProps = {
  id: string;
  value: string;
  label?: React.ReactNode;
  groupName?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Radio = ({ id, value, label, groupName, ...props }: RadioProps) => {
  return (
    <Container>
      <StyledRadioInput
        type="radio"
        id={id}
        value={value}
        name={groupName}
        {...props}
      />
      {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
    </Container>
  );
};

export default Radio;

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 0.5rem;
`;

const StyledLabel = styled.label`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textDefaultNormal};

  ${({ theme }) => theme.typos.body1Regular};

  ${({ theme }) => theme.device.mobile} {
    font-size: 0.875rem;
  }
`;

export const StyledRadioInput = styled.input`
  margin: 0;
  -webkit-appearance: none; // 웹킷 브라우저에서 기본 스타일 제거
  -moz-appearance: none; // 모질라 브라우저에서 기본 스타일 제거
  appearance: none; // 기본 브라우저에서 기본 스타일 제거
  width: 1.25rem;
  height: 1.25rem;
  border: 1px solid ${({ theme }) => theme.colors.borderDefaultNormal}; // 체크되지 않았을 때의 테두리 색상
  border-radius: 50%;
  outline: none; // focus 시에 나타나는 기본 스타일 제거
  cursor: pointer;

  &:checked {
    background-color: #fff; // 체크 시 내부 원으로 표시될 색상
    border: 6px solid ${({ theme }) => theme.colors.textBrandNormal}; // 테두리가 아닌, 테두리와 원 사이의 색상
  }

  &:disabled {
    border-color: ${({ theme }) => theme.colors.borderDisabledNormal};
  }

  &:disabled:checked {
    background-color: #fff;
  }
`;
