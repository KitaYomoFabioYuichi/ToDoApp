import React from "react";
import { StyleSheet, Animated, Dimensions } from "react-native";

const WIDTH = Dimensions.get('window').width;

const Selector = ({
    position
})=>{
    return <Animated.View style={[
        styles.Selector,
        {
            transform:[
                {translateX:position.interpolate({
                    inputRange:[0, 1],
                    outputRange:[0, WIDTH/3]
                })}
            ]
        }
    ]}/>
}

const styles = StyleSheet.create({
    Selector: {
        position: "absolute",
        top:0,
        bottom:0,
        width:WIDTH/3,
        borderBottomWidth: 3,
        borderColor:"#00000070"
    }
})

export default Selector;