import styled from "styled-components";
import type { Meta } from "@storybook/react-vite";
import Portal from "./Portal";

const meta: Meta<typeof Portal> = {
  title: "Atoms/Portal",
  component: Portal,
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
    children: "Portal 내용",
  },
  argTypes: {
    children: {
      control: "text",
      description: "Portal 내용",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
  },
};

export default meta;

export const Default = {
  render: () => {
    return (
      <div>
        <pre
          style={{
            background: "#f5f5f5",
            padding: "8px",
            borderRadius: "4px",
            fontSize: "14px",
            lineHeight: "1.4",
            overflow: "auto",
          }}
        >
          {`
  <Portal selector="원하는 고유 명칭">
      // 포탈로 보여주고 싶은 콘텐츠(ex. 팝업)
  </Portal>

  ...

  // 포탈이 들어갈 위치(ex. body, header 등)
  <div id="원하는 고유 명칭" />


  ***
  실제 사용 예시는
  쿠키딜 앱서비스(cookiedeal-web-nextjs)에서 "desktop-navbar-popover"를 전체검색 해보세요

`}
        </pre>
      </div>
    );
  },
};
