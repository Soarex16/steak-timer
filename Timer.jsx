import React, {useEffect, useState} from 'react';

import {View, Text, Button, StyleSheet} from 'react-native';

// вспомогательная функция для форматирования оставшегося времени
function formatTime(t) {
    const minutes = Math.trunc(t / 60);
    const seconds = t % 60;

    const minutesStr = minutes.toString().padStart(2, '0');
    const secondsStr = seconds.toString().padStart(2, '0');

    return `${minutesStr}:${secondsStr}`;
}

// сколько секунд отсчитываем
const t = 2;

export default function Timer() {
    const [seconds, setSeconds] = useState(t);

    const [timerTicking, setTimerTicking] = useState(false);
    const [stopped, setStopped] = useState(false);
    const [finished, setFinished] = useState(false);

    // внутри эффекта запускаем таймер
    // эффект перезапускается при изменении состояния (таймер запущен/остановлен)
    // и при изменении количества секунд
    useEffect(() => {
        let timeout = null;
        if (timerTicking) {
            timeout = setTimeout(() => {
                if (seconds === 0) {
                    handleFinish();
                } else {
                    setSeconds(s => s - 1);
                }
            }, 1000);
        } else if (!timerTicking) {
            clearInterval(timeout);
        }

        // перед запуском нового эффекта мы должны очистить старый
        return () => clearInterval(timeout);
    }, [timerTicking, seconds]);

    // запускаем таймер при нажатии на кнопку
    const handleStart = () => {
        setTimerTicking(true);
    };

    const handleFinish = () => {
        // остановили таймер
        handleStop();
        // говорим, что закончили тикать
        setFinished(true);
    };

    const handleStop = () => {
        setTimerTicking(false);
        setStopped(true);
    };

    const handleReset = () => {
        setSeconds(t);
        setTimerTicking(false);
        setStopped(false);
    };

    return (
        <View style={styles.layout}>
            <Text>{formatTime(seconds)}</Text>

            {!timerTicking && stopped && (
                <Text>{finished ? 'Готово' : 'Пауза'}</Text>
            )}

            {timerTicking ? (
                <Button
                    title="Стоп"
                    onPress={handleStop}
                />
            ) : stopped ? (
                <>
                    {!finished && (
                        <Button
                            title="Продолжить"
                            onPress={handleStart}
                        />
                    )}

                    <Button
                        title="Сброс"
                        onPress={handleReset}
                    />
                </>
            ) : (
                <Button
                    title="Старт"
                    onPress={handleStart}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
   layout: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center'
   }
});
