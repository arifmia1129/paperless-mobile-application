import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { vw } from 'react-native-expo-viewport-units';
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from 'axios';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import AppLoadingIndicator from '../Shared/AppLoadingIndicator';

export default function OfflineApplication({ application, handleDeleteApplication }) {
    const { user, logOut } = useContext(AuthContext);
    const { card_number, name_bn, father_bn, village_id, id } = application;
    const villageName = user?.village?.find(v => v.id === village_id);
    const [loading, setLoading] = useState(false);

    const { id: applicationId, ...information } = application;

    const handleSubmitOnline = async () => {
        setLoading(true);
        try {
            const { data } = await axios.post("https://bdfast.app/api/v1/paper/less/image/no", information, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${user?.token}`,
                    "Content-type": "application/json"
                }
            })

            if (!data.success) {
                setLoading(false);
                return Dialog.show({
                    type: ALERT_TYPE.DANGER,
                    title: <View><Text style={{ fontFamily: "SolaimanLipi_Bold", fontWeight: "bold", fontSize: 25 }}>Error</Text></View>,
                    textBody: <Text style={{ fontFamily: "SolaimanLipi_Bold" }}>{data?.message}</Text>
                })
            }
            setLoading(false);
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: <View><Text style={{ fontFamily: "SolaimanLipi_Bold", fontWeight: "bold", fontSize: 25 }}>Congratulation</Text></View>,
                textBody: <Text style={{ fontFamily: "SolaimanLipi_Bold" }}>Application ID: {data?.app_id}</Text>
            })
            handleDeleteApplication(id);
        } catch (error) {
            logOut()
            setLoading(false);
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: <View><Text style={{ fontFamily: "SolaimanLipi_Bold", fontWeight: "bold", fontSize: 25 }}>Error</Text></View>,
                textBody: <Text style={{ fontFamily: "SolaimanLipi_Bold" }}>{error?.message}</Text>
            })
        }
    }

    if (loading) {
        return <AppLoadingIndicator />
    }
    return (
        <View style={{ backgroundColor: "#fff", borderWidth: 2, padding: 10, borderColor: "#00E0C1", marginVertical: 5, borderRadius: 10 }}>
            <Text style={{ fontFamily: "SolaimanLipi_Bold", fontSize: 16 }}>
                নাম: {name_bn}
            </Text>
            <Text style={{ fontFamily: "SolaimanLipi_Bold", fontSize: 16 }}>
                অভিভাবকের নাম: {father_bn}
            </Text>
            <Text style={{ fontFamily: "SolaimanLipi_Bold", fontSize: 16 }}>
                জন্ম সনদ/NID নং: {card_number}
            </Text>
            <Text style={{ fontFamily: "SolaimanLipi_Bold", fontSize: 16 }}>
                গ্রাম: {villageName.village_bn}
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                <TouchableOpacity onPress={() => handleDeleteApplication(id)} style={{ backgroundColor: "#FF6C37", width: vw(30), padding: 5, borderRadius: 5, flexDirection: "row", alignItems: "center", justifyContent: "center", marginHorizontal: 5 }}>
                    <Text style={{ color: "#fff", fontFamily: "SolaimanLipi_Bold", textAlign: "center", fontSize: 14, marginRight: 4 }}>Cancel</Text>
                    <Ionicons name='trash' size={25} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSubmitOnline} style={{ backgroundColor: "#00E0C1", width: vw(30), padding: 5, borderRadius: 5, flexDirection: "row", alignItems: "center", justifyContent: "center", marginHorizontal: 5 }}>
                    <Text style={{ color: "#fff", fontFamily: "SolaimanLipi_Bold", textAlign: "center", fontSize: 14, marginRight: 4 }}>Submit</Text>
                    <Ionicons name='cloud-upload' size={25} color="#fff" />
                </TouchableOpacity>

            </View>
        </View>
    )
}