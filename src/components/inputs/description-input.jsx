import React from "react";
import ColorTextInput from "./common/color-text-input";
import { View, Text } from "react-native";

const MAX_LENGTH = 100;

const DescripitionInput = (props)=>{
    return <View>
        <ColorTextInput 
            {...props} 
            placeholder={"Write a description..."}
            numberOfLines={5}
            style={{
                textAlignVertical:"top",
                fontSize:16,
                minHeight:120,
                maxHeight:120
            }}
            multiline
            maxLength={100}
        />
        <Text style={{textAlign:"right", color:"#808080"}}>{props.value.length}/{MAX_LENGTH}</Text>
    </View>
}

export default DescripitionInput;