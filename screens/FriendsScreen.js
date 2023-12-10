import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { UserType } from "../UserContecx";
import axios from "axios";
import FriendRequest from "../components/FriendRequest";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Logo } from "../assets";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FriendsScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [friendRequests, setFriendRequests] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  const fetchFriendRequests = async () => {
    try {
      const response = await axios.get(
        `http://192.168.8.154:8000/users/friend-request/${userId}`
      );
      if (response.status === 200) {
        const friendRequestsData = response.data.map((friendRequest) => ({
          _id: friendRequest._id,
          name: friendRequest.name,
          email: friendRequest.email,
          image: friendRequest.image,
        }));

        setFriendRequests(friendRequestsData);
        //setFriendRequests(response.data)
      }
    } catch (err) {
      console.log("error message", err);
    }
  };

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
          <AntDesign
            onPress={() => navigation.navigate("Home")}
            name="home"
            size={24}
            color="white"
          />
          <Ionicons
            onPress={() => navigation.navigate("Chats")}
            name="chatbox-ellipses-outline"
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

  return (
    // <View style={{ padding: 10, marginHorizontal: 12 }}>
    //   {friendRequests.length > 0 && <Text>Your Friend Requests!</Text>}

    //   {friendRequests.map((item, index) => (
    //     <FriendRequest
    //       key={index}
    //       item={item}
    //       friendRequests={friendRequests}
    //       setFriendRequests={setFriendRequests}
    //     />
    //   ))}
    // </View>

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
        <MaterialIcons name="people-outline" size={24} color="#1d6a6e" />
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#1d6a6e" }}>
          {friendRequests.length > 0 && <Text>Friend Requests</Text>}
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.AndroidSafeArea, { backgroundColor: "#edf6f7" }]}
      >
        <Pressable style={{ padding:10}}>
          {friendRequests?.map((item, index) => (
            <FriendRequest
              key={index}
              item={item}
              friendRequests={friendRequests}
              setFriendRequests={setFriendRequests}
            />
          ))}
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({});
