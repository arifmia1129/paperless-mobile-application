import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";

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

    useEffect(() => {
        isLoggedIn();
        handleApplications();
    }, [])



    return (
        <AuthContext.Provider value={{ logIn, logOut, user, isLoading, applications, handleApplications }}>
            {children}
        </AuthContext.Provider>
    )
}