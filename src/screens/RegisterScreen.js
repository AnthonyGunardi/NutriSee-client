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
import { RadioButton } from 'react-native-paper';
import SubmitButton from "../components/SubmitButton";
import { register } from '../store/actions/userAction'
import { useDispatch } from 'react-redux'
const { width, height } = Dimensions.get('screen')

function RegisterScreen(props) {
  const dispatch = useDispatch()
  const [ name, setName ] = useState('')
  const [ gender, setGender ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ height, setHeight ] = useState('')
  const [ weight, setWeight ] = useState('')
  const [ date, setDate ] = useState('')

  const handleRegister = () => {
    if(name && gender && email && password && height && weight && date) {
      dispatch(register({name, email, password, height, weight, date, gender}))
      props.navigation.navigate("LoginScreen")
    }

  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(7,0,0,1)" />
      <ImageBackground
        source={require("../../assets/images/login.jpg")}
        resizeMode="cover"
        style={styles.image3}
        imageStyle={styles.image3_imageStyle}
      >
        <View style={styles.container}>
          <View style={styles.group3}>
            <Text style={styles.register}>Register</Text>
            <TextInput 
            placeholder=" name" 
            style={styles.email}
            onChangeText={
              (name) => setName(name)
            }
            value={name}></TextInput>
            <TextInput 
            placeholder=" Email" 
            style={styles.email}
            onChangeText={
              (email) => setEmail(email)
            }
            value={email}></TextInput>
            <TextInput
              placeholder=" Password"
              secureTextEntry={true}
              style={styles.textInput}
              onChangeText={
                (password) => setPassword(password)
              }
              value={password}
            ></TextInput>
            <TextInput
              placeholder=" yyyy-mm-dd"
              keyboardType="number-pad"
              style={styles.age}
              onChangeText={
                (date) => setDate(date)
              }
              value={date}
            ></TextInput>
            <View style={styles.weightRow}>
              <TextInput
                placeholder=" Weight"
                keyboardType="numeric"
                style={styles.weight}
                onChangeText={
                  (weight) => setWeight(weight)
                }
                value={weight}
              ></TextInput>
              <TextInput
                placeholder=" Height"
                keyboardType="numeric"
                style={styles.height}
                onChangeText={
                  (height) => setHeight(height)
                }
                value={height}
              ></TextInput>
            </View>
            <RadioButton.Group onValueChange={gender => setGender(gender)} value={gender}>
              <Text style={styles.genderTitle}>Gender</Text>
              <RadioButton.Item style={styles.gender} label="Male" value="male" />
              <RadioButton.Item style={styles.gender} label="Female" value="female" />
            </RadioButton.Group>
            <SubmitButton
              style={styles.SubmitButton}
              handleOnPress={handleRegister}
            />
            <TouchableOpacity
            onPress={() => props.navigation.navigate("LoginScreen")}
            style={styles.button}
            >
              <Text style={styles.notice}>Already have an account? Click here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: "#a6e4d0"
  },
  image3: {
    width: '100%',
    height: height,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image3_imageStyle: {
    opacity: 0.65
  },
  group3: {
    width: 269,
    height: 384,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  register: {
    color: "#fff",
    fontSize: 40,
    alignItems: 'center'
  },
  email: {
    color: "#121212",
    height: 35,
    width: 268,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 24,
    marginLeft: 1
  },
  textInput: {
    color: "#121212",
    height: 35,
    width: 268,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 19,
    marginLeft: 1
  },
  weight: {
    color: "#121212",
    height: 37,
    width: 121,
    backgroundColor: "#fff",
    borderRadius: 10
  },
  height: {
    color: "#121212",
    height: 37,
    width: 133,
    borderRadius: 10,
    backgroundColor: "rgba(254,254,254,1)",
    marginLeft: 12
  },
  weightRow: {
    height: 37,
    flexDirection: "row",
    marginTop: 22,
    marginLeft: 1,
    marginRight: 2
  },
  age: {
    color: "#121212",
    height: 35,
    width: 268,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 24,
    marginLeft: 1
  },
  gender: {
    color: "#fff",
    height: 28,
    width: 268,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 20,
    marginLeft: 10
  },
  genderTitle: {
    color: "#fff",
    fontSize: 16,
    height: 20,
    width: 268,
    borderRadius: 10,
    marginTop: 24,
    marginLeft: 15
  },
  SubmitButton: {
    height: 44,
    width: 266,
    marginTop: 19,
    marginLeft: 1,
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

export default RegisterScreen;
