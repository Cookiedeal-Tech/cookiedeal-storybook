import type { Meta, StoryObj } from "@storybook/react-vite";
import Drawer from "./Drawer";
import { useState } from "react";
import Button from "@/components/atoms/Button";
import Typo from "@/components/atoms/Typo";

const meta: Meta<typeof Drawer> = {
  title: "Molecules/Drawer",
  component: Drawer,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%", height: "300px", padding: "20px" }}>
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
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Button onClick={() => setIsOpen(true)}>click me</Button>
        {isOpen && (
          <Drawer
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            topSection={
              <Typo $variant="title1Bold" $color="textBrandNormal">
                I am TOP SECTION
              </Typo>
            }
          >
            drawer content...
          </Drawer>
        )}
      </div>
    );
  },
};
