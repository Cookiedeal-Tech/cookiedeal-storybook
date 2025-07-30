import type { SVGAttributes } from "react";
import theme, { type ColorType } from "@/styles/theme";
import { iconList } from "./iconList";

export type IconNameType = keyof typeof iconList;

export type IconProps = {
  name: IconNameType;
  size?: number; // 기준단위 px
  color?: ColorType;
  onClick?: () => void;
} & SVGAttributes<SVGElement>;

const Icon = ({
  name,
  size = 24,
  color = "iconDefaultNormal",
  onClick,
}: IconProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: `${size / 16}rem`,
        height: `${size / 16}rem`,
        cursor: onClick ? "pointer" : "default",
      }}
      {...(onClick && { onClick: onClick })}
    >
      <svg
        width={size}
        height={size}
        color={
          color
            ? Array.isArray(theme.colors[color])
              ? theme.colors[color][0]
              : theme.colors[color]
            : "currentColor"
        }
        viewBox={`0 0 24 24`}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        {iconList[name]}
      </svg>
    </div>
  );
};

export default Icon;
