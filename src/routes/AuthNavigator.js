import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import {
  LoginScreen,
  RegisterScreen,
  OnboardingScreen
} from '../screens'
import { BottomNavigator } from './BottomNavigator'
import { NavigationContainer } from "@react-navigation/native"

const AuthStack = createStackNavigator()

export const AuthNavigator = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen name="OnboardingScreen" component={OnboardingScreen} />
    <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
    <AuthStack.Screen name="RegisterScreen" component={RegisterScreen} />
  </AuthStack.Navigator>
)

export default () => (
  <NavigationContainer>
    <AuthStack.Navigator headerMode="none">
      <AuthStack.Screen name="Auth" component={AuthNavigator} />
      <AuthStack.Screen name="App" component={BottomNavigator} />
    </AuthStack.Navigator>
  </NavigationContainer>
)