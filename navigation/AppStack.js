import React, { useContext, useEffect, useState } from 'react'
import {
    createDrawerNavigator
} from '@react-navigation/drawer';
import AddCitizen from '../pages/AddCitizen/AddCitizen';
import CustomDrawer from '../utils/CustomDrawer';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Text } from 'react-native';
import OfflineApplications from '../pages/OfflineApplications/OfflineApplications';
import Reports from '../pages/Reports/Reports';
import EmptyQuotaPage from '../components/EmptyQuotaPage';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Drawer = createDrawerNavigator();

export default function AppStack() {

    const { totalGetQuota, totalUsedQuota, handleQuotaInfo } = useContext(AuthContext);

    useEffect(() => {
        handleQuotaInfo();
    }, [])

    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerActiveTintColor: "#00E0C1",
                drawerInactiveTintColor: "#333"
            }}
            useLegacyImplementation
            drawerContent={(props) => <CustomDrawer {...props} />}
        >
            <Drawer.Screen name="AddCitizen" component={(totalGetQuota > totalUsedQuota) ? AddCitizen : EmptyQuotaPage}
                options={{
                    drawerLabel: ({ color }) => (
                        <Text style={{ fontFamily: "SolaimanLipi_Bold", fontSize: 16, marginLeft: -25, color: { color } }}>নাগরিক যুক্ত করুন</Text>
                    ),
                    drawerIcon: ({ color }) => (
                        <Ionicons name='person-add' size={22} color={color} />
                    )
                }}
            />
            <Drawer.Screen name="OfflineApplications" component={OfflineApplications}
                options={{
                    drawerLabel: ({ color }) => (
                        <Text style={{ fontFamily: "SolaimanLipi_Bold", fontSize: 16, marginLeft: -25, color: { color } }}>অফলাইন আবেদন</Text>
                    ),
                    drawerIcon: ({ color }) => (
                        <Ionicons name='cloud-offline' size={22} color={color} />
                    )
                }}
            />
            <Drawer.Screen name="Reports" component={Reports}
                options={{
                    drawerLabel: ({ color }) => (
                        <Text style={{ fontFamily: "SolaimanLipi_Bold", fontSize: 16, marginLeft: -25, color: { color } }}>রিপোর্ট</Text>
                    ),
                    drawerIcon: ({ color }) => (
                        <Ionicons name='document' size={22} color={color} />
                    )
                }}
            />
        </Drawer.Navigator>

    )
}