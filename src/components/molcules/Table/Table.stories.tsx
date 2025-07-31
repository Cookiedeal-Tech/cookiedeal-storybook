import type { Meta, StoryObj } from "@storybook/react-vite";
import Table from "./Table";
import { useState } from "react";
import Flex from "@/components/atoms/Flex";

const headData = [
  { key: "name", text: "이름", width: 120 },
  { key: "hobby", text: "취미", width: 200 },
  { key: "year", text: "연도", isSortable: true },
];

const bodyData = [
  {
    name: "김고구마",
    year: 2001,
    hobby: "축구",
  },
  {
    name: "이감자",
    year: 1999,
    hobby: <span style={{ color: "blue" }}>배구</span>,
  },
  {
    name: "박옥수수",
    year: 1985,
    hobby: "농구",
  },
];

const meta: Meta<typeof Table> = {
  title: "Molecules/Table",
  component: Table,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%", padding: "20px" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  args: {
    head: headData,
    body: bodyData,
    isShadow: false,
  },
  argTypes: {
    head: { description: "테이블 헤더 설정" },
    body: { description: "테이블 바디 데이터" },
    isShadow: { control: "boolean", description: "그림자 효과" },
    fixedTableWidth: {
      control: "number",
      description: "고정된 테이블 너비(단위: px)",
    },
    checkedItems: { control: "object", description: "체크박스 선택 데이터" },
    checkboxKey: {
      control: "text",
      description: "체크박스 식별자로 사용할 키 추가",
    },
    isPending: { control: "boolean", description: "로딩 상태" },
    emptyContent: {
      control: "text",
      description: "데이터 없을 때 표시할 내용",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Table {...args} head={headData} body={bodyData} />, // head/body 고정
};

export const WithSortable: Story = {
  render: (args) => {
    return (
      <Flex $align="start" $direction="column" $gap={{ row: 24 }}>
        <Table
          {...args}
          head={headData.map((h, i) => ({ ...h, isSortable: i === 2 }))} // year만 정렬
          body={bodyData}
        />

        <pre>{`
        * head=[{ key: '데이터키값', text: '표시해줄 열 이름', isSortable: true }]
        
        위와 같이 설정하면, true로 준 테이블 열에 화살표가 생깁니다.


        해당 셀을 클릭하면 [내림차순 > 오름차순 > 정렬없음] 순서대로 동작하며,
        
        searchParams에 sortBy, sortOrder 파라미터가 추가됩니다.

        `}</pre>
      </Flex>
    );
  },
};

export const WithCheckbox: Story = {
  render: (args) => {
    const [checked, setChecked] = useState<any[]>([]);
    return (
      <Flex $align="start" $direction="column" $gap={{ row: 24 }}>
        <Table
          {...args}
          head={[{ key: "checkbox", text: "", width: 40 }, ...headData]}
          body={bodyData.map((row) => ({ ...row, id: row.name }))}
          checkedItems={checked}
          onCheckboxChange={setChecked}
          checkboxKey="name"
        />

        <span>
          선택됨:{" "}
          {checked
            .map((c) => {
              return `${c.name}(${c.year})`;
            })
            .join(", ")}
        </span>
      </Flex>
    );
  },
};

export const WithClickableRow: Story = {
  render: (args) => {
    const handleClick = (name: string) => alert(`${name} 클릭됨`);
    return (
      <Table
        {...args}
        head={headData}
        body={bodyData.map((row) => ({
          ...row,
          onClickRow: () => handleClick(row.name),
        }))}
      />
    );
  },
};

export const WithEllipsis: Story = {
  render: (args) => {
    const longData = [
      {
        name: "김고구마김고구마김고구마김고구마김고구마김고구마김고구마김고구마김고구마",
        year: 2001,
        hobby: "축구",
      },
      ...bodyData,
    ];
    return (
      <Table
        {...args}
        head={headData.map((h) => ({ ...h, isEllipsis: true, maxLength: 10 }))}
        body={longData}
      />
    );
  },
};
