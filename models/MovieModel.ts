import { DocumentSnapshot } from "firebase/firestore";

export type movieType = {
    id: string;
    title: string;
    rating: number;
}

export class Movie implements movieType{
    id: string;
    title: string;
    rating:number;

    constructor({id, title, rating}: movieType){
        this.id = id;
        this.title = title;
        this.rating = rating;
    }

    // To convert the firestore object into something usable at the frontend
    static fromFirestore(doc: DocumentSnapshot) : movieType{
        const data = doc.data()!;
        

        return new Movie({
            id: doc.id, // id exists on the doc, not on the data, unlike mongodb
            title: data.title,
            rating: data.rating,
        })
    }
   
    // converts it to an object so its can be stored on the backend without fuss
    toFireStore() : any {
        return {
            id: this.id,
            title:this.title,
            rating: this.rating,
        }
    }
}