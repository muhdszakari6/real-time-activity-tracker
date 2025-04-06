import { renderHook } from "@testing-library/react";
import { act, PropsWithChildren } from "react";
import { useActivityDispatch } from "./activityDispatchContext";
import { useActivityState } from "./activityStateContext";
import { ActivityContextProvider } from "./activityContext";
import { mockActivities } from "@/hooks/data";
describe("Activity context", () => {
  it("should update state when dispatch is called", () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <ActivityContextProvider>{children} </ActivityContextProvider>
    );

    const { result } = renderHook(
      () => {
        const state = useActivityState();
        const dispatch = useActivityDispatch();
        return { state, dispatch };
      },
      { wrapper }
    );

    act(() => {
      result.current.dispatch({
        type: "add_activity",
        payload: { content: "Hello", date: new Date() },
      });
    });

    expect(result.current.state.activities.length).toBe(1);
  });

  it("should update filteredActivities when search_activity is dispatched", async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <ActivityContextProvider>{children} </ActivityContextProvider>
    );

    const { result } = renderHook(
      () => {
        const state = useActivityState();
        const dispatch = useActivityDispatch();
        return { state, dispatch };
      },
      { wrapper }
    );

    await act(() => {
      mockActivities.forEach((item) => {
        result.current.dispatch({
          type: "add_activity",
          payload: item,
        });
      });
    });

    act(() => {
      result.current.dispatch({
        type: "search_activity",
        payload: "new",
      });
    });

    expect(result.current.state.filteredActivities.length).toBe(2);
  });
});
