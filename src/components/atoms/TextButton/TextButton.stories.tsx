import styled from "styled-components";
import type { Meta } from "@storybook/react-vite";
import TextButton from "./TextButton";
import { iconList } from "../Icon/iconList";
import Flex from "../Flex";

const meta: Meta<typeof TextButton> = {
  title: "Atoms/TextButton",
  component: TextButton,
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
    children: "텍스트 버튼",
    $variant: "primary",
    $size: "medium",
    $isFull: false,
  },
  argTypes: {
    $variant: {
      control: "select",
      description: "텍스트 버튼 스타일 변형",
      table: {
        type: { summary: "VariantType" },
      },
      options: ["primary", "secondary", "faint"],
    },
    $size: {
      control: "select",
      description: "텍스트 버튼 크기",
      table: {
        type: { summary: "SizeType" },
      },
      options: ["small", "medium", "large"],
    },
    $leftIcon: {
      control: "select",
      description: "왼쪽 아이콘",
      table: {
        type: { summary: "IconType" },
      },
      options: Object.keys(iconList),
    },
    $rightIcon: {
      control: "select",
      description: "오른쪽 아이콘",
      table: {
        type: { summary: "IconType" },
      },
      options: Object.keys(iconList),
    },
    $isFull: {
      control: "boolean",
      description: "true 설정 시 버튼 너비 100%",
      table: {
        type: { summary: "boolean" },
      },
    },
    children: {
      control: "text",
      description: "버튼 내용",
      table: {
        type: { summary: "React.ReactNode" },
        category: "Content",
      },
      sort: 999,
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
    children: "텍스트 버튼",
    $variant: "primary",
    $size: "medium",
  },
  render: (args: React.ComponentProps<typeof TextButton>) => {
    return (
      <Flex $align="start" $direction="column" $gap={{ row: 24 }}>
        <TextButton {...args} />

        <Divider />
        <Container>
          <TextButton $variant="secondary" $rightIcon="help">
            오른쪽아이콘
          </TextButton>
          <TextButton $variant="faint" $leftIcon="thumbUpFilled">
            왼쪽아이콘
          </TextButton>
        </Container>
      </Flex>
    );
  },
};

const Container = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin: 8px 0;
`;
