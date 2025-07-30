import { usePathname, useSearchParams } from 'next/navigation';
import Button from '@/components/commons/Button';
import { toast } from 'react-toastify';
import { ComponentProps, ElementType, ReactNode } from 'react';

type Props<T extends ElementType> = {
  as?: T; // 동적으로 렌더링할 컴포넌트
  children?: ReactNode;
  successMsg?: string;
  errorMsg?: string;
} & ComponentProps<T>;

/**
 *
 * 현재 url을 복사하는 컴포넌트
 *
 * */
const CopyComponent = <T extends ElementType>({
  as = Button,
  children,
  successMsg = 'url이 복사되었습니다.',
  errorMsg = '오류가 발생했습니다.',
  ...props
}: Props<T>) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const Component = as;

  const handleCopy = async () => {
    try {
      const queryString = searchParams.toString();
      const fullUrl = `${window.location.origin}${pathname}${
        queryString ? `?${queryString}` : ''
      }`;
      await navigator.clipboard.writeText(fullUrl);
      toast.success(successMsg);
    } catch (error) {
      toast.error(errorMsg);
    }
  };

  return (
    <Component {...props} onClick={handleCopy}>
      {children}
    </Component>
  );
};

export default CopyComponent;
