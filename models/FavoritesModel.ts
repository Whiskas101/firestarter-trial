
import { DocumentSnapshot } from "firebase/firestore";
import { movieType } from "./MovieModel";

export type favouriteType = {
    user_id: string;
    movies: movieType[];
}

export class Favourite implements favouriteType{

    user_id: string;
    movies:movieType[];

    constructor({user_id, movies}: favouriteType){
        this.user_id = user_id,
        this.movies = movies;
    }

    // To convert the firestore object into something usable at the frontend
    static fromFirestore(doc: DocumentSnapshot) : Favourite{
        const data = doc.data()! as favouriteType;
        console.log("from Firestore called");
        
        
        const result = new Favourite({
            user_id: data.user_id, // id exists on the doc, not on the data, unlike mongodb
            movies: data.movies
        })


        return result;

    }
    
    // pushing a fav to the database.

    toFireStore(): favouriteType {
        return {
            user_id: this.user_id,
            movies: this.movies
        }
    }

}