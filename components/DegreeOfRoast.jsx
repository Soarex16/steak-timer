import React from 'react';
import {Button} from 'react-native';

export default function DegreeOfRoast({ degree, onDegreeSelect }) {
    return (
        <Button
            color={degree.color}
            title={degree.label}
            onPress={onDegreeSelect}
        />
    )
}
