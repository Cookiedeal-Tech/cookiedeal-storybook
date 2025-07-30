import styled from "styled-components";
import type { Meta } from "@storybook/react-vite";
import Switch from "./Switch";
import { useState } from "react";
import Flex from "../Flex";

const meta: Meta<typeof Switch> = {
  title: "Atoms/Switch",
  component: Switch,
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
  argTypes: {
    checked: {
      control: "boolean",
      description: "스위치 상태",
      table: {
        type: { summary: "boolean" },
      },
    },
    $size: {
      control: "select",
      description: "스위치 크기",
      table: {
        type: { summary: "SizeType" },
      },
      options: ["small", "large"],
    },
    disabled: {
      control: "boolean",
      description: "비활성화 여부",
      table: {
        type: { summary: "boolean" },
      },
    },
    onChange: {
      description: "상태 변경 이벤트",
      table: {
        type: { summary: "() => void" },
      },
    },
  },
};

export default meta;

export const Default = {
  args: {
    checked: true,
    $size: "small",
  },
  render: () => {
    const [checked, setChecked] = useState(true);

    return (
      <Flex $align="start" $direction="column" $gap={{ row: 24 }}>
        <Switch checked={checked} onChange={() => setChecked(!checked)} />
        <span>상태: {checked ? "켜짐" : "꺼짐"}</span>
      </Flex>
    );
  },
};
