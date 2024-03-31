import { Middleware } from "redux";
import { AppDispatch, RootState } from "../store";
import { UnknownAction } from "@reduxjs/toolkit";

const actionQueueMiddleware: Middleware<{}, RootState> =
  (storeApi) => (next) => (action) => {
    let actionQueue: ReturnType<AppDispatch>[] = [];
    actionQueue.push(action as UnknownAction);

    if (actionQueue.length > 0) {
      const nextAction = actionQueue.shift();
      if (nextAction) {
        next(nextAction);
      }
    }

    return next(action);
  };

export default actionQueueMiddleware;
