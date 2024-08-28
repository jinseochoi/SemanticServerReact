import { useState, useEffect } from 'react';

function getWindowSize() {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
}

export default function useWindowSize() {
    const [windowSize, setWindowSize] = useState(getWindowSize());

    const resizing = () => setWindowSize(getWindowSize);

    useEffect(() => {
        window.addEventListener('resize', resizing);
        return () => window.removeEventListener('resize', resizing);
    }, []);

    return windowSize;
}