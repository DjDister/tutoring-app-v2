"use client";
import React from "react";
import { selectExcalidrawPointers } from "@/lib/modules/excalidrawPointersSlice";
import { useAppSelector } from "@/lib/hooks";
import CursorSvg from "@/assets/svgs/CursorSvg";

export default function UserPointers() {
  const totalPointers = useAppSelector(selectExcalidrawPointers);

  return (
    <>
      {Boolean(totalPointers.length) &&
        totalPointers.map(({ writerId, x, y, color }) => (
          <div
            key={writerId}
            style={{
              position: "absolute",
              width: "100px",
              height: "50px",
              top: `${y + 20}px`,
              left: `${x + 20}px`,
              zIndex: 2,
            }}
          >
            <CursorSvg color={color} width={32} height={32} />
            {writerId}
          </div>
        ))}
    </>
  );
}
