import React, {useState} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import Constants from 'expo-constants';

import {degreesOfRoast} from './degreesOfRoast';
import Title from './components/Title';
import DegreesOfRoast from './components/DegreesOfRoast';
import DegreeOfRoastDetails from './components/DegreeOfRoastDetails';
import Timer from './components/Timer';

export default function App() {
    const [currentDegree, setCurrentDegree] = useState(degreesOfRoast[0]);

    const [isTimerTicking, setIsTimerTicking] = useState(false);

    const handleTimerStart = () => setIsTimerTicking(true);
    const handleTimerReset = () => setIsTimerTicking(false);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent/>

            <Title />

            <DegreesOfRoast
                onCurrentDegreeChange={(d) => setCurrentDegree(d)}
                disabled={isTimerTicking}
            />

            <DegreeOfRoastDetails degree={currentDegree}/>

            <View style={styles.mainArea}>
                <Timer
                    timerDuration={currentDegree.time}
                    onStart={handleTimerStart}
                    onReset={handleTimerReset}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#20232a',
        flex: 1,
    },
    mainArea: {
        padding: 8,
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'flex-end'
    }
});
