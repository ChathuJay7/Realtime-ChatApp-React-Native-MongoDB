import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Logo } from "../assets";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();


  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      if (token) {
        navigation.replace("Home");
      } else {
        // token not found , show the login screen itself
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post("http://192.168.8.154:8000/auth/login", user)
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);

        navigation.replace("Home");
      })
      .catch((error) => {
        Alert.alert("Login Error", "Invalid email or password");
        console.log("Login Error", error);
      });
  };

  return (
    <View
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
            Sign In
          </Text>

          <Text style={{ color: "#1d6a6e", fontSize: 17, fontWeight: "600", marginTop: 15 }}>
            Sign In To Your Account
          </Text>
        </View>

        <View style={{ marginTop: 50 }}>
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
                color: "#027378"
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
                color: "#027378"
              }}
              placeholderTextColor={"#03848a"}
              placeholder="Enter Your Passowrd"
            />
          </View>

          <TouchableOpacity
            onPress={handleLogin}
            style={{
              width: 200,
              backgroundColor: "#1d6a6e",
              padding: 15,
              marginTop: 50,
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
              Login
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
              Dont't have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={{ color: "#1d6a6e", fontWeight: "bold" }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
