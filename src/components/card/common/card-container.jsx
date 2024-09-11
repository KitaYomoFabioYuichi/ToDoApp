import React from "react";
import { StyleSheet } from "react-native";
import { AnimatedFAB, TouchableRipple } from "react-native-paper";
import Animated from "react-native-reanimated";

const CardContainer = ({
    style,
    innerStyle,
    children,
    colorData: { fillStyles },
    onPress
}) => {
    return <Animated.View style={[styles.Container, fillStyles.mainColor].concat(style)}>
        <TouchableRipple onPress={onPress}>
            <Animated.View style={innerStyle}>
                {children}
            </Animated.View>
        </TouchableRipple>
    </Animated.View>
}

const styles = StyleSheet.create({
    Container: {
        borderRadius: 8,
        backgroundColor: "white",
        overflow:"hidden"
    }
})

export default CardContainer;