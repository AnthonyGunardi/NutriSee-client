import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = (props) => {
  return (
      <Onboarding
      onSkip={() => props.navigation.replace("LoginScreen")}
      onDone={() => props.navigation.navigate("LoginScreen")}
      pages={[
        {
          backgroundColor: '#a6e4d0',
          image: <Image source={require('../../assets/images/onboarding-img1.png')} />,
          title: 'NutriSee',
          subtitle: 'A Mobile App For a Healthier Lifestyle',
        },
        {
          backgroundColor: '#fdeb93',
          image: <Image source={require('../../assets/images/onboarding-img2.png')} />,
          title: 'Take a Shot of Your Food',
          subtitle: 'NutriSee Can Recommend Healthy Recipes Based on the Available Ingredients',
        },
        {
          backgroundColor: '#e9bcbe',
          image: <Image source={require('../../assets/images/onboarding-img3.png')} />,
          title: 'Be Healthy and Happy!',
          subtitle: "Remember to Keep your Body Functioning at Rest, and Let's Get Started",
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
container: {
  flex: 1, 
  alignItems: 'center', 
  justifyContent: 'center'
},
});