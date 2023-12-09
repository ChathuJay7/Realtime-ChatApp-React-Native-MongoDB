import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import EmojiSelector from "react-native-emoji-selector";
import { UserType } from "../UserContecx";
import { useRoute } from "@react-navigation/native";

const MessageScreen = () => {

  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  
  const { userId, setUserId } = useContext(UserType);

  const route = useRoute();
  const { recepientId } = route.params;

  const handleEmojiPress = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };

  const handleSend = async (messageType, imageUri) => {
    try {
      const formData = new FormData();
      formData.append("senderId", userId);
      formData.append("recepientId", recepientId);

      //if the message type id image or a normal text
      if (messageType === "image") {
        formData.append("messageType", "image");
        formData.append("imageFile", {
          uri: imageUri,
          name: "image.jpg",
          type: "image/jpeg",
        });
      } else {
        formData.append("messageType", "text");
        formData.append("messageText", message);
      }

      console.log("Sending request", formData);

      const response = await fetch("http://192.168.8.154:8000/message/send-message", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });

      if (response.ok) {
        setMessage("");
        setSelectedImage("");

        //fetchMessages();
      }
    } catch (error) {
      console.log("error in sending the message", error);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#F0F0F0" }}>
      <ScrollView></ScrollView>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: "#dddddd",
          marginBottom: showEmojiSelector ? 0 : 25,
        }}
      >
        <Entypo
          onPress={handleEmojiPress}
          style={{ marginRight: 5 }}
          name="emoji-happy"
          size={24}
          color="gray"
        />
        <TextInput
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: "#dddddd",
            borderRadius: 20,
            paddingHorizontal: 10,
          }}
          placeholder="Type Your message..."
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 7,
            marginHorizontal: 8,
          }}
        >
          <Entypo
            //onPress={pickImage}
            name="camera"
            size={24}
            color="gray"
          />

          <Feather name="mic" size={24} color="gray" />
        </View>

        <Pressable
          onPress={() => handleSend("text")}
          style={{
            backgroundColor: "#007bff",
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 20,
          }}
        >
          <Ionicons name="send" size={24} color="white" />
        </Pressable>
      </View>

      {showEmojiSelector && (
        <EmojiSelector
          onEmojiSelected={(emoji) => {
            setMessage((prevMessage) => prevMessage + emoji);
          }}
          style={{ height: 250 }}
        />
      )}

    </KeyboardAvoidingView>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({});
