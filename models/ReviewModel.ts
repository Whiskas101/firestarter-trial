
import { DocumentSnapshot } from "firebase/firestore";
import { Movie } from "./MovieModel";

type reviewType = {
    id?: string;
    // movie_id: string;
    // title: string;
    rating: number;
    user_id: string;
    created_at: Date;
    likes: number;
    movie: Movie;
    content: string;
}

export class ReviewModel implements reviewType{
    id: string;
    // title: string;
    rating:number;
    // movie_id: string;
    user_id: string;
    created_at: Date; 
    likes: number;
    movie: Movie;
    content: string;

    constructor({ movie, rating, user_id, created_at, likes, content}: reviewType){
        this.id = "";
        // this.title = movie.title;
        this.rating = rating;
        // this.movie_id = movie.id;
        this.user_id= user_id;
        this.created_at= created_at
        this.likes = likes;
        this.movie = movie;
        this.content = content;
    }

    // To convert the firestore object into something usable at the frontend
    static fromFirestore(doc: DocumentSnapshot) : reviewType{
        const data = doc.data()!;

        return new ReviewModel({
            id: doc.id, // id exists on the doc, not on the data, unlike mongodb
            // title: data.title,
            rating: data.rating,
            // movie_id: data.movie_id,
            user_id: data.user_id,
            created_at: data.created_at,
            likes: data.likes || 0, // if no likes, show as zero
            movie: data.movie,
            content: data.content
        })
    }
    
    // creating an object compatible with writing to the database
    // id field is decided by the backend
    // this method will only be called for new reviews
    toFireStore(): Omit<reviewType, "id" >{
        return {
            // title : this.title,
            rating : this.rating,
            // movie_id : this.movie_id,
            user_id: this.user_id,
            created_at: this.created_at,
            likes: 0, // New reviews will have zero likes,
            movie: this.movie.toFireStore(),
            content: this.content
        }
    }


}