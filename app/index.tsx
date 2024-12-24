
import { Text, View } from "react-native";
import Landing from "./screens/Landing";
import Home from "./screens/Home";
import CreateReview from "./screens/CreateReview";

const tempIcon = require("../assets/stickers/Interstellar.png")

export default function Index() {
  return (
    <Landing/>
    // <Home/>
    // <CreateReview MovieIcon={tempIcon} MovieName="Interstellar"/>
  );

}
