import React, { useState, useEffect, useRef, useCallback } from 'react';

const useWebsocket = (appName) => {
    const webSocket = useRef();
    const [msg, setMsg] = useState();

    useEffect(() => {
        webSocket.current = new WebSocket(`ws://${appName}`);
        webSocket.current.onopen = () => {
            console.log('Connect WebSocket!');
        };

        webSocket.current.onmessage = (event) => {
            // console.log(event);
            const data = event?.data;
            setMsg(data);
        };

        webSocket.current.onclose = (error) => {
            console.log(error);
        };

        webSocket.current.onerror = (error) => {
            console.log(error);
        };

        return () => {
            webSocket.current?.close();
        };
    }, []);

    const send = useCallback(
        (message) => {
            if (webSocket.current && webSocket.current.readyState === WebSocket.OPEN) {
                webSocket.current.send(message);
            }
        },
        [webSocket]
    );

    return { send, msg };
};
export default useWebsocket;
