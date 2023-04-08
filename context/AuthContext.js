import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    // Login information
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);


    const logIn = async (user) => {
        setIsLoading(true);
        setUser(user);
        const jsonValue = JSON.stringify(user);
        await AsyncStorage.setItem("user", jsonValue);
        setIsLoading(false);
    }

    const logOut = async () => {
        setIsLoading(true);
        setUser(null);
        await AsyncStorage.removeItem("user");
        setIsLoading(false);
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            const jsonValue = await AsyncStorage.getItem('user');
            setUser(jsonValue != null ? JSON.parse(jsonValue) : null);
            setIsLoading(false);
        }
        catch (e) {
            Alert.alert(e?.message ? e?.message : "Login problem");
        }
    }
    const [applications, setApplications] = useState([]);

    const handleApplications = async () => {
        const applications = await AsyncStorage.getItem("applications");

        if (Array.isArray(JSON.parse(applications))) {
            setApplications(JSON.parse(applications));
        } else {
            setApplications([]);
        }
    }

    const [totalGetQuota, setTotalGetQuota] = useState(0);
    const [totalUsedQuota, setTotalUsedQuota] = useState(0);


    const handleQuotaInfo = async () => {
        try {
            const { data } = await axios.get("https://sonod.com.bd/paper/quota", {
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
        isLoggedIn();
        handleApplications();
        handleQuotaInfo();
    }, [])

    const value = {
        logIn,
        logOut,
        user,
        isLoading,
        applications,
        handleApplications,
        totalGetQuota,
        totalUsedQuota,
        handleQuotaInfo
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}