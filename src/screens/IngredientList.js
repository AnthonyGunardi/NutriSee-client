import React from 'react'
import { Button, Text, View, StatusBar } from 'react-native'
import { useSelector } from 'react-redux'

const IngredientList = ({ navigation }) => {
  const { ingredients } = useSelector(state => state.camera)
  return (
    <>
    <View 
      style={{
        marginTop: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 10
      }}>
        <StatusBar
        hidden
        barStyle="light-content"
        backgroundColor="rgba(0,0,0,1)"
        />
        <Text style={{
          fontWeight: '500',
          fontSize: 20,
          color: 'black',
          marginBottom: 10
        }}>
          Scanned Ingredients
        </Text>
        {
          ingredients &&
          ingredients.map((prediction, idx) => {
            return (
              <View key={idx} style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 5
              }}>
                <Text>{ prediction.name.charAt(0).toUpperCase() + prediction.name.slice(1) }</Text>
                <View style={{
                  flexDirection: 'row'
                }}>
                  <Text style={{marginRight: 5}}>{ Math.round(prediction.value * 100) }</Text>
                  <Text>%</Text>
                </View>
              </View>
                
              
            )
          })
        }
        <Button
          onPress={() => navigation.navigate('Results')}
          title='Check Menu'
        />
    </View>
        

      {/* { ingredients &&
        ingredients.map(prediction => {
          return (
            <View>
              <Text>
                {prediction.name}: {prediction.value * 100}%
              </Text>
            </View>
          )
        })} */}
      {/* <Button
        onPress={() => navigation.navigate('Results')}
        title='Check Menu'
      /> */}
    </>
  )
}

export default IngredientList