import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { LoadingIndicator } from 'react-native-expo-fancy-alerts';
export default function AppLoadingIndicator() {
    return (
        <View>
            <LoadingIndicator visible={true} />
        </View>
    )
}