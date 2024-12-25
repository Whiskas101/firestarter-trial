// db setup
import {firebaseConfig} from "./firebaseConfig";
import { initializeApp } from "firebase/app";

//methods for manipulating data, and types for typescript
import { 
    arrayUnion, 
    arrayRemove, 
    doc,
    getDoc, 
    getFirestore, 
    updateDoc, 
    setDoc, 
    query,
    where,
    increment,
    deleteDoc
} from 'firebase/firestore';
import {collection, addDoc, getDocs} from "firebase/firestore";

// for getting user id of the currently logged in user.
import auth from "@react-native-firebase/auth";


// Models
import {Movie, movieType} from "./models/MovieModel";
import { Favourite } from "./models/FavoritesModel";
import { ReviewModel } from "./models/ReviewModel";
import { registerWebModule } from "expo";
// import { Favourite } from "./models/FavoritesModel";

// Init firebase
const app = initializeApp(firebaseConfig);

// Initialise firestore
const db = getFirestore(app) // just gives me a singleton instance of the db



// Methods to get, update, or delete data

//done
export async function fetchMovies(){
    const moviesCollection = collection(db, "movies");

    try{
        const snapshot = await getDocs(moviesCollection);
        const movies = snapshot.docs.map((doc) => {
            return Movie.fromFirestore(doc);
        })
        console.log(movies);
        
        return movies;
        
    }catch(err){
        console.log(err);
    }
}

//done
export async function getFavorites(){

    const user = auth().currentUser;
    
    if (!user) {
        console.log("not logged in!");
        return;
    }
    console.log(user.uid);
    


    const favouritesCollection = collection(db, "favourites");
    try{
        const snapshot = await getDocs(
            query(favouritesCollection, where("user_id", "==", user.uid))
        );

        if(snapshot.empty){
            console.log("no favourites exist");
            return [];
        }
        // console.log(snapshot.docs[0].data());
        // console.log(snapshot.docs[0].data().movies);
        const favorite = Favourite.fromFirestore(snapshot.docs[0])
        
        return favorite.movies;
        
    }catch(err){
        console.log(err);
        return [];
        
    }


}

//done
export async function favouriteMovie(movie: Movie){
    const user = auth().currentUser;
    if (!user) {
        console.log("not logged in!");
        return;
    }

    try{
        // create/update the favorite object.
        const favouritesDocRef = doc(db, 'favourites', user.uid);
        // try to fetch the current doc
        const favoritesDoc = await getDoc(favouritesDocRef);

        if (favoritesDoc.exists()){
            // firebase seems to ignore duplicate additions or updates, less work for me
            // update the doc
            const result = await updateDoc(favouritesDocRef, {
                movies:arrayUnion(movie.toFireStore())
            })

            console.log(result);
            return;
            
        }else{
            // if this is the first time the user uses the favorites feature:
            // create a new entry
            const favoritesData = {
                user_id: user.uid,
                movies: [movie.toFireStore()]
            }

            // push the new doc
            const result = await setDoc(favouritesDocRef, favoritesData);
            console.log(result);
            return;
            

        }
        

    }catch(err){
        console.log(err);
        
    }


    
}

//done
export async function unFavouriteMovie(movie: Movie){
    // get user 
    const user = auth().currentUser;
    if (!user) {
        console.log("not logged in!");
        return;
    }

    try{
        // create/update the favorite object.
        const favouritesDocRef = doc(db, 'favourites', user.uid);
        // try to fetch the current doc
        const favoritesDoc = await getDoc(favouritesDocRef);

        if (!favoritesDoc.exists()) {
            // if the user has never used the fav feature, can't delete anything
            console.log("User has never used the favourite feature");
            return;
        }

        const moviesData = favoritesDoc.data()?.movies || [];
        console.log("movies data");
        // console.log(moviesData)
        

        const movies = moviesData.map((item: any) => new Movie(item))
        
        const movieExists = movies.some((existingMovie : Movie) => existingMovie.id === movie.id);

        if( !movieExists){
            // the movie being removed was never added to favourites.
            console.log("Movie wasn't in favourites list!");
            return; 
        }
        

        const result = await updateDoc(favouritesDocRef, {
            movies:arrayRemove(movie.toFireStore())
        })
        

        console.log(result);
        return;
        
        
        

    }catch(err){
        console.log(err);
        
    }


}

//done
export async function createReview(movie: Movie, rating: number, content: string){
    // does not restrict user to one review per movie currently.
    
    const user = auth().currentUser;
    if (!user) {
        console.log("not logged in!");
        return;
    }   

    try{

        const reviewCollection = collection(db, "reviews");
        const review = new ReviewModel({
            user_id: user.uid,
            rating: rating,
            created_at: new Date(),
            likes: 0,
            movie: movie, // this is converted in the to firestore method, to a raw object
            content: content
        })
        console.log(review.toFireStore());
        
        const result = await addDoc(reviewCollection,  review.toFireStore())

        console.log(result);
        return result;

    }catch(err){
        console.log(err);
        return "fail"
        
    }
}

//done
export async function likeReview(review_id: string,{multiplier=1}){
    // does not prevent same review from being liked multiple times, currently
    const user = auth().currentUser;
    if (!user) {
        console.log("not logged in!");
        return;
    }   

    // const reviewsCollection = collection(db, "reviews");
    try{
        const reviewRef = doc(db, "reviews", review_id);
        
        const result = await updateDoc(reviewRef, {
            likes: increment(1 * multiplier) // if user wants to unlike, same request can be sent with multiplier of -1 to decrement.
        })

        console.log(`Liked ${review_id} ${result}`);
        return "success";
        
    }catch(err){
        console.log(err);
        
    }


}


export async function deleteReview(review_id: string){
    // to do
    const user = auth().currentUser;
    if (!user) {
        console.log("not logged in!");
        return;
    }   

    try{
        
        const reviewRef = doc(db, "reviews", review_id);
        await deleteDoc(reviewRef);
        console.log("deleted review");

    }catch(err){
        console.log(err);
        
    }
}

//done
export async function fetchAllReview(){
    const user = auth().currentUser;
    if (!user) {
        console.log("not logged in!");
        return [];
    }   

    const reviewsCollection = collection(db, "reviews");
    try{
        const snapshot = await getDocs(
            query(reviewsCollection, where("user_id", "==", user.uid))
        );
        if(snapshot.empty){
            console.log("user has no reviews");
            return [];
            
        }
        
        const reviews = snapshot.docs.map((item)=>{
            console.log("verify")
            // console.log(item);
            
            return ReviewModel.fromFirestore(item);
        })
        console.log("resulting review:")
        console.log(reviews);
        return reviews;
        
    }catch(err){
        console.log(err);
        return [];
    }


}


