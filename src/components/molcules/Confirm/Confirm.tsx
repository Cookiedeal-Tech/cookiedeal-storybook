import React from 'react';
import styled from 'styled-components';
import Typo from '@/components/commons/Typo';
import Flex from '@/components/commons/Flex';
import Button from '@/components/commons/Button';
import { useMediaQuery } from '@/hooks/useMediaQuery';

type Props = {
  content?: string | React.ReactNode;
  open: boolean;
  handleConfirm: () => void;
  onClose: () => void;
  confirmText?: string;
  cancelText?: string;
};

const Confirm = ({
  open,
  onClose,
  content,
  handleConfirm,
  confirmText,
  cancelText,
}: Props) => {
  const { isMobile } = useMediaQuery();

  return (
    <Container isOpen={open}>
      <Window>
        <Flex $direction="column" $gap={{ row: isMobile ? 16 : 24 }} $isFull>
          <Typo
            $variant={isMobile ? 'body2Regular' : 'subtitle1Bold'}
            $align="center"
          >
            {content}
          </Typo>

          <Flex $direction="column" $gap={{ row: 8 }} $isFull>
            <Button
              $variant="outlinePrimary"
              $size="large"
              $isFull
              onClick={onClose}
            >
              {cancelText ? cancelText : '취소'}
            </Button>
            <Button $size="large" $isFull onClick={handleConfirm}>
              {cancelText ? cancelText : '확인'}
            </Button>
          </Flex>
        </Flex>
      </Window>
    </Container>
  );
};

export default Confirm;

const Container = styled.div<{ isOpen: boolean }>`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;

  display: ${(props) => (props.isOpen ? 'block' : 'none')};
`;

const Window = styled(Flex)`
  width: 25rem;
  border-radius: 1rem;
  background: #fff;
  z-index: 10;
  padding: 2rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: center;
  flex-direction: column;

  ${({ theme }) => theme.device.mobile} {
    width: 100%;
    max-width: 90vw;
    padding: 1.5rem;
  }
`;
