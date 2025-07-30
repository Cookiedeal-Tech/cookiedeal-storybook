import styled from "styled-components";
import type { Meta } from "@storybook/react-vite";
import Badge from "./Badge";
import { iconList } from "../Icon/iconList";
import Flex from "../Flex";

const meta: Meta<typeof Badge> = {
  title: "Atoms/Badge",
  component: Badge,
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
    $size: {
      control: "select",
      description: "배지 크기",
      table: {
        type: { summary: "SizeType" },
      },
      options: ["small", "large"],
    },
    $state: {
      control: "select",
      description: "배지 상태/색상",
      table: {
        type: { summary: "StateType" },
      },
      options: [
        "default",
        "brand",
        "danger",
        "positive",
        "warning",
        "highlight",
        "black",
      ],
    },
    $icon: {
      control: "select",
      description: "배지에 표시할 아이콘",
      table: {
        type: { summary: "IconType" },
      },
      options: Object.keys(iconList),
    },
    children: {
      control: "text",
      description: "배지 내용",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    $nowrap: {
      control: "boolean",
      description: "true 설정 시 텍스트 줄바꿈 방지",
      table: {
        type: { summary: "boolean" },
      },
    },
  },
};

export default meta;

export const Default = {
  args: {
    children: "쿠키딜 badge",
    $size: "small",
    $state: "default",
  },
  render: () => {
    return (
      <Flex $align="start" $direction="column" $gap={{ row: 16 }}>
        <Badge>커스텀 BADGE</Badge>

        <Divider />

        <Flex $gap={{ column: 24 }} $align="start">
          <Badge $state="brand" $icon="delete">
            brand + icon
          </Badge>
          <Badge $state="danger">danger</Badge>
          <Badge $state="positive">positive</Badge>
          <Badge $state="warning">warning</Badge>
          <Badge $state="highlight">highlight</Badge>
          <Badge $size="large">사이즈 large</Badge>
        </Flex>
      </Flex>
    );
  },
};

export const AllStates = {
  render: () => {
    const states = [
      "default",
      "brand",
      "danger",
      "positive",
      "warning",
      "highlight",
      "black",
    ] as const;

    return (
      <Container>
        {states.map((state) => (
          <Badge key={state} $state={state}>
            {state}
          </Badge>
        ))}
      </Container>
    );
  },
  parameters: {
    docs: {
      disable: true,
    },
  },
};

export const WithIcons = {
  render: () => {
    const iconNames = ["search", "close", "check", "help"] as const;

    return (
      <Container>
        {iconNames.map((icon) => (
          <Badge key={icon} $icon={icon}>
            {icon}
          </Badge>
        ))}
      </Container>
    );
  },
  parameters: {
    docs: {
      disable: true,
    },
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
`;
