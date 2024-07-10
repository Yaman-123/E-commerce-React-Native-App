import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { UserType } from '../UserContext';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddressScreen = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [houseNo, setHouseNo] = useState('');
    const [street, setStreet] = useState('');
    const [landmark, setLandmark] = useState('');
    const [postalCode, setPostalCode] = useState('');

    const { userId, setUserId } = useContext(UserType);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                if (token) {
                    const decodedToken = jwtDecode(token);
                    const userId = decodedToken.userId;
                    setUserId(userId);
                } else {
                    throw new Error('No token found');
                }
            } catch (error) {
                console.error('Error fetching user ID:', error);
            }
        };

        fetchUser();
    }, []);

    console.log(userId);

    const handleAddress = async () => {
        const address = {
            name,
            mobileNo,
            houseNo,
            street,
            landmark,
            postalCode,
        };

        try {
            const response = await axios.post('http://192.168.156.235:8000/addresses', { userId, address });
            Alert.alert('Success', 'Address added successfully');
            setName('');
            setMobileNo('');
            setHouseNo('');
            setStreet('');
            setLandmark('');
            setPostalCode('');

            setTimeout(() => {
                navigation.goBack();
            }, 500);
        } catch (error) {
            console.error('Error adding address:', error.response ? error.response.data : error.message);
            Alert.alert('Error', 'Failed to add address');
        }
    };

    return (
        <ScrollView style={{ marginTop: 50 }}>
            <View style={{ height: 50, backgroundColor: '#00CED1' }} />
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Add a new address</Text>
                <TextInput
                    placeholderTextColor={'black'}
                    placeholder='India'
                    style={{ padding: 10, borderColor: '#D0D0D0', borderWidth: 1, marginTop: 10, borderRadius: 5 }}
                />
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Full name (First and Last name)</Text>
                    <TextInput
                        placeholderTextColor={'black'}
                        value={name}
                        onChangeText={(text) => setName(text)}
                        placeholder='Enter your name'
                        style={{ padding: 10, borderColor: '#D0D0D0', borderWidth: 1, marginTop: 10, borderRadius: 5 }}
                    />
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Mobile No.</Text>
                    <TextInput
                        placeholderTextColor={'black'}
                        value={mobileNo}
                        onChangeText={(text) => setMobileNo(text)}
                        placeholder='Mobile No'
                        style={{ padding: 10, borderColor: '#D0D0D0', borderWidth: 1, marginTop: 10, borderRadius: 5 }}
                    />
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Flat, House No, Building, Company</Text>
                    <TextInput
                        placeholderTextColor={'black'}
                        value={houseNo}
                        onChangeText={(text) => setHouseNo(text)}
                        style={{ padding: 10, borderColor: '#D0D0D0', borderWidth: 1, marginTop: 10, borderRadius: 5 }}
                    />
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Area, Street, Sector, Village</Text>
                    <TextInput
                        placeholderTextColor={'black'}
                        value={street}
                        onChangeText={(text) => setStreet(text)}
                        placeholder='Enter your street'
                        style={{ padding: 10, borderColor: '#D0D0D0', borderWidth: 1, marginTop: 10, borderRadius: 5 }}
                    />
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Landmark</Text>
                    <TextInput
                        placeholderTextColor={'black'}
                        value={landmark}
                        onChangeText={(text) => setLandmark(text)}
                        placeholder='Eg. near Aggarwal Copy House'
                        style={{ padding: 10, borderColor: '#D0D0D0', borderWidth: 1, marginTop: 10, borderRadius: 5 }}
                    />
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Pincode</Text>
                    <TextInput
                        placeholderTextColor={'black'}
                        value={postalCode}
                        onChangeText={(text) => setPostalCode(text)}
                        placeholder='Enter your pincode'
                        style={{ padding: 10, borderColor: '#D0D0D0', borderWidth: 1, marginTop: 10, borderRadius: 5 }}
                    />
                </View>
                <Pressable
                    onPress={handleAddress}
                    style={{ backgroundColor: '#FFC72C', padding: 19, borderRadius: 6, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                >
                    <Text>Add Address</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

export default AddressScreen;

const styles = StyleSheet.create({});
