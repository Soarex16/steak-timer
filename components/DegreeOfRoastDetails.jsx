import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function DegreeOfRoastDetails({ degree }) {
    return (
        <View>
            <Text style={StyleSheet.compose(styles.degreeDetailsEntry, styles.temperature)}>
                {degree.temperature}°C
            </Text>

            <Text style={StyleSheet.compose(styles.degreeDetailsEntry, styles.selectedDegree)}>
                {degree.label.toUpperCase()}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    degreeDetailsEntry: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    selectedDegree: {
        color: 'white'
    },
    temperature: {
        color: '#464a56',
    }
});
