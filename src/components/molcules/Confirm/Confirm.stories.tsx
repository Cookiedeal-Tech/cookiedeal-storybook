import type { Meta, StoryObj } from "@storybook/react-vite";
import Confirm from "./Confirm";

const meta: Meta<typeof Confirm> = {
  title: "Molecules/Confirm",
  component: Confirm,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%", padding: "20px" }}>
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
  args: {},
};
