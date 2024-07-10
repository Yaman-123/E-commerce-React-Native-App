import { Alert, Image, KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import amazon from "../assets/images/amazon.webp"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigation = useNavigation()
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken")
                if (token) {
                    navigation.replace("Main")
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        checkLoginStatus()
    }, [])
    const handleLogin = () => {
        const user = {
            email: email,
            password: password
        }

        axios.post("http://192.168.156.235:8000/login", user).then((response) => {
            console.warn(response);
            const token = response.data.token
            AsyncStorage.setItem('authToken', token);
            navigation.replace("Main")
        }).catch((error) => {
            console.log(error);
            Alert.alert("Login Failed");
        });
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
            <View>
                <Image style={{ width: 150, height: 100 }} source={amazon} />
            </View>
            <KeyboardAvoidingView behavior="padding">
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', marginTop: 12, color: '#041E42' }} >Login to your account</Text>
                </View>
                <View style={{ marginTop: 70 }}>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, borderRadius: 5, backgroundColor: "#D0D0D0", gap: 5 }}>
                            <MaterialIcons style={{ marginLeft: 8 }} name="email" size={24} color="gray" />
                            <TextInput value={email} onChangeText={(text) => setEmail(text)} style={{ color: "gray", marginVertical: 10, width: 300, fontSize: 18 }} placeholder="Enter your email" />
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 30, alignItems: 'center', paddingVertical: 5, borderRadius: 5, backgroundColor: "#D0D0D0", gap: 5 }}>
                            <AntDesign name="lock" size={24} style={{ marginLeft: 8 }} color="gray" />
                            <TextInput value={password} onChangeText={(text) => setPassword(text)} style={{ color: "gray", marginVertical: 10, width: 300 }} placeholder="Enter your password" secureTextEntry={true} />
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 12, flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text>Keep me logged in</Text>
                    <Pressable onPress={() => console.log("Forgot Password pressed")}>
                        <Text style={{ color: "#007FFF", fontWeight: '500' }}>Forgot Password</Text>
                    </Pressable>
                </View>
                <View style={{ marginTop: 80 }}>
                    <Pressable onPress={handleLogin} style={{ width: 200, backgroundColor: "#FEBE10", borderRadius: 6, marginLeft: 'auto', marginRight: 'auto', padding: 15 }}>
                        <Text style={{ textAlign: 'center', color: 'white', fontSize: 16, fontWeight: 'bold' }}>Login</Text>
                    </Pressable>
                    <Pressable style={{ marginTop: 15 }} onPress={() => navigation.navigate('Register')}>
                        <Text style={{ textAlign: "center", color: 'gray', fontSize: 16 }}>Don't have an account? Sign up</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})
