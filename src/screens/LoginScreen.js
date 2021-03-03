import React, { useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions
} from "react-native";
import SubmitButton from "../components/SubmitButton";
import { signIn } from '../store/actions/userAction'
import { useDispatch } from 'react-redux'
const { width, height } = Dimensions.get('screen')

function LoginScreen(props) {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("")
  const dispatch = useDispatch()
  const handleLogin = () => {
    // TODO WIRE BACKEND
    if (email && password) {
      dispatch(signIn({email, password}))
      props.navigation.navigate("App")
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar
        hidden
        barStyle="light-content"
        backgroundColor="rgba(0,0,0,1)"
      />
      <ImageBackground
        source={require("../../assets/images/login.jpg")}
        resizeMode="cover"
        style={styles.image}
        imageStyle={styles.image_imageStyle} >
        <View style={styles.container}>
            <Text style={styles.login}>Login</Text>
              <TextInput
                placeholder=" Email"
                textBreakStrategy="simple"
                keyboardType="email-address"
                style={styles.email}
                onChangeText={
                  (email) => setEmail(email)
                }
                value={email} />
              <TextInput
                placeholder=" Password"
                style={styles.password}
                secureTextEntry={true}
                onChangeText={
                  (password) => setPassword(password)
                }
                value={password}/>
              <SubmitButton
                style={styles.SubmitButton}
                handleOnPress={handleLogin}/>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("RegisterScreen")}
                style={styles.button}>
                <Text style={styles.notice}>Didn't have Account? Click here</Text>
              </TouchableOpacity>
          
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: "#a6e4d0"
  },
  image: {
    width: '100%',
    height: height,
    justifyContent: "center"
  },
  image_imageStyle: {
    opacity: 0.65
  },
  group3: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 268,
    height: 271,
    marginTop: 307,
  },
  login: {
    color: "#fff",
    fontSize: 40,
    textAlign: 'center'
  },
  email: {
    color: "#121212",
    height: 35,
    backgroundColor: "#fff",
    width: 268,
    borderRadius: 10,
    marginTop: 29
  },
  password: {
    color: "#121212",
    height: 36,
    width: 268,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    marginTop: 22
  },
  SubmitButton: {
    width: 268,
    height: 44,
    marginTop: 22,
    backgroundColor: "rgba(255,165,0,0.8)"
  },
  button: {
    alignItems: "center",
    backgroundColor: 'rgba(52, 52, 52, 0)',
    padding: 10
  },
  notice: {
    color: "#fff",
    textAlign: 'center'
  }
});

export default LoginScreen;
