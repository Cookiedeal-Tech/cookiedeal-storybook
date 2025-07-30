import styled from "styled-components";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Icon from "./Icon";
import { iconList } from "./iconList";

const meta: Meta<typeof Icon> = {
  title: "Atoms/Icon",
  component: Icon,
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
    name: {
      control: "select",
      description: "아이콘 이름",
      table: {
        type: { summary: "IconNameType" },
      },
      options: Object.keys(iconList),
    },
    size: {
      control: "number",
      description: "아이콘 크기 (px 단위)",
      table: {
        type: { summary: "number" },
      },
    },
    color: {
      control: "select",
      description: "아이콘 색상",
      table: {
        type: { summary: "ColorType" },
      },
      options: [
        "iconDefaultNormal",
        "iconDefaultWeak",
        "iconDefaultWeaker",
        "iconDefaultStrong",
        "iconBrandNormal",
        "iconDisabledNormal",
        "iconDangerNormal",
        "iconPositiveNormal",
        "iconWarningNormal",
        "iconHighlightNormal",
      ],
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    name: "search",
    size: 24,
    color: "iconDefaultNormal",
  },
};

export const ItemList = {
  render: () => {
    return (
      <Panel>
        {Object.keys(iconList).map((icon) => {
          return (
            <Container key={icon}>
              <Icon name={icon as keyof typeof iconList} />
              <span>{icon}</span>
            </Container>
          );
        })}
      </Panel>
    );
  },
  parameters: {
    docs: {
      disable: true,
    },
  },
};

type Story = StoryObj<typeof meta>;

const Panel = styled.div`
  display: grid;
  width: 1000px;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  justify-content: center;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #acacac;
`;
