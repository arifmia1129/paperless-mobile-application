import { View, Text } from 'react-native'
import React from 'react'

export default function Report() {
    return (
        <View style={{ backgroundColor: "#fff", borderWidth: 2, padding: 10, borderColor: "#00E0C1", marginVertical: 5, borderRadius: 10 }}>
            <Text style={{ fontFamily: "SolaimanLipi_Bold", fontSize: 16 }}>
                নাম:
            </Text>
            <Text style={{ fontFamily: "SolaimanLipi_Bold", fontSize: 16 }}>
                অভিভাবকের নাম:
            </Text>
            <Text style={{ fontFamily: "SolaimanLipi_Bold", fontSize: 16 }}>
                জন্ম সনদ/NID নং:
            </Text>
            <Text style={{ fontFamily: "SolaimanLipi_Bold", fontSize: 16 }}>
                গ্রাম:
            </Text>
        </View>
    )
}