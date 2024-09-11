import React from "react";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { StyleSheet, Pressable} from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableRipple } from "react-native-paper";

const CardCheck = ({
    style,
    active = false,
    onPress,
    colorData:{targetColors}
})=>{
    const activeStyle = useAnimatedStyle(()=>{
        const backColor = active?targetColors.darkColor:"transparent";

        return {
            backgroundColor:withTiming(backColor, {duration:100}),
            borderColor:withTiming(targetColors.darkColor, {duration:250}),
            borderWidth:active?0:2,
            borderRadius:8,
            borderStyle:active?"solid":"dashed"
        };
    }, [active, targetColors])

    return <TouchableRipple onPress={onPress}>
        <Animated.View style={[
            styles.Container, 
            activeStyle
        ].concat(style)}>
            {active&&<Ionicons color={"white"} name="ios-checkmark-sharp" size={32}/>}
        </Animated.View>
    </TouchableRipple>
}

const styles = StyleSheet.create({
    Container:{
        width:48,
        height:48,
        justifyContent:"center",
        alignItems:"center",
    },
    notFilled:{
        borderWidth:2,
        borderRadius:8,
        borderStyle:"dashed",
        backgroundColor:"transparent"
    },
    filled:{
        borderWidth:0,
        borderRadius:8,
        borderStyle:"solid",
        backgroundColor:"transparent"
    }
});

export default CardCheck;