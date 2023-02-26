import React, { useContext, useEffect, useState } from 'react'
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { vh, vw } from 'react-native-expo-viewport-units';
import { AuthContext } from '../context/AuthContext';

export default function CustomDrawer(props) {
    const { logOut, user: { name_bn, institute_name_bn, ward_number } } = useContext(AuthContext);

    const [totalGetQuota, setTotalGetQuota] = useState(0);
    const [totalUsedQuota, setTotalUsedQuota] = useState(0);


    const handleQuotaInfo = async () => {
        try {
            const { data } = await axios.get("https://bdfast.app/api/v1/paper/less/quota", {
                headers: {
                    Authorization: `Bearer ${user?.token}`
                }
            })

            if (data.success) {
                setTotalGetQuota(data?.quota);
                setTotalUsedQuota(data?.fill);
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        handleQuotaInfo();
    }, [])

    return (
        <DrawerContentScrollView  {...props}>
            <View
                style={{
                    backgroundColor: '#00E0C1',
                    height: 180,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Text style={{ fontSize: 20, color: "#fff", fontFamily: "SolaimanLipi_Bold" }}>{name_bn}</Text>
                <Text style={{ fontSize: 16, color: "#fff", fontFamily: "SolaimanLipi_Bold" }}>{institute_name_bn}</Text>
                <Text style={{ fontSize: 16, color: "#fff", fontFamily: "SolaimanLipi_Bold" }}>ওয়ার্ড-{ward_number}</Text>

            </View>
            <DrawerItemList {...props} />
            <View style={{ height: vh(50), flexDirection: "row", justifyContent: "center", alignItems: "flex-end" }}>

                <TouchableOpacity onPress={logOut} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "#00E0C1", width: 250, borderRadius: 10, position: "absolute", height: 40 }}>

                    <Text style={{ fontFamily: "SolaimanLipi_Bold", color: "#fff", fontSize: 18, marginRight: 10 }}>Logout</Text>
                    <Icon name='power' size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    )
}