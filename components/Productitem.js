import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/CartReducer'
import jwt_decode from "jwt-decode"
const Productitem = ({ item }) => {
    const [addedToCart, setAddedToCart] = useState(false)
    const dispatch = useDispatch()
    const addItemToCart = () => {
        setAddedToCart(true)
        dispatch(addToCart(item))
        setTimeout(() => {
            setAddedToCart(false)
        }, 60000)
    }
    return (

        <Pressable style={{ marginHorizontal: 15, marginVertical: 25 }}>
            <Image source={{ uri: item.image }} style={{ width: 150, height: 150, resizeMode: "contain" }} />
            <Text numberOfLines={1} style={{ width: 150, marginTop: 10 }}>{item.title}</Text>
            <View style={{ marginTop: 5, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>₹{item.price}</Text>
                <Text style={{ fontWeight: "bold", color: "#FFC72C" }}>{item.rating.rate}ratings</Text>
            </View>
            <Pressable onPress={() => addItemToCart(item)} style={{ backgroundColor: "#FFC72C", padding: 10, borderRadius: 20, justifyContent: "center", alignItems: "center", marginHorizontal: 10, marginTop: 10 }}>
                {
                    addedToCart ? <Text>Added to Cart</Text> : <Text>Add to Cart</Text>
                }
            </Pressable>
        </Pressable>

    )
}

export default Productitem

const styles = StyleSheet.create({})