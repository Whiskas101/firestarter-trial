import {View, Text, StyleSheet, Image, ImageSourcePropType} from "react-native";

type MovieProps = {
    source: ImageSourcePropType;
    text:string;
}


export default function MovieTile({source, text}:MovieProps){
    return (
        <View style={styles.container}>
            <Image source={source} style={styles.tileImage}></Image>
            
            <Text style={styles.tileText}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        height:109, 
        width:104,
        backgroundColor:"#1A1D1E",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:12
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