import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { vw, vh } from 'react-native-expo-viewport-units';
import { useForm, Controller } from "react-hook-form";
import { TextInput } from 'react-native-element-textinput';
import SelectDropdown from 'react-native-select-dropdown';
import { AuthContext } from '../../context/AuthContext';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import axios from 'axios';
import AppLoadingIndicator from '../Shared/AppLoadingIndicator';
import Ionicons from "react-native-vector-icons/Ionicons";


export default function CitizenInfo() {
    const { user, logOut } = useContext(AuthContext);

    const { profession, village } = user;

    const [villageId, setVillageId] = useState("");
    const [professionId, setProfessionId] = useState("");
    const [genderId, setGenderId] = useState("");
    const [docType, setDocType] = useState("");
    const [loading, setLoading] = useState(false);


    const villages = village.filter(v => Number(v.ward_number) === 1);

    const gender = [
        { id: "MALE", title: "পুরুষ" },
        { id: "FEMALE", title: "নারী" },
        { id: "OTHER", title: "অন্যান্য" }
    ]

    const docTypes = [
        { id: "nid", title: "NID" },
        { id: "birth", title: "জন্ম সনদ" }
    ]

    const { handleSubmit, formState: { errors }, control, resetField } = useForm({ mode: 'onBlur' });
    const onSubmit = async ({ dob, mobile, name, guardianName, motherName, id }, e) => {
        if (!villageId || !professionId || !genderId || !docType) {
            return Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: <View><Text style={{ fontFamily: "SolaimanLipi_Bold", fontWeight: "bold", fontSize: 25 }}>Error</Text></View>,
                textBody: <Text style={{ fontFamily: "SolaimanLipi_Bold" }}>গ্রাম, পেশা, ডকুমেন্টের ধরন এবং লিঙ্গ আবশ্যক</Text>
            })
        }

        setLoading(true);
        const information = {
            source: "app",
            gender: genderId,
            mobile,
            village_id: villageId,
            name_bn: name,
            father_bn: guardianName,
            mother_bn: motherName,
            doc_type: docType,
            card_number: id,
            dob,
            profession_id: professionId
        }
        setLoading(false)
        return Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: <View><Text style={{ fontFamily: "SolaimanLipi_Bold", fontWeight: "bold", fontSize: 16 }}>আবেদনের সংরক্ষনের ধরন</Text></View>,
            textBody: <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <TouchableOpacity style={{ backgroundColor: "#00E0C1", width: vw(30), paddingHorizontal: 5, borderRadius: 5, paddingVertical: 10, flexDirection: "row", alignItems: "center", justifyContent: "center", marginHorizontal: 5 }}>
                    <Text style={{ color: "#fff", fontFamily: "SolaimanLipi_Bold", textAlign: "center", fontSize: 14, marginRight: 4 }}>অফলাইন</Text>
                    <Ionicons name='cloud-offline' size={25} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: "#FF6C37", width: vw(30), paddingHorizontal: 5, borderRadius: 5, paddingVertical: 10, flexDirection: "row", alignItems: "center", justifyContent: "center", marginHorizontal: 5 }}>
                    <Text style={{ color: "#fff", fontFamily: "SolaimanLipi_Bold", textAlign: "center", fontSize: 14, marginRight: 4 }}>অনলাইন</Text>
                    <Ionicons name='cloud' size={25} color="#fff" />
                </TouchableOpacity>
            </View>
        })

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
        } catch (error) {
            logOut()
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
        <ScrollView>
            <View style={{ padding: 10, backgroundColor: "#fff" }}>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={{ fontFamily: "SolaimanLipi_Bold", color: "#fff", backgroundColor: "#00E0C1", width: vw(90), padding: 10, borderRadius: 10, textAlign: "center" }}>গ্রাম নির্বাচন করুন</Text>
                    <View style={{ marginHorizontal: 30, marginBottom: 20 }}>
                        {
                            villages?.map((village) => {
                                const { village_bn, post_office_bn, id } = village;
                                return <TouchableOpacity key={id} onPress={() => {
                                    setVillageId(id);
                                }} style={[villageId === village?.id ? styles.selectButtonVillage : styles.unselectButtonVillage]}>
                                    <Text style={[villageId === village?.id ? styles.selectText : styles.unselectText]}>{village_bn}</Text>
                                </TouchableOpacity>
                            })
                        }
                    </View>
                    <SelectDropdown
                        buttonStyle={{ width: "100%", height: 40, borderWidth: 1, borderColor: "#00E0C1", borderRadius: 5, backgroundColor: "#fff", marginTop: 5 }}
                        buttonTextStyle={{ fontFamily: "SolaimanLipi_Bold", color: "black", textAlign: "left", fontSize: 16 }}
                        rowTextStyle={{ fontFamily: "SolaimanLipi_Bold" }}
                        defaultButtonText="পেশা"
                        data={profession}
                        onSelect={(selectedItem) => {
                            setProfessionId(selectedItem.id);
                        }}
                        buttonTextAfterSelection={(selectedItem) => {
                            return selectedItem.bangla;
                        }}
                        rowTextForSelection={(item) => {
                            return item.bangla;
                        }}
                    />
                    <View>
                        <View>
                            <Controller
                                control={control}
                                name="mobile"
                                render={({ field: { onChange, value, onBlur } }) => (
                                    <TextInput
                                        value={value}
                                        onBlur={onBlur}
                                        style={styles.input}
                                        inputStyle={styles.inputStyle}
                                        labelStyle={styles.labelStyle}
                                        placeholderStyle={styles.placeholderStyle}
                                        textErrorStyle={styles.textErrorStyle}
                                        label="মোবাইল নাম্বার"
                                        placeholder="মোবাইল নাম্বার লিখুন"
                                        placeholderTextColor="gray"
                                        focusColor="#00E0C1"
                                        keyboardType='phone-pad'
                                        maxLength={11}
                                        onChangeText={value => {
                                            onChange(value);
                                        }}
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
                            <View>
                                {errors.mobile && <Text style={{ fontFamily: "SolaimanLipi_Bold", color: 'red', marginLeft: 2 }}>{errors.mobile?.message}</Text>}
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                            {
                                docTypes?.map(type => <TouchableOpacity key={type.id} onPress={() => {
                                    setDocType(type.id);
                                }} style={[docType === type.id ? styles.selectButton : styles.unselectButton]}>
                                    <Text style={[docType === type.id ? styles.selectText : styles.unselectText]}>{type.title}</Text>
                                </TouchableOpacity>)
                            }
                        </View>
                        <View>
                            <Controller
                                control={control}
                                name="id"
                                render={({ field: { onChange, value, onBlur } }) => (
                                    <TextInput
                                        value={value}
                                        onBlur={onBlur}
                                        style={styles.input}
                                        inputStyle={styles.inputStyle}
                                        labelStyle={styles.labelStyle}
                                        placeholderStyle={styles.placeholderStyle}
                                        textErrorStyle={styles.textErrorStyle}
                                        label="জন্ম সনদ/NID নাম্বার"
                                        placeholder="জন্ম সনদ/NID নাম্বার নাম্বার লিখুন"
                                        placeholderTextColor="gray"
                                        focusColor="#00E0C1"
                                        keyboardType='phone-pad'
                                        maxLength={17}
                                        onChangeText={value => {
                                            onChange(value);
                                        }}
                                    />
                                )}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'জন্ম সনদ/NID নাম্বার আবশ্যক'
                                    },
                                    minLength: {
                                        value: 10,
                                        message: "জন্ম সনদ/NID নাম্বার ১০/১৩/১৭ সংখ্যায় হবে"
                                    },
                                    maxLength: {
                                        value: 17,
                                        message: "জন্ম সনদ/NID নাম্বার ১০/১৩/১৭ সংখ্যায় হবে"
                                    }
                                }}
                            />
                            <View>
                                {errors.id && <Text style={{ fontFamily: "SolaimanLipi_Bold", color: 'red', marginLeft: 2 }}>{errors.id?.message}</Text>}
                            </View>
                        </View>
                        <View>
                            <Controller
                                control={control}
                                name="dob"
                                render={({ field: { onChange, value, onBlur } }) => (
                                    <TextInput
                                        value={value}
                                        onBlur={onBlur}
                                        style={styles.input}
                                        inputStyle={styles.inputStyle}
                                        labelStyle={styles.labelStyle}
                                        placeholderStyle={styles.placeholderStyle}
                                        textErrorStyle={styles.textErrorStyle}
                                        label="জন্ম তারিখ"
                                        placeholder="দিন-মাস-বছর"
                                        placeholderTextColor="gray"
                                        focusColor="#00E0C1"
                                        keyboardType='phone-pad'
                                        maxLength={10}
                                        onChangeText={value => {
                                            onChange(value);
                                        }}
                                    />
                                )}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'জন্ম তারিখ আবশ্যক'
                                    },
                                    minLength: {
                                        value: 10,
                                        message: "31-12-2002 এই ফরম্যাট অনুযায়ী জন্ম তারিখ লিখুন"
                                    }
                                }}
                            />
                            <View>
                                {errors.dob && <Text style={{ fontFamily: "SolaimanLipi_Bold", color: 'red', marginLeft: 2 }}>{errors.dob?.message}</Text>}
                            </View>
                        </View>
                        <View>
                            <Controller
                                control={control}
                                name="name"
                                render={({ field: { onChange, value, onBlur } }) => (
                                    <TextInput
                                        value={value}
                                        onBlur={onBlur}
                                        style={styles.input}
                                        inputStyle={styles.inputStyle}
                                        labelStyle={styles.labelStyle}
                                        placeholderStyle={styles.placeholderStyle}
                                        textErrorStyle={styles.textErrorStyle}
                                        label="নাম"
                                        placeholder="নাম লিখুন"
                                        placeholderTextColor="gray"
                                        focusColor="#00E0C1"
                                        onChangeText={value => {
                                            onChange(value);
                                        }}
                                    />
                                )}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'নাম আবশ্যক'
                                    }
                                }}
                            />
                            <View>
                                {errors.name && <Text style={{ fontFamily: "SolaimanLipi_Bold", color: 'red', marginLeft: 2 }}>{errors.name?.message}</Text>}
                            </View>
                        </View>
                        <View>
                            <Controller
                                control={control}
                                name="guardianName"
                                render={({ field: { onChange, value, onBlur } }) => (
                                    <TextInput
                                        value={value}
                                        onBlur={onBlur}
                                        style={styles.input}
                                        inputStyle={styles.inputStyle}
                                        labelStyle={styles.labelStyle}
                                        placeholderStyle={styles.placeholderStyle}
                                        textErrorStyle={styles.textErrorStyle}
                                        label="পিতা/স্বামীর নাম"
                                        placeholder="পিতা/স্বামীর নাম লিখুন"
                                        placeholderTextColor="gray"
                                        focusColor="#00E0C1"
                                        onChangeText={value => {
                                            onChange(value);
                                        }}
                                    />
                                )}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'পিতা/স্বামীর নাম আবশ্যক'
                                    }
                                }}
                            />
                            <View>
                                {errors.guardianName && <Text style={{ fontFamily: "SolaimanLipi_Bold", color: 'red', marginLeft: 2 }}>{errors.guardianName?.message}</Text>}
                            </View>
                        </View>
                        <View>
                            <Controller
                                control={control}
                                name="motherName"
                                render={({ field: { onChange, value, onBlur } }) => (
                                    <TextInput
                                        value={value}
                                        onBlur={onBlur}
                                        style={styles.input}
                                        inputStyle={styles.inputStyle}
                                        labelStyle={styles.labelStyle}
                                        placeholderStyle={styles.placeholderStyle}
                                        textErrorStyle={styles.textErrorStyle}
                                        label="মাতার নাম"
                                        placeholder="মাতার নাম লিখুন"
                                        placeholderTextColor="gray"
                                        focusColor="#00E0C1"
                                        onChangeText={value => {
                                            onChange(value);
                                        }}
                                    />
                                )}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'মাতার নাম আবশ্যক'
                                    }
                                }}
                            />
                            <View>
                                {errors.motherName && <Text style={{ fontFamily: "SolaimanLipi_Bold", color: 'red', marginLeft: 2 }}>{errors.motherName?.message}</Text>}
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                            {
                                gender?.map(g => <TouchableOpacity key={g.id} onPress={() => {
                                    setGenderId(g.id);
                                }} style={[genderId === g.id ? styles.selectButtonGender : styles.unselectButtonGender]}>
                                    <Text style={[genderId === g.id ? styles.selectText : styles.unselectText]}>{g.title}</Text>
                                </TouchableOpacity>)
                            }
                        </View>
                    </View>

                </View>
                <View style={{ flexDirection: 'row', justifyContent: "center" }}>
                    <TouchableOpacity onPress={handleSubmit(onSubmit)} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "#00E0C1", width: vw(80), borderRadius: 10, marginTop: 20, marginBottom: vh(10) }}>

                        <Text style={{ fontFamily: "SolaimanLipi_Bold", color: "#fff", fontSize: 18, marginLeft: 5 }}>সাবমিট</Text>
                        <Image style={{ marginVertical: 10, marginHorizontal: 10 }} source={require('../../assets/Icon/Submit.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: '#fff',
        borderWidth: 1,
        marginVertical: 10,
        width: vw(95),
        borderColor: "#00E0C1"
    },
    dobInput: {
        height: 55,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.35)',
        borderWidth: .5,
        marginVertical: 5,
        width: vw(28)
    },
    addressInput: {
        height: 55,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.35)',
        marginVertical: 5,
        width: vw(40)
    },
    inputStyle: { fontSize: 16, fontFamily: "SolaimanLipi_Bold" },
    labelStyle: {
        fontSize: 14,
        position: 'absolute',
        top: -10,
        backgroundColor: 'white',
        paddingHorizontal: 4,
        marginLeft: -4,
        fontFamily: "SolaimanLipi_Bold"
    },
    placeholderStyle: { fontSize: 16, fontFamily: "SolaimanLipi_Bold", color: "gray" },
    textErrorStyle: { fontSize: 16 },

    unselectButton: {
        height: 40,
        borderWidth: 0.5,
        flexDirection: "row",
        width: vw(40),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        borderColor: "#00E0C1",
        marginHorizontal: 5
    },
    selectButton: {
        height: 40,
        flexDirection: "row",
        width: vw(40),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: "#00E0C1",
        marginHorizontal: 5
    },
    unselectButtonGender: {
        height: 40,
        borderWidth: 0.5,
        flexDirection: "row",
        width: vw(30),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        borderColor: "#00E0C1",
        marginHorizontal: 5
    },
    selectButtonGender: {
        height: 40,
        flexDirection: "row",
        width: vw(30),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: "#00E0C1",
        marginHorizontal: 5
    },
    unselectText: {
        fontFamily: "SolaimanLipi_Bold", textAlign: "center"
    },
    selectText: {
        fontFamily: "SolaimanLipi_Bold", textAlign: "center",
        color: "#fff"
    },
    unselectButtonVillage: {
        height: 40,
        width: vw(85),
        borderWidth: 0.5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        borderColor: "#00E0C1",
        marginVertical: 5
    },
    selectButtonVillage: {
        height: 40,
        width: vw(85),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: "#00E0C1",
        marginVertical: 5
    },
});