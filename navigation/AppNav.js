import { View } from 'react-native'
import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './AppStack';
import AppLoadingIndicator from '../components/Shared/AppLoadingIndicator';
import Login from '../pages/Authentication/Login';
import { AuthContext } from '../context/AuthContext';
export default function AppNav() {
    const { user, isLoading } = useContext(AuthContext);
    if (isLoading) {
        return (
            <View>
                <AppLoadingIndicator />
            </View>
        )
    }
    return (
        <NavigationContainer>
            {
                user !== null ? <AppStack /> : <Login />
            }
        </NavigationContainer>
    )
}