

import {
    View, 
    Text, 
    Image,
    StyleSheet, 
    Dimensions, 
    useWindowDimensions, 
    Button,
    TouchableWithoutFeedback,
    TouchableOpacity
} from "react-native";

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
} from "react-native-reanimated";

import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView
} from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { transform } from "@babel/core";

// assets
const backIcon = require("../assets/icons/Go Back_3.png")

export default function BottomSheet({ isOpen, setIsOpen, children} : any){

    // const [isOpen, setIsOpen] = useState(false);

    const {height: SCREEN_HEIGHT} = useWindowDimensions();
    const MAX_TRANSLATE_Y = SCREEN_HEIGHT / 4.1;
    const translateY = useSharedValue(SCREEN_HEIGHT);

    const backdropOpacity = useSharedValue(0);

    const openSheet = () => {
        translateY.value = withSpring(MAX_TRANSLATE_Y, {damping: 50});
        backdropOpacity.value = withTiming(1, {duration:700});
        // setIsOpen(true);
    }
    const closeSheet = () => {
        translateY.value = withSpring(SCREEN_HEIGHT, {damping: 50});
        backdropOpacity.value = withTiming(0, {duration:700});
        // setIsOpen(false);
    }

    // const toggleBottomSheet = () => {
    //     if (isOpen) {
    //         closeSheet()
    //     } else {
    //         openSheet()
    //     }
    //     // setIsOpen(!isOpen);
    // };

    useEffect(()=>{
        if(isOpen){
           openSheet()
        }else{
            closeSheet()
        }
    }, [isOpen])


    
    

    


    const animatedStyle = useAnimatedStyle(()=>({
        transform: [{translateY: translateY.value}]
    }));

    const animatedBackdropOpacity = useAnimatedStyle(()=>({
       opacity: backdropOpacity.value
    }));


    return (
        
            <GestureHandlerRootView style={{ flex: 1 }}>
                <View style={styles.container}>
                    {/* <Button title={isOpen ? "Close Bottom Sheet" : "Open Bottom Sheet"} onPress={toggleBottomSheet} /> */}

                    {
                        isOpen && (
                            <Animated.View 
                            style={[styles.backdrop, animatedBackdropOpacity]}
                            
                            >
                            <TouchableWithoutFeedback onPress={()=>setIsOpen(false)}>
                                <View style={styles.backdrop}/>
                        </TouchableWithoutFeedback>
                        </Animated.View>
                        )

                    }
                    <Animated.View style={[styles.bottomSheet, animatedStyle]}>
                        {/* Top section of bottom sheet */}
                        {/* <View style={styles.handle}/> */}
                        <View style={styles.bottomSheetTopSection}>
                            {/* Back Button */}
                            <TouchableWithoutFeedback
                                onPress={()=>setIsOpen(!isOpen)}
                            >
                                <Image source={backIcon} style={styles.backIcon}/>
                            </TouchableWithoutFeedback>
                            {/* Top Text Comp */}
                            <Text style={styles.topText}>Movies</Text>
                        </View>
                        {children}
                    </Animated.View>
                </View>
            </GestureHandlerRootView>
        
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        // backgroundColor: "#",
    },

    backdrop:{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.5)"
    },

    bottomSheet:{
        position: "absolute",
        top: 0, 
        left: 0,
        right: 0,
        height: "100%",
        flex:1,
        backgroundColor: "#0F1112",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 100,
    },

    bottomSheetTopSection:{
        flexDirection:'row',
        position:'relative',
        alignItems:'center',
        justifyContent:'flex-start',
        // alignSelf:'center',

        paddingVertical:20,
        // marginVertical:10,
        // backgroundColor:'red',
        alignContent:'center',
        
    },

    
    backIcon:{
        height:27,
        width:27,
        marginLeft:27,
        zIndex:1,
        // backgroundColor:'blue'
    },

    topText:{
        fontFamily:'SF-Pro-Text-Bold',
        color:'#535353',
        fontSize:20,

        position:'absolute',

        left:0,
        right:0,
        top:"50%", // accounting for the padding given to the top section parent object
        textAlign:'center',
        // backgroundColor:'green',
        zIndex: -1 // To make back the back button clickable.
    
    },

    // handle: {
    //     width: 60,
    //     height: 6,
    //     backgroundColor: "#ccc",
    //     borderRadius: 3,
    //     alignSelf: "center",
    //     marginVertical: 10,
    // },

    content: {
        padding: 16,
        height:100,
        fontSize: 16,
    },
});
