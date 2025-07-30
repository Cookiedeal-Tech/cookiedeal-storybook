import type { Meta } from "@storybook/react-vite";
import Radio from "./Radio";
import Flex from "../Flex";
import { useState } from "react";

const meta: Meta<typeof Radio> = {
  title: "Atoms/Radio",
  component: Radio,
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
    label: "라디오 버튼",
  },
  argTypes: {
    label: {
      control: "text",
      description: "라디오 버튼 라벨",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    groupName: {
      description: "라디오가 2개 이상 들어갈 땐 groupName 필수 설정",
    },
    checked: {
      control: "boolean",
      description: "선택 상태",
      table: {
        type: { summary: "boolean" },
      },
    },
    defaultChecked: {
      control: "boolean",
      description: "기본 선택 상태",
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
  },
};

export default meta;

export const Default = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState<string>();
    const radios = ["first", "second"];

    return (
      <Flex $align="start" $direction="column" $gap={{ row: 16 }}>
        <Flex $gap={{ column: 24 }}>
          {radios.map((i) => {
            return (
              <Radio
                id={i}
                defaultChecked={i === "first"}
                label={i}
                value={i}
                groupName="my-radio-group"
                onClick={() => setSelectedValue(i)}
              />
            );
          })}
        </Flex>

        <span>선택됨: {selectedValue}</span>
      </Flex>
    );
  },
};
