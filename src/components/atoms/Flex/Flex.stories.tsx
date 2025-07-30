import styled from "styled-components";
import type { Meta } from "@storybook/react-vite";
import Flex from "./Flex";
import React from "react";

const meta: Meta<typeof Flex> = {
  title: "Atoms/Flex",
  component: Flex,
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
    $width: {
      control: "number",
      description: "너비 (px 단위 또는 'full')",
      table: {
        type: { summary: "number | 'full'" },
      },
    },
    $isFull: {
      control: "boolean",
      description: "true 설정 시 너비 100%",
      table: {
        type: { summary: "boolean" },
      },
    },
    $direction: {
      control: "select",
      description: "flex 방향",
      table: {
        type: { summary: "'row' | 'column'" },
      },
      options: ["row", "column"],
    },
    $justify: {
      control: "select",
      description: "가로 정렬",
      table: {
        type: { summary: "keyof typeof justifyMap" },
      },
      options: ["start", "center", "end", "sb"],
    },
    $align: {
      control: "select",
      description: "세로 정렬",
      table: {
        type: { summary: "keyof typeof alignMap" },
      },
      options: ["start", "center", "end"],
    },
    $gap: {
      control: "object",
      description: "간격 (px 단위로 입력하면 rem으로 자동변환됨)",
      table: {
        type: { summary: "{ column?: number; row?: number }" },
      },
    },
    $order: {
      control: "number",
      description: "flex order",
      table: {
        type: { summary: "number" },
      },
    },
    $flex: {
      control: "number",
      description: "flex 값",
      table: {
        type: { summary: "number" },
      },
    },
  },
};

const Box = styled.div`
  padding: 16px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-width: 80px;
  text-align: center;
`;

export default meta;

export const Default = {
  args: {
    $isFull: false,
    $direction: "row",
    $justify: "start",
    $align: "center",
    $gap: { column: 16, row: 24 },
    children: (
      <React.Fragment>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </React.Fragment>
    ),
  },
};
