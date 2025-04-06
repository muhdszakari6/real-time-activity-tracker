import debounce from "lodash.debounce";
import { useActivityDispatch } from "@/context/activityDispatchContext";
import { useActivityState } from "@/context/activityStateContext";
import { useState } from "react";
import ErrorMessage from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useActivitySocket } from "@/hooks/useActivitySocket";

const ActivityTracker = () => {
  const [search, setSearch] = useState("");
  const [activity, setActivity] = useState("");
  const state = useActivityState();
  const dispatch = useActivityDispatch();
  const { isConnected, sendMessage } = useActivitySocket();

  const debounceSearch = debounce((e) => {
    setSearch(e.target.value);
    dispatch({ type: "search_activity", payload: e.target.value });
  }, 300);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceSearch(e);
  };

  const addActiviity = () => {
    if (activity == "") return;
    const item = {
      id: state.activities.length + 1,
      date: new Date().toDateString(),
      content: activity,
    };
    sendMessage(item);
    setActivity("");
  };

  const activities =
    search === "" ? state.activities : state.filteredActivities;

  return (
    <section className="px-10 py-10 min-h-screen max-w-[800px] m-auto pb-[200px]">
      {!isConnected && <ErrorMessage />}
      <h1 className="text-xl mb-4">Activities</h1>
      <Input onChange={handleSearch} placeholder="Search" className="mb-4" />
      {activities.map((item) => (
        <div
          key={item.id}
          className="pb-4 ps-4 border-l border-gray-300 relative"
        >
          <span className="h-2 w-2 bg-green-400 rounded-full absolute top-0 left-[-5px]"></span>
          <div className="shadow p-3 text-sm rounded-xl">
            {item.content}
            <p className="text-xs text-gray-500 mt-2">{item.date}</p>
          </div>
        </div>
      ))}
      {activities.length === 0 && (
        <span className="text-xl">No activities found</span>
      )}
      <div className="bg-white fixed bottom-16 left-0 right-0 max-w-[800px] m-auto">
        <Textarea
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          className="mt-4"
        />
        <Button className="w-full my-2" onClick={addActiviity}>
          Add Activity
        </Button>
      </div>
    </section>
  );
};
export default ActivityTracker;
