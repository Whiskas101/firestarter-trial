import Review from "@/components/Review";
import MovieTile from "@/components/MovieTile";
import {View, Text, Image, StatusBar, StyleSheet, Button} from "react-native";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";

// For pulling user data
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { favouriteMovie, fetchAllReview, fetchMovies, getFavorites } from "@/firebaseService";
import { favouriteType } from "@/models/FavoritesModel";


import { useEffect, useState, useRef, useContext } from "react";
import { Favourite } from "@/models/FavoritesModel";
import { Gesture, GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@/components/BottomSheet";
import { Movie, movieType } from "@/models/MovieModel";
import { useRouter } from "expo-router";
import { useMovieContext } from "@/contexts/MovieContext";



// Assets
import {Asset} from "expo-asset";
import { ReviewModel, reviewType } from "@/models/ReviewModel";
import { useReviewContext } from "@/contexts/ReviewContext";
import { relativeTime } from "@/utils";
import React from "react";
import AddFavorite from "@/components/AddFavorite";
const logo =require("../../assets/icons/firestarter.png");
const userIcon = require("../../assets/icons/Google_7.png") // as a temporary measure
const fabIcon = require("../../assets/icons/Hand With Pen_1.png")
const editIcon = require("../../assets/icons/Edit_1.png")
const sortIcon = require("../../assets/icons/Sorting arrowheads_1.png")
const doneIcon = require("../../assets/icons/Check Mark_2.png")
const emptyIcon = require("../../assets/icons/Nothing Found_1.png")

const tempIcon = require("../../assets/stickers/Interstellar.png")

export default function Home(){

    const [user, setUser] = useState<FirebaseAuthTypes.User|null>(null);

    const [editing, setEditing] = useState(false);

    const [bottomSheetState, setBottomSheetState] = useState(false);

    const router = useRouter();

    const {movie, setMovieData} = useMovieContext();

    const [mode, setMode] = useState("review"); // for implementing the dual usage of the bottom sheet
    
    const [favourites, setFavourites] = useState<movieType[]|undefined>([]);
    // const [reviews, setReviews] = useState<reviewType[] | undefined>([]);

    const {review, setReviewData} = useReviewContext();

    const [movies, setMovies] = useState<movieType[]|undefined>([]);

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
        "The Prestige": require("../../assets/stickers/Tenet.png")
    }


    const data = Array.from({length: 5}, (_, index, )=>"item")
    // Helper function
    function firstName(name: string | null | undefined){
        if (name){
            return name.split(" ")[0];
        }else{
            return "Loading";
        }
    }

    // make user object accessible
    useEffect(()=>{
        const currentUser = auth().currentUser;

        if (currentUser){
            setUser(currentUser);
        }
    }, [])

    // get the favorites and reviews
    useEffect(()=>{

        // move the fav function into another use effect
        async function getFav(){
            // return; // temporarily
            const result = await getFavorites();

            setFavourites(result);
            // console.log(favourites);
        }

        async function getReviews(){
            // return; //temporarily
            const result = await fetchAllReview();
            setReviewData(result)
        }

        async function getMovies() {
            // return; //temporarily
            const result = await fetchMovies();
            setMovies(result);
        }


        getFav();
        getReviews();
        getMovies();
    }, [])

    // Handling bottom sheet states
    useEffect(()=>{
        console.log("sheet state: ");
        
        console.log(bottomSheetState);
        
    }, [bottomSheetState])

    // Favorites deletion logic
    function removeFavorite(title: string){
        console.log("delete fav req");
        setFavourites(favourites=>favourites?.filter(item=>item.title !== title))
        return // temp
        // ADD API CALL TO DELETE FAV HERE
    }

    // Deletion of review
    function removeReview(id: string){
        console.log("delete review req");
        // console.log(review);
        
        // review?.map((item)=>console.log(item.id !== id))
        setReviewData((review?.filter(item=>item.id !== id)) || [])
        return; // temp
    }

    // moving to review recreation
    function beginCreateReview(title:string, id: string){
        console.log("creation started");
        
        setMovieData(
            new Movie({
                id:id,
                title:title,
                rating:0
            })
        );
        setBottomSheetState(
            bottomSheetState=>!bottomSheetState
        )
        router.push("/screens/CreateReview")
    }

    // begin the add to fav interaction and prepare movie tiles for different behaviour
    function startAddFavorite(){
        setBottomSheetState(
            bottomSheetState=>!bottomSheetState
        )

        setMode("pick");
    }

    async function addFav(title: string, id: string){
        console.log("Mode is")
        console.log(mode);
        
        if (mode === "pick"){
            // extract the selected movie, and put it in favorites
            // this is from context!
            
            
            const fav = new Movie({
                id: "none",
                title:title,
                rating:0, // doesnt matter, its not visible, here for the sake of class model
            });
            
            //update the backend
            const result = await favouriteMovie(fav);
            console.log(result)
            console.log("sent update");
            setBottomSheetState(
                false
            )

            // refetch data
            const newfavs = await getFavorites();
            console.log("New fetch");
            
            setFavourites(newfavs);
            setMode("review")
            
        }
    }
    

    useEffect(()=>{
        // console.log("updatedfav");
        // console.log(favourites);
        console.log(review);
        // console.log(movies)
        
    }, [review])

    // const backgroundColor = "#0F1112";
    return (
        <>
        <SafeAreaView style={styles.parent}>
            <StatusBar backgroundColor={styles.parent.backgroundColor}/>
            {/* Top section, app name, user icon */}
            <View style={styles.topSection}>
                <Image source={logo} style={styles.logo}/>

                <Text style={styles.logoText}>firestarter</Text>
                <View style={{flex:1}}/>
                {/* User Profile Icon */}
                {user?.photoURL ?
                <Image source={{uri:user?.photoURL}} style={styles.logo}/> 
                :
                // if no user profile icon somehow
                <Image source={userIcon} style={styles.logo}/> }
            </View>
            {/* Favorite Movies Section */}
            {/* Text above the movie tiles*/}
            <View style={{flexDirection:"row", paddingHorizontal:25}}>
                <Text style={styles.favText}>
                    {/* Extracting the first name of the user from the logged in object, if it exists. */}
                    {firstName(user?.displayName)}'s favourite movies</Text>
                <View style={{flex:1}}/>
                <TouchableOpacity
                    onPress={()=>setEditing(!editing)}
                >
                    <Image 
                    source={
                        editing ? doneIcon : editIcon
                    } 
                    style={styles.tinyIcon}

                    />
                </TouchableOpacity>
            </View>

            {/* Horizontal list of movie tiles */}
            <View style={{marginTop: 12}}>
                {
                
                <FlatList
                    // style={}
                    data = {favourites}
                    horizontal
                    keyExtractor={(item)=>item.title}
                    contentContainerStyle={{flexGrow:0}}
                    renderItem={({item})=>{
                        const src = imageMap[item.title];
                        return <MovieTile 
                            source={src}
                            text={item.title} 
                            onRemove={removeFavorite}

                            editing={editing}
                        />
                    }}
                    ListFooterComponent={
                            <AddFavorite onTap={startAddFavorite}/>
                            
                        // <Text>Hi</Text>
 
                    }

                />
                
                }
            </View>

            {/* Reviews Section */}
            {/* Text Above the actual review box */}
            <View style={{flex:1, marginVertical: 10, position:'relative'}}>
                <View style={{flexDirection:"row", alignItems:"center", paddingHorizontal: 27}}>
                    <Text style={styles.favText}>
                        Your Reviews
                    </Text>
                    <Image source={sortIcon} style={styles.tinyIcon}></Image>
                </View>
                {/* Actual Vertical (?) list of reviews here */}
                <View style={{marginHorizontal: 12, marginVertical:10}}>
                    {review && review?.length > 0 ? <FlatList
                        data = {review}
                        style={{ borderRadius:18}} // To make the cut not feel abrupt when the reviews go off screen
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item=>item.id.toString()}
                        renderItem={({item})=>{
                           
                            
                            return <Review 

                                content={item.content}
                                profileImg={userIcon}
                                username={firstName(user?.displayName)}
                                movieIcon={imageMap[item.movie.title]}
                                movieName={item.movie.title}
                                rating={item.rating}
                                likes={item.likes}
                                created_at={item.created_at}
                                delFunc={removeReview}
                                id={item.id}
                            />
                        }}
                    
                    >
                        
                    </FlatList>
                    :
                    <View style={{flexDirection: "row", justifyContent:"center"}}>
                        <View style={{justifyContent:"center", alignItems:"center"}}>
                            <Image source={emptyIcon}></Image>
                            <Text
                                style={{
                                    fontFamily:'SF-Pro-Text-Bold',
                                    color:"#E2E2E2",
                                    fontSize:14
                                }}
                            >No reviews yet</Text>
                        </View>

                    </View>
                    }
                    {/* Floating action button */}
                    
                    
                </View> 
            
            </View>

            
        </SafeAreaView>
            {/* Bottom sheet, headache to implement */}
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
                                    
                                    renderItem={({item})=>{
                                        const src = imageMap[item.title];
                                        return <View
                                            style={{marginBottom:15}}
                                        >
                                            <MovieTile 
                                                source={src} 
                                                text={item.title} 
                                                editing={false}
                                                onTap={
                                                    mode === "review" ?
                                                    beginCreateReview:
                                                    addFav
                                                }
                                            
                                            />
                                        </View> 
                                    }}
                                />
                            </View>
                        </BottomSheet>

                </View>
                        {/* Floating Action Button */}
                        <TouchableOpacity
                            // style={{backgroundColor:'transparent'}}
                            style={styles.fab}
                            onPress={()=>{                    
                                setBottomSheetState(
                                    bottomSheetState=>!bottomSheetState
                                )
                            }}
                            >
                            <View >
                                    <Image source={fabIcon} style={styles.fabIcon}/>
                            </View>
                        </TouchableOpacity>

        </>
    );

}

const styles = StyleSheet.create({
    parent:{
        backgroundColor:"#0F1112",
        flex:1,
        paddingVertical:10,
        position:'relative'
    },

    // Top section here
    topSection:{
        padding:20,
        flexDirection:"row",
    },
    logo:{
        height:35,
        width:35,
        borderRadius:50,
    },
    logoText:{
        fontFamily:'Gotham-Rounded-Bold',
        color:"#FFFFFF",
        fontSize:21,
        letterSpacing:-0.42,
        paddingLeft:7
    },

    // Favorite Movie Section
    favText:{
        fontFamily:'SF-Pro-Text-Bold',
        fontSize:14,
        color:"#FFFFFF"
    },
    tinyIcon:{
        height:17,
        width:17,
    },

    // FAB Visuals
    fab:{
        backgroundColor: "#5C7CFA",
        // borderColor:"red",
        // borderWidth:10,
      
        height:61,
        width:61,
        borderRadius: 14,
        position:'absolute',
        zIndex:99, // One less than the bottom sheet
        right: 15,
        bottom: 43,
        justifyContent:'center',
        alignItems:'center',
        pointerEvents:'auto'  
        
    },
    fabIcon:{
        height:31,
        width:31,
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