import {
    Alert,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Logo } from "../assets";
import { UserType } from "../UserContecx";
import axios from "axios";

const ProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(image);
  const navigation = useNavigation();

  const { userId, setUserId } = useContext(UserType);

  useEffect(() => {
    fetchUsertData();
  }, []);

  const fetchUsertData = async () => {
    try {
      const response = await fetch(
        `http://192.168.8.154:8000/users/recepient-details/${userId}`
      );

      const data = await response.json();
      setName(data.name);
      setEmail(data.email);
      setPassword(data.password);
      setImage(data.image);
    } catch (error) {
      console.log("error retrieving details", error);
    }
  };

  const handleUpdateUser = () => {
    const user = {
      name: name,
      //remail: email,
      password: password,
      image: image,
    };

    // send a POST  request to the backend API to register the user
    axios
      .put(`http://192.168.8.154:8000/users/update-user/${userId}`, user)
      .then((response) => {
        console.log(response.data);
        Alert.alert(
          "Updated successful",
        );

      })
      .catch((error) => {
        Alert.alert(
          "Update Error",
          "An error occurred while update"
        );
        console.log("Update failed", error);
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#edf6f7",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: image }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 15,
              resizeMode: "cover",
              borderRadius: 50,
            }}
          />
          <Text style={{ color: "#1d6a6e", fontSize: 17, fontWeight: "900" }}>
            {name}
          </Text>
        </View>

        <View style={{ marginTop: 30 }}>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#085a5e" }}>
              Name <Text style={{ color: "#b80059" }}>*</Text>
            </Text>

            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomColor: "#085a5e",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
              placeholderTextColor={"#03848a"}
              placeholder="Enter your name"
            />
          </View>

          <View>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#085a5e" }}>
              Email <Text style={{ color: "#b80059" }}>*</Text>
            </Text>

            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              editable={false}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomColor: "#085a5e",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
              placeholderTextColor={"#03848a"}
              placeholder="Enter Your Email"
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#085a5e" }}>
              Password <Text style={{ color: "#b80059" }}>*</Text>
            </Text>

            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomColor: "#085a5e",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
              placeholderTextColor={"#03848a"}
              placeholder="Enter Your Passowrd"
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#085a5e" }}>
              Image
            </Text>

            <TextInput
              value={image}
              onChangeText={(text) => setImage(text)}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomColor: "#085a5e",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
              placeholderTextColor={"#03848a"}
              placeholder="Add Image URL"
            />
          </View>

          <TouchableOpacity
            onPress={handleUpdateUser}
            style={{
              width: 200,
              backgroundColor: "#1d6a6e",
              padding: 15,
              marginTop: 30,
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Update
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
