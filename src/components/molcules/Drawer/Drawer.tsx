import styled from 'styled-components';
import React, { useEffect } from 'react';
import Icon from '@/components/commons/Icon';

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  topSection?: React.ReactNode;
};

const Drawer = ({ isOpen, onClose, children, topSection }: DrawerProps) => {
  // ESC 키로 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // 외부(배경) 컴포넌트 스크롤 막기
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.cssText = `position: relative`;
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <>
          <Overlay onClick={onClose} />
          <DrawerContainer>
            <Header>
              <CloseWrapper onClick={onClose}>
                <Icon name="close" />
              </CloseWrapper>
              {topSection && topSection}
            </Header>
            <Content>{children}</Content>
          </DrawerContainer>
        </>
      )}
    </>
  );
};

export default Drawer;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 4;
`;

const DrawerContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 50rem;
  background-color: #fff;
  box-shadow: 0px 6px 12px 0px #0000001f;
  z-index: 5;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  padding: 2rem;

  ${({ theme }) => theme.device.belowTablet} {
    width: 100%;
    z-index: 9; // 모바일 환경에선 네비바까지도 덮음
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    padding: 0;
  }

  // 데스크탑 애니메이션
  animation: slideIn 0.4s ease-out;
  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  // 모바일 애니메이션
  ${({ theme }) => theme.device.belowTablet} {
    animation: slideUp 0.4s ease-out;
    @keyframes slideUp {
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0);
      }
    }
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 1rem;

  ${({ theme }) => theme.device.belowTablet} {
    padding: 1rem;
  }
`;

const Content = styled.div`
  margin-top: 1.5rem;

  ${({ theme }) => theme.device.belowTablet} {
    margin-top: 1rem;
  }
`;
const CloseWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
`;
