import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import Ionicons from '@expo/vector-icons/Ionicons';

import { useColorContext } from "src/contexts/color-context";

import CardContainer from "./common/card-container";
import CardTitle from "./common/card-title";
import CardDescription from "./common/card-description";
import CardTimeLabel from "./common/card-time-label";
import CardActionButton from "./common/card-action-button";

const ActivityCard = ({
    color = "#ffffff",
    entry,

    open = false,

    onPress,
    onEditPress,
    onDeletePress
}) => {
    const { parseToColorData } = useColorContext();

    const colorData = useMemo(() => parseToColorData(color), [color]);

    const heightStyle = useAnimatedStyle(() => {
        return {
            maxHeight: withTiming(!open ? 0 : 200, { duration: 500 }),
            opacity: withTiming(!open ? 0 : 1, { duration: 500 })
        }
    }, [open]);

    return <CardContainer
        colorData={colorData}
        onPress={onPress}
        style={{ zIndex: open ? 10 : 0 }}
        innerStyle={{ padding: 16 }}
    >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CardTitle style={{ flex: 1 }}>{entry.title}</CardTitle>
        </View>
        <Animated.View style={[heightStyle, { overflow: "hidden" }]}>
            {entry.description && <View style={{ marginTop: 16 }}>
                <CardDescription>{entry.description}</CardDescription>
            </View>}
            <View style={{ flexDirection: "row", gap: 16, marginTop: 16 }}>
                <CardActionButton
                    icon={<Ionicons name={"pencil"} size={20} />}
                    label={"Edit"}
                    onPress={onEditPress}
                    style={{ flex: 1 }}
                />
                <CardActionButton
                    icon={<Ionicons name={"trash"} size={20} />}
                    label={"Delete"}
                    onPress={onDeletePress}
                    style={{ flex: 1 }}
                />
            </View>
        </Animated.View>
        <View style={styles.LabelContainer}>
            <CardTimeLabel date={entry.datetime} colorData={colorData} />
        </View>
    </CardContainer>
}

const styles = StyleSheet.create({
    LabelContainer: {
        marginTop: 8,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    }
})

export default ActivityCard;