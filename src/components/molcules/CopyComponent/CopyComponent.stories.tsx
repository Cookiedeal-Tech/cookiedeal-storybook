import type { Meta, StoryObj } from "@storybook/react-vite";
import CopyComponent from "./CopyComponent";
import Flex from "@/components/atoms/Flex";
import Button from "@/components/atoms/Button";
import TextButton from "@/components/atoms/TextButton";
import Typo from "@/components/atoms/Typo";

const meta: Meta<typeof CopyComponent> = {
  title: "Molecules/CopyComponent",
  component: CopyComponent,
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
  argTypes: {
    as: {
      control: "select",
      options: ["button", "div", "textButton"],
      description: "렌더링할 HTML 요소 또는 컴포넌트",
    },
    children: {
      control: "text",
      description: "복사 버튼에 표시될 텍스트",
    },
    successMsg: {
      control: "text",
      description: "복사 성공 시 표시될 메시지",
    },
    errorMsg: {
      control: "text",
      description: "복사 실패 시 표시될 메시지",
    },
  },
  args: {
    children: "URL 복사",
    successMsg: "URL이 복사되었습니다.",
    errorMsg: "복사 중 오류가 발생했습니다.",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <Flex $width={600} $gap={{ column: 16 }}>
        <CopyComponent
          as={Button}
          $leftIcon="share"
          $variant="outlineSecondary"
          $isFull
        >
          Button + 왼쪽 icon
        </CopyComponent>

        <CopyComponent as={TextButton} $rightIcon="help" $isFull>
          TextButton + 오른쪽 icon
        </CopyComponent>

        <CopyComponent as={"div"} $isFull>
          <Typo $nowrap>그냥 div도 커스텀 가능</Typo>
        </CopyComponent>
      </Flex>
    );
  },
};
