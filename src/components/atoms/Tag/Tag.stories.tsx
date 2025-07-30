import styled from "styled-components";
import type { Meta } from "@storybook/react-vite";
import Tag from "./Tag";
import Flex from "../Flex";

const meta: Meta<typeof Tag> = {
  title: "Atoms/Tag",
  component: Tag,
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
    children: "태그",
  },
  argTypes: {
    children: {
      control: "text",
      description: "태그 내용",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    isDeletable: {
      control: "boolean",
      description: "삭제 가능 여부(onDeleteClick 이벤트 필요)",
      table: {
        type: { summary: "boolean" },
      },
    },
    onDeleteClick: {
      control: "boolean",
      description: "삭제 클릭 이벤트",
      table: {
        type: { summary: "() => void" },
      },
    },
    nowrap: {
      control: "boolean",
      description: "줄바꿈 방지",
      table: {
        type: { summary: "boolean" },
      },
    },
  },
};

export default meta;

export const Default = {
  args: {
    children: "태그",
    isDeletable: false,
    onDeleteClick: () => {},
    nowrap: false,
  },
  render: () => {
    return (
      <Flex $gap={{ column: 24 }} $align="start">
        <Tag>태그</Tag>
        <Tag onDeleteClick={() => alert("클릭 시 이벤트!")} isDeletable>
          태그
        </Tag>
      </Flex>
    );
  },
};
