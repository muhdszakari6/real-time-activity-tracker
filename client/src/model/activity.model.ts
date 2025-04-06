import { Dispatch } from "react";

export interface IActivityItem {
    id: number;
    content: string;
    date: string;
}

export interface IActivity {
    activities: IActivityItem[];
    filteredActivities: IActivityItem[];
}

export type Action<T = unknown> = { type: string; payload: T };

export interface IActivityContext {
    state: IActivity;
    dispatch: Dispatch<Action>;
}