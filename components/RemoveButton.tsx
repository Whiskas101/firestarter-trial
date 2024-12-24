import {View, Image, StyleSheet} from 'react-native';
const removeIcon = require("../assets/icons/Cancel_3.png")


export default function RemoveButton(){
    return (
        <View>
            <Image source={removeIcon} style={styles.icon}/>
        </View>
    );
}

const styles = StyleSheet.create({
    icon:{
        height:23,
        width:23,
    },
   
}) 