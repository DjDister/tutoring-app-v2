import * as React from "react";
import { SVGProps, memo } from "react";

interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
}

const CursorSvg = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke={props.color ?? "#000"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.26 12.4c2.117-1.137 3.176-1.707 3.443-2.392a2 2 0 0 0-.175-1.802c-.396-.62-1.544-.974-3.84-1.682L8.005 3.85c-1.938-.597-2.907-.895-3.548-.653A2 2 0 0 0 3.273 4.42c-.222.648.107 1.607.764 3.525l2.91 8.498c.81 2.36 1.214 3.54 1.858 3.914a2 2 0 0 0 1.83.094c.68-.308 1.202-1.44 2.246-3.706l.772-1.673c.166-.36.25-.541.363-.698.1-.14.22-.266.353-.376.15-.123.325-.217.674-.405l2.218-1.192Z"
    />
  </svg>
);
const Memo = memo(CursorSvg);
export default Memo;
