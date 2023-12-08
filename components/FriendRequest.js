import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../UserContecx";

const FriendRequest = ({ item, friendRequests, setFriendRequests }) => {
  const { userId, setUserId } = useContext(UserType);
  const navigation = useNavigation();

  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
      }}
    >
      <Image
        style={{ width: 50, height: 50, borderRadius: 25 }}
        source={{ uri: item.image }}
      />

      <Text
        style={{ fontSize: 15, fontWeight: "bold", marginLeft: 10, flex: 1 }}
      >
        {item?.name} sent you a friend request!!
      </Text>

      <TouchableOpacity
        //onPress={() => acceptRequest(item._id)}
        style={{ backgroundColor: "#0066b2", padding: 10, borderRadius: 6 }}
      >
        <Text style={{ textAlign: "center", color: "white" }}>Accept</Text>
      </TouchableOpacity>
    </Pressable>
  );
};

export default FriendRequest;

const styles = StyleSheet.create({});
