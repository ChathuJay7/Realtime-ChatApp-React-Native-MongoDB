import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { Logo } from '../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {

    const navigation = useNavigation();

    const checkLoginStatus = async () => {
        try {
          const token = await AsyncStorage.getItem("authToken");
    
          if (token) {
            navigation.replace("Home");
          } else {
            navigation.replace("Login");
          }
        } catch (error) {
          console.log("error", error);
        }
      };
    
      useEffect(() => {
        checkLoginStatus();
      }, []);

  return (
    <View style={{ flex:1, alignItems:"center", justifyContent:"center", gap:20, backgroundColor:"#edf6f7" }} >
      <Image source={Logo} style={{ height:50, width:50 }} resizeMode='contain'/>
      <ActivityIndicator size={"large"} color={"#43C651"}/>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})