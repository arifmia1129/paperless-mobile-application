import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, StatusBar, RefreshControl } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import { vh, vw } from 'react-native-expo-viewport-units';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import AppLoadingIndicator from '../../components/Shared/AppLoadingIndicator';
import axios from 'axios';
import Report from '../../components/Reports/Report';

export default function Reports() {
    const { user, totalGetQuota, totalUsedQuota, handleQuotaInfo } = useContext(AuthContext);
    const [reports, setReports] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const handleReports = async () => {
        setLoading(true);
        const { data } = await axios.get("https://sonod.com.bd/paper/report", {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${user?.token}`,
                "Content-type": "application/json"
            }
        })
        if (Array.isArray(data)) {
            setReports(data);
        }
        setLoading(false);
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        handleReports();
        handleQuotaInfo();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    useEffect(() => {
        handleReports();
    }, [])


    if (loading) {
        return <AppLoadingIndicator />
    }
    return (
        <SafeAreaView style={{ backgroundColor: "#fff", height: vh(100), marginTop: StatusBar.currentHeight }}>
            <View style={{ flexDirection: 'row', justifyContent: "space-between", backgroundColor: "#00E0C1", width: vw(100), height: 60, alignItems: "center", paddingHorizontal: 15, borderBottomEndRadius: 10, borderBottomStartRadius: 10 }}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Ionicons name='menu' size={25} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Ionicons name='person' size={25} color="#fff" />
                </TouchableOpacity>

            </View>
            <View >
                {
                    reports.length ?
                        <View>
                            <Text style={{ color: "#00E0C1", fontFamily: "SolaimanLipi_Bold", textAlign: "center", fontSize: 20, marginTop: 10 }}>পূর্ববর্তী অনলাইন আবেদন সমূহের রিপোর্ট:</Text>
                            <View style={{ margin: 10, flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={{ fontSize: 16, color: "#00E0C1", fontFamily: "SolaimanLipi_Bold" }}>প্রাপ্ত কোটা- {totalGetQuota}</Text>
                                <Text style={{ fontSize: 16, color: "#00E0C1", fontFamily: "SolaimanLipi_Bold" }}>ব্যবহৃত কোটা- {totalUsedQuota}</Text>
                            </View>
                        </View>
                        :
                        null
                }

                <View style={{ padding: 10, height: vh(80) }}>
                    <ScrollView refreshControl={
                        <RefreshControl colors={["#00E0C1", "red"]} refreshing={refreshing} onRefresh={onRefresh} />
                    } showsVerticalScrollIndicator={false}>
                        {
                            reports?.length ? reports?.map((report, index) => <Report report={report} key={report.id} index={index} />)
                                :
                                <View style={{ height: vh(60), flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                    <View>
                                        <Text style={{ color: "red", fontFamily: "SolaimanLipi_Bold", textAlign: "center", fontSize: 18, marginTop: 10 }}>পূর্ববর্তী কোন রিপোর্ট নেই।</Text>
                                        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
                                            <TouchableOpacity onPress={() => navigation.navigate("AddCitizen")} style={{ backgroundColor: "#00E0C1", width: vw(40), paddingHorizontal: 5, borderRadius: 5, paddingVertical: 10, flexDirection: "row", alignItems: "center", justifyContent: "center", marginHorizontal: 5 }}>
                                                <Text style={{ color: "#fff", fontFamily: "SolaimanLipi_Bold", textAlign: "center", fontSize: 14, marginRight: 4 }}>আবেদন</Text>
                                                <Ionicons name='newspaper' size={25} color="#fff" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                        }
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}