import styled from "styled-components";
import type { Meta } from "@storybook/react-vite";
import Checkbox from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Atoms/Checkbox",
  component: Checkbox,
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
    label: "체크박스",
    $isFull: true,
  },
  argTypes: {
    label: {
      control: "text",
      description: "체크박스 라벨",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    $isFull: {
      control: "boolean",
      description: "true 설정 시 체크박스 너비 100%",
      table: {
        type: { summary: "boolean" },
      },
    },
    checked: {
      control: "boolean",
      description: "체크 상태",
      table: {
        type: { summary: "boolean" },
      },
    },
    disabled: {
      control: "boolean",
      description: "비활성화 여부",
      table: {
        type: { summary: "boolean" },
      },
    },
    onChange: {
      control: "boolean",
      description: "상태 변경 이벤트 핸들러",
      table: {
        type: { summary: "(event: ChangeEvent<HTMLInputElement>) => void" },
      },
    },
  },
};

export default meta;

export const Default = {
  args: {
    label: "라벨 텍스트입니다",
    $isFull: true,
  },
};
