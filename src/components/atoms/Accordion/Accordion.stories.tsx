import type { Meta, StoryObj } from "@storybook/react-vite";
import Accordion from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Atoms/Accordion",
  component: Accordion,
  decorators: [
    (Story) => (
      <div
        style={{
          width: "100%",
          padding: "24px",
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    docs: {
      source: {
        state: "open",
      },
    },
    controls: {
      expanded: true,
    },
  },
  tags: ["autodocs"],
  args: {},
  argTypes: {
    items: {
      control: "object",
      description: "아코디언 아이템 배열",
      table: {
        type: { summary: "ContentType[]" },
      },
    },
    $bgColor: {
      control: "select",
      description: "배경 색상",
      table: {
        type: { summary: "ColorType" },
      },
      options: [
        "backgroundDefaultNormal",
        "backgroundDefaultWeak",
        "backgroundDefaultWeaker",
        "backgroundDefaultStrong",
        "backgroundBrandNormal",
        "backgroundDisabledNormal",
        "backgroundDangerNormal",
        "backgroundPositiveNormal",
        "backgroundWarningNormal",
        "backgroundHighlightNormal",
      ],
    },
    $isShadow: {
      control: "boolean",
      description: "그림자 효과 적용 여부",
      table: {
        type: { summary: "boolean" },
      },
    },
    $isBorder: {
      control: "boolean",
      description: "테두리 적용 여부",
      table: {
        type: { summary: "boolean" },
      },
    },
    $hasQMark: {
      control: "boolean",
      description: "Q 마크 표시 여부",
      table: {
        type: { summary: "boolean" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        id: 0,
        title: "첫 번째 아코디언",
        content: "첫 번째 아코디언의 내용입니다.",
      },
      {
        id: 1,
        title: "두 번째 아코디언",
        content: "두 번째 아코디언의 내용입니다.",
      },
      {
        id: 2,
        title: "세 번째 아코디언",
        content: "세 번째 아코디언의 내용입니다.",
      },
    ],
    $isShadow: true,
    $isBorder: false,
    $hasQMark: false,
  },
};

export const WithQMark: Story = {
  args: {
    items: [
      {
        id: 0,
        title: "자주 묻는 질문 1",
        content: "자주 묻는 질문 1에 대한 답변입니다.",
      },
      {
        id: 1,
        title: "자주 묻는 질문 2",
        content: "자주 묻는 질문 2에 대한 답변입니다.",
      },
      {
        id: 2,
        title: "자주 묻는 질문 3",
        content: "자주 묻는 질문 3에 대한 답변입니다.",
      },
    ],
    $isShadow: true,
    $isBorder: false,
    $hasQMark: true,
  },
};

export const WithBorder: Story = {
  args: {
    items: [
      {
        id: 0,
        title: "테두리가 있는 아코디언 1",
        content: "테두리가 있는 아코디언 1의 내용입니다.",
      },
      {
        id: 1,
        title: "테두리가 있는 아코디언 2",
        content: "테두리가 있는 아코디언 2의 내용입니다.",
      },
      {
        id: 2,
        title: "테두리가 있는 아코디언 3",
        content: "테두리가 있는 아코디언 3의 내용입니다.",
      },
    ],
    $isShadow: false,
    $isBorder: true,
    $hasQMark: false,
  },
};
