import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { ScrollView } from "react-native";
import EmojiSelector from "react-native-emoji-selector";
import { UserType } from "../UserContecx";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const MessageScreen = () => {
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [recepientData, setRecepientData] = useState();
  const [messages, setMessages] = useState([]);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const scrollViewRef = useRef(null);

  const { userId, setUserId } = useContext(UserType);

  const navigation = useNavigation();
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

      const response = await fetch(
        "http://192.168.8.154:8000/message/send-message",
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.ok) {
        setMessage("");
        setSelectedImage("");

        fetchMessages();
      }
    } catch (error) {
      console.log("error in sending the message", error);
    }
  };

  useEffect(() => {
    fetchRecepientData();
    fetchMessages();
  }, []);

  const fetchRecepientData = async () => {
    try {
      const response = await fetch(
        `http://192.168.8.154:8000/users/recepient-details/${recepientId}`
      );

      const data = await response.json();
      setRecepientData(data);
    } catch (error) {
      console.log("error retrieving details", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `http://192.168.8.154:8000/message/${userId}/${recepientId}`
      );
      const data = await response.json();

      if (response.ok) {
        setMessages(data);
        setIsLoading(false);
      } else {
        console.log("error showing messags", response.status.message);
      }
    } catch (error) {
      console.log("error fetching messages", error);
    }
  };

  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled) {
      handleSend("image", result.uri);
    }
  };

  const handleSelectMessage = (message) => {
    //check if the message is already selected
    const isSelected = selectedMessages.includes(message._id);

    if (isSelected) {
      setSelectedMessages((previousMessages) =>
        previousMessages.filter((id) => id !== message._id)
      );
    } else {
      setSelectedMessages((previousMessages) => [
        ...previousMessages,
        message._id,
      ]);
    }
  };

  console.log("Selected Messages : ", selectedMessages);

  const deleteMessages = async (messageIds) => {
    try {
      const response = await fetch(
        "http://192.168.8.154:8000/message/deleteMessages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ messages: messageIds }),
        }
      );

      if (response.ok) {
        setSelectedMessages((prevSelectedMessages) =>
          prevSelectedMessages.filter((id) => !messageIds.includes(id))
        );

        fetchMessages();
      } else {
        console.log("error deleting messages", response.status);
      }
    } catch (error) {
      console.log("error deleting messages", error);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  };

  const handleContentSizeChange = () => {
    scrollToBottom();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#18585c",
      },
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={24}
            color="white"
          />

          {selectedMessages.length > 0 ? (
            <View>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                {selectedMessages.length}
              </Text>
            </View>
          ) : (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Image
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  resizeMode: "cover",
                }}
                source={{ uri: recepientData?.image }}
              />

              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {recepientData?.name}
              </Text>
            </View>
          )}
        </View>
      ),
      headerRight: () =>
        selectedMessages.length > 0 ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Ionicons name="md-arrow-redo-sharp" size={24} color="white" />
            <Ionicons name="md-arrow-undo" size={24} color="white" />
            <FontAwesome name="star" size={24} color="white" />
            <MaterialIcons
              onPress={() => deleteMessages(selectedMessages)}
              name="delete"
              size={24}
              color="white"
            />
          </View>
        ) : null,
    });
  }, [recepientData, selectedMessages]);

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#edf6f7" }}>
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
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{ flexGrow: 1 }}
            onContentSizeChange={handleContentSizeChange}
          >
            {messages.map((item, index) => {
              if (item.messageType === "text") {
                const isSelected = selectedMessages.includes(item._id);
                return (
                  <Pressable
                    onLongPress={() => handleSelectMessage(item)}
                    key={index}
                    style={[
                      item?.senderId?._id === userId
                        ? {
                            alignSelf: "flex-end",
                            backgroundColor: "#8bcccc",
                            padding: 8,
                            maxWidth: "60%",
                            borderRadius: 7,
                            margin: 10,
                          }
                        : {
                            alignSelf: "flex-start",
                            backgroundColor: "white",
                            padding: 8,
                            margin: 10,
                            borderRadius: 7,
                            maxWidth: "60%",
                          },

                      isSelected && {
                        width: "100%",
                        backgroundColor: "#F0FFFF",
                      },
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        textAlign: isSelected ? "right" : "left",
                      }}
                    >
                      {item?.message}
                    </Text>
                    <Text
                      style={{
                        textAlign: "right",
                        fontSize: 13,
                        color: "gray",
                        marginTop: 5,
                      }}
                    >
                      {formatTime(item.timeStamp)}
                    </Text>
                  </Pressable>
                );
              }

              if (item.messageType === "image") {
                // const baseUrl = "F:/Programming/Mobile Development/React Native/Sujan Anand/realtime-chat/api/files/";
                // const imageUrl = item.imageUrl.replace(/\\/g, '/');
                // const filename = imageUrl.split("/").pop();
                // const source = { uri: `${baseUrl}${filename}` };


                const baseUrl ="/Users/sujananand/Build/messenger-project/api/files/";
                const imageUrl = item.imageUrl;
                const filename = imageUrl.split("/").pop();
                const source = { uri: baseUrl + filename };
                // const baseUrl = "/api/files/";
                // const imageUrl = item.imageUrl.replace(/\\/g, "/");
                // const filename = imageUrl.split("/").pop();
                // const source =  `${baseUrl}${filename}` ;

                console.log(source);

                return (
                  <Pressable
                    key={index}
                    style={[
                      item?.senderId?._id === userId
                        ? {
                            alignSelf: "flex-end",
                            backgroundColor: "#8bcccc",
                            padding: 8,
                            maxWidth: "60%",
                            borderRadius: 7,
                            margin: 10,
                          }
                        : {
                            alignSelf: "flex-start",
                            backgroundColor: "white",
                            padding: 8,
                            margin: 10,
                            borderRadius: 7,
                            maxWidth: "60%",
                          },
                    ]}
                  >
                    <View>
                      <Image
                        source={source}
                        style={{ width: 200, height: 200, borderRadius: 7 }}
                      />
                      <Text
                        style={{
                          textAlign: "right",
                          fontSize: 13,
                          position: "absolute",
                          right: 10,
                          bottom: 7,
                          color: "gray",
                          marginTop: 5,
                        }}
                      >
                        {formatTime(item?.timeStamp)}
                      </Text>
                    </View>
                  </Pressable>
                );
              }
            })}
          </ScrollView>
        </>
      )}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 10,
          //borderTopWidth: 1,
          backgroundColor: "#8bcccc",
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
          <Entypo onPress={pickImage} name="camera" size={24} color="gray" />

          <Feather name="mic" size={24} color="gray" />
        </View>

        <Pressable
          onPress={() => handleSend("text")}
          style={{
            backgroundColor: "#18585c",
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
