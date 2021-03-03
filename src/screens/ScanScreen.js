import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native'
import { Camera } from 'expo-camera'
import CameraPreview from '../components/CameraPreview'
import Clarifai, { FOOD_MODEL } from 'clarifai'
import {
  setPhotoUri,
  setClarifaiPredictions,
  cameraData,
  setClarifaiPredictionsSeveralItems,
  setIngredients,
  setFood
} from '../store/actions/cameraAction'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import SplashLoading from '../components/SplashLoading'

const ScanScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [hasPermission, setHasPermission] = useState(null)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)
  const [mode, setMode] = useState('Food')
  const cameraRef = useRef(null)
  const { camera } = useSelector(state => state)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [camera])

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  if (!isLoading) {
    return <SplashLoading />
  }

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync({
        base64: true
      })
      setPreviewVisible(true)
      dispatch(setPhotoUri(photo))
      setCapturedImage(photo)
    }
  }
  const savePhoto = async () => {
    setIsLoading(false)
    console.log('Analyzing photo')
    const ClarifaiApp = new Clarifai.App({
      apiKey: '3c94a001482f46109f6a586f7b324d4e'
    })
    try {
      const responses = await ClarifaiApp.models.predict(FOOD_MODEL, {
        base64: capturedImage.base64
        // url:
        //   'https://www.qsrmagazine.com/sites/default/files/styles/story_page/public/PizzaHut.jpg?itok=8m3Mf8Bf'
      })
      // console.log('   >>> this is the response from Clarifai:');
      // console.log(responses);
      // console.log('   <<< end of the response from Clarifai:');

      // set clarifai as the mode
      const result = responses.outputs[0].data.concepts
      // const ingredients = result.map(el => el.value >= 0.5)
      const ingredients = result
      const food = result[0]

      mode === 'Fridge'
        ? dispatch(setIngredients(ingredients))
        : dispatch(setFood(food.name))

      if (mode === 'Fridge') {
        console.log(ingredients)
        const nameIngredients = ingredients.map(el => el.name)
        if (ingredients) {
          console.log(nameIngredients, 'herere')
          const responses = await fetch(
            // `https://api.spoonacular.com/recipes/complexSearch?query=${food.name}&addRecipeInformation=true&apiKey=ae1567c7e44b4b748186128672c72144`
            `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${nameIngredients}&apiKey=ae1567c7e44b4b748186128672c72144`
          )
          // const data = await responses.json()
          // dispatch(cameraData(data))
          // setIsLoading(true)
          // navigation.navigate('Results')
          if (responses.ok) {
            const data = await responses.json()
            dispatch(cameraData(data))
            setIsLoading(true)
            navigation.navigate('IngredientList')
            // navigation.navigate('Results')
          } else {
            throw responses
          }
        }
      } else {
        // hit spoonacular and go to result
        if (food.name) {
          console.log(food.name, 'herere')
          const responses = await fetch(
            // `https://api.spoonacular.com/recipes/complexSearch?query=${food.name}&addRecipeInformation=true&apiKey=ae1567c7e44b4b748186128672c72144`
            `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${food.name}&apiKey=ae1567c7e44b4b748186128672c72144`
          )
          // const data = await responses.json()
          // dispatch(cameraData(data))
          // setIsLoading(true)
          // navigation.navigate('Results')
          if (responses.ok) {
            const data = await responses.json()
            dispatch(cameraData(data))
            setIsLoading(true)
            navigation.navigate('Results')
          } else {
            throw responses
          }
        }
      }

      // const { name } = responses.outputs[0].data.concepts[0]
      // dispatch(setClarifaiPredictionsSeveralItems(result))
      // dispatch(setClarifaiPredictions(name))
      // console.log('   >>> this is the response from Clarifai:');
      // console.log(ingredients);
      // console.log('   <<< end of the response from Clarifai:');
      // console.log(name, '<<<< food name')

      // if (name) {
      //   const responses = await fetch(
      //     `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${name}&apiKey=ae1567c7e44b4b748186128672c72144`
      //   )
      //   if (responses.ok) {
      //     const data = await responses.json()
      //     dispatch(cameraData(data))
      //     setIsLoading(true)
      //     navigation.navigate('Results')
      //   } else {
      //     throw responses
      //   }
      // }
    } catch (error) {
      console.log(error)
    }
  }
  const retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
    dispatch(setPhotoUri(''))
  }
  return (
    <View style={styles.container}>
      <StatusBar
        hidden
        barStyle="light-content"
        backgroundColor="rgba(0,0,0,1)"
      />
      {previewVisible && capturedImage ? (
        <CameraPreview
          photo={capturedImage}
          savePhoto={savePhoto}
          retakePicture={retakePicture}
          mode={mode}
        />
      ) : (
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.back}
          ref={cameraRef}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              marginTop: 20
            }}
          >
            <TouchableOpacity onPress={() => setMode('Food')}>
              <Text
                style={{
                  fontSize: 30,
                  color: mode === 'Food' ? '#fafafa' : '#555252'
                }}
              >
                Food
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMode('Fridge')}>
              <Text
                style={{
                  fontSize: 30,
                  color: mode === 'Fridge' ? '#fafafa' : '#555252'
                }}
              >
                Fridge
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <TouchableOpacity
                onPress={takePicture}
                style={styles.buttonRadius}
              >
                <View style={styles.buttonRadiusInside}>
                  <View style={styles.buttonRadiusInside2} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Camera>
      )}
    </View>
  )
}

export default ScanScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  camera: {
    flex: 1
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    padding: 20,
    justifyContent: 'space-between'
  },
  button: {
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center'
  },
  buttonRadius: {
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonRadiusInside: {
    width: 65,
    height: 65,
    bottom: 0,
    borderRadius: 40,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonRadiusInside2: {
    width: 60,
    height: 60,
    bottom: 0,
    borderRadius: 30,
    backgroundColor: '#fff'
  }
})
