import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { UserType } from '../UserContext';
import axios from 'axios';

const AddAddressScreen = () => {
  const navigation = useNavigation();
  const { userId } = useContext(UserType);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`http://192.168.156.235:8000/addresses/${userId}`);
      const { addresses } = response.data;
      setAddresses(addresses);
    } catch (err) {
      console.log(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [])
  );

  const deleteAddress = async (addressId) => {
    try {
      await axios.delete(`http://192.168.156.235:8000/addresses/${userId}/${addressId}`);
      fetchAddresses();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 50 }}>
      <View style={{ padding: 10, backgroundColor: "#00CED1", flexDirection: 'row', alignItems: 'center' }}>
        <Pressable style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 7, gap: 10, backgroundColor: 'white', borderRadius: 3, height: 38, flex: 1 }}>
          <Feather style={{ paddingLeft: 10 }} name="search" size={24} color="black" />
          <TextInput placeholder="Search Amazon.in" />
        </Pressable>
        <FontAwesome name="microphone" size={24} color="black" />
      </View>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Your Addresses</Text>
        <Pressable onPress={() => navigation.navigate("Add")} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10, borderColor: "#D0D0D0", borderWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, paddingVertical: 7, paddingHorizontal: 5 }}>
          <Text>Add a new Address</Text>
          <Feather name="arrow-right" size={24} color="black" />
        </Pressable>
        {
          addresses.map((item, index) => (
            <Pressable style={{ borderWidth: 1, borderColor: "#D0D0D0", padding: 10, flexDirection: "column", gap: 5, marginVertical: 10 }} key={index}>
              <View style={{ flexDirection: 'row', gap: 3, alignItems: "center" }}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>{item.name}</Text>
                <Entypo name="location-pin" size={24} color="red" />
              </View>
              <Text style={{ fontSize: 15, color: "#181818" }}>{item.houseNo},{item.landmark}</Text>
              <Text style={{ fontSize: 15, color: "#181818" }}>{item.street}</Text>
              <Text style={{ fontSize: 15, color: "#181818" }}>India, Haryana</Text>
              <Text style={{ fontSize: 15, color: "#181818" }}>Mobile No : {item.mobileNo}</Text>
              <Text style={{ fontSize: 15, color: "#181818" }}>Postal-code : {item.postalCode}</Text>
              <View style={{ flexDirection: 'row', alignItems: "center", gap: 10, marginTop: 7 }}>
                <Pressable style={{ backgroundColor: "#F5F5F5", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 5, borderWidth: 0.9, borderColor: "#D0D0D0" }}>
                  <Text>Edit</Text>
                </Pressable>
                <Pressable onPress={() => deleteAddress(item._id)} style={{ backgroundColor: "#F5F5F5", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 5, borderWidth: 0.9, borderColor: "#D0D0D0" }}>
                  <Text>Remove</Text>
                </Pressable>
                <Pressable style={{ backgroundColor: "#F5F5F5", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 5, borderWidth: 0.9, borderColor: "#D0D0D0" }}>
                  <Text>Set as default</Text>
                </Pressable>
              </View>
            </Pressable>
          ))
        }
      </View>
    </ScrollView>
  );
}

export default AddAddressScreen;

const styles = StyleSheet.create({});
