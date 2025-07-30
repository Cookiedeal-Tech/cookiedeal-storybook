import styled from "styled-components";
import type { Meta } from "@storybook/react-vite";
import Chip from "./Chip";
import Flex from "../Flex";
import { useState } from "react";

const meta: Meta<typeof Chip> = {
  title: "Atoms/Chip",
  component: Chip,
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
  // args: {
  //   children: "Chip 컴포넌트",
  //   checked: false,
  // },
  argTypes: {
    checked: {
      control: "boolean",
      description: "선택 상태",
      table: {
        type: { summary: "boolean" },
      },
    },
    children: {
      control: "text",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    onClick: {
      control: "boolean",
      description: "클릭 이벤트 핸들러",
      table: {
        type: { summary: "() => void" },
      },
    },
    style: {
      control: "object",
      description: "추가 스타일",
      table: {
        type: { summary: "CSSProperties" },
      },
    },
  },
};

export default meta;

export const Default = {
  render: () => {
    const [selectedChips, setSelectedChips] = useState<string[]>([]);

    const chips = ["first", "second", "thired"];

    const handleChipClick = (chipText: string) => {
      setSelectedChips((prev) =>
        prev.includes(chipText)
          ? prev.filter((chip) => chip !== chipText)
          : [...prev, chipText]
      );
    };

    return (
      <Flex $align="start" $direction="column" $gap={{ row: 16 }}>
        <Container>
          {chips.map((chip) => (
            <Chip
              key={chip}
              checked={selectedChips.includes(chip)}
              onClick={() => handleChipClick(chip)}
            >
              {chip}
            </Chip>
          ))}
        </Container>
        선택됨: {selectedChips?.join(", ")}
      </Flex>
    );
  },
};

const Container = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;
