import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, ImageBackground, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/CartReducer';


const ProductinfoScreen = () => {
    const route = useRoute()
    const { width } = Dimensions.get("window");
    const [addedToCart, setAddedToCart] = useState(false)
    const height = (width * 100) / 100;
    const dispatch = useDispatch()
    const addItemToCart = (item) => {
        setAddedToCart(true)
        dispatch(addToCart(item))
        setTimeout(() => {
            setAddedToCart(false)
        }, 60000)
    }
    const cart = useSelector((state) => state.cart.cart)
    console.log(cart)
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 55, flex: 1, backgroundColor: "white" }}>
            <View style={{ padding: 10, backgroundColor: "#00CED1", flexDirection: 'row', alignItems: 'center' }}>
                <Pressable style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 7, gap: 10, backgroundColor: 'white', borderRadius: 3, height: 38, flex: 1 }}>
                    <Feather style={{ paddingLeft: 10 }} name="search" size={24} color="black" />
                    <TextInput placeholder="Search Amazon.in" />
                </Pressable>
                <FontAwesome name="microphone" size={24} color="black" />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {
                    route.params.carouselImages.map((item, index) => (
                        <ImageBackground style={{ width, height, marginTop: 25, resizeMode: "contain" }} source={{ uri: item }} key={index}>
                            <View style={{ padding: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#C60C30", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                                    <Text style={{ color: "white", fontWeight: "600", textAlign: "center", fontSize: 12 }}>20% off</Text>
                                </View>
                                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#E0E0E0", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                                    <Entypo name="share" size={24} color="black" />
                                </View>
                            </View>
                            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#E0E0E0", justifyContent: "center", alignItems: "center", flexDirection: "row", marginTop: "auto", marginLeft: 20, marginBottom: 20 }}>
                                <AntDesign name="hearto" size={24} color="black" />
                            </View>
                        </ImageBackground>
                    ))
                }
            </ScrollView>
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 15, fontWeight: '500' }}>{route.params.title}</Text>
                <Text style={{ fontSize: 15, fontWeight: "600", marginTop: 6 }}>{route.params.price}</Text>

            </View>
            <Text style={{ height: 1, borderWidth: 1, borderColor: "#D0D0D0" }} />
            <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
                <Text>Color:</Text>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>{route.params.color}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
                <Text>Size:</Text>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>{route.params.size}</Text>
            </View>
            <Text style={{ height: 1, borderWidth: 1, borderColor: "#D0D0D0" }} />
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 15, fontWeight: "bold", marginVertical: 5 }}>Total:{route.params.price}</Text>
                <Text style={{ color: "#00CED1" }}>Free Devlivery Tomorrow by 3 PM. Order within 10hr 30 mins</Text>
                <View style={{ flexDirection: "row", marginVertical: 5, alignItems: "center", gap: 5 }}>
                    <Entypo name="location-pin" size={24} color="black" />
                    <Text style={{ fontSize: 15, fontWeight: "500" }}>Delivery to Sujan - Bangalore 560019</Text>
                </View>
            </View>
            <Text style={{ color: "green", marginHorizontal: 10, fontWeight: "500" }}>IN Stock</Text>
            <Pressable onPress={() => addItemToCart(route.params.item)} style={{ backgroundColor: "#FFC72C", padding: 10, borderRadius: 20, justifyContent: "center", alignItems: "center", marginHorizontal: 10, marginVertical: 10 }}>
                {
                    addedToCart ? <Text>Added to Cart</Text> : <Text>Add to Cart</Text>
                }

            </Pressable>
            <Pressable style={{ backgroundColor: "#FFC72C", padding: 10, borderRadius: 20, justifyContent: "center", alignItems: "center", marginHorizontal: 10, marginVertical: 10 }}>
                <Text>Buy Now</Text>
            </Pressable>
        </ScrollView>
    )
}

export default ProductinfoScreen

const styles = StyleSheet.create({})