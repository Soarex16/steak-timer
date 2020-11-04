import React from 'react';

import {View, StyleSheet} from 'react-native';

import {degreesOfRoast} from '../degreesOfRoast';
import DegreeOfRoast from './DegreeOfRoast';

export default function DegreesOfRoast({ onCurrentDegreeChange, disabled }) {
    const handleDegreeSelect = (degree) => {
        onCurrentDegreeChange(degree);
    }

    return (
        <View style={styles.container}>
            {degreesOfRoast.map(d => (
                <View style={styles.containerItem} key={d.temperature}>
                    <DegreeOfRoast
                        degree={d}
                        onDegreeSelect={() => handleDegreeSelect(d)}
                        disabled={disabled}
                    />
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    containerItem: {
        margin: 2,
        width: '48%',
    }
});
