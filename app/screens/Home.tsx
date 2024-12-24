import Review from "@/components/Review";
import MovieTile from "@/components/MovieTile";
import {View, Text, Image, StatusBar, StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// For pulling user data
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useEffect, useState } from "react";


// Assets
const logo =require("../../assets/icons/firestarter.png");
const userIcon = require("../../assets/icons/Google_7.png") // as a temporary measure
const fabIcon = require("../../assets/icons/Hand With Pen_1.png")
const editIcon = require("../../assets/icons/Edit_1.png")
const sortIcon = require("../../assets/icons/Sorting arrowheads_1.png")

const tempIcon = require("../../assets/stickers/Interstellar.png")

export default function Home(){

    const [user, setUser] = useState<FirebaseAuthTypes.User|null>(null);

    const [editing, setEditing] = useState(true);
    
    // Helper function
    function firstName(name: string | null | undefined){
        if (name){
            return name.split(" ")[0];
        }else{
            return "Loading";
        }
    }

    useEffect(()=>{
        const currentUser = auth().currentUser;
        if (currentUser){
            setUser(currentUser);
        }
    }, [])

    // const backgroundColor = "#0F1112";
    return (
        <SafeAreaView style={styles.parent}>
            <StatusBar backgroundColor={styles.parent.backgroundColor}/>
            {/* Top section, app name, user icon */}
            <View style={styles.topSection}>
                <Image source={logo} style={styles.logo}/>

                <Text style={styles.logoText}>firestarter</Text>
                <View style={{flex:1}}/>
                {/* User Profile Icon */}
                <Image source={userIcon} style={styles.logo}/>
            </View>
            {/* Favorite Movies Section */}
            {/* Text above the movie tiles*/}
            <View style={{flexDirection:"row", paddingHorizontal:25}}>
                <Text style={styles.favText}>
                    {/* Extracting the first name of the user from the logged in object, if it exists. */}
                    {firstName(user?.displayName)} favourite movies</Text>
                <View style={{flex:1}}/>
                <Image source={editIcon} style={styles.tinyIcon}></Image>
            </View>

            {/* Horizontal list of movie tiles */}
            <MovieTile source={tempIcon} text="Interstellar" editing={editing}/>

            {/* Reviews Section */}
            {/* Text Above the actual review box */}
            <View style={{flexDirection:"row", alignItems:"center", paddingHorizontal: 27}}>
                <Text style={styles.favText}>
                    Your Reviews
                </Text>
                <Image source={sortIcon} style={styles.tinyIcon}></Image>
            </View>
            {/* Actual Vertical (?) list of reviews here */}
            <Review 
            content="This is rather short review"
            profileImg={userIcon}
            username={firstName(user?.displayName)}
            movieIcon={tempIcon}
            movieName="Interstellar"
            rating={4}
            likes={12}
            />

            {/* Floating action button */}
          

        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    parent:{
        backgroundColor:"#0F1112",
        flex:1,
        paddingVertical:10,
    },

    // Top section here
    topSection:{
        padding:20,
        flexDirection:"row",
    },
    logo:{
        height:35,
        width:35,
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
        height:16,
        width:16,
    },

    // FAB Visuals
    fab:{
        // borderRadius: 1

    },
    fabIcon:{
        height:32,
        width:32
    }
});