import React, {useEffect, useState} from 'react';

import {View, Text, StyleSheet} from 'react-native';
import RoundedButton from './RoundedButton';
import useTimer from '../use-timer';

// вспомогательная функция для форматирования оставшегося времени
function formatTime(t) {
    const minutes = Math.trunc(t / 60);
    const seconds = t % 60;

    const minutesStr = minutes.toString().padStart(2, '0');
    const secondsStr = seconds.toString().padStart(2, '0');

    return `${minutesStr}:${secondsStr}`;
}

export default function Timer({ timerDuration, onStart, onReset }) {
    // используем наш кастомный хук
    const {
        seconds, ticking,
        start, stop, reset
    } = useTimer(timerDuration);

    // запускаем таймер при нажатии на кнопку
    const handleStart = () => {
        start();
        onStart();
    };

    const handleStop = () => {
        stop();
    };

    const handleReset = () => {
        reset();
        onReset();
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.elapsedTime}>
                    {formatTime(ticking || seconds !== timerDuration ? seconds : timerDuration)}
                </Text>
            </View>

            <View style={styles.buttonsContainer}>
                {ticking ? (
                    <RoundedButton
                        title="Stop"
                        onPress={handleStop}
                    />
                ) : seconds === timerDuration ? (
                    <RoundedButton
                        title="Start"
                        onPress={handleStart}
                    />
                ) : (
                    <>
                        {!ticking && (
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
