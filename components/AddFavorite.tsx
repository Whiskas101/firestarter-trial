import React from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity} from "react-native";

const addFavIcon = require("../assets/icons/Plus Math_2.png")

type favProps = {
    onTap: Function
}

export default function AddFavorite(
    {
        onTap
    }:favProps
){
    return (
        <TouchableOpacity
            onPress={()=>onTap()}
        >
            <View style={styles.container}>
                <Image source={addFavIcon}>

                </Image>
            </View>
        </TouchableOpacity>
    );
}



const styles = StyleSheet.create({
  
    container: {
        // color:"#1A1D1E",
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',


        height:111, 
        width:104,
        // backgroundColor:'green',
        borderRadius: 12,
        position: 'relative',
        marginHorizontal: 13,
        borderStyle:'dashed',
        borderWidth:3,
        borderColor: '#222527'

    },
});