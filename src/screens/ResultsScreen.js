import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { signOut } from '../store/actions/userAction'
import { setClarifaiPredictionsSeveralItems } from '../store/actions/cameraAction'
import CardBody from '../components/CardBody'
import Headers from '../components/Headers'

const { width } = Dimensions.get('screen')

const ResultsScreen = props => {
  const { camera } = useSelector(state => state)
  const dispatch = useDispatch()

  console.log('   >>> this is the response from Store:')
  // console.log(camera.clarifaiPredictionsSeveralItems)
  // console.log(camera.clarifaiPredictions)
  console.log(camera.cameraData)
  console.log('   <<< end of the response from Store')

  return (
    <View style={styles.container}>
      <StatusBar
        hidden
        barStyle="light-content"
        backgroundColor="rgba(0,0,0,1)"
      />
      <View style={styles.cardsWrapper}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333'
          }}
        >
          Check This Recipe From Your Foods!
        </Text>
        <ScrollView>
          {camera.cameraData?.map(recipe => {
            return <CardBody key={recipe.id} recipe={recipe} />
          })}
        </ScrollView>
      </View>
    </View>
    // <View style={{
    //   flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center'
    // }}>
    //   <View style={styles.container}>
    //   <Headers style={styles.Headers}></Headers>
    //   <View style={styles.scrollArea}>
    //     <ScrollView
    //       horizontal={false}
    //     >
    //       {
    //         camera.clarifaiPredictionsSeveralItems?.map(prediction => {
    //           return (
    //           <View style={styles.CardBody}>
    //             <Text style={styles.predictionStyle}>Prediction Result:</Text>
    //             <View style={styles.predictStyle}>
    //               <Text>{prediction.name}:</Text>
    //               <View style={{
    //                 flexDirection: 'row'
    //               }}>
    //                 <Text>{prediction.value * 100}%</Text>
    //               </View>
    //             </View>
    //           </View>
    //           )
    //         })
    //       }
    //       {
    //         camera.cameraData?.map(recipe => {
    //           return (
    //             <CardBody
    //               key={recipe.id}
    //               recipe={recipe}
    //               style={styles.CardBody}
    //             />
    //           )
    //         })
    //       }
    //     </ScrollView>
    //   </View>
    // </View>
    // {/* <Text>ResultsScreen {camera.clarifaiPredictions}</Text>
    // <TouchableOpacity
    //   style={{
    //     marginTop: 12
    //   }}
    //   onPress={() => {
    //     props.navigation.navigate("LoginScreen")
    //     dispatch(signOut())
    //   }} >
    //   <Text>Logout</Text>
    // </TouchableOpacity> */}
    // </View>
  )
}

export default ResultsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardsWrapper: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center'
  },
  scrollArea: {
    // width: 360,
    // height: 548,
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollArea_contentContainerStyle: {
    height: 548,
    width: 360
  },
  CardBody: {
    height: 233,
    width: 360,
    marginBottom: 20
  },
  predictionStyle: {
    lineHeight: 16,
    fontWeight: '500',
    fontSize: 20,
    color: 'black',
    marginBottom: 10
  },
  predictStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  }
})
