import type { Meta, StoryObj } from "@storybook/react-vite";
import KoreanUnitInput from "./KoreanUnitInput";

const meta: Meta<typeof KoreanUnitInput> = {
  title: "Molecules/KoreanUnitInput",
  component: KoreanUnitInput,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "300px", padding: "20px" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  args: {},
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return <KoreanUnitInput />;
  },
};
