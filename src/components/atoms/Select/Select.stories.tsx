import styled from "styled-components";
import type { Meta } from "@storybook/react-vite";
import Select, { type OptionType } from "./Select";
import Flex from "../Flex";
import { useState } from "react";

const meta: Meta<typeof Select> = {
  title: "Atoms/Select",
  component: Select,
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
    $label: {
      control: "object",
      description: "라벨 설정",
      table: {
        type: { summary: "{ isRequired?: boolean; text: string }" },
      },
    },
    $options: {
      control: "object",
      description: "선택 옵션들",
      table: {
        type: { summary: "OptionType[]" },
      },
    },
    $isFull: {
      control: "boolean",
      description: "true 설정 시 너비 100%",
      table: {
        type: { summary: "boolean" },
      },
    },
    $errorText: {
      control: "text",
      description: "에러 상황에서 보여줄 텍스트",
      table: {
        type: { summary: "string" },
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
    $label: { isRequired: true, text: "label..." },
    $errorText: "",
    $isFull: false,
    disabled: false,
    $options: [{ label: "감자", value: "potato" }],
  },
  render: () => {
    const [selected, setSelected] = useState<OptionType>();

    return (
      <Flex $gap={{ column: 48 }}>
        <Flex $align="start" $direction="column" $gap={{ row: 16 }}>
          <Select
            value={selected}
            onSelect={(option) => setSelected(option)}
            $width={300}
            $options={[
              { label: "감자", value: "potato" },
              { label: "옥수수", value: "corn" },
              { label: "콩", value: "bean" },
            ]}
            $label={{ isRequired: true, text: "선택해주세요" }}
          />

          <Flex $align="start" $direction="column" $gap={{ row: 8 }}>
            {!selected ? (
              <span>옵션을 선택해보세요</span>
            ) : (
              <span>
                label:{selected.label}, value:{selected.value}
              </span>
            )}
          </Flex>
        </Flex>

        <Select
          value={selected}
          onSelect={(option) => setSelected(option)}
          $width={300}
          $options={[]}
          $errorText="에러 상황에서 보여줄 텍스트"
        />
      </Flex>
    );
  },
};
