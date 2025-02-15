import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import ProductinfoScreen from '../screens/ProductinfoScreen';
import AddAddressScreen from '../screens/AddAddressScreen';
import AddressScreen from '../screens/AddressScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';
import OrderScreen from '../screens/OrderScreen';
const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator()
    function BottomTabs() {
        return (
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} options={{
                    tabBarLabel: 'Home',
                    tabBarStyle: { color: "#008E97" },
                    headerShown: false,
                    tabBarIcon: ({ focused }) => focused ? (<AntDesign name="home" size={24} color="#008E97" />) : (<Entypo name="home" size={24} color="black" />),
                }} />
                <Tab.Screen name="Profile" component={ProfileScreen} options={{
                    tabBarLabel: 'Profile',
                    tabBarStyle: { color: "#008E97" },
                    headerShown: false,
                    tabBarIcon: ({ focused }) => focused ? (<Ionicons name="person" size={24} color="#008E97" />) : (<Ionicons name="person-outline" size={24} color="black" />),
                }} />
                <Tab.Screen name="Cart" component={CartScreen} options={{
                    tabBarLabel: 'Cart',
                    tabBarStyle: { color: "#008E97" },
                    headerShown: false,
                    tabBarIcon: ({ focused }) => focused ? (<FontAwesome6 name="cart-shopping" size={24} color="#008E97" />) : (<FontAwesome6 name="cart-shopping" size={24} color="black" />),
                }} />
            </Tab.Navigator>
        )
    }
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
                <Stack.Screen name="Info" component={ProductinfoScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Address" component={AddAddressScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Add" component={AddressScreen} options={{headerShown:false}}/>
                <Stack.Screen name="confirmation" component={ConfirmationScreen} options={{headerShown:false}}/>
                <Stack.Screen name="order" component={OrderScreen} options={{headerShown:false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})