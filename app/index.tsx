
import { Text, View} from "react-native";
import Landing from "./screens/Landing";
import Home from "./screens/Home";
import CreateReview from "./screens/CreateReview";
import Playground from "./screens/Playground";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import auth from "@react-native-firebase/auth"
import { GestureHandlerRootView } from "react-native-gesture-handler";

// const tempIcon = require("../assets/stickers/Interstellar.png")

export default function Index() {

 
  return (
    
      <Landing/>
   
    
    // <Home/>
    // <CreateReview MovieIcon={tempIcon} MovieName="Interstellar"/>
    // <Playground/>
  );

}
