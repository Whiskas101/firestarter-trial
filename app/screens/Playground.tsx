import {View, Text, TouchableOpacity} from "react-native";
import {createReview, deleteReview, favouriteMovie, fetchAllReview, fetchMovies, getFavorites, likeReview, unFavouriteMovie} from "../../firebaseService";
import { Movie } from "@/models/MovieModel";
import { ReviewModel } from "@/models/ReviewModel";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useMemo } from "react";



const backgroundColor = "#0F1112"


export default function Playground(){

    async function handlePress(){
        // fetchMovies();
        // const movie = new Movie(
        // {id: "ivS1gX0uBayb2PTkrY0k", rating: 5, title: "Interstellar"})
        // {id: "vUKud4zemjL6eiMHLcJ3", rating: 5, title: "Inception"}
        // );
        // const result = await unFavouriteMovie(movie);
        // console.log("made a fav req")

        const result = getFavorites();
        // const result = favouriteMovie(
        //     new Movie(
        //         {
        //             id:"0MzAWucoYxJKv3PGI4qr",
        //             rating:5,
        //             title:"Tenet"
        //         }


        //     )
        // )
        console.log(result);
        
        // const result = createReview(
        //     movie,
        //     5,
        // );
        // console.log(result);
        
        // const result = await fetchAllReview();
        // if (result === undefined) return;
        // console.log(result?.[0].created_at);
        
        // const result = await likeReview("Qaap2uTjPSmGQPVKim5h", {multiplier: -1})


        
    }


    console.log("bottom sheet")

    return (
        
            <View style={{backgroundColor:"blue", flex:1}}>
                    <TouchableOpacity
                        onPress={handlePress}
                    >
                        <Text>PRESS</Text>
                    </TouchableOpacity> 
            </View>
    );

}