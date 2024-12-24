import {View, Text, StyleSheet, Image, ImageSourcePropType, TouchableOpacity} from "react-native";
import RemoveButton from "../components/RemoveButton";

type MovieProps = {
    source: ImageSourcePropType;
    text:string;
    editing: Boolean;
}


export default function MovieTile({source, text, editing}:MovieProps){
    return (
        <View style={styles.container}>
            
            {editing 
            ? <TouchableOpacity style={styles.btnContainer}>
                <RemoveButton/>
            </TouchableOpacity> : <View/>}
            <Image source={source} style={styles.tileImage}></Image>
            
            <Text style={styles.tileText}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        height:109, 
        width:104,
        backgroundColor: "#1A1D1E",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        position: 'relative',

    },

    btnContainer:{
        position:'absolute',
        top:-11,
        left:-11,
    },
    tileImage:{
        height:61,
        width:61,
        paddingTop:50
    },
    tileText:{
        fontFamily:"SF-Pro-Text-Bold",
        fontSize:11,
        color:"#FFFFFF"
    }
})