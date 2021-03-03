import React, { useEffect, useState } from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  ImageBackground,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { fetchRecipe } from '../store/actions/recipeAction'
import { useDispatch, useSelector } from 'react-redux'
import { LinearGradient } from "expo-linear-gradient"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const { width } = Dimensions.get('screen')  
const DetailsScreen = (props) => {
  const { recipeId } = props.route.params
  const [renderButton, setRenderButton] = useState('nutritions')
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchRecipe(recipeId))
    // console.log(recipeId)
  }, [recipeId])
  const { recipe } = useSelector(state => state.recipe)
  // console.log(recipe)
  /**
   * limit spoonacuilar
   */
  // const recipe = {
  //   title: 'Nasi Minyak (Malaysian Festive Rice)',
  //   image: 'https://spoonacular.com/recipeImages/652964-556x370.jpg',
  //   readyInMinutes: 45,
  //   servings: 6,
  //   nutrition: {
  //     nutrients: [
  //       {
  //         "name": "Calories",
  //         "title": "Calories",
  //         "amount": 236.78,
  //         "unit": "kcal",
  //         "percentOfDailyNeeds": 11.84
  //       },
  //       {
  //         "name": "Fat",
  //         "title": "Fat",
  //         "amount": 8.18,
  //         "unit": "g",
  //         "percentOfDailyNeeds": 12.59
  //       },
  //       {
  //         "name": "Saturated Fat",
  //         "title": "Saturated Fat",
  //         "amount": 4.35,
  //         "unit": "g",
  //         "percentOfDailyNeeds": 27.2
  //       },
  //       {
  //         "name": "Carbohydrates",
  //         "title": "Carbohydrates",
  //         "amount": 36.44,
  //         "unit": "g",
  //         "percentOfDailyNeeds": 12.15
  //       },
  //       {
  //         "name": "Net Carbohydrates",
  //         "title": "Net Carbohydrates",
  //         "amount": 33.29,
  //         "unit": "g",
  //         "percentOfDailyNeeds": 12.11
  //       },
  //       {
  //         "name": "Sugar",
  //         "title": "Sugar",
  //         "amount": 5.17,
  //         "unit": "g",
  //         "percentOfDailyNeeds": 5.74
  //       },
  //       {
  //         "name": "Cholesterol",
  //         "title": "Cholesterol",
  //         "amount": 18.99,
  //         "unit": "mg",
  //         "percentOfDailyNeeds": 6.33
  //       },
  //       {
  //         "name": "Sodium",
  //         "title": "Sodium",
  //         "amount": 67.89,
  //         "unit": "mg",
  //         "percentOfDailyNeeds": 2.95
  //       },
  //       {
  //         "name": "Protein",
  //         "title": "Protein",
  //         "amount": 5.05,
  //         "unit": "g",
  //         "percentOfDailyNeeds": 10.11
  //       }    
  //     ],
  //     ingredients: [
  //       {
  //         "id": 93632,
  //         "name": "ghee",
  //         "amount": 0.33,
  //         "unit": "tablespoons",
  //       },
  //       {
  //         "id": 93632,
  //         "name": "onion",
  //         "amount": 0.17,
  //         "unit": "tablespoons",
  //       },
  //       {
  //         "id": 93632,
  //         "name": "garlic",
  //         "amount": 0.33,
  //         "unit": "cloves",
  //       }
  //     ],
  //     caloricBreakdown: {
  //       "percentProtein": 8.44,
  //       "percentFat": 30.73,
  //       "percentCarbs": 60.83
  //     },
  //     weightPerServing: {
  //       "amount": 196,
  //       "unit": "g"
  //     }
  //   },
  // }
  return (
    <View style={{
      flex: 1
    }}>
      <ImageBackground 
        style={{
          flex:1,
          justifyContent: 'flex-end'
        }} 
        source={{uri: recipe.image}}>
          <LinearGradient
            colors={["transparent", "#605E5E"]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: "100%",
            }}
          />
          <Text style={{
            color: 'white',
            fontSize: 30,
            padding: 15,
            fontWeight: '500',
          }}>
            { recipe.title }
          </Text>
      </ImageBackground>
      <View style={{
        flex:1,
        paddingTop: 20,
        marginHorizontal: 15
      }}>
        <ScrollView>
          <View 
            style={{
              flexDirection: 'column',
              flexWrap:'wrap'
            }}>
            <View 
              style={{
                backgroundColor: '#f9f9f9',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                borderRadius: 8
              }}>
                <Icon style={{ marginTop: 8 }} name="weight-gram" color="#FF6347"/>
              <Text style={{ padding: 5 }}>
              
                { recipe?.nutrition?.weightPerServing?.amount } { recipe?.nutrition?.weightPerServing?.unit }
              </Text>
              <Icon style={{ marginTop: 8 }} name="clock-time-five-outline" color="#FF6347"/>
              <Text style={{ padding: 5 }}>
                { recipe?.readyInMinutes } min
              </Text>
              <Icon style={{ marginTop: 8 }} name="food-drumstick-outline" color="#FF6347"/>
              <Text style={{ padding: 5 }}>
                { recipe?.nutrition?.nutrients[0]?.amount } { recipe?.nutrition?.nutrients[0]?.unit }
              </Text>
              <Icon style={{ marginTop: 8 }} name="account" color="#FF6347"/>
              <Text style={{ padding: 5 }}>
                { recipe?.servings } servings
              </Text>
            </View>
          </View>
          <View 
            style={{
              marginTop: 20,
              backgroundColor: '#f9f9f9',
              borderRadius: 8,
              padding: 10
            }}>
              <Text style={{
                fontWeight: '500',
                fontSize: 20,
                color: 'black',
                marginBottom: 10
              }}>
                Ingredients
              </Text>
              {
                recipe.nutrition?.ingredients?.map((ingredient, idx) => {
                  return (
                    <View key={idx} style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 5
                    }}>
                      <Text>{ ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1) }</Text>
                      <View style={{
                        flexDirection: 'row'
                      }}>
                        <Text style={{marginRight: 5}}>{ ingredient.amount }</Text>
                        <Text>{ ingredient.unit }</Text>
                      </View>
                    </View>
                  )
                })
              }
          </View>
          <View 
            style={{
              marginTop: 20,
              backgroundColor: '#f9f9f9',
              borderRadius: 8,
              padding: 10,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
            <TouchableOpacity onPress={() => setRenderButton('directions')}>
              <Text style={{
                fontWeight: '500',
                fontSize: 20,
                color: renderButton == 'directions' ? '#1FCC79' : 'black',
                marginBottom: 5
              }}>
                Directions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setRenderButton('nutritions')}>
              <Text style={{
                fontWeight: '500',
                fontSize: 20,
                color: renderButton == 'nutritions' ? '#1FCC79' : 'black',
                marginBottom: 5
              }}>
                Nutrition Facts
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{
            marginTop: 20,
            backgroundColor: '#f9f9f9',
            borderRadius: 8,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'stretch',
            flex: 1,
            flexDirection: 'column'
          }}>
            {
              renderButton === 'directions'
              ?
                recipe.analyzedInstructions[0]?.steps.map((el, idx) => {
                  return <Text key={idx} style={{
                    fontWeight: '500',
                    fontSize: 12,
                    color: 'black',
                    marginBottom: 5
                  }}>
                    { el.number }. { el.step }
                  </Text>
                })
              : recipe.nutrition?.nutrients?.map((el, idx) => {
                return <View key={idx} style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 5
                }}>
                  <Text>{ el.title }</Text>
                  <View style={{
                    flexDirection: 'row'
                  }}>
                    <Text style={{marginRight: 5}}>{ el.amount }</Text>
                    <Text>{ el.unit }</Text>
                  </View>
                </View>
              })
            }
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({})
