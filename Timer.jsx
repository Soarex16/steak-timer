import React, {useEffect, useState} from 'react';

import {View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
import RoundedButton from './components/RoundedButton';

// вспомогательная функция для форматирования оставшегося времени
function formatTime(t) {
    const minutes = Math.trunc(t / 60);
    const seconds = t % 60;

    const minutesStr = minutes.toString().padStart(2, '0');
    const secondsStr = seconds.toString().padStart(2, '0');

    return `${minutesStr}:${secondsStr}`;
}

export default function Timer({ timerDuration }) {
    const [seconds, setSeconds] = useState(0);

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
        setSeconds(timerDuration);
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
        setSeconds(timerDuration);
        setTimerTicking(false);
        setStopped(false);
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.elapsedTime}>
                    {formatTime(timerTicking || stopped ? seconds : timerDuration)}
                </Text>
            </View>

            <View style={styles.buttonsContainer}>
                {timerTicking ? (
                    <RoundedButton
                        title="Stop"
                        onPress={handleStop}
                    />
                ) : stopped ? (
                    <>
                        {!finished && (
                            <RoundedButton
                                title="Resume"
                                onPress={handleStart}
                            />
                        )}

                        <RoundedButton
                            title="Reset"
                            onPress={handleReset}
                        />
                    </>
                ) : (
                    <RoundedButton
                        title="Start"
                        onPress={handleStart}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 30
    },
    elapsedTime: {
        fontSize: 80,
        fontWeight: 'bold',
        color: '#f3e8d4',
        textAlign: 'center',
        padding: 30
    },
    buttonsContainer: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});
