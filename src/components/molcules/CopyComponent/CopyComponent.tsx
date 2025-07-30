import Button from "@/components/atoms/Button";
import type { ComponentProps, ElementType, ReactNode } from "react";
import { toast } from "react-toastify";

type Props<T extends ElementType> = {
  as?: T; // 동적으로 렌더링할 컴포넌트
  children?: ReactNode;
  successMsg?: string;
  errorMsg?: string;
} & ComponentProps<T>;

/**
 *
 * 현재 url을 복사하는 컴포넌트 (스토리북 환경에선 toast가 뜨지 않지만, 실제 환경에선 성공/실패 시 토스트 메시지가 뜹니다)
 *
 * */
const CopyComponent = <T extends ElementType>({
  as = Button,
  children,
  successMsg = "url이 복사되었습니다.",
  errorMsg = "오류가 발생했습니다.",
  ...props
}: Props<T>) => {
  const Component = as;

  const handleCopy = async () => {
    try {
      const fullUrl = window.location.href;
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
