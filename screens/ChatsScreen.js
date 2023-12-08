import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserType } from "../UserContecx";
import { useNavigation } from "@react-navigation/native";
import UserChat from "../components/UserChat";

const ChatsScreen = () => {
  const [acceptedFriends, setAcceptedFriends] = useState([]);
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
      }
    } catch (error) {
      console.log("error showing the accepted friends", error);
    }
  };
  console.log(acceptedFriends)

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Pressable>
        {acceptedFriends.map((item, index) => (
          <UserChat key={index} item={item} />
        ))}
      </Pressable>
    </ScrollView>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({});
