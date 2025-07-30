import type { Meta, StoryObj } from "@storybook/react-vite";
import Typo from "./Typo";

const meta: Meta<typeof Typo> = {
  title: "Atoms/Typo",
  component: Typo,
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
  args: {
    $isFull: false,
    $isDraggable: true,
    $nowrap: false,
    $isEllipsis: false,
  },
  argTypes: {
    $variant: {
      control: "select",
      description: "텍스트 크기 + 굵기 + 줄간격 조합",
      table: {
        type: { summary: "TypoType" },
      },
      options: [
        "display1Bold",
        "display1Medium",
        "display1Regular",
        "display2Bold",
        "display2Medium",
        "display2Regular",
        "title1Bold",
        "title1Medium",
        "title1Regular",
        "title2Bold",
        "title2Medium",
        "title2Regular",
        "subtitle1Bold",
        "subtitle1Medium",
        "subtitle1Regular",
        "subtitle2Bold",
        "subtitle2Medium",
        "subtitle2Regular",
        "body1Bold",
        "body1Medium",
        "body1Regular",
        "body2Bold",
        "body2Medium",
        "body2Regular",
        "label1Bold",
        "label1Medium",
        "label1Regular",
        "label2Bold",
        "label2Medium",
        "label2Regular",
        "label3Bold",
        "label3Medium",
        "label3Regular",
        "caption1Bold",
        "caption1Medium",
        "caption1Regular",
      ],
    },
    $color: {
      control: "select",
      description: "텍스트 색상 설정",
      table: {
        type: { summary: "ColorType" },
      },
      options: [
        "textDefaultWeak",
        "textDefaultWeaker",
        "textDefaultNormal",
        "textDefaultStrong",
        "textDefaultOnColor",
        "textBrandNormal",
        "textDisabledNormal",
        "textDangerNormal",
        "textPositiveNormal",
        "textWarningNormal",
        "textHighlightNormal",
      ],
    },
    $align: {
      control: "select",
      description: "텍스트의 정렬 방향 설정",
      table: {
        type: { summary: "left | center | right" },
      },
      options: ["left", "center", "right"],
    },
    $isFull: {
      control: "boolean",
      description: "true 설정 시 텍스트의 너비 100%",
      table: {
        type: { summary: "boolean" },
      },
    },
    $isDraggable: {
      control: "boolean",
      description: "false 설정 시 텍스트 드래그 불가",
      table: {
        type: { summary: "boolean" },
      },
    },
    $nowrap: {
      control: "boolean",
      description:
        "true 설정 시 텍스트 줄바꿈 방지, false 설정 시 텍스트 줄바꿈 가능",
      table: {
        type: { summary: "boolean" },
      },
    },
    $isEllipsis: {
      control: "boolean",
      description: "true 설정 시, 너비 초과했을 때 말줄임표(...) 처리",
      table: {
        type: { summary: "boolean" },
      },
    },
    $lineClamp: {
      control: "number",
      description:
        "텍스트 몇 줄까지 표시하고 말줄임표 해줄건지 number값 ($isEllipsis=true와 함께 사용해야 함)",
      table: {
        type: { summary: "number" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "쿠키딜 디자인 시스템입니다.",
  },
};
