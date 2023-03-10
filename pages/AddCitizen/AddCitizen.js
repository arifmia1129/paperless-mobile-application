import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native'
import React, { useState } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import { vw } from 'react-native-expo-viewport-units';
import CitizenInfo from '../../components/AddCitizen/CitizenInfo';
import { useNavigation } from '@react-navigation/native';

export default function AddCitizen() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ backgroundColor: "#fff", marginTop: StatusBar.currentHeight }}>
            <View style={{ flexDirection: 'row', justifyContent: "space-between", backgroundColor: "#00E0C1", width: vw(100), height: 60, alignItems: "center", paddingHorizontal: 15, borderBottomEndRadius: 10, borderBottomStartRadius: 10 }}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Ionicons name='menu' size={25} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Ionicons name='person' size={25} color="#fff" />
                </TouchableOpacity>
            </View>
            <CitizenInfo />
        </SafeAreaView>
    )
}


