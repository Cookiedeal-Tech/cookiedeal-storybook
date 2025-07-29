import type { HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import type { TypoType, ColorType } from '@/styles/theme';

type TypoProps = {
  $variant?: TypoType;
  $color?: ColorType;
  $align?: 'left' | 'right' | 'center';
  $isFull?: boolean;
  $isDraggable?: boolean; // false 설정 시 디폴트커서 & 안긁어짐
  $nowrap?: boolean;
  $isEllipsis?: boolean;
  $lineClamp?: number; // 몇줄까지 표시하고 말줄임표 해줄건지
  children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const Typo = ({
  $variant = 'body1Regular',
  $color,
  $align = 'left',
  $isFull = false,
  $isDraggable = true,
  $nowrap = false,
  $isEllipsis = false,
  $lineClamp = 1,
  children,
  ...props
}: TypoProps) => {
  return (
    <Wrapper
      $variant={$variant}
      $color={$color}
      $align={$align}
      $isFull={$isFull}
      $isDraggable={$isDraggable}
      $nowrap={$nowrap}
      $isEllipsis={$isEllipsis}
      $lineClamp={$lineClamp}
      {...props}
    >
      {children}
    </Wrapper>
  );
};

export default Typo;

const Wrapper = styled.div<{
  $variant: TypoType;
  $color?: ColorType;
  $align: 'left' | 'right' | 'center';
  $isFull: boolean;
  $isDraggable: boolean;
  $nowrap: boolean;
  $isEllipsis: boolean;
  $lineClamp: number;
}>`
  color: ${({ theme, $color }) =>
    $color ? theme.colors[$color] : 'currentColor'};

  // pre-wrap(줄바꿈O), nowrap(줄바꿈X)
  white-space: ${({ $nowrap }) => ($nowrap ? 'nowrap' : 'pre-wrap')};
  text-align: ${({ $align }) => $align};

  // 말줄임표처리
  ${({ $isEllipsis, $lineClamp }) =>
    $isEllipsis &&
    css`
      text-overflow: ellipsis;
      overflow: hidden;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: ${$lineClamp ? $lineClamp : 1};
      word-break: break-all;
      flex: 1;
    `}

  width: ${({ $isFull }) => ($isFull ? '100%' : 'auto')};

  ${({ theme, $variant }) => theme.typos[$variant]};

  ${({ $isDraggable }) =>
    !$isDraggable &&
    css`
      cursor: default;
      user-select: none;
    `}
`;
