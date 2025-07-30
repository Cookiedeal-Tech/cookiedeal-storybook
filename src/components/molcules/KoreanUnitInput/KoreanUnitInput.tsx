import { InputHTMLAttributes, forwardRef, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import Typo from '@/components/commons/Typo';
import { formatNumberAll } from '@/utils/converter';
import Flex from '@/components/commons/Flex';

type InputProps = {
  label?: string;
  errorMsg?: string;
  fixedText?: { left?: string; right?: string };
  align?: 'left' | 'right';
  isBlocked?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const KoreanUnitInput = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, errorMsg, fixedText, align = 'left', isBlocked, ...props },
    ref,
  ) => {
    const [convertedValue, setConvertedValue] = useState<string>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);

      // 들어온게 숫자값이면 한글로 표기
      if (typeof value === 'number' && !isNaN(Number(value))) {
        setConvertedValue(formatNumberAll(value));
      } else {
        setConvertedValue(undefined);
      }

      props.onChange?.(e);
    };

    // 숫자input은 초기화되었는데 아래 한글텍스트만 남아있는 현상 fix
    useEffect(() => {
      if (!props.value) {
        setConvertedValue(undefined);
      }
    }, [props.value]);

    return (
      <Flex $direction="column" $gap={{ row: 4 }} $isFull>
        {label && (
          <Typo $variant="subtitle1Bold">
            {label}
            {props.required && '*'}
          </Typo>
        )}
        <FakeDiv>
          {fixedText && fixedText.left && (
            <DecoText $position="left">{fixedText.left}</DecoText>
          )}
          <StyledInput
            ref={ref}
            $align={align}
            {...props}
            onChange={handleChange}
          />
          {fixedText && fixedText.right && (
            <DecoText $position="right">{fixedText.right}</DecoText>
          )}
        </FakeDiv>
        {errorMsg && (
          <Typo $color="textDangerNormal" $variant="label3Bold">
            {errorMsg}
          </Typo>
        )}
        <Flex $isFull $justify="end">
          {!isBlocked && convertedValue ? (
            <UnitTypo>{convertedValue}원</UnitTypo>
          ) : (
            <EmptyGap />
          )}
        </Flex>
      </Flex>
    );
  },
);

KoreanUnitInput.displayName = 'KoreanUnitInput';

export default KoreanUnitInput;

const UnitTypo = styled(Typo)`
  margin-right: 0.75rem;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.textDefaultWeak};
  font-size: 0.75rem;
`;

const EmptyGap = styled.div`
  height: 1.375rem;
`;

const FakeDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.backgroundDisabledButton};
  background-color: #fff;
  border-radius: 0.625rem;
`;
const DecoText = styled.span<{ $position: 'left' | 'right' }>`
  color: ${({ theme }) => theme.colors.textDefaultWeak};
  white-space: nowrap;

  color: ${({ theme }) => theme.colors.textDefaultNormal};

  ${({ theme }) => theme.device.mobile} {
    font-size: 0.875rem;
  }

  ${({ $position }) =>
    $position === 'left'
      ? css`
          margin-left: 0.75rem;
        `
      : css`
          margin-right: 0.75rem;
        `}
`;

const StyledInput = styled.input<{ $align: 'left' | 'right' }>`
  margin-right: 0.125rem;
  text-align: ${({ $align }) => $align};
  color: ${({ theme }) => theme.colors.textDefaultStrong};
  padding: 0.75rem;
  border-radius: 0.625rem;
  width: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textDefaultWeak};
  }

  /* Hide the number input spinner for various browsers */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield; /* Firefox */
  }
`;
