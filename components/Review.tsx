import {View, Text, StyleSheet, Image, ImageSourcePropType} from "react-native"
const starIcon = require("../assets/icons/Star_1.png")
const deleteIcon = require("../assets/icons/Delete_2.png")
const heartIcon = require("../assets/icons/Heart_3.png")

type ReviewProp = {
    username: string,
    profileImg: ImageSourcePropType,
    content: string,
    movieIcon: ImageSourcePropType
    movieName: string,
    rating: number,
    likes: number
}

export default function Review({username, profileImg, content, movieIcon, movieName, rating, likes}:ReviewProp){
    return (<View style={styles.container}>
        {/* Contains the username and time */}
        <View style={styles.topContainer}>
            <Image source={profileImg} style={styles.image}/>
            <Text style={styles.subtleText}>{username}</Text>
            <View style={{flex:1}}></View>
            <Text style={styles.subtleText}>5m</Text>
        </View>
        {/* Review section */}
        <View style={styles.bottomContainer}>
            {/* Movie Name and rating */}
            <View style={styles.movieinfo} >
                <View style={styles.circle}>
                    <Image source={movieIcon} style={styles.movieIcon}/>
                </View>
                {/* Column structure, movie name on top, rated stars below */}
                <View>
                    <Text style={styles.subtleText}>{movieName}</Text>
                    {/* Render N stars */}
                    <View style={{flexDirection:"row"}}>
                        {Array.from({ length: rating }, (_, index) => (
                            <View key={index}>
                                <Image source={starIcon} style={styles.starIcon}/>
                            </View>
                        ))}
                    </View>

                </View>
                
                
            </View>
            <View>
            {/* Review content */}
                <Text style={styles.reviewText}>
                    screaming. crying. throwing up. words simply cannot describe what this film means to me. can check “seeing interstellar in imax at lincoln square” off my bucket list and that genuinely has me jumping for joy. undeniable motion picture. life changing. \na defining moment in science fiction filmmaking. THE theater experience. few, maybe no, films better suited for imax. i’m levitating. on cloud nine. my joy is immeasurable. 
                </Text>
            </View>

        </View>

            {/* Last section, for dealing with deletion and showing total likes */}

            <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                {/* Delete Button */}
                <View style={styles.deleteBox}>
                    <Image source={deleteIcon} style={styles.deleteIcon}/>
                </View>

                <View style={{flex:1}}></View>
                {/* Likes */}
                {likes > 1 ? <Text style={{...styles.subtleText, marginBottom:14}}>{likes} likes</Text>:<Text style={{...styles.subtleText, marginBottom:14}}>No Likes</Text>}
                
                <Image source={heartIcon} style={styles.heartIcon}/>

            </View>
    </View>);
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#222527",
        borderRadius:18
    },

    topContainer:{
        backgroundColor:"#1A1D1E",
        
        flexDirection:"row",
        alignItems:"center",
        alignContent:"center",
        
        borderTopLeftRadius:18,
        borderTopRightRadius:18,
        paddingHorizontal:14,
        height:40

    },

    subtleText:{
        fontFamily:"SF-Pro-Text-Bold",
        color:"#535353",
        fontSize:14,
        lineHeight:16
    

    },

    bottomContainer:{
        margin:12
    },

    circle:{
        backgroundColor:"#2C2F31",
        height:52,
        width:52,
        borderRadius:"100%",
        alignItems:"center",
        justifyContent:"center",
        marginRight:20

    },

    movieinfo:{
        flexDirection:"row",
        alignItems:"center",
        marginBottom:10
        
    },

    image:{
        height:17,
        width:17,
        marginRight:7
    },

    movieIcon:{
        height:"105%",
        width:"105%",

    },
    starIcon:{
        height:16, 
        width:16, 
    },

    reviewText:{
        fontFamily: "SF-Pro-Text-Medium",
        fontSize: 14,
        color:"#FFFFFF",
        lineHeight:17
    },


    // last section
    deleteBox:{
        width:51,
        height:37,
        backgroundColor:"#1C1F21",
        borderBottomLeftRadius:17,
        borderTopRightRadius:17,

        justifyContent:"center",
        alignItems:"center"
    },

    deleteIcon:{
        height:"80%",
        width:"50%",
    },

    heartIcon:{
        height:24,
        width:24,
        marginRight:18,
        marginLeft:14,
        marginBottom:14
    }

});