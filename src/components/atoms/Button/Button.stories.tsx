import styled from "styled-components";
import type { Meta } from "@storybook/react-vite";
import Button from "./Button";
import Flex from "../Flex";
import { iconList } from "../Icon/iconList";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
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
    children: "버튼",
    $variant: "solidPrimary",
    $size: "medium",
    $isFull: false,
    disabled: false,
  },
  argTypes: {
    $variant: {
      control: "select",
      description: "버튼 스타일 변형",
      table: {
        type: { summary: "VariantType" },
      },
      options: [
        "solidPrimary",
        "solidOnColor",
        "solidDestructiive",
        "outlinePrimary",
        "outlineSecondary",
      ],
    },
    $size: {
      control: "select",
      description: "버튼 크기",
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
    $fixedWidth: {
      control: "number",
      description: "고정 너비 (px 단위)",
      table: {
        type: { summary: "number" },
      },
    },
    disabled: {
      control: "boolean",
      description: "비활성화 여부",
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
  },
};

export default meta;

export const Default = {
  args: {
    children: "테스트버튼",
    $variant: "solidPrimary",
    $size: "medium",
  },
  render: (args: React.ComponentProps<typeof Button>) => {
    return (
      <Flex $align="start" $direction="column" $gap={{ row: 24 }}>
        <Button {...args} />

        <Divider />
        <Container>
          <Button $variant="outlineSecondary" $rightIcon="help">
            오른쪽아이콘
          </Button>
          <Button $variant="outlinePrimary" $leftIcon="thumbUpFilled">
            왼쪽아이콘
          </Button>
          <Flex>
            <Button $size="small" $variant="solidDestructiive">
              작은사이즈
            </Button>
          </Flex>
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
