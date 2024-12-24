import {View, Text, TouchableOpacity} from "react-native";
import {createReview, deleteReview, favouriteMovie, fetchAllReview, fetchMovies, getFavorites, likeReview, unFavouriteMovie} from "../../firebaseService";
import { Movie } from "@/models/MovieModel";
import { ReviewModel } from "@/models/ReviewModel";

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

        // getFavorites();
        
        // const result = createReview(
        //     movie,
        //     5,
        // );
        // console.log(result);
        
        // const result = await fetchAllReview();
        // if (result === undefined) return;
        // console.log(result?.[0].created_at);
        
        // const result = await likeReview("Qaap2uTjPSmGQPVKim5h", {multiplier: -1})
        console.log("frontend");
        const result = await deleteReview("LWao52VZUEGPJgjKg6RD")
        console.log(result);
        
    }

    return <View>
        <Text>Playground</Text>
        <TouchableOpacity
            onPress={handlePress}
        >

            <Text>Click me</Text>
        </TouchableOpacity>
    </View>
}