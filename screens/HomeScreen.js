import { StyleSheet, Text, View, SafeAreaView, Platform, ScrollView, Pressable, TextInput, Image, Modal } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import Productitem from '../components/Productitem';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { UserType } from '../UserContext';


const HomeScreen = () => {
  const navigation = useNavigation()
  const [modal, setModal] = useState(false)
  const [SelectedAddress, setSelectedAddress] = useState("")
  console.log(SelectedAddress)
  const List = [
    {
      id: '0',
      image: "https://www.shutterstock.com/image-vector/vector-illustration-isolated-kitchen-blender-260nw-353584232.jpg",
      name: "Home"
    },
    {
      id: '1',
      image: "https://img.freepik.com/free-vector/  ging-deal-tag-shopping-sale-discount-vector_1017-46360.jpg",
      name: "Deals"
    },
    {
      id: '2',
      image: "https://m.media-amazon.com/images/I/41JACWT-wWL._AC_UF1000,1000_QL80_.jpg",
      name: "Electronics"
    },
    {
      id: '3',
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3rbxdnV_B37sV4tuWFoe65n1--FHwtiq2ug&s",
      name: "Mobiles"
    },

    {
      id: '4',
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaBFyZlS4P2CdmzK_rvQfif1EssgWHd-c3EQ&s",
      name: "Music"
    },
    {
      id: '5',
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPJbLVWNjCmBtwM27bB9u75SeAxSTSve0gKQ&s",
      name: "Furniture"
    },


  ]

  const deals = [
    {
      id: "0",
      title: "OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)",
      oldPrice: 25000,
      price: 19000,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/wireless_products/ssserene/weblab_wf/xcm_banners_2022_in_bau_wireless_dec_580x800_once3l_v2_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61uaJPLIdML._SX679_.jpg",
        "https://m.media-amazon.com/images/I/510YZx4v3wL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61J6s1tkwpL._SX679_.jpg",
      ],
      color: "Stellar Green",
      size: "6 GB RAM 128GB Storage",
    },

    {
      id: "1",
      title:
        "Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage) with No Cost EMI & Additional Exchange Offers",
      oldPrice: 74000,
      price: 26000,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/SamsungBAU/S20FE/GW/June23/BAU-27thJune/xcm_banners_2022_in_bau_wireless_dec_s20fe-rv51_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY879_.jpg",
        "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71yzyH-ohgL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
      ],
      color: "Cloud Navy",
      size: "8 GB RAM 128GB Storage",
    },
    {
      id: "2",
      title:
        "Samsung Galaxy M14 5G (ICY Silver, 4GB, 128GB Storage) | 50MP Triple Cam | 6000 mAh Battery | 5nm Octa-Core Processor | Android 13 | Without Charger",
      oldPrice: 16000,
      price: 14000,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/CatPage/Tiles/June/xcm_banners_m14_5g_rv1_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/817WWpaFo1L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/81KkF-GngHL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61IrdBaOhbL._SX679_.jpg",
      ],
      color: "Icy Silver",
      size: "6 GB RAM 64GB Storage",
    },
    {
      id: "3  ",
      title:
        "realme narzo N55 (Prime Blue, 4GB+64GB) 33W Segment Fastest Charging | Super High-res 64MP Primary AI Camera",
      oldPrice: 12999,
      price: 10999,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/tiyesum/N55/June/xcm_banners_2022_in_bau_wireless_dec_580x800_v1-n55-marchv2-mayv3-v4_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/41Iyj5moShL._SX300_SY300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/61og60CnGlL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61twx1OjYdL._SX679_.jpg",
      ],
    },
  ];

  const offers = [
    {
      id: "0",
      title:
        "Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC, 30H Playtime, 47ms Ultra Low Latency,Fast Charge,BT 5.3 (Green)",
      offer: "72% off",
      oldPrice: 7500,
      price: 4500,
      image:
        "https://m.media-amazon.com/images/I/61a2y1FCAJL._AC_UL640_FMwebp_QL65_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/61a2y1FCAJL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71DOcYgHWFL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71LhLZGHrlL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61Rgefy4ndL._SX679_.jpg",
      ],
      color: "Green",
      size: "Normal",
    },
    {
      id: "1",
      title:
        "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
      offer: "40%",
      oldPrice: 7955,
      price: 3495,
      image: "https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg",
      ],
      color: "black",
      size: "Normal",
    },
    {
      id: "2",
      title: "Aishwariya System On Ear Wireless On Ear Bluetooth Headphones",
      offer: "40%",
      oldPrice: 7955,
      price: 3495,
      image: "https://m.media-amazon.com/images/I/41t7Wa+kxPL._AC_SY400_.jpg",
      carouselImages: ["https://m.media-amazon.com/images/I/41t7Wa+kxPL.jpg"],
      color: "black",
      size: "Normal",
    },
    {
      id: "3",
      title:
        "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
      offer: "40%",
      oldPrice: 24999,
      price: 19999,
      image: "https://m.media-amazon.com/images/I/71k3gOik46L._AC_SY400_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg",
      ],
      color: "Norway Blue",
      size: "8GB RAM, 128GB Storage",
    },
  ];

  const [addresses, setAddresses] = useState([])
  const [products, setProducts] = useState([])
  const [open, setOpen] = useState(false)
  const { userId, setUserId } = useContext(UserType);

  const [category, setCategory] = useState('jewelry')
  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: "jewelery", value: "jewelery" },
    { label: "electronics", value: "electronics" },
    { label: "women's clothing", value: "women's clothing" },
  ]);
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`http://192.168.156.235:8000/addresses/${userId}`)
      const { addresses } = response.data
      setAddresses(addresses)
    }
    catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    if (userId) {
      fetchAddresses()
    }
  }, [userId, modal])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products")

        setProducts(response.data)
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchData()
  }, [])


  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false)
  })
  const cart = useSelector((state) => state.cart.cart)
  // console.log(cart)
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

  // console.log("addresses:", addresses)
  return (
    <>
      <SafeAreaView style={{ paddingTop: Platform.OS == "android" ? 40 : 0, flex: 1, backgroundColor: "white" }}>
        <StatusBar style='auto' />
        <ScrollView>
          <View style={{ padding: 10, backgroundColor: "#00CED1", flexDirection: 'row', alignItems: 'center' }}>
            <Pressable style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 7, gap: 10, backgroundColor: 'white', borderRadius: 3, height: 38, flex: 1 }}>
              <Feather style={{ paddingLeft: 10 }} name="search" size={24} color="black" />
              <TextInput placeholder="Search Amazon.in" />
            </Pressable>
            <FontAwesome name="microphone" size={24} color="black" />
          </View>
          <View >
            <Pressable onPress={() => setModal(true)} style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: "#AFEEEE" }}>

              {
                SelectedAddress ? (
                  <>
                    <Entypo name="location-pin" size={24} color="black" />
                    <Text style={{ fontSize: 12, fontWeight: 500 }}>{SelectedAddress.name}-{SelectedAddress.street}</Text>
                    <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                  </>
                ) :
                  (
                    <>
                      <Entypo name="location-pin" size={24} color="black" />
                      <Text style={{ fontSize: 12, fontWeight: 500 }}>Add an Address</Text>
                      <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                    </>
                  )
              }
            </Pressable>
            {modal ? (
              <Modal transparent={true} animationType='slide'>
                <View style={{ flex: 1, justifyContent: "flex-end", marginTop: 50 }}>
                  <View style={{ backgroundColor: "white", padding: 20, borderTopLeftRadius: 10, borderTopRightRadius: 10, minHeight: 400, shadowColor: "#000", shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.3, shadowRadius: 2, elevation: 4 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                      <Text style={{ flex: 1, textAlign: 'left', fontSize: 16, fontWeight: "500" }}>Choose your Location</Text>
                      <Pressable onPress={() => setModal(false)}>
                        <Entypo name="circle-with-cross" size={24} color="black" />
                      </Pressable>
                    </View>
                    <Text style={{ marginTop: 5, fontSize: 16, color: "gray" }}>Select a delivery location to see product availability and delivery options</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      {
                        addresses.map((item, index) => (
                          <Pressable onPress={() => setSelectedAddress(item)} key={index} style={{ justifyContent: "center", padding: 10, marginTop: 10, borderWidth: 1, width: 140, height: 140, gap: 3, marginRight: 15, borderColor: "#D0D0D0", alignItems: "center", backgroundColor: SelectedAddress === item ? "#FBCEB1" : "white" }}>
                            <View style={{ flexDirection: 'row', gap: 3, alignItems: "center" }}>
                              <Text style={{ fontSize: 13, fontWeight: "bold" }}>{item.name}</Text>
                              <Entypo name="location-pin" size={24} color="red" />
                            </View>
                            <Text numberOfLines={1} style={{ width: 130, fontSize: 13, textAlign: "center" }}>{item.houseNo},{item.landmark}</Text>
                            <Text numberOfLines={1} style={{ width: 130, fontSize: 13, textAlign: "center" }}>{item.street}</Text>
                            <Text numberOfLines={1}>India, Haryan</Text>
                          </Pressable>
                        ))
                      }
                      <Pressable onPress={() => {
                        setModal(false);
                        navigation.navigate("Address")
                      }} style={{ width: 140, height: 140, borderColor: "#D0D0D0", marginTop: 10, borderWidth: 1, padding: 10, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ textAlign: 'center', color: "#0066B2", fontWeight: "500" }}>Add an address or pick-up point</Text>
                      </Pressable>
                    </ScrollView>
                    <View style={{ flexDirection: "column", gap: 7, marginBottom: 30 }}>
                      <View>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                          <Entypo name="location-pin" size={24} color="#0066B2" />
                          <Text style={{ color: "#0066B2", fontWeight: 400 }}>Enter an Indian Pincode</Text>
                        </View>
                      </View>
                      <View>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                          <Ionicons name="locate-sharp" size={24} color="#0066B2" />
                          <Text style={{ color: "#0066B2", fontWeight: 400 }}>Use my Current Location</Text>
                        </View>
                      </View>
                      <View>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                          <AntDesign name="earth" size={24} color="#0066B2" />
                          <Text style={{ color: "#0066B2", fontWeight: 400 }}>Deliver outside India</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </Modal>
            ) : null}

          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {
              List.map((item, index) => (
                <Pressable key={index} style={{ margin: 10, justifyContent: 'center', alignItems: "center" }}>
                  <Image style={{ height: 50, width: 50, resizeMode: 'contain' }} source={{ uri: item.image }} />
                  <Text style={{ textAlign: 'center', fontSize: 12, fontWeight: "500", marginTop: 5 }}>{item.name}</Text>
                </Pressable>
              ))
            }
          </ScrollView>
          <Text style={{ padding: 10, fontSize: 18, fontWeight: 'bold' }}>Trending Deals of the week</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
            {
              deals.map((item, index) => (
                <Pressable onPress={() =>
                  navigation.navigate("Info", {
                    id: item.id,
                    title: item.title,
                    price: item?.price,
                    carouselImages: item.carouselImages,
                    color: item?.color,
                    size: item?.size,
                    oldPrice: item?.oldPrice,
                    item: item,
                  })
                } style={{ marginVertical: 10, flexDirection: 'row', alignItems: 'center' }} key={index}>
                  <Image style={{ height: 180, width: 180, resizeMode: "contain" }} source={{ uri: item.image }} />
                </Pressable>
              ))
            }
          </View>
          <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 2, marginTop: 24 }} />
          <Text style={{ fontSize: 18, padding: 10, fontWeight: "bold" }}>Today's Deals</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={true}>
            {
              offers.map((item, index) => (
                <Pressable onPress={() =>
                  navigation.navigate("Info", {
                    id: item.id,
                    title: item.title,
                    price: item?.price,
                    carouselImages: item.carouselImages,
                    color: item?.color,
                    size: item?.size,
                    oldPrice: item?.oldPrice,
                    item: item,
                  })
                } style={{ marginVertical: 10, alignItems: "center", justifyContent: "center " }} key={index}>
                  <Image style={{ height: 150, width: 150, resizeMode: "contain" }} source={{ uri: item.image }} />
                  <View style={{ paddingVertical: 5, alignItems: "center", justifyContent: "center", width: 130, backgroundColor: "#E31837", marginTop: 10, borderRadius: 4 }}>
                    <Text style={{ textAlign: "center", color: "white", fontSize: 13, fontWeight: "bold" }}>up to {item.offer} off</Text>
                  </View>
                </Pressable>
              ))
            }
          </ScrollView>
          <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 2, marginTop: 24 }} />
          <View
            style={{
              marginHorizontal: 10,
              marginTop: 20,
              width: "45%",
              marginBottom: open ? 50 : 15,
            }}
          >
            <DropDownPicker
              style={{ borderColor: "#B7B7B7", height: 30, marginBottom: open ? 120 : 15 }}
              open={open}
              value={category}
              items={items}
              setOpen={setOpen}
              setValue={setCategory}
              setItems={setItems}
              placeholder="Choose a category"
              placeholderStyle={styles.placeholderStyle}
              onOpen={onGenderOpen}
              zIndex={3000}
              zIndexReverse={1000}

            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
            {
              products.filter((item) => item.category === category).map((item, index) => (
                <Productitem key={index} item={item} />
              ))
            }

          </View>
        </ScrollView>
      </SafeAreaView>

    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})