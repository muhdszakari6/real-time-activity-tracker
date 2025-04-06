import { IActivity, Action, IActivityItem } from "@/model/activity.model";
import { PropsWithChildren, useReducer } from "react";
import { ActivityDispatchContext } from "./activityDispatchContext";
import { ActivityStateContext } from "./activityStateContext";

const initialState: IActivity = { activities: [], filteredActivities: [] };

function reducer(state: IActivity, action: Action): IActivity {
  switch (action.type) {
    case "add_activity": {
      return {
        ...state,
        activities: [action.payload as IActivityItem, ...state.activities],
      };
    }
    case "search_activity": {
      return {
        ...state,
        filteredActivities: filterActivities(
          state.activities,
          action.payload as string
        ),
      };
    }
    default:
      return state;
  }
}

export function ActivityContextProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ActivityStateContext.Provider value={state}>
      <ActivityDispatchContext.Provider value={dispatch}>
        {children}
      </ActivityDispatchContext.Provider>
    </ActivityStateContext.Provider>
  );
}

function filterActivities(
  activities: IActivityItem[],
  q: string
): IActivityItem[] {
  return activities.filter(
    (item) => item.content.toLowerCase().match(q)?.length
  );
}
