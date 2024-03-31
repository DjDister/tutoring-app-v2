import { combineReducers, configureStore } from "@reduxjs/toolkit";
import excalidrawSlice from "./modules/excalidrawSlice";
import excalidrawMovedSlice from "./modules/excalidrawMovedSlice";
import excalidrawPointersSlice from "./modules/excalidrawPointersSlice";
import usersConnectedSlice from "./modules/usersConnectedSlice";
import actionQueueMiddleware from "./middleware/actionQueueMiddleware";

const rootReducer = combineReducers({
  excalidrawSlice,
  excalidrawMovedSlice,
  excalidrawPointersSlice,
  usersConnectedSlice,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(actionQueueMiddleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore["dispatch"];
