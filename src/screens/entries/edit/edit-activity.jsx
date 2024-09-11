import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, Keyboard } from "react-native";

import ColorContainer from "src/components/color/color-container";
import useSetColor from "src/hooks/use-set-color";

import TitleInput from "src/components/inputs/title-input";
import DescripitionInput from "src/components/inputs/description-input";
import DateTimeInput from "src/components/inputs/date-time-input";
import SolidButton from "src/components/inputs/solid-button";
import { useEntryContext } from "src/contexts/entry-context";
import dayjs from "dayjs";
import { ToastAndroid } from "react-native";

const EditActivity = ({
    navigation,
    route
}) => {
    useSetColor({ mainColor: "#B9B5FC" });

    const [editing, setEditing] = useState(false);

    const { setEntry, getEntry } = useEntryContext();
    const { entryId } = route.params;

    const entry = getEntry(entryId);

    const [title, setTitle] = useState(entry.title);
    const [description, setDescription] = useState(entry.description);
    const [date, setDate] = useState(entry.datetime?dayjs(entry.datetime).toDate():null);

    const areValuesValid = ()=>{
        if(editing) return false;
        if(title.length <= 0) return false;
        if(!date) return false;
        return true;
    }

    const handleSetEntry = ()=>{
        setEditing(true);
        setEntry(entry.id, {
            title,
            description,
            datetime:dayjs(date).format("YYYY-MM-DD HH:mm:ss.SSS"),
        });
        navigation.goBack();
        Keyboard.dismiss();
        ToastAndroid.show("Activity successfully edited!", ToastAndroid.SHORT);
    }

    return <ColorContainer>
        <View>
            <ScrollView contentContainerStyle={styles.ContentContainer}>
                <View style={styles.InputContainer}>
                    <Text style={styles.SubTitle}>Title</Text>
                    <TitleInput value={title} setValue={setTitle} />
                </View>
                <View style={styles.InputContainer}>
                    <Text style={styles.SubTitle}>Description</Text>
                    <DescripitionInput value={description} setValue={setDescription} />
                </View>
                <View style={[styles.InputContainer, { alignItems: "flex-start" }]}>
                    <Text style={styles.SubTitle}>Date / Time</Text>
                    <DateTimeInput value={date} setValue={setDate}  maximumDate={new Date()}/>
                </View>
            </ScrollView>
        </View>
        <View style={styles.Footer}>
            <SolidButton disabled={!areValuesValid()} onPress={handleSetEntry}> <Text>Save Activity</Text></SolidButton>
        </View>
    </ColorContainer>
}

const styles = StyleSheet.create({
    ContentContainer: {
        padding: 16,
        paddingTop: 32,
        gap: 16,
    },
    SubTitle: {
        fontSize: 16,
        fontWeight: "bold"
    },
    InputContainer: {
        gap: 8,
    },
    Footer: {
        padding: 16,
        paddingTop: 32
    }
})

export default EditActivity;