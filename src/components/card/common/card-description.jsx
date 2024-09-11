import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CardDescription = ({
    style,
    textStyle,
    children
})=>{
    return <View style={style}>
        <Text style={[styles.Title].concat(textStyle)}>{children}</Text>
    </View>
}

const styles = StyleSheet.create({
    Title:{
        fontSize:16
    }
})

export default CardDescription;