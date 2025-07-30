import type { Meta } from "@storybook/react-vite";
import Input from "./Input";
import { iconList } from "../Icon/iconList";

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  decorators: [
    (Story) => (
      <div
        style={{
          width: "360px",
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
    placeholder: "입력하세요",
  },
  argTypes: {
    placeholder: {
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    $rightIcon: {
      control: "select",
      options: Object.keys(iconList),
      table: {
        type: { summary: "iconType" },
      },
    },
    $leftIcon: {
      control: "select",
      options: Object.keys(iconList),
      table: {
        type: { summary: "iconType" },
      },
    },
    disabled: {
      control: "boolean",
      description: "비활성화 여부",
      table: {
        type: { summary: "boolean" },
      },
    },
  },
};

export default meta;

export const Default = {
  args: {
    $rightIcon: "search",
    placeholder: "입력하세요",
    $label: { isRequired: true, text: "오른쪽 돋보기 아이콘을 클릭해보세요" },
    onRightIconClick: () => {
      alert("click!");
    },
  },
};
