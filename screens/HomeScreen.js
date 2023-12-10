import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { UserType } from "../UserContecx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode, { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import axios from "axios";
import User from "../components/User";
import { StatusBar } from "expo-status-bar";
import { Logo } from "../assets";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [users, setUsers] = useState([]);

  const handleLogout = () => {
    AsyncStorage.removeItem("authToken");
    navigation.replace("Login");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#18585c",
      },
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent:"center", gap: 10 }}>
          <Image source={Logo} style={{ height:25, width:25 }} resizeMode="contain" />
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
            Chat App
          </Text>
        </View>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Ionicons
            onPress={() => navigation.navigate("Chats")}
            name="chatbox-ellipses-outline"
            size={24}
            color="white"
          />
          <MaterialIcons
            onPress={() => navigation.navigate("Friends")}
            name="people-outline"
            size={24}
            color="white"
          />
          <MaterialIcons
            onPress={() => handleLogout()}
            name="logout"
            size={24}
            color="#ffd1e8"
          />
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        setUserId(userId);

        const response = await axios.get(
          `http://192.168.8.154:8000/users/${userId}`
        );
        setUsers(response.data);
      }
    } catch (error) {
      console.log("Error retrieving users", error);
    }
  };

  console.log("users", users);

  return (
    <View style={{ flex: 1, backgroundColor: "#edf6f7" }}>
      <View
        style={{
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#bcd0d1",
          flexDirection: "row",
          gap: 10,
        }}
      >
        <AntDesign
          onPress={() => navigation.navigate("Home")}
          name="home"
          size={24}
          color="#1d6a6e"
        />
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#1d6a6e" }}>
          User List
        </Text>
      </View>
      <ScrollView
        style={[styles.AndroidSafeArea, { backgroundColor: "#edf6f7" }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ padding: 10 }}>
          {users.map((item, index) => (
            <User key={index} item={item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
