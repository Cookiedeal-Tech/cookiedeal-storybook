import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Modal from "./Modal";
import Flex from "@/components/atoms/Flex";
import Button from "@/components/atoms/Button";

const meta: Meta<typeof Modal> = {
  title: "Molecules/Modal",
  component: Modal,
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
  argTypes: {
    $size: {
      description: "모달의 가로너비",
      control: "select",
      options: [560, 480, 400],
    },
    $isCloseable: {
      description: "모달 외부 클릭 시 닫히는 여부",
    },
    $showCloseButton: {
      description: "상단바에 X 버튼 렌더링 여부",
    },
    $isMobileBottomSheet: {
      description: "(모바일 only) 하단에서부터 올라오는 형태의 모달입니다.",
    },
    $isMobileFullWidth: {
      description: "(모바일 only) 너비를 100%로 채우는 모달입니다.",
    },
    $isMobileFullHeight: {
      description: "(모바일 only) 높이를 100%로 채우는 모달입니다.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Flex>
        <Button onClick={() => setIsOpen(true)}>click me</Button>
        {isOpen && (
          <Modal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            $title="I'm a modal"
            $showCloseButton={true}
            $footer={
              <Button
                onClick={() => setIsOpen(false)}
                $variant="outlineSecondary"
                $isFull
              >
                확인
              </Button>
            }
          >
            모달입니다.
          </Modal>
        )}
      </Flex>
    );
  },
};
