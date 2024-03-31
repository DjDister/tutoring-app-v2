import { Middleware } from "redux";
import { AppDispatch, RootState } from "../store";

const actionQueueMiddleware: Middleware<{}, RootState> =
  (storeApi) => (next) => (action) => {
    let actionQueue: ReturnType<AppDispatch>[] = [];

    if (actionQueue.length > 0) {
      const nextAction = actionQueue.shift();
      if (nextAction) {
        next(nextAction);
      }
    }

    return next(action);
  };

export default actionQueueMiddleware;
