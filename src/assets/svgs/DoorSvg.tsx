import * as React from "react";
import { SVGProps, memo } from "react";

const DoorSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <title>{"door-open"}</title>
    <path d="M30 29.25h-1.25V4a.75.75 0 0 0-.75-.75h-6a.75.75 0 0 0 0 1.5h5.25V30c0 .414.336.75.75.75h2a.75.75 0 0 0 0-1.5zM17.853 1.26l-11.977 2A.753.753 0 0 0 5.25 4v25.25H2a.75.75 0 0 0 0 1.5h15.977a.75.75 0 0 0 .75-.75V2a.752.752 0 0 0-.878-.739l.004-.001zM6.75 29.25V4.635l10.477-1.749V29.25zm7.229-13.95a.811.811 0 0 0-.821.161l.001-.001a.77.77 0 0 0 0 1.08.85.85 0 0 0 .539.199h.001c.1-.002.197-.016.288-.042l-.008.002a.73.73 0 0 0 .24-.159.77.77 0 0 0 0-1.08.7.7 0 0 0-.236-.158l-.005-.002z" />
  </svg>
);

const Memo = memo(DoorSvg);
export default Memo;
