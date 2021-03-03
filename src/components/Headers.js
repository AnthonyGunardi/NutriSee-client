import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { 
  useFonts,
  Bellota_300Light,
  Bellota_300Light_Italic,
  Bellota_400Regular,
  Bellota_400Regular_Italic,
  Bellota_700Bold,
  Bellota_700Bold_Italic 
} from '@expo-google-fonts/bellota'
import AppLoading from 'expo-app-loading'
// import { TouchableOpacity } from "react-native-gesture-handler";

function Headers(props) {

  let [fontsLoad, error] = useFonts({
    Bellota_700Bold
  })

  if(!fontsLoad) {
    return <AppLoading/>
  }

  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity>
      <View>
        <Text style={styles.text}>NutriSee</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity>
      <Image
        source={require("../../assets/images/profile.jpg")}
        resizeMode="cover"
        style={styles.image}
      ></Image>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(80,227,194,1)",
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    justifyContent: "space-between",
    shadowColor: "#111",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
    elevation: 3
  },
  textWrapper: {
    position: "absolute",
    top: 8,
    marginBottom: 20
  },
  text: {
    top: 0,
    color: "#121212",
    width: "auto",
    marginLeft: 10,
    fontSize: 30,
    left: 0,
    color: "white",
    fontFamily: "Bellota_700Bold"
  },
  image: {
    borderRadius: 150,
    width: 40,
    height: 40,
    marginRight: 21,
    marginTop: 8
  }
});

export default Headers;