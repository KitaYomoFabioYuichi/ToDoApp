import React from "react";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { TouchableRipple } from "react-native-paper";

const CardActionButton = ({
    style,
    onPress,
    icon,
    label
})=>{
    return <View style={[styles.Container, style]}>
        <TouchableRipple onPress={onPress}>
            <View style={styles.InnerContainer}>
                {icon}
                <Text style={styles.Label}>{label}</Text>
            </View>
        </TouchableRipple>
    </View>
}

const styles = StyleSheet.create({
    Container:{
        overflow:"hidden",
        borderRadius:8
    },
    InnerContainer:{
        flexDirection:"row",
        alignItems:"center",
        padding:8,
        paddingVertical:12,
    },
    Label:{
        fontSize:16,
        fontWeight:"bold",
        marginLeft:32,
    }
})

export default CardActionButton;