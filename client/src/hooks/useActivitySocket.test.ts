const callbackMap = new Map()
jest.mock('socket.io-client', () => ({
    io: jest.fn().mockReturnValue({
        on: jest.fn((event, callback) => {
            callbackMap.set(event, callback)

        }),
        off: jest.fn((event) => {
            callbackMap.delete(event)
        }),
        emit: jest.fn((event, item?) => {
            if (event == 'message') {
                return callbackMap.get(event)(JSON.stringify(item))
            }
            callbackMap.get(event)()
        }),
        disconnect: jest.fn(),
        connect: jest.fn(),
    }),
}));

jest.mock('@/lib/constants.ts', () => ({
    SOCKET_URL: "ws:localhost:4000"
}))

const mockDispatch = jest.fn();

jest.mock('@/context/activityDispatchContext', () => ({
    useActivityDispatch: () => mockDispatch
}));

import { renderHook, act } from "@testing-library/react";
import { useActivitySocket } from "./useActivitySocket";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { mockActivities } from "./data";
import { useActivityDispatch } from "@/context/activityDispatchContext";


describe('useActivitySocket test', () => {
    const socket: Socket<DefaultEventsMap, DefaultEventsMap> = io();

    it('should call socket.connect when hook is rendered', async () => {
        renderHook(() => useActivitySocket())
        expect(socket.connect).toHaveBeenCalled()
    });

    it('should set isConnected to true when on connect event', async () => {
        const { result } = renderHook(() => useActivitySocket())
        await act(async () => socket.emit("connect"))
        expect(result.current.isConnected).toBe(true)
    });

    it('should set isConnected to false on disconnect event', async () => {
        const { result } = renderHook(() => useActivitySocket())
        await act(() => socket.emit("connect"))
        await act(() => socket.emit("disconnect"))
        expect(result.current.isConnected).toBe(false)
    });

    it('should call dispatch on message event', async () => {
        const dispatch = useActivityDispatch();
        renderHook(() => useActivitySocket())
        act(() => socket.emit("message", mockActivities[0]))
        expect(dispatch).toHaveBeenCalled()
    });

    it('should call dispatch with the correct parameters on message event', async () => {
        const dispatch = useActivityDispatch();
        renderHook(() => useActivitySocket())
        act(() => socket.emit("message", mockActivities[0]))
        expect(dispatch).toHaveBeenCalledWith(
            {
                type: "add_activity",
                payload: mockActivities[0],
            }
        )
    });

});

