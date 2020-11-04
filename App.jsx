import React, {useState} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import Constants from 'expo-constants';

import {degreesOfRoast} from './degreesOfRoast';
import Title from './components/Title';
import DegreesOfRoast from './components/DegreesOfRoast';
import DegreeOfRoastDetails from './components/DegreeOfRoastDetails';
import Timer from './Timer';

export default function App() {
    const [currentDegree, setCurrentDegree] = useState(degreesOfRoast[0]);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent/>

            <Title />

            <View style={styles.degreeOfRoastContainer}>
                <DegreesOfRoast
                    onCurrentDegreeChange={(d) => setCurrentDegree(d)}
                />

                <DegreeOfRoastDetails degree={currentDegree}/>
            </View>

            <View style={styles.mainArea}>
                <Timer timerDuration={currentDegree.time}/>
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
    degreeOfRoastContainer: {
        flex: 1.5
    },
    mainArea: {
        padding: 8,
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'flex-end'
    }
});
