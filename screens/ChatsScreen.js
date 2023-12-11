import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { UserType } from "../UserContecx";
import { useNavigation } from "@react-navigation/native";
import UserChat from "../components/UserChat";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Logo } from "../assets";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChatsScreen = () => {
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { userId, setUserId } = useContext(UserType);
  const navigation = useNavigation();

  useEffect(() => {
    acceptedFriendsList();
  }, []);

  const acceptedFriendsList = async () => {
    try {
      const response = await fetch(
        `http://192.168.8.154:8000/users/accepted-friends/${userId}`
      );
      const data = await response.json();

      if (response.ok) {
        setAcceptedFriends(data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("error showing the accepted friends", error);
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <Image
            source={Logo}
            style={{ height: 25, width: 25 }}
            resizeMode="contain"
          />
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
        <Ionicons name="chatbox-ellipses-outline" size={24} color="#1d6a6e" />
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#1d6a6e" }}>
          Chat List
        </Text>
      </View>
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.AndroidSafeArea, { backgroundColor: "#edf6f7" }]}
      >
        <Pressable>
          {acceptedFriends.map((item, index) => (
            <UserChat key={index} item={item} />
          ))}
        </Pressable>
      </ScrollView> */}

      {isLoading ? (
        <>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator size={"large"} color={"#43C651"} />
          </View>
        </>
      ) : (
        <>
          {acceptedFriends?.length > 0 ? (
            <>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={[styles.AndroidSafeArea, { backgroundColor: "#edf6f7" }]}
              >
                <Pressable style={{backgroundColor:"#e3fcf9"}}>
                  {acceptedFriends.map((item, index) => (
                    <UserChat key={index} item={item} />
                  ))}
                </Pressable>
              </ScrollView>
            </>
          ) : (
            <>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ textAlign: "center", fontSize: 20 }}>
                  No Chats found
                </Text>
              </View>
            </>
          )}
        </>
      )}
    </View>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
