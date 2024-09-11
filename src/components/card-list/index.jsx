import React from "react";
import { View } from "react-native";
import Animated, { FadeInDown, FadeOutDown, withSpring, withTiming } from "react-native-reanimated";

const CardList = ({
    entries,
    renderEntry,
    style
}) => {
    return <View style={[{gap:16}, style]} >
        {entries.map((e, i) => <EntryContainer key={e.id} entry={e} index={i} renderEntry={renderEntry} />)}
    </View>
}

const EntryContainer = ({
    entry,
    index,
    renderEntry
}) => {

    const CustomLayout = (values) => {
        'worklet'
        return {
            animations: {
                originX: withTiming(values.targetOriginX, { duration: 250 }),
                originY: withTiming(values.targetOriginY, { duration: 250 }),
                width: withSpring(values.targetWidth),
                height: withSpring(values.targetHeight),
            },
            initialValues: {
                originX: values.currentOriginX,
                originY: values.currentOriginY,
                width: values.currentWidth,
                height: values.currentHeight,
            }
        };
    }

    return <Animated.View
        entering={FadeInDown}
        exiting={FadeOutDown}
        layout={CustomLayout}
    >
        {renderEntry(entry, index)}
    </Animated.View>
}

export default CardList;