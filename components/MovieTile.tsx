import {View, Text, StyleSheet, Image, ImageSourcePropType, TouchableOpacity} from "react-native";
import RemoveButton from "../components/RemoveButton";
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
} from 'react-native-reanimated';
import { useEffect } from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import React from "react";


type MovieProps = {
    source: ImageSourcePropType;
    text:string;
    editing: Boolean;
    onRemove?: Function;
    onTap?: Function;
    id?: string;

}


export default function MovieTile({source, text, editing, onRemove, onTap, id}:MovieProps){

    // full size by default
    const scale = useSharedValue(1);

    useEffect(()=>{
        scale.value = withTiming(editing ?  0.89: 1, {
            duration: 300,
            easing: Easing.out(Easing.exp),
        });
    }, [editing]);

    const animatedStyle = useAnimatedStyle(()=>({
        transform:[{scale: scale.value}]
    }))
    
    

    return (
        <TouchableWithoutFeedback
            // Pass a custom function to execute on tap, for varying behaviour in bottom sheets 
            onPress={()=>onTap?.(text, id)}
        >
            

            <Animated.View style={[styles.container, animatedStyle]}>
                
                {editing 
                ? <TouchableOpacity 
                    style={styles.btnContainer} 
                    onPress={()=>onRemove?.(text)}>
                    <RemoveButton/>
                    </TouchableOpacity> : 
                    <View/>}
                    
                    <Image source={source} style={styles.tileImage}/>

                        
                
                <Text style={styles.titleText}>{text}</Text>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container:{
        height:111, 
        width:104,
        backgroundColor: "#1A1D1E",
        // backgroundColor:'green',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        position: 'relative',
        marginHorizontal: 13,

    },

    btnContainer:{
        position:'absolute',
        top:-7,
        left:-7,
    },
    tileImage:{
        height:61,
        width:61,
        paddingTop:50,
        marginVertical:5
    },
    titleText:{
        fontFamily:"SF-Pro-Text-Bold",
        fontSize:11,
        color:"#FFFFFF",
        marginVertical:5,
        width: "90%",
        textAlign:'center'
        
    }
})