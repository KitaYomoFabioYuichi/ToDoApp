import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, StyleSheet } from "react-native";
import { useColorContext } from "src/contexts/color-context";

const ColorTextInput = ({
    value = "",
    setValue = () => { },
    placeholder = "",
    style,
    ...props
}) => {
    const [focused, setFocused] = useState(false);

    const { targetColors } = useColorContext().colorData;
    const strokeColor = focused ? targetColors.mainColor : targetColors.darkColor

    return <TextInput
        value={value}
        onChangeText={setValue}
        style={[
            styles.Container,
            focused && styles.focused,
            {borderColor:strokeColor}
        ].concat(style)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        {...props}
    />
}

const styles = StyleSheet.create({
    Container: {
        padding: 8,
        paddingHorizontal: 16,
        backgroundColor:"#ffffff80",
        borderWidth: 1,
        borderRadius:8,
        fontSize: 16
    },
    focused: {
        borderWidth: 2
    }
})

export default ColorTextInput;