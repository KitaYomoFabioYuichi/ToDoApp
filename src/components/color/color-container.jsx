import React from "react";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { useColorContext } from "src/contexts/color-context";

const ColorContainer = ({
    children,
    style
}) => {
    const { colorData:{targetColors} } = useColorContext();

    const fillStyles = useAnimatedStyle(()=>{
        return { backgroundColor:withTiming(targetColors.lightColor, {duration:250}) };
    }, [targetColors])

    return <Animated.View style={[
        styles.Container, 
        fillStyles
    ].concat(style)}>
        {children}
    </Animated.View>
}

const styles = StyleSheet.create({
    Container: {
        flex: 1
    }
})

export default ColorContainer;