import {useEffect, useState} from 'react';

export default function useTimer(duration) {
    const [ticking, setTicking] = useState(false);
    const [seconds, setSeconds] = useState(duration);

    // запускаем таймер
    useEffect(() => {
        let timerId = null;

        if (ticking) {
            timerId = setInterval(() => setSeconds(s => s - 1), 1000);
        }

        return () => timerId && clearInterval(timerId);
    }, [ticking]);

    // эффект реагирует на изменение переменной seconds и, если время истекло, останавливает таймер
    useEffect(() => {
        if (seconds === 0) {
            setTicking(false);
        }
    }, [seconds]);

    const start = () => setTicking(true);

    const stop = () => setTicking(false);

    const reset = () => {
        setTicking(false);
        setSeconds(duration);
    };

    return {
        seconds,
        ticking,
        start,
        stop,
        reset
    };
}
