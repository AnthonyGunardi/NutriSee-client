import React from "react"
import { Ionicons } from "@expo/vector-icons"
import {
  HomeScreen,
  ScanScreen,
  ProfileScreen,
  LoginScreen,
  DetailsScreen,
  ResultsScreen,
  RegisterScreen,
  EditScreen,
  IngredientList
} from '../screens'
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from "@react-navigation/stack"
import { colors } from '../constants/colors'

const Tab = createBottomTabNavigator()
const MainStack = createStackNavigator()
const HomeStack = createStackNavigator()
const CameraStack = createStackNavigator()

const HomeStackScreen = () => (
  <HomeStack.Navigator headerMode={"none"}>
    <HomeStack.Screen name="Home" component={HomeScreen}/>
    <HomeStack.Screen name="Details" component={DetailsScreen} />
  </HomeStack.Navigator>
)

const CameraStackScreen = () => (
  <CameraStack.Navigator headerMode={"none"}>
    <CameraStack.Screen name="Scan" component={ScanScreen}/>
    <CameraStack.Screen name="Results" component={ResultsScreen} /> 
  </CameraStack.Navigator>
)

export const BottomNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      activeTintColor: colors.activeTintColor,
      style: {
        backgroundColor: colors.primaryColor,
        borderTopColor: "transparent"
      },
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="ios-home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Scan"
      component={CameraStackScreen}
      options={{
        tabBarLabel: "Scan",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="ios-camera" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: "Profile",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="ios-person" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
)

export default () => (
  <NavigationContainer>
    <MainStack.Navigator headerMode="none">
      <MainStack.Screen name="App" component={BottomNavigator} />
      <MainStack.Screen name="Details" component={DetailsScreen} />
      <MainStack.Screen name="Results" component={ResultsScreen} /> 
      <MainStack.Screen name="LoginScreen" component={LoginScreen} />
      <MainStack.Screen name="RegisterScreen" component={RegisterScreen} />
      <MainStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <MainStack.Screen name="EditScreen" component={EditScreen} />
      <MainStack.Screen name="IngredientList" component={IngredientList} />
    </MainStack.Navigator>
  </NavigationContainer>
)