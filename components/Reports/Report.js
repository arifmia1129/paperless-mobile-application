import { View, Text } from 'react-native'
import React from 'react'

export default function Report({ report, index }) {
    const { name_bn, father_bn, mobile } = report;
    return (
        <View style={{ backgroundColor: "#fff", borderWidth: 2, padding: 10, borderColor: "#00E0C1", marginVertical: 5, borderRadius: 10, flexDirection: "row", alignItems: "center" }}>
            <View style={{ width: 40, height: 40, backgroundColor: "#00E0C1", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 100, marginRight: 10 }}>
                <Text style={{ fontFamily: "SolaimanLipi_Bold", fontSize: 20, color: "#fff" }}>
                    {index + 1}
                </Text>
            </View>
            <View>
                <Text style={{ fontFamily: "SolaimanLipi_Bold", fontSize: 16 }}>
                    নাম: {name_bn}
                </Text>
                <Text style={{ fontFamily: "SolaimanLipi_Bold", fontSize: 16 }}>
                    অভিভাবকের নাম: {father_bn}
                </Text>
                <Text style={{ fontFamily: "SolaimanLipi_Bold", fontSize: 16 }}>
                    মোবাইল: {mobile}
                </Text>
            </View>
        </View>
    )
}