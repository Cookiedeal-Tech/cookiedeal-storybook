import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { formattedDate } from '@/utils/converter';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Flex from '@/components/commons/Flex';
import Typo from '@/components/commons/Typo';
import Icon from '@/components/commons/Icon';
import { StyledInput } from '@/components/commons/Checkbox';

type FormatType = 'date' | 'dateTime' | 'localeString' | 'percentage' | 'blur';
type AlignType = 'left' | 'right' | 'center';

export type SortByType = 'revenue' | 'operatingprofit' | 'ebitda' | undefined;
export type SortOrderType = 'desc' | 'asc' | undefined;

export type TableHeadType = {
  text: string | React.ReactNode;
  key: string;
  width?: number; // 특정cell의 고정width(단위: px)
  align?: AlignType; // 특정cell의 text-align
  format?: FormatType; // 특정cell의 날짜 또는 현지통화단위
  isEllipsis?: boolean; // 특정cell의 말줄임표 사용여부
  noWrap?: boolean; // 줄바꿈 금지
  isSortable?: boolean; // 클릭 시 오름or내림차순 정렬
};

type TableProps = {
  head: TableHeadType[];
  body?: Record<string, string | number | React.ReactNode>[];
  isShadow?: boolean;
  isClickableRow?: boolean;
  fixedTableWidth?: number; // 고정된 테이블 너비(단위: px)
  checkedItems?: any[];
  onCheckboxChange?: (selectedItems: any[]) => void; // 체크박스 변경 시 콜백
  checkboxKey?: string; // 체크박스 식별자로 사용할 키 추가
  isPending?: boolean;
  emptyContent?: React.ReactNode;
};

