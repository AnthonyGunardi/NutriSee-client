import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, StatusBar } from "react-native";
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function CardBody(props) {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Details", {
          recipeId: props.recipe.id
        })
      }}>
      <View style={styles.card}>
        <View style={styles.cardImgWrapper}>
          <Image
            source={{uri: props.recipe.image}}
            resizeMode="cover"
            style={styles.cardImg}
          />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{props.recipe.title}</Text>
          {/* <StarRating ratings={4} reviews={99} /> */}
          {
            props.recipe.aggregateLikes ?
            <View style={{flexDirection: 'row', marginTop: 10}}>
            <Icon name="heart-outline" color="rgba(80,227,194,1)" size={20}/>
            <Text style={styles.cardDetails}>
              {props.recipe.aggregateLikes} likes
            </Text>
            </View>
            :
            <View style={{flexDirection: 'row', marginTop: 10}}>
            <Icon name="heart-outline" color="rgba(80,227,194,1)" size={20}/>
            <Text style={styles.cardDetails}>
              {props.recipe.likes} likes
            </Text>
            </View>
          }
        </View>
      </View>
    </TouchableOpacity>
    // <TouchableOpacity 
    //   style={[styles.container, props.style]} 
    //   onPress={() => {
    //     navigation.navigate("Details", {
    //       recipeId: props.recipe.id
    //     })
    //   }}>
    //   <Image
    //     source={{
    //       uri: props.recipe.image
    //     }}
    //     style={styles.cardItemImagePlace}
    //   ></Image>
    //   <View style={styles.cardBody}>
    //     <View style={styles.bodyContent}>
    //       {
    //         props.recipe.readyInMinutes ?
    //         <View>
    //         <Text style={styles.titleStyle}>{ props.recipe.title }</Text>
    //         <Text style={styles.subtitleStyle}>Ready in : { props.recipe.readyInMinutes } minutes</Text>
    //         </View>
    //         :
    //         <Text style={styles.titleStyle}>{ props.recipe.title }</Text>
    //       }
    //     </View>
    //   </View>
    // </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#CCC",
    flexWrap: "nowrap",
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
    overflow: "hidden"
  },
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
    marginLeft: 5
  },
});

export default CardBody;