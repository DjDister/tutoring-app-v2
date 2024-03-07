import type { RootState } from "@/lib/store";
import { createSlice } from "@reduxjs/toolkit";
import { ConnectedUser } from "../../../common/types/global";

const initialState: ConnectedUser[] = [];

export const usersConnectedSlice = createSlice({
  name: "usersConnectedSlice",
  initialState,
  reducers: {
    addUser: (state, { payload }) => {
      return [...state, payload];
    },
    removeUser: (state, { payload }) => {
      return state.filter((user) => user.socketId !== payload);
    },
    resetUsers: () => {
      return initialState;
    },
  },
});

export const { resetUsers, addUser, removeUser } = usersConnectedSlice.actions;
export const selectUsersConnectedSlice = (state: RootState) =>
  state.usersConnectedSlice;
export default usersConnectedSlice.reducer;
