import { Action } from "@/model/activity.model";
import { createContext, Dispatch, useContext } from "react";

export const ActivityDispatchContext = createContext<Dispatch<Action>>(
  () => {}
);
export const useActivityDispatch = () => useContext(ActivityDispatchContext);
