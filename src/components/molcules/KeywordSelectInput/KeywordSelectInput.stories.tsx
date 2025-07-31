import type { Meta, StoryObj } from "@storybook/react-vite";
import KeywordSelectInput from "./KeywordSelectInput";
import { useState } from "react";

const meta: Meta<typeof KeywordSelectInput> = {
  title: "Molecules/KeywordSelectInput",
  component: KeywordSelectInput,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px", padding: "20px" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  args: {},
  argTypes: {
    rules: {
      table: {
        type: {
          summary:
            "{maxInputLength?: number, maxCount?: number, regex?: 'email'}",
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [keywords, setKeywords] = useState<string[]>([]);

    return (
      <KeywordSelectInput
        hintText="설명하는 텍스트"
        onChange={(value) => setKeywords(value)}
        rules={{ maxCount: 3, maxInputLength: 5 }}
      />
    );
  },
};
