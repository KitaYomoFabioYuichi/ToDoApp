import React from "react";
import ColorTextInput from "./common/color-text-input";
import { View, Text } from "react-native";

const MAX_LENGTH = 30;

const TitleInput = (props)=>{
    return <View>
        <ColorTextInput 
            {...props} 
            placeholder={"Title"} 
            style={{fontSize:20}} 
            maxLength={MAX_LENGTH}
        />
        <Text style={{textAlign:"right", color:"#808080"}}>{props.value.length}/{MAX_LENGTH}</Text>
    </View>
}

export default TitleInput;