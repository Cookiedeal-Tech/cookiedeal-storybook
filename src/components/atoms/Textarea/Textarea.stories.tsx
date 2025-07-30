import styled from "styled-components";
import type { Meta } from "@storybook/react-vite";
import Textarea from "./Textarea";
import Flex from "../Flex";
import Typo from "../Typo";

const meta: Meta<typeof Textarea> = {
  title: "Atoms/Textarea",
  component: Textarea,
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
    placeholder: "텍스트를 입력하세요",
    $isFull: true,
  },
  argTypes: {
    $label: {
      control: "object",
      description: "라벨 설정",
      table: {
        type: {
          summary:
            "{ isRequired?: boolean; text?: React.ReactNode; rightSection?: React.ReactNode }",
        },
      },
    },
    $message: {
      control: "object",
      description: "메시지 설정",
      table: {
        type: {
          summary:
            "{ type: 'error' | 'hint'; text?: string | React.ReactNode }",
        },
      },
    },
    $isFull: {
      control: "boolean",
      description: "true 설정 시 너비 100%",
      table: {
        type: { summary: "boolean" },
      },
    },
    placeholder: {
      control: "text",
      description: "플레이스홀더 텍스트",
      table: {
        type: { summary: "string" },
      },
    },
    rows: {
      control: "number",
      description: "행 수",
      table: {
        type: { summary: "number" },
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
    placeholder: "텍스트를 입력하세요",
    $isFull: true,
  },
  render: () => {
    return (
      <Grid>
        <Textarea
          placeholder="아래쪽에 힌트 텍스트가 있는 케이스"
          $message={{ type: "hint", text: "힌트 텍스트" }}
        />
        <Textarea
          placeholder="에러 상황 시 보여지는 케이스"
          $message={{ type: "error", text: "에러 텍스트" }}
        />
        <Textarea
          placeholder="라벨이 있는 케이스"
          $label={{
            isRequired: true,
            text: "라벨텍스트",
            rightSection: (
              <Typo $variant="label2Medium" $color="textDefaultWeak" $nowrap>
                글자수표시
              </Typo>
            ),
          }}
        />

        <Textarea placeholder="두줄짜리 사이즈" rows={2} />
      </Grid>
    );
  },
};

const Grid = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(2, 1fr);
`;
