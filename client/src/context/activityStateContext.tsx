import { IActivity } from "@/model/activity.model";
import { createContext, useContext } from "react";

const initialState: IActivity = {
  activities: [],
  filteredActivities: [],
};

export const ActivityStateContext = createContext<IActivity>(initialState);
export const useActivityState = () => useContext(ActivityStateContext);
