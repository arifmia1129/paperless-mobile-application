import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import { vh, vw } from 'react-native-expo-viewport-units';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OfflineApplication from '../../components/OfflineApplications/OfflineApplication';
import { AuthContext } from '../../context/AuthContext';

export default function Reports() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ backgroundColor: "#fff", height: vh(100) }}>
            <View style={{ flexDirection: 'row', justifyContent: "space-between", backgroundColor: "#00E0C1", width: vw(100), height: 60, alignItems: "center", paddingHorizontal: 15, paddingTop: 10, borderBottomEndRadius: 10, borderBottomStartRadius: 10 }}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Ionicons name='menu' size={25} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name='person' size={25} color="#fff" />
                </TouchableOpacity>

            </View>
            <View >
                {
                    applications.length ?
                        <Text style={{ color: "#00E0C1", fontFamily: "SolaimanLipi_Bold", textAlign: "center", fontSize: 20, marginTop: 10 }}>অফলাইনে সংরক্ষিত আবেদন সমূহ:</Text>
                        :
                        null
                }

                {
                    applications.length ?
                        <View style={{ padding: 10, marginBottom: vh(20) }}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {
                                    applications?.map(application => <OfflineApplication handleDeleteApplication={handleDeleteApplication} application={application} key={application.id} />)
                                }
                            </ScrollView>
                        </View> :
                        <View style={{ height: vh(60), flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                            <View>
                                <Text style={{ color: "red", fontFamily: "SolaimanLipi_Bold", textAlign: "center", fontSize: 18, marginTop: 10 }}>অফলাইনে কোন সংরক্ষিত আবেদন নেই।</Text>
                                <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
                                    <TouchableOpacity onPress={() => navigation.navigate("AddCitizen")} style={{ backgroundColor: "#00E0C1", width: vw(40), paddingHorizontal: 5, borderRadius: 5, paddingVertical: 10, flexDirection: "row", alignItems: "center", justifyContent: "center", marginHorizontal: 5 }}>
                                        <Text style={{ color: "#fff", fontFamily: "SolaimanLipi_Bold", textAlign: "center", fontSize: 14, marginRight: 4 }}>আবেদন</Text>
                                        <Ionicons name='newspaper' size={25} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                }
            </View>
        </SafeAreaView>
    )
}