const Table = ({
  head,
  body,
  isShadow = false,
  isClickableRow = false,
  fixedTableWidth,
  checkedItems: externalCheckedItems,
  onCheckboxChange,
  checkboxKey, // 기본값은 하위호환성을 위해 'email'로 설정
  isPending = false,
  emptyContent,
}: TableProps) => {
  const [mount, setMount] = useState(false);
  const [internalCheckedItems, setInternalCheckedItems] = useState<any[]>([]);

  const checkedItems = externalCheckedItems || internalCheckedItems;

  const router = useRouter();

  // 전체 선택 상태 확인 함수 추가
  const isAllChecked = () => {
    if (!body || body.length === 0) return false;
    return body.every((item) =>
      checkedItems.some(
        (checkedItem) => checkedItem[checkboxKey!] === item[checkboxKey!],
      ),
    );
  };

  // 전체 선택/해제 처리 함수 추가
  const handleSelectAll = () => {
    let newCheckedItems: any[] = [];

    if (isAllChecked()) {
      // 모두 선택된 상태면 모두 해제
      newCheckedItems = [];
    } else {
      // 일부만 선택되었거나 아무것도 선택되지 않았으면 모두 선택
      newCheckedItems = [...body!];
    }

    setInternalCheckedItems(newCheckedItems);
    onCheckboxChange?.(newCheckedItems);
  };

  // 전체 선택 체크박스 렌더링 함수 추가
  const renderSelectAllCheckbox = () => {
    return (
      <StyledInput
        type="checkbox"
        checked={isAllChecked()}
        onChange={handleSelectAll}
        onClick={(e) => e.stopPropagation()}
        style={{
          verticalAlign: 'middle',
          textAlign: 'center',
          minWidth: '1.125rem',
        }}
      />
    );
  };

  const handleCheckboxChange = (item: any) => {
    const newCheckedItems = checkedItems.some(
      (checkedItem) => checkedItem[checkboxKey!] === item[checkboxKey!],
    )
      ? checkedItems.filter(
          (checkedItem) => checkedItem[checkboxKey!] !== item[checkboxKey!],
        )
      : [...checkedItems, item];

    setInternalCheckedItems(newCheckedItems);
    onCheckboxChange?.(newCheckedItems);
  };

  const renderCheckbox = (item: any) => {
    return (
      <StyledInput
        type="checkbox"
        checked={checkedItems.some(
          (checkedItem) => checkedItem[checkboxKey!] === item[checkboxKey!],
        )}
        onChange={() => handleCheckboxChange(item)}
        onClick={(e) => e.stopPropagation()} // 행 클릭 이벤트와 충돌 방지
        style={{
          verticalAlign: 'middle',
          textAlign: 'center',
        }}
      />
    );
  };

  useEffect(() => {
    /* SSR rendering error 고치기 위함 */
    setMount(true);
  }, []);

  /* 테이블 비었을 때 표시 */
  const isEmpty =
    !isPending && (body === undefined || (body && body.length === 0));

  /* 날짜 또는 통화형식으로 보여줘야할 때 */
  const formatter = ({
    value,
    type,
  }: {
    value?: number | string;
    type: FormatType;
  }) => {
    if (!value) return '-';
    switch (type) {
      case 'date':
        return formattedDate(value.toString());
      case 'dateTime':
        return formattedDate(value.toString(), 'yyyy.MM.dd HH:mm:ss');
      case 'localeString':
        return Number(value)?.toLocaleString();
      case 'percentage':
        return `${value}%`;

      default:
        return;
    }
  };

  // 오름or내림차순
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [sortOrder, setSortOrder] = useState<SortOrderType>(undefined);
  const [sortBy, setSortBy] = useState<SortByType>(undefined);

  const paramsSortOrder = searchParams.get('sortOrder') || undefined;
  const paramsSortBy = searchParams.get('sortBy') || undefined;

  const params = new URLSearchParams(searchParams.toString());
  useEffect(() => {
    setSortOrder(paramsSortOrder as SortOrderType);
    setSortBy(paramsSortBy as SortByType);
  }, [paramsSortOrder, paramsSortBy]);

  const renderArrow = (key: string) => {
    if (key === sortBy) {
      if (sortOrder === 'desc') {
        return <Icon size={16} name="down" color="iconDefaultWeak" />;
      } else if (sortOrder === 'asc') {
        return <Icon size={16} name="up" color="iconDefaultWeak" />;
      }
    }
    return <Icon size={16} name="expandAll" color="iconDefaultWeak" />;
  };

  const handleChangeSort = (key: SortByType) => {
    // 만약 새로운 헤더를 클릭한 경우라면, 정렬 상태를 초기화
    if (key !== sortBy) {
      params.set('page', '1');
      params.set('sortBy', key!.toString() || '');
      params.set('sortOrder', 'desc'); // 새 헤더는 항상 오름차순으로 시작
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
      return;
    }

    // 기존에 정렬된 헤더를 다시 클릭하는 경우에만 순서 변경
    else {
      switch (sortOrder) {
        // 현재 내림차순 중이면 > 오름차순으로 바뀜
        case 'desc':
          params.set('page', '1');
          params.set('sortBy', key!.toString() || '');
          params.set('sortOrder', 'asc');
          router.push(`${pathname}?${params.toString()}`, { scroll: false });
          return;

        // 현재 오름차순 중이면 > 정렬 없애기
        case 'asc':
          params.set('page', '1');
          params.delete('sortBy');
          params.delete('sortOrder');
          router.push(`${pathname}?${params.toString()}`, { scroll: false });
          return;

        // 현재 정렬 없는 상태면 > 내림차순으로 바뀜
        case undefined:
          params.set('page', '1');
          params.set('sortBy', key!.toString() || '');
          params.set('sortOrder', 'desc');
          router.push(`${pathname}?${params.toString()}`, { scroll: false });
          return;

        default:
          return;
      }
    }
  };

  return (
    mount && (
      <div
        style={{ position: 'relative', overflowX: 'auto', maxWidth: '100%' }}
      >
        <StyledTable $isShadow={isShadow} $fixedTableWidth={fixedTableWidth}>
          <Thead>
            <TheadTr>
              {head.map((item) => (
                <Th
                  key={item.key}
                  $width={item.width}
                  $isClickableHead={!!item.isSortable}
                  {...(item.isSortable && {
                    onClick: () => {
                      handleChangeSort(item.key as SortByType);
                    },
                  })}
                >
                  <Flex
                    $justify={
                      item.align === 'left'
                        ? 'start'
                        : item.align === 'right'
                        ? 'end'
                        : 'center'
                    }
                    $gap={{ column: 8 }}
                    $isFull
                  >
                    {item.key === 'checkbox' ? (
                      renderSelectAllCheckbox()
                    ) : (
                      <Typo
                        $variant="label2Medium"
                        $color="textDefaultNormal"
                        $align={item.align}
                      >
                        {item.text}
                      </Typo>
                    )}
                    {item.isSortable && renderArrow(item.key)}
                  </Flex>
                </Th>
              ))}
            </TheadTr>
          </Thead>

          <Tbody>
            {isPending && (
              <tr>
                <NoData colSpan={head.length}>
                  데이터를 불러오고 있습니다.
                </NoData>
              </tr>
            )}
            {isEmpty ? (
              <tr>
                <NoData colSpan={head.length}>
                  {emptyContent ? emptyContent : '데이터가 존재하지 않습니다.'}
                </NoData>
              </tr>
            ) : (
              body?.map((bodyItem) => (
                <BodyTr key={uuidv4()}>
                  {head.map((headItem) => {
                    return headItem.key === 'checkbox' ? (
                      <CheckboxTd key={uuidv4()}>
                        {renderCheckbox(bodyItem)}
                      </CheckboxTd>
                    ) : (
                      <StyledTd
                        key={uuidv4()}
                        $align={headItem.align ?? 'center'}
                        $isEllipsis={headItem.isEllipsis ?? false}
                        $noWrap={headItem.noWrap ?? false}
                        // TODO!! refactor...
                        {...(isClickableRow && {
                          onClick: () => {
                            router.push(`${bodyItem.targetUrl}`);
                          },
                        })}
                        style={{
                          cursor: isClickableRow ? 'pointer' : 'default',
                        }}
                      >
                        {headItem.format
                          ? typeof bodyItem[headItem.key] !== 'object' &&
                            formatter({
                              type: headItem.format,
                              value: bodyItem[headItem.key] as string | number,
                            })
                          : bodyItem[headItem.key] || '-'}
                      </StyledTd>
                    );
                  })}
                </BodyTr>
              ))
            )}
          </Tbody>
        </StyledTable>
      </div>
    )
  );
};

