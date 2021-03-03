import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, BackHandler } from 'react-native'

const CameraPreview = ({photo, retakePicture, savePhoto, mode}) => {
  const handleBackButtonClick = () => {
    retakePicture()
    return true
  }
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    }
  }, [])
  return (
    <View
      style={styles.container}>
      <ImageBackground
        source={{ uri: photo.uri }}
        style={styles.imageContainer}>
        <View style={{
          alignItems: 'center'
        }}>
          <Text style={{
            fontSize: 30,
            color: '#fafafa'
          }}>
              {mode} Mode
          </Text>
        </View>
        <View
          style={styles.optionsContainer}>
          <View
            style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={retakePicture}
              style={styles.button}
            >
              <Text
                style={styles.buttonText}
              >
                Re-take
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={savePhoto}
              style={styles.button}
            >
              <Text
                style={styles.buttonText}
              >
                Analyze Photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

export default CameraPreview

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    width: '100%',
    height: '100%'
  },
  imageContainer: {
    flex: 1
  },
  optionsContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 15,
    justifyContent: 'flex-end'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    width: 130,
    height: 40,
    alignItems: 'center',
    borderRadius: 4
  },
  buttonText: {
    color: '#fff',
    fontSize: 20
  }
})
