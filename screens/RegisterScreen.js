import { Image, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, View, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import amazon from "../assets/images/amazon.webp";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleRegister =  () => {
   

    const user = {
      name: name,
      email: email,
      password: password
    };


    axios.post("http://192.168.156.235:8000/register", user)
    .then((response) => {
        console.warn(response);
        Alert.alert("Registered Successfully");
        setName("");
        setPassword("");
        setEmail("");
    })
    .catch((error) => {
        console.log(error);
        Alert.alert("Registration Failed");
    });

  }
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image style={styles.logo} source={amazon} />
      </View>
      <KeyboardAvoidingView behavior="padding" style={styles.form}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Register to your account</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <FontAwesome name="user" size={24} style={styles.icon} color="gray" />
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor="gray"
            />
          </View>
          <View style={styles.inputWrapper}>
            <AntDesign name="lock" size={24} style={styles.icon} color="gray" />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="gray"
              secureTextEntry={true}
            />
          </View>
          <View style={styles.inputWrapper}>
            <MaterialIcons name="email" size={24} style={styles.icon} color="gray" />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="gray"
            />
          </View>
        </View>
        <View style={styles.options}>
          <Text>Keep me logged in</Text>
          <Pressable onPress={() => console.log("Forgot Password pressed")}>
            <Text style={styles.forgotPassword}>Forgot Password</Text>
          </Pressable>
        </View>
        <View style={styles.registerButtonContainer}>
          <Pressable style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Register</Text>
          </Pressable>
          <Pressable style={styles.signInLink} onPress={() => navigation.goBack()}>
            <Text style={styles.signInText}>Already have an account? Sign in</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 100,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#041E42',
  },
  inputContainer: {
    marginTop: 70,
  },
  inputWrapper: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 30,
    marginLeft: 30,
    backgroundColor: "#D0D0D0",
    gap: 5,
  },
  icon: {
    marginLeft: 8,
  },
  input: {
    color: "gray",
    marginVertical: 10,
    width: 300,
  },
  options: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 30,
  },
  forgotPassword: {
    color: "#007FFF",
    fontWeight: '500',
  },
  registerButtonContainer: {
    marginTop: 80,
  },
  registerButton: {
    width: 200,
    backgroundColor: "#FEBE10",
    borderRadius: 6,
    padding: 15,
    alignSelf: 'center',
  },
  registerButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInLink: {
    marginTop: 15,
  },
  signInText: {
    textAlign: "center",
    color: 'gray',
    fontSize: 16,
  },
});
