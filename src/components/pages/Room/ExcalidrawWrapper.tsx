"use client";

import React from "react";
import dynamic from "next/dynamic";
const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  }
);
import { useSearchParams } from "next/navigation";
import {
  pointerButtonType,
  pointerPointerType,
  pointerStateEnm,
} from "../../../../common/types/global";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import * as ExcalidrawTypes from "@excalidraw/excalidraw/types/types";
import { useAppSelector } from "@/lib/hooks";
import {
  ExcalidrawCustomDTO,
  selectExcalidrawElements,
} from "@/lib/modules/excalidrawSlice";
import cloneDeep from "lodash/cloneDeep";
import { useExcalidraw } from "@/hooks/useExcalidraw";
import { useSocket } from "@/hooks/useSocket";
import {
  LiveCollaborationTrigger,
  MainMenu,
  WelcomeScreen,
} from "@excalidraw/excalidraw";
import UserPointers from "./UserPointers";
import { selectUsersConnectedSlice } from "@/lib/modules/usersConnectedSlice";

export default function ExcalidrawWrapper({
  params,
}: {
  params: { roomId: string };
}) {
  const { roomId } = params;
  const totalStore = useAppSelector(selectExcalidrawElements);
  const getUserId = useSearchParams().get("userId") || "";
  const { socketAPI, onSocket, setOnSocket } = useSocket({
    room_Name: roomId,
    getUser: getUserId,
  });
  const StoreElsLeng = totalStore.length || 0;
  const usersConnected = useAppSelector(selectUsersConnectedSlice);
  const {
    excalidrawRef,
    handleChangePointerState,
    handleStreaming_pointer,
    handleStreaming_addEl,
    handleStreaming_MoveEls,
    handle_OtherReset,
    handleChange_StrokeColorEls,
  } = useExcalidraw(getUserId, roomId, socketAPI);

  const collaborators = new Map(
    usersConnected.map((user) => [user.socketId, { username: user.userName }])
  );
  excalidrawRef.current?.updateScene({ collaborators });

  const onExcalidrawAPI = (api: ExcalidrawTypes.ExcalidrawImperativeAPI) =>
    (excalidrawRef.current = api);

  const onPointerUpdate = ({
    pointer,
    button,
  }: {
    pointer: pointerPointerType;
    button: pointerButtonType;
  }) => {
    handleChangePointerState(button);
    handleStreaming_pointer(pointer);
  };

  const onChange = (
    excalidrawElements: readonly ExcalidrawElement[],
    appState: ExcalidrawTypes.AppState
  ) => {
    const activeEls = excalidrawElements.filter(({ isDeleted }) => !isDeleted);
    const activeElsLeng = activeEls.length || 0;

    if (
      appState.cursorButton === pointerStateEnm.DOWN &&
      Boolean(activeElsLeng)
    ) {
      // 01 streaming_Add
      if (StoreElsLeng < activeElsLeng) {
        const streaming_element = cloneDeep({
          ...excalidrawElements.at(-1),
          writerId: getUserId,
        }) as ExcalidrawCustomDTO;
        handleStreaming_addEl({ data: streaming_element });
      }

      // 02 streaming_Move
      if (StoreElsLeng === activeElsLeng) {
        const moveEls = activeEls.filter(
          ({ x, y, angle, height, width }, idx) =>
            totalStore[idx].x != x ||
            totalStore[idx].y != y ||
            totalStore[idx].angle != angle ||
            totalStore[idx].height != height ||
            totalStore[idx].width != width
        ) as ExcalidrawCustomDTO[];

        const findOwsEls = moveEls.filter(
          ({ writerId }) => writerId === getUserId
        );
        const findOtherEls = moveEls
          .filter(({ writerId }) => writerId != getUserId)
          .map(({ id }) => id);
        const isFindOwsEls = Boolean(findOwsEls.length);
        const isfindOtherEls = Boolean(findOtherEls.length);

        if (isFindOwsEls) {
          handleStreaming_MoveEls({ data: findOwsEls });
        }
        if (isfindOtherEls) {
          const originOtherEls = totalStore.filter(({ id }: { id: string }) =>
            findOtherEls.includes(id)
          );
          handle_OtherReset(originOtherEls);
        }
      }
    }

    // 03 changeColorEls
    if (
      appState.cursorButton === pointerStateEnm.UP &&
      Boolean(activeElsLeng)
    ) {
      if (StoreElsLeng === activeElsLeng) {
        const upDateEls = activeEls.map((el, idx) => {
          return { ...el, writerId: totalStore[idx].writerId };
        });
        const changeColorEls = upDateEls.filter(
          ({ strokeColor }, idx) => totalStore[idx].strokeColor != strokeColor
        );
        const findOwsEls = changeColorEls.filter(
          ({ writerId }) => writerId === getUserId
        );
        const isFindOwsEls = Boolean(findOwsEls.length);
        if (isFindOwsEls) {
          handleChange_StrokeColorEls({ data: findOwsEls });
        }
      }
    }

    // 04 reset
    // if (
    //   appState.cursorButton === pointerStateEnm.UP &&
    //   !Boolean(activeElsLeng) &&
    //   Boolean(StoreElsLeng)
    // ) {
    //   handle_Reset();
    // }
  };

  return (
    <>
      {/* <UserPointers /> */}
      <Excalidraw
        initialData={null}
        excalidrawAPI={onExcalidrawAPI}
        onChange={onChange}
        onPointerUpdate={onPointerUpdate}
        isCollaborating={onSocket}
        gridModeEnabled={true}
        UIOptions={{
          tools: {
            image: false,
          },
        }}
        renderTopRightUI={() => (
          <LiveCollaborationTrigger
            isCollaborating={onSocket}
            onSelect={() => null}
          />
        )}
      >
        <MainMenu>
          <MainMenu.Item
            onSelect={() => setOnSocket((prevState) => !prevState)}
          >
            {onSocket
              ? "Stop collaboration board"
              : "Start collaboration board"}
          </MainMenu.Item>
        </MainMenu>
        <WelcomeScreen>
          <WelcomeScreen.Hints.MenuHint>
            <h1 style={{ fontSize: 28, width: "fit" }}>
              Start collaboration here
            </h1>
          </WelcomeScreen.Hints.MenuHint>
        </WelcomeScreen>
      </Excalidraw>
    </>
  );
}
