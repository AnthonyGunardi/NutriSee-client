import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
  Button,
  StyleSheet,
  StatusBar
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker'
import { useDispatch, useSelector } from 'react-redux';
import { setProfile, updateProfile } from '../store/actions/userAction';

function EditScreen(props) {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state)
  const [ height, setHeight ] = useState('')
  const [ weight, setWeight ] = useState('')
  const [ selectImg, setSelectedImg ] = useState(null)

  let openImage = async () => {
    
    let permission = await ImagePicker.requestCameraRollPermissionsAsync();

    if(permission.granted === false){
      return;
    }

    let picker = await ImagePicker.launchImageLibraryAsync()

    if(picker.cancelled === true){
      return;
    }
    setSelectedImg({localUri:picker.uri})
    dispatch(setProfile(picker.uri))
  }

  const handleRegister = () => {
    let obj = {
      id: user.userData._id,
      weight,
      height
    }
    console.log(obj, 'ini dari editScreen')
    dispatch(updateProfile(obj))
    props.navigation.navigate("ProfileScreen")
  }

  return (
  <View style={styles.container}>
    <StatusBar
        hidden
        barStyle="light-content"
        backgroundColor="rgba(0,0,0,1)"
      />
    <View style={{alignItems: 'center'}}>
      <Text style={{marginBottom: 20, fontSize: 18, fontWeight: 'bold'}}>
        Account
      </Text>
    </View>
    <View style={styles.action}>
      <TextInput
        placeholder="Weight"
        placeholderTextColor="#666666"
        keyboardType="number-pad"
        autoCorrect={false}
        style={[
          styles.textInput
        ]}
        onChangeText={
          (weight) => setWeight(weight)
        }
        value={weight}
      />
    </View>
    <View style={styles.action}>
      <TextInput
        placeholder="Height"
        placeholderTextColor="#666666"
        keyboardType="number-pad"
        autoCorrect={false}
        style={[
          styles.textInput
        ]}
        onChangeText={
          (height) => setHeight(height)
        }
        value={height}
      />
    </View>
    <View style={styles.action}>
      <TextInput
        placeholder="Insert Photo"
        placeholderTextColor="#666666"
        autoCorrect={false}
        style={[
          styles.textInput
        ]}
      />
      <TouchableOpacity 
        style={styles.button}
        onPress={openImage}>
        <Icon name="image-plus" color="#777777" size={20}/>
      </TouchableOpacity>
    </View>
      <TouchableOpacity style={styles.commandButton} onPress={handleRegister}>
        <Text style={styles.panelButtonTitle}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

export default EditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center'
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(80,227,194,1)',
    alignItems: 'center',
    marginTop: 10
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
    alignItems: 'center'
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button:{
    backgroundColor:'rgba(255,255,255,0)',
    justifyContent:'center',
    alignItems:'center',
    marginRight: 20
  },
  image:{
    width:300,
    height:300,
    resizeMode:'contain'
  }
});