import dayjs from "dayjs";
import React, { useState } from "react";
import { Text, ScrollView, StyleSheet, View } from "react-native";
import CardList from "src/components/card-list";
import ActivityCard from "src/components/card/activity-card";
import DateInput from "src/components/inputs/date-input";
import SolidButton from "src/components/inputs/solid-button";
import { useEntryContext } from "src/contexts/entry-context";
import useSetColor from "src/hooks/use-set-color";
import Ionicons from '@expo/vector-icons/Ionicons';

const COLOR = "#B9B5FC";

const Activities = ({
    navigation,
    openedEntryId,
    setOpenedEntryId
}) => {
    const { entries } = useEntryContext();

    useSetColor({ mainColor: COLOR });

    const [dateFilter, setDateFilter] = useState(undefined);

    return <View style={styles.Container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ minHeight: 700 }}>
            <View style={styles.ButtonContainer}>
                <DateInput color={COLOR} value={dateFilter} maximumDate={dayjs().endOf("day").toDate()} setValue={setDateFilter} style={{ flex: 1 }} />
                <SolidButton
                    color={COLOR}
                    onPress={() => navigation.navigate("New Activity")}
                    icon={()=><Ionicons name="add" size={20} color={"white"}/>}
                >New Activity</SolidButton>
            </View>
            {entries.length > 0 ?
                <CardList
                    style={styles.ListContainer}
                    entries={entries.filter(e => e.type == "activity").filter(e => {
                        if (!dateFilter) return true;
                        return dayjs(e.datetime).startOf("day").diff(dateFilter) == 0
                    }).sort((a, b)=>{
                        return dayjs(b.datetime).diff(a.datetime);
                    })}
                    renderEntry={e => <EntryCard
                        entry={e}
                        navigation={navigation}
                        openedEntryId={openedEntryId}
                        setOpenedEntryId={setOpenedEntryId}
                    />}
                />:
                <View style={styles.Empty}>
                    <Text style={styles.EmptyTitle}>There are no activities.</Text>
                </View>
            }
        </ScrollView>
    </View>
}

const EntryCard = ({
    entry,
    openedEntryId,
    setOpenedEntryId,
    navigation
}) => {
    const { removeEntry } = useEntryContext();

    return <ActivityCard
        key={entry.id}
        entry={entry}
        color={COLOR}

        open={openedEntryId == entry.id}

        onPress={() => {
            if (openedEntryId != entry.id) setOpenedEntryId(entry.id);
            else setOpenedEntryId(-1);
        }}
        onDeletePress={() => {
            removeEntry(entry.id);
        }}
        onEditPress={() => navigation.navigate("Edit Activity", { entryId: entry.id })}
    />
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        display: "flex"
    },
    ButtonContainer: {
        alignItems: "center",
        padding: 16,
        paddingBottom: 0,
        gap: 16,
        flexDirection: "row"
    },
    ListContainer: {
        flex: 1,
        gap: 16,
        padding: 16
    },
    Empty: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    EmptyTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#80808080"
    }
})

export default Activities;