export default Table;

const StyledTable = styled.table<{
  $isShadow: boolean;
  $fixedTableWidth?: number;
}>`
  width: ${({ $fixedTableWidth }) =>
    $fixedTableWidth ? `${$fixedTableWidth / 16}rem` : '100%'};
  background-color: #fff;
  overflow: auto;
  table-layout: fixed;

  border-collapse: separate;
  border-spacing: 0;
  border-radius: 10px; /* 둥근 모서리 */
  overflow: hidden; /* border-radius가 잘 적용되도록 설정 */
  border: 1px solid ${({ theme }) => theme.colors.borderDefaultWeaker};

  th:last-child {
    border-right: none;
  }

  ${({ $isShadow }) =>
    $isShadow &&
    css`
      box-shadow: 4px 4px 20px 0 rgba(190, 190, 190, 0.25);
    `}
`;

const Thead = styled.thead`
  width: fit-content;
  min-width: 100%;

  border-bottom: 0;
  background-color: ${({ theme }) => theme.colors.backgroundDefaultStrong};
`;

const TheadTr = styled.tr`
  width: 100%;
`;

const Tbody = styled.tbody`
  min-width: fit-content;
  width: 100%;

  tr:last-child {
    td {
      border-bottom: none;
    }
  }
`;

const StyledTd = styled.td<{
  $align: 'left' | 'right' | 'center';
  $isEllipsis: boolean;
  $noWrap: boolean;
}>`
  text-align: ${({ $align }) => $align};

  word-break: keep-all;
  vertical-align: middle;

  // font style
  ${({ theme }) => theme.typos.body2Medium}

  > div {
    ${({ $align }) => {
      if ($align === 'left') {
        return css`
          justify-content: flex-start;
        `;
      } else if ($align === 'right') {
        return css`
          justify-content: flex-end;
        `;
      } else {
        return css`
          justify-content: center;
        `;
      }
    }}
  }

  ${({ $isEllipsis }) =>
    $isEllipsis &&
    css`
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    `}

  border-bottom: 1px solid
        ${({ theme }) => theme.colors.borderDefaultWeaker};
  padding: 0.75rem 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textDefaultNormal};

  ${({ $noWrap }) =>
    $noWrap &&
    css`
      white-space: nowrap;
    `}
`;

const BodyTr = styled.tr`
  &:hover {
    background-color: ${({ theme }) =>
      theme.colors.backgroundDefaultDifferentiate};
  }
`;

const NoData = styled.td`
  text-align: center;
  padding: 4rem 0;
  color: ${({ theme }) => theme.colors.textDefaultWeak};
  background-color: #fff;
  font-size: 0.875rem;

  ${({ theme }) => theme.device.mobile} {
    font-size: 0.75rem;
    padding: 2rem 0;
  }
`;

const Th = styled.th<{
  $width?: number;
  $isClickableHead?: boolean;
}>`
  width: ${(props) => (props.$width ? `${props.$width / 16}rem` : 'auto')};
  text-align: center;
  white-space: pre-wrap;
  vertical-align: middle;
  font-size: 1rem;
  padding: 1rem 0;
  position: relative;

  padding: 0.75rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderDefaultWeaker};

  cursor: ${({ $isClickableHead }) =>
    $isClickableHead ? 'pointer' : 'default'};
`;

const CheckboxTd = styled.td`
  text-align: center;
  vertical-align: middle;
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderDefaultWeaker};
  }
`;
