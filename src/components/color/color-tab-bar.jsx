import React from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";

import { useColorContext } from "src/contexts/color-context";
import useOnFocus from "src/hooks/on-focus";
import CommonStyles from "src/styles/common-styles";

import Selector from "./color-selector";
import { TouchableRipple } from "react-native-paper";

const ColorTabBar = ({ state, descriptors, navigation, position }) => {
    const { colorData:{targetColors} } = useColorContext();

    const fillStyles = useAnimatedStyle(()=>{
        return { backgroundColor:withTiming(targetColors.mainColor, {duration:250}) };
    }, [targetColors]);

    const hideProgress = useSharedValue(0);

    useOnFocus(() => {
        hideProgress.value = withDelay(100, withTiming(1, { duration: 500 }));
        return () => hideProgress.value = withTiming(0, { duration: 300 });
    }, [])

    const hideStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: interpolate(hideProgress.value, [0, 1], [-100, 0]) }]
        }
    })

    return <>
        <Animated.View style={[CommonStyles.Shadow, styles.Container, fillStyles, hideStyle]}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate({ name: route.name, merge: true });
                    }
                }

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return <ColorTab
                    key={index}
                    title={label}
                    color={options.color}
                    isFocused={isFocused}
                    onPress={onPress}
                    onLongPress={onLongPress}
                />
            })}
            <Selector position={position}/>
        </Animated.View>
    </>
}

const ColorTab = ({
    title,
    isFocused,
    onPress = () => { },
    onLongPress = () => { }
}) => {
    return <TouchableRipple onPress={onPress} onLongPress={onLongPress} style={styles.Tab}>
        <Text style={[styles.TabTitle, isFocused ? styles.selected : ""]}>{String(title).toUpperCase()}</Text>
    </TouchableRipple>
}

const styles = StyleSheet.create({
    Container: {
        height: 50,
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        zIndex: 10,
        overflow: "hidden"
    },
    Shadow: {
        shadowColor: '#000000',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 20
    },
    Tab: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    TabTitle: {
        color: "rgba(0, 0, 0, 0.4)"
    },
    selected: {
        color: "black",
        fontWeight:"500"
    },
    TabSelect: {
        backgroundColor: "lightgray",
        width: 150,
        height: 150,
        position: "absolute",
        zIndex: -10,
        borderRadius: 100,
        opacity: 0.5
    },
    Selector: {
        position: "absolute",
        top:0,
        bottom:0,
        width:100,
        borderBottomWidth: 3,
    }
})

export default ColorTabBar;