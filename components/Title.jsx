import React from 'react';

import {StyleSheet, Text, View} from 'react-native';

export default function Title() {
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Steak timer</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        padding: 20,
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    }
});
