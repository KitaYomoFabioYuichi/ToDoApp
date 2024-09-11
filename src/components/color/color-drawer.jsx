import React from "react";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { useColorContext } from "src/contexts/color-context";

import { DrawerItem } from "@react-navigation/drawer";

const ColorDrawer = ({
    state,
    navigation
}) => {
    const { colorData:{targetColors} } = useColorContext();

    const fillStyles = useAnimatedStyle(()=>{
        return { backgroundColor:withTiming(targetColors.mainColor, {duration:250}) };
    }, [targetColors])
    
    return <Animated.View style={[styles.Container, fillStyles]}>
        {state.routes.map((route, index)=>{
            return <Tabs
                key={route.key}
                label={route.name}
                focused={state.index === index}
                onPress={()=>{
                    navigation.navigate({ name: route.name, merge: true })
                }}
            />
        })}
    </Animated.View>
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "stretch",
        paddingTop: 60
    }
})

const Tabs = ({label="", focused = false, onPress = ()=>{}})=>{
    return <DrawerItem
        label={label} 
        activeTintColor={"#000000"} 
        focused={focused} 
        onPress={onPress}
    />
}

export default ColorDrawer;