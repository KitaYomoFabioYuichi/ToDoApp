import React, { useRef } from "react";

import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { StyleSheet, Pressable, Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

import { useColorContext } from "src/contexts/color-context";
import dayjs from "dayjs";

const DateInput = ({
    value,
    setValue = () => { },
    style,
    minimumDate,
    maximumDate,
    color  = "#ffffff"
}) => {

    const {parseToColorData} = useColorContext();
    const colorData = parseToColorData(color);
    const { targetColors } = colorData;

    const openModal = (mode)=>{
        DateTimePickerAndroid.open({
            mode,
            value: value ?? dayjs().startOf("day").toDate(),
            onChange: onChange,
            minimumDate: minimumDate?dayjs(minimumDate).startOf("day").toDate():undefined,
            maximumDate: maximumDate?dayjs(maximumDate).endOf("day").toDate():undefined
        })
    }

    const onChange = (e, v) => {
        if (e.type == 'set') setValue(v)
    }

    const showDatePicker = () => {
        openModal("date")
    }

    const borderStyle = { borderColor: targetColors.darkColor };

    const hasValue = value;

    return <View style={[styles.Container, borderStyle].concat(style)}>
        <Pressable
            style={[styles.DatePressable, borderStyle]}
            onPress={showDatePicker}
        >
            <Ionicons color={"black"} name="calendar-sharp" size={24} />
            <Text style={[styles.Text, !hasValue && styles.empty]}>
                {hasValue ? dayjs(value).format("DD-MM-YYYY") : "Choose Date..."}
            </Text>
        </Pressable>
        {hasValue &&
            <Pressable
                style={[styles.RemovePressable, borderStyle]}
                onPress={() => setValue(undefined)}
            >
                <Ionicons name="ios-close" size={24} />
            </Pressable>
        }
    </View>
}

const styles = StyleSheet.create({
    Container: {
        backgroundColor: "#ffffff80",
        borderWidth: 1,
        borderRadius: 8,

        height: 48,
        flexDirection: "row",
        alignItems: "stretch"
    },
    DatePressable: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        paddingHorizontal: 16,
        flex: 1
    },
    TimePressable: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingHorizontal: 16,
        borderLeftWidth: 1,
        flex: 1
    },
    RemovePressable: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 48,
        borderLeftWidth: 1
    },
    Text: {
        fontSize: 16,
    },
    empty: {
        color: "gray"
    }

})

export default DateInput