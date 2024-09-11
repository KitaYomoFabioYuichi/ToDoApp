import React, { useMemo } from "react";
import { StyleSheet } from "react-native"
import { Button } from "react-native-paper";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { useColorContext } from "src/contexts/color-context";

const SolidButton = ({
    children,
    color,
    onPress = ()=>{},
    disabled = false,
    style,
    icon
})=>{
    const { colorData, parseToColorData } = useColorContext();

    const finalColorData = useMemo(() => {
        if (color) return parseToColorData(color);
        else return colorData;
    }, [color, colorData]);
    const {targetColors} = finalColorData;


    //Disabled
    const backgroundColor = disabled?"#AAAAAA80":targetColors.darkColor;

    const disabledStyle = useAnimatedStyle(()=>{
        return {
            backgroundColor:withTiming(backgroundColor, {duration:250})
        }
    },[disabled])

    return <Animated.View style={[styles.Container, disabledStyle].concat(style)}>
        <Button
            mode="contained" 
            buttonColor="transparent" 
            onPress={onPress}
            style={styles.Content}
            icon={icon}
            disabled={disabled}
        >
            {children}
        </Button>
    </Animated.View>
}

const styles = StyleSheet.create({
    Container:{
        borderRadius:8
    },
    Content:{
        borderRadius:8
    }
})

export default SolidButton;