import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Pressable } from 'react-native'

const UserChat = ({ item }) => {
  return (
    <Pressable
    //   onPress={() =>
    //     navigation.navigate("Messages", {
    //       recepientId: item._id,
    //     })
    //   }
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderWidth: 0.7,
        borderColor: "#D0D0D0",
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        padding: 10,
      }}
    >
      <Image
        style={{ width: 50, height: 50, borderRadius: 25, resizeMode: "cover" }}
        source={{ uri: item?.image }}
      />

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>{item?.name}</Text>
        {/* {lastMessage && (
          <Text style={{ marginTop: 3, color: "gray", fontWeight: "500" }}>
            {lastMessage?.message}
          </Text>
        )} */}
        <Text style={{ marginTop: 3, color: "gray", fontWeight: "500" }}>Last Message</Text>
      </View>

      <View>
        <Text style={{ fontSize: 11, fontWeight: "400", color: "#585858" }}>
          {/* {lastMessage && formatTime(lastMessage?.timeStamp)} */}
          11.19 p.m
        </Text>
      </View>
    </Pressable>
  )
}

export default UserChat

const styles = StyleSheet.create({})