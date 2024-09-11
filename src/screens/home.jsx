import dayjs from "dayjs";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import CardList from "src/components/card-list";
import ActivityCard from "src/components/card/activity-card";
import ReminderCard from "src/components/card/reminder-card";
import TaskCard from "src/components/card/task-card";
import ColorContainer from "src/components/color/color-container";
import SolidButton from "src/components/inputs/solid-button";
import { useEntryContext } from "src/contexts/entry-context";
import useSetColor from "src/hooks/use-set-color";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const TASK_COLOR = "#E9887F";
const REMINDER_COLOR = "#92F598";
const ACTIVITY_COLOR = "#B9B5FC";

const Home = ({
    navigation
}) => {
    useSetColor({ mainColor: "#ffffff" });

    const { entries } = useEntryContext();

    const taskEntries = entries.filter(e => e.type == "task").filter(e => e.status == "in_progress").slice(0, 3);
    const reminderEntries = entries.filter(e => e.type == "reminder").filter(e => {
        let entryDate = dayjs(e.datetime);
        let dayDiff = entryDate.startOf("day").diff(dayjs().startOf("day"), "day");
        return dayDiff <= 7
    }).sort((a, b)=>{
        return dayjs(b.datetime).diff(a.datetime);
    }).slice(0, 3);
    const activityEntries = entries.filter(e => e.type == "activity").sort((a, b)=>{
        return dayjs(b.datetime).diff(a.datetime);
    }).slice(0, 3);

    return <ColorContainer style={styles.Container}>
        <ScrollView contentContainerStyle={styles.ContentContainer}>
            <View style={styles.BlockContainer}>
                <View style={styles.TitleContainer}>
                    <Text style={[styles.Title]}>Pending Task</Text>
                    <SolidButton
                        icon={() => <FontAwesome name="angle-double-right" size={20} color={"white"} />}
                        color={TASK_COLOR}
                        onPress={() => navigation.navigate("Entries", { screen: "Tasks" })}
                    >
                        See Task
                    </SolidButton>
                </View>
                <View style={styles.CardContainer}>
                    {taskEntries.length > 0 ?
                        <CardList
                            entries={taskEntries}
                            renderEntry={e => <HomeTaskCard entry={e} />}
                        /> :
                        <View style={styles.Empty}>
                            <Text style={styles.EmptyTitle}>There are no pending tasks.</Text>
                        </View>
                    }
                </View>
            </View>

            <View style={styles.BlockContainer}>
                <View style={styles.TitleContainer}>
                    <Text style={[styles.Title]}>Upcoming Reminders</Text>
                    <SolidButton
                        icon={() => <FontAwesome name="angle-double-right" size={20} color={"white"} />}
                        color={REMINDER_COLOR}
                        onPress={() => navigation.navigate("Entries", { screen: "Reminders" })}
                    >
                        See Reminders
                    </SolidButton>
                </View>
                <View style={styles.CardContainer}>
                    {reminderEntries.length > 0 ?
                        <CardList
                            entries={reminderEntries}
                            renderEntry={e => <HomeReminderCard entry={e} />}
                        /> :
                        <View style={styles.Empty}>
                            <Text style={styles.EmptyTitle}>There are no up coming reminders.</Text>
                        </View>
                    }
                </View>
            </View>

            <View style={styles.BlockContainer}>
                <View style={styles.TitleContainer}>
                    <Text style={[styles.Title]}>Recent Activities</Text>
                    <SolidButton
                        icon={() => <FontAwesome name="angle-double-right" size={20} color={"white"} />}
                        color={ACTIVITY_COLOR}
                        onPress={() => navigation.navigate("Entries", { screen: "Activities" })}
                    >
                        See Activities
                    </SolidButton>
                </View>
                <View style={styles.CardContainer}>
                    {activityEntries.length > 0 ?
                        <CardList
                            entries={activityEntries}
                            renderEntry={e => <HomeActivityCard entry={e} />}
                        />:
                        <View style={styles.Empty}>
                            <Text style={styles.EmptyTitle}>There are no recent activities.</Text>
                        </View>
                    }
                </View>
            </View>
        </ScrollView>
    </ColorContainer>
}

const HomeTaskCard = ({
    entry
}) => {
    const { setEntry } = useEntryContext();

    return <TaskCard
        entry={entry}
        color={TASK_COLOR}

        active={entry.status == "done"}
        onCheckPress={() => {
            if (entry.status == "in_progress") setEntry(entry.id, { status: "done" });
            else setEntry(entry.id, { status: "in_progress" })
        }}
    />
}

const HomeReminderCard = ({
    entry
}) => {
    return <ReminderCard
        entry={entry}
        color={REMINDER_COLOR}
    />
}

const HomeActivityCard = ({
    entry
}) => {
    return <ActivityCard
        entry={entry}
        color={ACTIVITY_COLOR}
    />
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    ContentContainer: {
        gap: 32,
        padding: 16,
        paddingTop: 32
    },
    BlockContainer: {
        gap: 16
    },
    TitleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    Title: {
        fontSize: 16,
        fontWeight: "bold"
    },
    CardContainer: {
        minHeight: 300,
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

export default Home;