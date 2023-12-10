import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Logo } from "../assets";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const navigation = useNavigation();

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
      image: image,
    };

    // send a POST  request to the backend API to register the user
    axios
      .post("http://192.168.8.154:8000/auth/register", user)
      .then((response) => {
        console.log(response.data);
        Alert.alert(
          "Registration successful",
          "You have been registered Successfully"
        );
        setName("");
        setEmail("");
        setPassword("");
        setImage("");
      })
      .catch((error) => {
        Alert.alert(
          "Registration Error",
          "An error occurred while registering"
        );
        console.log("registration failed", error);
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
          <Image source={Logo} style={{ height:70, width:70 }} resizeMode="contain" />
          <Text style={{ color: "#1d6a6e", fontSize: 17, fontWeight: "900" }}>
            Register
          </Text>

          <Text style={{ color: "#1d6a6e", fontSize: 17, fontWeight: "600", marginTop: 15 }}>
            Register To Your Account
          </Text>
        </View>

        <View style={{ marginTop: 30 }}>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#085a5e" }}>
              Name
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
              Email
            </Text>

            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
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
              Password
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
            onPress={handleRegister}
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
              Register
            </Text>
          </TouchableOpacity>

          <View
            
            style={{
                marginTop: 15,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
          >
            <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
              Already Have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={{ color: "#1d6a6e", fontWeight:"bold" }}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
