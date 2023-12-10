import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserType } from "../UserContecx";
import { FontAwesome5 } from "@expo/vector-icons";

const User = ({ item }) => {
  const { userId, setUserId } = useContext(UserType);
  const [requestSent, setRequestSent] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const [userFriends, setUserFriends] = useState([]);

  const sendFriendRequest = async (currentUserId, selectedUserId) => {
    try {
      const response = await fetch(
        "http://192.168.8.154:8000/users/friend-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ currentUserId, selectedUserId }),
        }
      );

      if (response.ok) {
        setRequestSent(true);
      }
    } catch (error) {
      console.log("error message", error);
    }
  };

  useEffect(() => {
    fetchFriendRequests();
    fetchUserFriends();
  }, []);

  const fetchFriendRequests = async () => {
    try {
      const response = await fetch(
        `http://192.168.8.154:8000/users/sent-friend-requests/${userId}`
      );

      const data = await response.json();
      if (response.ok) {
        setFriendRequests(data);
      } else {
        console.log("error", response.status);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchUserFriends = async () => {
    try {
      const response = await fetch(
        `http:/192.168.8.154:8000/users/friends/${userId}`
      );

      const data = await response.json();

      if (response.ok) {
        setUserFriends(data);
      } else {
        console.log("error retrieving user friends", response.status);
      }
    } catch (error) {
      console.log("Error message", error);
    }
  };
  console.log(friendRequests);

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        borderBottomWidth:0.7,
        borderColor: "#8baeb0",
        paddingBottom:2,

      }}
    >
      <View>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            resizeMode: "cover",
          }}
          source={{ uri: item.image }}
        />
      </View>

      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={{ fontWeight: "bold" }}>{item?.name}</Text>
        <Text style={{ marginTop: 4, color: "gray" }}>{item?.email}</Text>
      </View>

      {/* <TouchableOpacity
        onPress={() => sendFriendRequest(userId, item._id)}
        style={{
          backgroundColor: "#567189",
          padding: 10,
          borderRadius: 6,
          width: 105,
        }}
      >
        <Text style={{ textAlign: "center", color: "white", fontSize: 13 }}>
          Add Friend
        </Text>
      </TouchableOpacity> */}
      {userFriends.includes(item._id) ? (
        <TouchableOpacity
          style={{
            //backgroundColor: "#18585c",
            padding: 10,
            width: 105,
            borderRadius: 6,
            alignItems:"center"
          }}
        >
          <FontAwesome5 name="user-friends" size={24} color="#18585c" />
        </TouchableOpacity>

      ) : requestSent ||
        friendRequests.some((friend) => friend._id === item._id) ? (
        <Pressable
          style={{
            backgroundColor: "gray",
            padding: 10,
            width: 105,
            borderRadius: 6,
          }}
        >
          <Text style={{ textAlign: "center", color: "white", fontSize: 13 }}>
            Request Sent
          </Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => sendFriendRequest(userId, item._id)}
          style={{
            backgroundColor: "#567189",
            padding: 10,
            borderRadius: 6,
            width: 105,
          }}
        >
          <Text style={{ textAlign: "center", color: "white", fontSize: 13 }}>
            Add Friend
          </Text>
        </Pressable>
      )}
    </TouchableOpacity>
  );
};

export default User;

const styles = StyleSheet.create({});
