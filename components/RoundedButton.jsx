import React from 'react';

import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function RoundedButton({ title, onPress }) {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
        >
            <Text style={styles.buttonText}>{title.toUpperCase()}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        maxWidth: '40%',
        height: 45,
        borderRadius: 20,
        backgroundColor: '#c92b3a',
        padding: 10,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#f8e6d2',
        textAlign: 'center',
    }
});
