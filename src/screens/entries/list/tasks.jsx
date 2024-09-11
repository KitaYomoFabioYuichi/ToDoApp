import React from "react";
import { Text, ScrollView, StyleSheet, View } from "react-native";
import CardList from "src/components/card-list";
import TaskCard from "src/components/card/task-card";
import SolidButton from "src/components/inputs/solid-button";
import { useEntryContext } from "src/contexts/entry-context";
import useSetColor from "src/hooks/use-set-color";
import Ionicons from '@expo/vector-icons/Ionicons';

const COLOR = "#E9887F";

const Tasks = ({
    navigation,
    openedEntryId,
    setOpenedEntryId
}) => {
    const { entries } = useEntryContext();

    useSetColor({ mainColor: COLOR });

    return <View style={styles.Container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ minHeight: 700 }}>
            <View style={styles.ButtonContainer}>
                <SolidButton
                    color={COLOR}
                    onPress={() => navigation.navigate("New Task")}
                    icon={()=><Ionicons name="add" size={20} color={"white"}/>}
                >New Task</SolidButton>
            </View>
            {entries.length > 0 ?
                <CardList
                    style={styles.ListContainer}
                    entries={entries.filter(e => e.type == "task")}
                    renderEntry={e => <EntryCard
                        entry={e}
                        navigation={navigation}
                        openedEntryId={openedEntryId}
                        setOpenedEntryId={setOpenedEntryId}
                    />}
                /> :
                <View style={styles.Empty}>
                    <Text style={styles.EmptyTitle}>There are no tasks.</Text>
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
    const { setEntry, removeEntry } = useEntryContext();

    return <TaskCard
        key={entry.id}
        entry={entry}
        color={COLOR}

        open={openedEntryId == entry.id}
        active={entry.status == "done"}

        onPress={() => {
            if (openedEntryId != entry.id) setOpenedEntryId(entry.id);
            else setOpenedEntryId(-1);
        }}
        onCheckPress={() => {
            if (entry.status == "in_progress") setEntry(entry.id, { status: "done" });
            else setEntry(entry.id, { status: "in_progress" })
        }}
        onDeletePress={() => {
            removeEntry(entry.id);
        }}
        onEditPress={() => navigation.navigate("Edit Task", { entryId: entry.id })}
    />
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        display: "flex"
    },
    ButtonContainer: {
        alignItems: "flex-end",
        padding: 16,
        paddingBottom: 0
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
    EmptyTitle:{
        fontSize:16,
        fontWeight:"bold",
        color:"#80808080"
    }
})

export default Tasks;