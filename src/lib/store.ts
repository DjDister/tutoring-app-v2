import { configureStore } from "@reduxjs/toolkit";
import excalidrawSlice from "./modules/excalidrawSlice";
import excalidrawMovedSlice from "./modules/excalidrawMovedSlice";
import excalidrawPointersSlice from "./modules/excalidrawPointersSlice";
import usersConnectedSlice from "./modules/usersConnectedSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      excalidrawSlice,
      excalidrawMovedSlice,
      excalidrawPointersSlice,
      usersConnectedSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
