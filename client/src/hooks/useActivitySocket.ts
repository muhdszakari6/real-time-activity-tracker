import { useActivityDispatch } from "@/context/activityDispatchContext";
import { mockActivities } from "@/hooks/data";
import { IActivityItem } from "@/model/activity.model";
import { socket } from "@/socket";
import { useState, useEffect, useCallback } from "react";

export const useActivitySocket = () => {
    const dispatch = useActivityDispatch();
    const [isConnected, setIsConnected] = useState(socket.connected);

    const sendMessage = useCallback((item: IActivityItem) => {
        socket.emit("message", item);
    }, [])

    useEffect(() => {
        socket.connect();
        const onConnect = () => {
            setIsConnected(true);
            //send initial messages
            mockActivities.forEach((item) => {
                sendMessage(item)
            });
        };

        const onDisconnect = () => {
            setIsConnected(false);
        };

        const onMessage = (content: string) => {
            dispatch({
                type: "add_activity",
                payload: JSON.parse(content),
            });
        };

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("message", onMessage);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("message", onMessage);
            socket.disconnect();
        };
    }, [dispatch, sendMessage]);

    return {
        isConnected,
        sendMessage
    }
}