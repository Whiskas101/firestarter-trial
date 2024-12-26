
import {View, Text, StyleSheet, StatusBar, Image, ImageSourcePropType, TouchableOpacity, Touchable, TextInput, FlatList} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createRef, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useMovieContext } from "@/contexts/MovieContext";
import BottomSheet from "@/components/BottomSheet";
import { Movie, movieType } from "@/models/MovieModel";
import MovieTile from "@/components/MovieTile";
import { createReview, fetchAllReview, fetchMovies } from "@/firebaseService";
import React from "react";
import { useReviewContext } from "@/contexts/ReviewContext";
import auth from "@react-native-firebase/auth";

const backIcon = require("../../assets/icons/Go Back_3.png")
const activeStar = require("../../assets/icons/Star_1.png")
const inactiveStar = require("../../assets/icons/Star.png")
const downIcon = require("../../assets/icons/Sort Down_1.png")
const tempIcon = require("../../assets/icons/Google_7.png")


type MovieProp = {
    MovieIcon: ImageSourcePropType,
    MovieName: string,
}

export default function CreateReview({MovieIcon, MovieName}:MovieProp){

    // Define some stateful variable to store data about the stars and the text information
    const [stars, setStars] = useState(3);
    const [text, setText] = useState("");

    const {movie, setMovieData} = useMovieContext(); // for the movie that is being reviewed
    
    const [movies, setMovies] = useState<movieType[]|undefined>([]); // set of movies to pick from
    const [bottomSheetState, setBottomSheetState] = useState(false);

    const {review, setReviewData} = useReviewContext();
    const user = auth().currentUser;

    const imageMap: { [key: string]: any } = {
        "Interstellar": require("../../assets/stickers/Interstellar.png"),
        "Tenet": require("../../assets/stickers/Tenet.png"),
        "Inception": require("../../assets/stickers/Inception.png"),
        "Oppenheimer": require("../../assets/stickers/Oppenheimer.png"),
        "Insomnia": require("../../assets/stickers/Insomnia.png"),
        "Batman Begins": require("../../assets/stickers/Batman Begins.png"),
        "Dark Knight": require("../../assets/stickers/Dark Knight.png"),
        "Dunkirk": require("../../assets/stickers/Dunkirk.png"),
        "Following": require("../../assets/stickers/Following.png"),
        "Dark Knight Rises": require("../../assets/stickers/Dark Knight Rises.png"),
        "Memento": require("../../assets/stickers/Memento.png"),
        "The Prestige":require("../../assets/stickers/Tenet.png")
    }

    // fetch movies
    useEffect(()=>{
        async function getMovies() {
            // return; //temporarily
            const result = await fetchMovies();
            setMovies(result);
        }

        getMovies()
    }, [])

    const handleTextUpdate = (inputText :any)=>{
        setText(inputText);
    }

    const handlePostReview = async()=>{
        console.log("Called a post review");
        if (!movie) return;
        console.log(movie)
        // return;
        const newMovie = new Movie({
            id: "None",
            rating: movie.rating,
            title: movie.title
        });
        
        const result = await createReview(newMovie, stars, text);
        if (result !== "fail"){
            const result = await fetchAllReview();
            setReviewData(
                result
            )
            
            router.back()
        }

        






    }

    function updateReview(title: string, id: string){
        setMovieData(
            new Movie({
                id: id,
                title:title,
                rating:0
            })
        )
        setBottomSheetState(
            bottomSheetState=>!bottomSheetState
        )
    }


    //navigation
    const router = useRouter();
    
    function goBack(){
        console.log("popping context");
        router.back();
    }


    return <>
    <SafeAreaView style={styles.parent}>
        <StatusBar barStyle="dark-content" backgroundColor={styles.parent.backgroundColor}/>

        {/* Top section, "write a review", back button */}
        <View style={styles.topSection}>
            <TouchableOpacity 
            onPress={goBack}>
                <Image source={backIcon} style={styles.backIcon}></Image>
            </TouchableOpacity>
            <Text 
            style={styles.topText}> Write a review</Text>
        </View>
        
        {/* Movie box, along with rating box */}
        <View style={styles.movieBox}>
            {/* Movie Details, and choice to pick a new movie */}
            <View style={styles.movieBoxTop}>
                {/* Movie Icon */}
                {movie && <Image source={imageMap[movie?.title]} style={styles.movieIcon}/>}
                
                {/* Name & change movie btn */}
                <View>
                    <Text style={styles.titleText}>{movie?.title}</Text>
                    <TouchableOpacity onPress={()=>{
                        console.log("toggled bottom sheet")
                        setBottomSheetState(
                            bottomSheetState=>!bottomSheetState
                        )
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
                {Array.from({length: 5}, (_, index)=>(
                    <View key={index}>
                        <TouchableWithoutFeedback
                            onPress={()=>{
                                
                                setStars(index+1)
                                
                            }}
                        >
                            <Image source={index < stars ? activeStar : inactiveStar} style={styles.starIcon}/>
                        </TouchableWithoutFeedback>
                    </View>
                ))}

                {/* Render Inactive stars later
                {Array.from({length: 5-stars}, (_, index)=>(
                    <View key={index}>
                        <TouchableOpacity
                            onPress={()=>{
                                setStars(index+1)
                            }}
                        >
                            <Image source={inactiveStar} style={styles.starIcon}/>
                        </TouchableOpacity>
                    </View>
                ))} */}
            </View>
        </View>


        {/* Text Field to type the review up */}
        <View style={styles.reviewField}>
            {/* User profile and no. of characters remaining */}
            <View style={styles.reviewFieldTop}>
                {/* User Profile Icon */}
                {user?.photoURL && <Image source={{uri:user.photoURL}} style={styles.profileIcon}/>}
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
                    value={text}
                    placeholder="Write something about the movie"
                    placeholderTextColor="#535353"
                    style={styles.textInputStyle}
                    maxLength={500}
                    multiline={true}
                    onChangeText={handleTextUpdate}
                ></TextInput>
            </View>

            {/* Post Button */}
            <TouchableOpacity
                onPress={handlePostReview} 
            >
                <View style={styles.postbtn}>
                        <Text style={styles.postbtnText}>Post Review</Text>
                </View>
            </TouchableOpacity>

        </View>


        
    </SafeAreaView>
    <View style={{
                    flex:1,
                    position:'absolute',
                    left:0,
                    right:0,
                    top:0,
                    bottom:0,
                    // backgroundColor:'red',
                    pointerEvents: bottomSheetState ? 'auto' : 'none'

                }}>
                        
                        <BottomSheet isOpen={bottomSheetState} setIsOpen={setBottomSheetState}>
                            {/* Grid of movies to be used for selection */}
                            <View >
                                <FlatList
                                    data = {movies}
                                    numColumns={3}
                                    style={styles.gridStyle}
                                    contentContainerStyle={{alignItems:'center'}} 
                                    renderItem={({item})=>{
                                        const src = imageMap[item.title];
                                        return <View
                                            style={{marginBottom:15}}
                                        >
                                            <MovieTile 
                                                source={src} 
                                                text={item.title} 
                                                editing={false}
                                                onTap={updateReview}
                                            />
                                        </View> 
                                    }}
                                />
                            </View>
                        </BottomSheet>

                </View>
    </>
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
        // backgroundColor:'green',
        zIndex: -1 // To make back the back button clickable.
    
    },

    backIcon:{
        height:27,
        width:27,
        marginLeft:27,
        zIndex:1
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
        justifyContent:'center',
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
        marginVertical:12,
        marginHorizontal:12,
        backgroundColor:"#2C2F31",
        borderRadius:12,

        flex:1,
    },

    reviewFieldTop:{
        flexDirection:"row",
        backgroundColor:"#1C1F21",
        alignItems: "center",
        borderTopLeftRadius:12,
        borderTopRightRadius:12,
    },

    inputArea:{
        flex:1,
        padding:15,
    },

    textInputStyle:{
        color: "#F5F5F5", 
        fontSize:14,
        fontFamily:'SF-Pro-Text-Medium'
    },

    profileIcon:{
        height:17,
        width:17,
        margin:12,
        borderRadius:50
    },

    postbtn:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: "#1C1F21",
        borderBottomLeftRadius:12,
        borderBottomRightRadius:12,
        // backgroundColor:"red"
    },

    postbtnText:{
        color: "#FCFCFC",
        margin:'auto',
        fontSize: 18,
        marginVertical:14,
    },

    gridStyle:{
        backgroundColor:"#222527",
        // backgroundColor:'red',
        height:"100%",
        paddingTop:27,
        borderRadius: 20,
        // marginHorizontal:10
    },

});