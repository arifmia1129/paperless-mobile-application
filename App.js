import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import 'react-native-gesture-handler';
import Login from './pages/Authentication/Login';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import AddCitizen from './pages/AddCitizen/AddCitizen';
import AppStack from './navigation/AppStack';
import { NavigationContainer } from '@react-navigation/native';
import AppNav from './navigation/AppNav';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  let [fontsLoaded] = useFonts({
    'SolaimanLipi_Bold': require('./assets/fonts/SolaimanLipi_Bold.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <AuthProvider>
      <AlertNotificationRoot>
        <AppNav />
      </AlertNotificationRoot>

      <StatusBar style="auto" />
    </AuthProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
