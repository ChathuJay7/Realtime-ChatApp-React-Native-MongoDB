import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { UserType } from "../UserContecx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode, { jwtDecode } from 'jwt-decode';
import "core-js/stable/atob";
import axios from "axios";


const HomeScreen = () => {
  const navigation = useNavigation();
  const {userId, setUserId} = useContext(UserType);
  const [users, setUsers] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => <Text style={{ fontSize: 16, fontWeight: "bold" }}>Swift Chat</Text>,
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Ionicons onPress={() => navigation.navigate("Chats")} name="chatbox-ellipses-outline" size={24} color="black" />
          <MaterialIcons
            onPress={() => navigation.navigate("Friends")}
            name="people-outline"
            size={24}
            color="black"
          />
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        console.log(token)
        if (token) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;
          setUserId(userId);
          console.log(userId)

          const response = await axios.get(`http://192.168.8.154:8000/users/${userId}`);
          setUsers(response.data);
        }
      } catch (error) {
        console.log('Error retrieving users', error);
      }
    };

    fetchUsers();
  }, []);

  console.log("users", users);

  return (
    <View>
      <Text>HomeScreen</Text>
      <TouchableOpacity onPress={() => AsyncStorage.removeItem('authToken')}><Text>Logout</Text></TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
