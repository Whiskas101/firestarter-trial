
import {View, Text, StyleSheet, StatusBar, Image, ImageSourcePropType, TouchableOpacity, Touchable, TextInput} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
const backIcon = require("../../assets/icons/Go Back_3.png")
const activeStar = require("../../assets/icons/Star_1.png")
const inactiveStar = require("../../assets/icons/Star.png")
const downIcon = require("../../assets/icons/Sort Down_1.png")



type MovieProp = {
    MovieIcon: ImageSourcePropType,
    MovieName: string,
}

export default function CreateReview({MovieIcon, MovieName}:MovieProp){

    // Define some stateful variable to store data about the stars and the text information
    const [stars, setStars] = useState(3);
    const [text, setText] = useState("");



    return <SafeAreaView style={styles.parent}>
        <StatusBar barStyle="dark-content" backgroundColor={styles.parent.backgroundColor}/>

        {/* Top section, "write a review", back button */}
        <View style={styles.topSection}>
            <Image source={backIcon} style={styles.backIcon}></Image>
          
            <Text style={styles.topText}> Write a review</Text>
        </View>
        
        {/* Movie box, along with rating box */}
        <View style={styles.movieBox}>
            {/* Movie Details, and choice to pick a new movie */}
            <View style={styles.movieBoxTop}>
                {/* Movie Icon */}
                <Image source={MovieIcon} style={styles.movieIcon}/>
                
                {/* Name & change movie btn */}
                <View>
                    <Text style={styles.titleText}>{MovieName}</Text>
                    <TouchableOpacity onPress={()=>{
                        console.log("toggled bottom sheet")
                    }}>
                       <View style={styles.btn}>
                        <Text style={styles.btnText}>Change Movie</Text>
                        <Image source={downIcon} style={styles.tinyIcon}/>
                       </View>
                    </TouchableOpacity>
                </View>
            </View>
            
            {/* Rating system, stars */}
            <View style={styles.ratingBox}>
                {/* Render activated stars first */}
                {Array.from({length: stars}, (_, index)=>(
                    <View key={index}>
                        <Image source={activeStar} style={styles.starIcon}/>
                    </View>
                ))}

                {/* Render Inactive stars later */}
                {Array.from({length: 5-stars}, (_, index)=>(
                    <View key={index}>
                        <Image source={inactiveStar} style={styles.starIcon}/>
                    </View>
                ))}
            </View>
        </View>


        {/* Text Field to type the review up */}
        <View style={styles.reviewField}>
            {/* User profile and no. of characters remaining */}
            <View style={styles.reviewFieldTop}>
                {/* User Profile Icon */}
                <Image />
                {/* Remaining characters  */}
                <Text style={{
                    fontFamily:'SF-Pro-Text-Bold',
                    fontSize:14,
                    color:"#535353"
                }}>{500 - text.length} characters remaining </Text>
            </View>

            {/* Text Input Area */}
            <View style={styles.inputArea}>
                <TextInput
                    placeholder="Write something about the movie"
                    placeholderTextColor="#535353"
                    style={styles.textInputStyle}
                ></TextInput>
            </View>

            {/* Post Button */}
            <View style={styles.postbtn}>
                <TouchableOpacity>
                    <Text>Post Review</Text>
                </TouchableOpacity>
            </View>

        </View>


        
    </SafeAreaView>
}

const styles = StyleSheet.create({
    parent:{
        backgroundColor:"#0F1112",
        flex:1,
    },

    topSection:{
        flexDirection:"row",
        position:'relative',
        paddingTop:30,
        justifyContent:"flex-start",
        alignItems:"center",
        
        // backgroundColor:"red"
    },

    topText:{
        fontFamily:'SF-Pro-Text-Bold',
        color:'#535353',
        fontSize:20,

        position:'absolute',
        left:0,
        right:0,
        top:30, // accounting for the padding given to the top section parent object
        textAlign:'center',
        // backgroundColor:'green'
    },

    backIcon:{
        height:27,
        width:27,
        marginLeft:27,
        // backgroundColor:'blue'
    },

    // Movie box stuff
    movieBox:{
        borderRadius: 12,
        backgroundColor:"#222527",
        marginHorizontal:12,
        marginTop:18,
        paddingTop: 12,

    },

    movieBoxTop:{
        flexDirection:"row",
        alignItems:"center",
    },

    movieIcon:{
        height:67,
        width:67,
        marginLeft:23,
        marginTop:11,
        marginBottom:13,
        marginRight:23
    },

    titleText:{
        fontFamily:'SF-Pro-Text-Bold',
        fontSize:20,
        lineHeight:24,
        color: "#FFFFFF",
        alignSelf:"center"
    },

    btn:{
        marginTop:6,
        flexDirection:"row",
        backgroundColor:"#1C1F21",
        alignItems:"center",
        paddingHorizontal:13,
        paddingVertical:9,
        borderRadius:12,
    }, 

    btnText:{
        fontSize:12,
        color:"#535353",
    },

    tinyIcon:{
        height:17,
        width:17,
    },
    
    ratingBox:{


        borderBottomLeftRadius:12,
        borderBottomRightRadius:12,
        justifyContent:"center",
        flexDirection:"row",
        backgroundColor:"#1C1F21",
  
    },

    starIcon:{
        width:31,
        height:29,
        marginVertical:17,

    },

    // Review section here
    reviewField:{
        marginTop:10,
        // backgroundColor:"#1C1F21",
        borderTopLeftRadius:12,
        borderTopRightRadius:12,
    },

    reviewFieldTop:{
        flexDirection:"row",
        backgroundColor:"#1C1F21",
        borderTopLeftRadius:12,
        borderTopRightRadius:12,
    },

    inputArea:{

    },

    textInputStyle:{
        color: "#F5F5F5", 
        fontSize:14,
        fontFamily:'SF-Pro-Text-Medium'
        
    }

});