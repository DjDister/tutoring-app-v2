import type { RootState } from "@/lib/store";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";

export type ExcalidrawCustomDTO = ExcalidrawElement & {
  writerId: string | null;
};

const initialState: ExcalidrawCustomDTO[] | [] = [];

export const excalidrawSlice = createSlice({
  name: "excalidrawSlice",
  initialState,
  reducers: {
    setStreamEl: (state, { payload }: PayloadAction<ExcalidrawCustomDTO>) => {
      console.log("setStreamEl");
      const streamArr: ExcalidrawElement = state.find(
        ({ id }) => id === payload.id
      ) as ExcalidrawCustomDTO;
      return Boolean(streamArr)
        ? state.map((el) => {
            if (el.id === streamArr.id) {
              return payload;
            }
            return el;
          })
        : [...state, payload];
    },
    setAddEl: (state, { payload }: PayloadAction<ExcalidrawCustomDTO>) => {
      console.log("setAddEl");
      return [...state, payload];
    },
    setAddOtherEl: (state, { payload }: PayloadAction<ExcalidrawCustomDTO>) => {
      console.log("setAddOtherEl");
      const streamArr: ExcalidrawElement = state.find(
        ({ id }) => id === payload.id
      ) as ExcalidrawCustomDTO;
      return state.map((el) => {
        if (el.id === streamArr.id) {
          return payload;
        }
        return el;
      });
    },
    setChange_Els: (
      state,
      { payload }: PayloadAction<ExcalidrawCustomDTO[]>
    ) => {
      console.log("setStreamEls");
      const findIds = payload.map(({ id }) => id);
      return state.map((el) => {
        if (findIds.includes(el.id)) {
          const findEl = payload.find(
            ({ id }) => id === el.id
          ) as ExcalidrawCustomDTO;
          return { ...findEl };
        }
        return el;
      });
    },

    setRemove_Els: (state, { payload }: PayloadAction<string[]>) => {
      console.log("setRemove_Els");
      const activeEls = [...state.filter(({ id }) => !payload.includes(id))];
      return activeEls;
    },

    setRecoverOther_Els: (state) => {
      console.log("setRecoverOther_Els");
      return [...state];
    },
  },
});

export const {
  setStreamEl,
  setAddOtherEl,
  setAddEl,
  setChange_Els,
  setRecoverOther_Els,
  setRemove_Els,
} = excalidrawSlice.actions;
export const selectExcalidrawElements = (state: RootState) =>
  state.excalidrawSlice;
export default excalidrawSlice.reducer;
