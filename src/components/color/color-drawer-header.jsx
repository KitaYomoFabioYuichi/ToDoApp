import React from "react";
import {StyleSheet, Text, Pressable, View} from "react-native"
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { useColorContext } from "src/contexts/color-context";
import Ionicons from '@expo/vector-icons/Ionicons';

import CommonStyles from "src/styles/common-styles";

//TODO improve header button

const ColorDrawerHeader = ({
    navigation,
    route
})=>{
    const { colorData:{targetColors} } = useColorContext();

    const fillStyles = useAnimatedStyle(()=>{
        return { backgroundColor:withTiming(targetColors.mainColor, {duration:250}) };
    }, [targetColors])

    return <Animated.View style={[CommonStyles.Shadow, styles.Container, fillStyles]}>
        <Pressable style={styles.PressableContainer} onPress={navigation.openDrawer}>
            <View style={[styles.Button]}>
                <Ionicons name="menu" size={32}/>
            </View>
            <Text style={styles.Title}>{route.name}</Text>
        </Pressable>
    </Animated.View>
}

const styles = StyleSheet.create({
    Container:{
        display:"flex",
        alignItems:"stretch",
        flexDirection:"row",
        zIndex:20,
        paddingTop:24
    },
    PressableContainer:{
        display:"flex",
        alignItems:"center",
        flexDirection:"row",
        padding:16,
    }, 
    Title:{
        marginLeft:32,
        fontSize:20,
        fontWeight:"bold",
    },
    Button:{
        width:40,
        height:40,
        borderRadius:100,
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
    }
})

export default ColorDrawerHeader;