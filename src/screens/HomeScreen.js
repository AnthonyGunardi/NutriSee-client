import React, { useEffect, useState } from "react";
import { StyleSheet, View, StatusBar, ScrollView, Dimensions, Image, Text } from "react-native";
import CardBody from "../components/CardBody";
import { fetchRecipes } from '../store/actions/recipeAction'
import { useDispatch, useSelector } from 'react-redux'
import Swiper from 'react-native-swiper'
import AppLoading from 'expo-app-loading'
import { set } from "react-native-reanimated";

const { width } = Dimensions.get('screen')

function HomeScreen(props) {
  const { recipe, user } = useSelector(state => state)
  const [isLoading, setLoading] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchRecipes())
    setLoading(true)
    // console.log(recipe.recipes)
  }, [])

  if(!isLoading) {
    <Text>Please Wait..</Text>
  }

  return (
    <View style={styles.container}>
      <StatusBar
        hidden
        barStyle="light-content"
        backgroundColor="rgba(0,0,0,1)"
      />
      <View style={styles.sliderContainer}>
        <Swiper
          autoplay
          horizontal={false}
          height={200}
          activeDotColor="#FF6347">
          <View style={styles.slide}>
            <Image
              source={require('../../assets/banners/food-banner1.jpg')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../../assets/banners/food-banner2.jpg')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../../assets/banners/food-banner3.jpg')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
        </Swiper>
      </View>
      {
        !recipe.recipes ? 
        <AppLoading/> :
      <View style={styles.cardsWrapper}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333',
            marginBottom: 20
          }}>
          Today's Healthy Recipes
        </Text>
        <ScrollView>
          {
          recipe.recipes?.map(recipe => {
            return (
              <CardBody
              key={recipe.id}
              recipe={recipe}
              />
              )
            })
          }
        </ScrollView>
      </View>
      }

  </View>
      
    // <View style={styles.container}>
    //   <StatusBar
    //     hidden
    //     barStyle="light-content"
    //     backgroundColor="rgba(0,0,0,1)"
    //   />
    //   <Headers style={styles.Headers}></Headers>
    //   <View style={styles.scrollArea}>
    //     <ScrollView
    //       horizontal={false}
    //     >
    //       {
    //         recipe.recipes?.map(recipe => {
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  sliderContainer: {
    height: 200,
    width: '90%',
    marginTop: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },

  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  categoryBtn: {
    flex: 1,
    width: '30%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#fdeae7' /* '#FF6347' */,
    borderRadius: 50,
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    color: '#de4f35',
  },
  cardsWrapper: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  }
});

export default HomeScreen;
