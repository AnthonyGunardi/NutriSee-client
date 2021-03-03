import React, { useEffect , useState} from 'react';
import BottomNavigator from './src/routes/BottomNavigator'
import AuthNavigator from './src/routes/AuthNavigator'
import store from './src/store'
import { Provider } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LogBox } from 'react-native';
import AppLoading from 'expo-app-loading'

export default function App() {
  LogBox.ignoreAllLogs()
  const [accessToken, setAccessToken] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const checkToken = async () => {
    try {
      const access_token = await AsyncStorage.getItem('access_token')
      setAccessToken(access_token)
      setIsLoading(false)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    checkToken()
  }, [])
  return (
    <Provider store={store}>
      { 
        isLoading
          ? <AppLoading />
          : accessToken
            ? <BottomNavigator />
            : <AuthNavigator />
      }
    </Provider>
  );
}