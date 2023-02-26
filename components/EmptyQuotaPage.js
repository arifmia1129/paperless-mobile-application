import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native'
import React, { useContext } from 'react'
import Icon from "react-native-vector-icons/FontAwesome";
import { vh, vw } from 'react-native-expo-viewport-units';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

export default function EmptyQuotaPage() {
    const navigation = useNavigation();

    const { totalGetQuota, totalUsedQuota, handleQuotaInfo } = useContext(AuthContext);


    return (
        <SafeAreaView style={{ backgroundColor: "#fff", marginTop: StatusBar.currentHeight, height: vh(100) }}>
            <View style={{ flexDirection: 'row', justifyContent: "space-between", backgroundColor: "#00E0C1", width: vw(100), height: 60, alignItems: "center", paddingHorizontal: 15, borderBottomEndRadius: 10, borderBottomStartRadius: 10 }}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Icon name='bars' size={25} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Icon name='user' size={30} color="#fff" />
                </TouchableOpacity>

            </View>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", height: vh(80) }}>
                <ScrollView>
                    <View>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Icon name='frown-o' size={80} color="red" />
                        </View>
                        <Text style={{ fontFamily: "SolaimanLipi_Bold", fontSize: 30, textAlign: "center", color: "red" }}>দুঃখিত!</Text>
                        <Text style={{ fontFamily: "SolaimanLipi_Bold", fontSize: 22, textAlign: "center", color: "red" }}>আপনার প্রাপ্ত কোটা শেষ</Text>
                        <Text style={{ fontFamily: "SolaimanLipi_Bold", fontSize: 20, textAlign: "center", color: "#00E0C1", marginTop: 20 }}>সর্বমোট প্রাপ্ত কোটা: {totalGetQuota}</Text>
                        <Text style={{ fontFamily: "SolaimanLipi_Bold", fontSize: 20, textAlign: "center", color: "#00E0C1" }}>সর্বমোট ব্যবহৃত কোটা: {totalUsedQuota}</Text>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <TouchableOpacity onPress={handleQuotaInfo} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "red", width: vw(40), borderRadius: 10, height: 40, marginHorizontal: 5 }}>

                                <Text style={{ fontFamily: "SolaimanLipi_Bold", color: "#fff", fontSize: 18, marginRight: 10 }}>রিফ্রেশ</Text>
                                <Icon name='refresh' size={20} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("Reports")} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "#00E0C1", width: vw(40), borderRadius: 10, height: 40, marginHorizontal: 5 }}>

                                <Text style={{ fontFamily: "SolaimanLipi_Bold", color: "#fff", fontSize: 18, marginRight: 10 }}>রিপোর্ট</Text>
                                <Icon name='book' size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}


