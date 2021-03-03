import React, { useEffect } from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'
import { signOut } from '../store/actions/userAction'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = (props) => {
  const { user } = useSelector(state => state)
  useEffect(() => {
    console.log(user.userPhoto)
  }, [user.userPhoto, user.userData])
  const dispatch = useDispatch()
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          {
            user.userPhoto ?
            <Avatar.Image 
            source={{uri:user.userPhoto}}
            size={80}
            /> :
            <Avatar.Image 
              source={require('../../assets/images/profile.jpg')}
              size={80}
            />
          }
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{user?.userData?.name}</Title>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="gender-male-female" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{user?.userData?.gender}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{user?.userData?.email}</Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>{user?.userData?.bodystats?.weight}</Title>
            <Caption>kg</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>{user?.userData?.bodystats?.height}</Title>
            <Caption>cm</Caption>
          </View>
      </View>

      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox2, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>{user?.userData?.bmr}</Title>
            <Caption>cal/day</Caption>
          </View>
      </View>

      <View style={styles.menuWrapper}>
        {/* <TouchableRipple 
        onPress={() => {
          props.navigation.navigate("EditScreen")
        }}>
          <View style={styles.menuItem}>
            <Icon name="account" color="rgba(80,227,194,1)" size={25}/>
            <Text style={styles.menuItemText}>Edit</Text>
          </View>
        </TouchableRipple> */}
        <TouchableRipple 
          onPress={() => {
            dispatch(signOut())
            props.navigation.navigate("LoginScreen")
          }}>
          <View style={styles.menuItem}>
            <Icon name="logout" color="rgba(80,227,194,1)" size={25}/>
            <Text style={styles.menuItemText}>Log Out</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoBox2: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});