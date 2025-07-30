'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import Flex from '@/components/commons/Flex';
import Icon from '@/components/commons/Icon';
import Typo from '@/components/commons/Typo';

type Props = {
  totalCount?: number;
  take?: number; // 페이지당 보여줄 게시물 수
  marginBottom?: number;
  pageKey?: string;
};

const BUTTON_RANGE = 5; // 보여질 페이지 버튼의 개수
const MAX_PAGE = 100; // 백에서 크롤링 막는 이슈로 프론트에서 101페이지부터는 안보여줌

const Pagination = ({
  totalCount = 1,
  take = 10,
  marginBottom,
  pageKey = 'page',
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const page = params.get(`${pageKey}`);

  const searchParams = new URLSearchParams(params.toString());

  const [currentPage, setCurrentPage] = useState<number>(1);

  // 총 페이지 수 (백에서 크롤링 막는 이슈로 프론트에서 101페이지부터는 렌더링 안함)
  const totalPage = Math.min(Math.ceil(totalCount / take), MAX_PAGE);

  // 현재 페이지를 중심으로 보여줄 페이지 번호들을 계산
  const visiblePages = useMemo(() => {
    if (totalPage <= BUTTON_RANGE) {
      // 전체 페이지가 5개 이하면 모든 페이지를 보여줌
      return Array.from({ length: totalPage }, (_, i) => i + 1);
    }

    let startPage = currentPage - Math.floor(BUTTON_RANGE / 2);
    let endPage = currentPage + Math.floor(BUTTON_RANGE / 2);

    // 맨 처음 1,2번째 페이지에서는 가운데로 옮겨지지 않음
    if (currentPage <= 2) {
      startPage = 1;
      endPage = BUTTON_RANGE;
    }
    // 맨 뒤 1,2번째 페이지에서도 가운데로 옮겨지지 않음
    else if (currentPage >= totalPage - 1) {
      startPage = totalPage - BUTTON_RANGE + 1;
      endPage = totalPage;
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
    );
  }, [currentPage, totalPage]);

  useEffect(() => {
    if (page) {
      setCurrentPage(parseInt(page));
    } else {
      setCurrentPage(1);
    }
  }, [params, page]);

  // 이전 페이지로 이동
  const handlePrev = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      searchParams.set(`${pageKey}`, `${newPage}`);
      router.push(`${pathname}?${searchParams.toString()}`, { scroll: false });
    }
  };

  // 다음 페이지로 이동
  const handleNext = () => {
    if (currentPage < totalPage) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      searchParams.set(`${pageKey}`, `${newPage}`);
      router.push(`${pathname}?${searchParams.toString()}`, { scroll: false });
    }
  };

  // 맨 처음 페이지로 이동
  const handleDoublePrev = () => {
    setCurrentPage(1);
    searchParams.set(`${pageKey}`, '1');
    router.push(`${pathname}?${searchParams.toString()}`, { scroll: false });
  };

  // 맨 마지막 페이지로 이동
  const handleDoubleNext = () => {
    setCurrentPage(totalPage);
    searchParams.set(`${pageKey}`, `${totalPage}`);
    router.push(`${pathname}?${searchParams.toString()}`, { scroll: false });
  };

  // 특정 페이지로 이동
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    searchParams.set(`${pageKey}`, `${pageNumber}`);
    router.push(`${pathname}?${searchParams.toString()}`, { scroll: false });

    // 스크롤을 최상단으로 이동
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container $marginBottom={marginBottom}>
      <Flex $gap={{ column: 8 }}>
        <Icon onClick={handleDoublePrev} name="keyboardDoubleArrowLeft" />
        <Icon onClick={handlePrev} name="left" />

        {visiblePages.map((pageNumber) => {
          return (
            <Number
              key={pageNumber}
              $isActive={pageNumber === currentPage}
              onClick={() => handlePageClick(pageNumber)}
            >
              <Typo $variant="body2Medium">{pageNumber}</Typo>
            </Number>
          );
        })}

        <Icon name="right" onClick={handleNext} />
        <Icon name="keyboardDoubleArrowRight" onClick={handleDoubleNext} />
      </Flex>
    </Container>
  );
};

export default Pagination;

const Container = styled.div<{ $marginBottom?: number }>`
  display: flex;
  column-gap: 1.2rem;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: ${({ $marginBottom }) =>
    typeof $marginBottom === 'number' ? `${$marginBottom / 16}rem` : '2rem'};
`;

const Number = styled.div<{ $isActive: boolean }>`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  padding: 0.5rem;

  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.backgroundDefaultStrong : '#fff'};
  color: ${({ theme }) => theme.colors.textDefaultNormal};
  font-weight: 500;
  cursor: pointer;
  user-select: none;
`;
