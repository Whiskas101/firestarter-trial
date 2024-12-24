
import { View, Text, StyleSheet, Image, StatusBar, Button, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const logoImage = require("../../assets/icons/firestarter.png")
const googleIcon = require("../../assets/icons/Google_7.png")
const appleIcon = require("../../assets/icons/Apple Logo_2.png")

export default function Landing(){
    return (
        <SafeAreaView style={styles.parent}>
            {/* Necessary as status bar doesn't adhere to the background color by default. */}
            <StatusBar barStyle="dark-content" backgroundColor={styles.parent.backgroundColor}/>

            {/* Rest of the landing page */}
            <View 
            style={{flex:8, justifyContent:"center", alignContent:"center", alignItems:"center"}}
            >
                    <Image
                        source={logoImage}
                        style={styles.image}
                    />

                <Text style={styles.focusText}>Firestarter</Text>
                <Text style={styles.subtleText}>Review movies, together.</Text>
                
            </View>

            {/* Sign-in options */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{console.log("Login attempt")}}
                >   
                <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>

                    <Image source={googleIcon} style={styles.icon}/>
                    <Text style={styles.subleTextVariant}>
                            Continue with Google
                    </Text>
                </View>
                </TouchableOpacity>

              
                    
                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=>{console.log("Login attempt")}}
                    >   
                    <View  style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>

                        <Image source={appleIcon} style={styles.icon}/>
                        <Text style={styles.subleTextVariant}>
                                Continue with Apple
                        </Text>
                    </View>
                    </TouchableOpacity>
                </View>

        <View style={{flex:1}}>
        {/*Privacy policy thingy  */}
            <Text style={styles.subtleTextTiny}>
                By continuing, you accept our Privacy Policy and Terms of Use.
            </Text>
        </View> 
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    image:{
        height: 200,
        width: 200,
    },

    icon:{
        height:22,
        width:22,
        marginRight:9,
        // borderWidth:1,
        // borderBlockColor:"red"
    },

    focusText: {
        alignSelf: "center",
        color: "#FFFFFF",
        fontFamily: "Gotham-Medium",
        fontSize: 24,

        margin:10,
        letterSpacing:-0.41
    },

    
    subtleText: {
        color: "#535353",
        fontFamily:"Gotham-Medium",
        fontSize:19,
        letterSpacing:-0.38
    },

    subtleTextTiny:{
        color: "#535353",
        fontFamily:"Gotham-Medium",
        fontSize:10,
        width: 250,
        textAlign:'center',
        letterSpacing:-0.1
    },

    subleTextVariant:{
        color:"#FFFFFF",
        fontSize:18,
        fontFamily:"Gotham-Medium",
        letterSpacing:-0.18,
    },


    buttonContainer:{
        flex:2, 
        padding:7,
        justifyContent:"center", 
        width:"100%"
    },

    button:{

        alignContent:"center",
        justifyContent: "center",
        flexDirection:"column",
        margin:5,
        backgroundColor:"#222527",
        // backgroundColor:"red",

        height:52,
        borderRadius:15,
        padding:2,
    },

    parent:{
        flex: 1, 
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#0F1112"
    }
})