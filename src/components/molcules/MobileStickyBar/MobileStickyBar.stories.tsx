import styled from "styled-components";
import type { Meta, StoryObj } from "@storybook/react-vite";
import MobileStickyBar from "./MobileStickyBar";

const meta: Meta<typeof MobileStickyBar> = {
  title: "Molecules/MobileStickyBar",
  component: MobileStickyBar,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "400px",
          height: "400px",
          padding: "20px",
          background: "#ececec",
          overflow: "auto",
        }}
      >
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
    return (
      <Container>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <MobileStickyBar $top={0}>
          <div style={{ width: "100%", color: "white", background: "tomato" }}>
            스크롤을 내려보세요
          </div>
        </MobileStickyBar>
      </Container>
    );
  },
};

const Container = styled.div`
  width: 100%;
  height: 800px;
  border: 1px solid #aaa;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  padding: 16px;
`;
