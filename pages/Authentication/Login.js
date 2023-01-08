import { View, Text, SafeAreaView, Image, ScrollView, StyleSheet, TouchableOpacity, Alert, ImageBackground, Platform, TextInput } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import AppLoadingIndicator from '../../components/Shared/AppLoadingIndicator';
import { vw, vh } from 'react-native-expo-viewport-units';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';


export default function Login() {
    const [loading, setLoading] = useState(false);

    const { logIn } = useContext(AuthContext);

    const { register, handleSubmit, watch, formState: { errors }, control } = useForm({ mode: 'onBlur' });
    const onSubmit = async ({ mobile, pin }) => {
        setLoading(true);
        try {
            const { data } = await axios.post("https://bdfast.app/api/v1/paper/less/login", { mobile, password: pin });

            if (!data.success) {
                setLoading(false);
                return Dialog.show({
                    type: ALERT_TYPE.DANGER,
                    title: <View><Text style={{ fontFamily: "SolaimanLipi_Bold", fontWeight: "bold", fontSize: 25 }}>Error</Text></View>,
                    textBody: <Text style={{ fontFamily: "SolaimanLipi_Bold" }}>{data?.message}</Text>
                })
            }
            setLoading(false);
            logIn(data);

        } catch (error) {
            setLoading(false);
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: <View><Text style={{ fontFamily: "SolaimanLipi_Bold", fontWeight: "bold", fontSize: 25 }}>Error</Text></View>,
                textBody: <Text style={{ fontFamily: "SolaimanLipi_Bold" }}>{error?.message}</Text>
            })
        }
        setLoading(false);
    };

    if (loading) {
        return <AppLoadingIndicator />
    }

    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ backgroundColor: "#00E0C1", width: vw(100) }}>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ height: vh(100) }}>
                        <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center", backgroundColor: '#fff' }}>
                            <Image style={{
                                width: vw(80), marginVertical: 20
                            }} source={require('../../assets/login.png')} />
                        </View>
                        <View style={{ padding: 20 }}>
                            <Text style={{ fontFamily: "SolaimanLipi_Bold", fontSize: 25, textAlign: "center", color: "#fff" }}>লগইন</Text>
                            <Text style={{ fontFamily: "SolaimanLipi_Bold", color: "#fff" }}>Mobile Number</Text>
                            <Controller
                                control={control}
                                name="mobile"
                                render={({ field: { onChange, value, onBlur } }) => (

                                    <TextInput
                                        value={value}
                                        style={styles.input}
                                        placeholder="Mobile Number"
                                        onChangeText={value => {
                                            onChange(value);
                                        }}
                                        maxLength={11}
                                        onBlur={onBlur}
                                        keyboardType='number-pad'
                                    />
                                )}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'মোবাইল নাম্বার আবশ্যক'
                                    },
                                    minLength: {
                                        value: 11,
                                        message: "মোবাইল নাম্বার ১১ সংখ্যায় হবে"
                                    }
                                }}
                            />
                            {errors.mobile && <Text style={{ fontFamily: "SolaimanLipi_Bold", color: 'red', marginLeft: 2 }}>{errors.mobile?.message}</Text>}
                            <Text style={{ fontFamily: "SolaimanLipi_Bold", color: "#fff" }}>Pin</Text>
                            <Controller
                                control={control}
                                name="pin"
                                render={({ field: { onChange, value, onBlur } }) => (
                                    <TextInput
                                        onChangeText={value => {
                                            onChange(value);
                                        }}
                                        style={styles.input}
                                        placeholder='Pin'
                                        secureTextEntry={true}
                                        value={value}
                                        onBlur={onBlur}
                                        maxLength={8} keyboardType='number-pad' />
                                )}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'পিন আবশ্যক'
                                    },
                                    minLength: {
                                        value: 8,
                                        message: "পিন ৮ সংখ্যায় হবে"
                                    }
                                }}
                            />
                            {errors.pin ? <Text style={{ fontFamily: "SolaimanLipi_Bold", color: 'red', marginLeft: 2 }}>{errors.pin?.message}</Text> : null}

                            <TouchableOpacity onPress={() => navigation.navigate("Recover")}>
                                <Text style={{ fontFamily: "SolaimanLipi_Bold", color: "#fff", textAlign: "right", marginTop: 5, marginBottom: 20 }}>পাসওয়ার্ড ভুলে গেছেন?</Text>
                            </TouchableOpacity>

                            {/* <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                                <Text style={{ fontFamily: "SolaimanLipi_Bold", color: "#fff", textAlign: "center", marginVertical: 5, fontSize: 15 }}>একাউন্ট নেই? রেজিষ্টার করুন</Text>
                            </TouchableOpacity> */}

                            <TouchableOpacity onPress={handleSubmit(onSubmit)} style={{ height: 40, width: vw(90), flexDirection: 'row', justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: "#fff", borderRadius: 10 }}>
                                <Text style={{ fontFamily: "SolaimanLipi_Bold", color: "#fff", fontSize: 22 }}>লগইন</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    input: {
        height: 55,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.50)',
        marginVertical: 5,
        color: '#ffff'
    }
});