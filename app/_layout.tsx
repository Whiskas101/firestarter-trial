import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from 'expo-splash-screen';


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

    // Loading all the necessary fonts.
    const [loaded, error] = useFonts({
        'Gotham-Medium':require('../assets/fonts/Gotham Rounded Medium.ttf'),
        'Gotham-Rounded-Bold':require('../assets/fonts/Gotham Rounded Bold.ttf'),
        'SF-Pro-Text-Bold':require('../assets/fonts/sf-pro-text-bold.ttf'),
        'SF-Pro-Text-Medium':require('../assets/fonts/sf-pro-text-medium.ttf'),
    })

    useEffect(()=>{
        if(loaded || error){
            SplashScreen.hideAsync()
        }
    }, [loaded, error])

    if(!loaded && !error){
      return null;
    }


  return <Stack screenOptions={{
    headerShown:false, // hiding the header
    headerStyle:{
      backgroundColor:"#0F1112"
    },
   
  }}>
    <Stack.Screen name="index" options={{title:"base"}}></Stack.Screen>
    <Stack.Screen name="screens/Home" options={{title:"home"}}></Stack.Screen>
    <Stack.Screen name="screens/Landing" options={{title:"landing"}}></Stack.Screen>
    <Stack.Screen name="screens/CreateReview" options={{title:"create"}}></Stack.Screen>
    


  </Stack>;
}
