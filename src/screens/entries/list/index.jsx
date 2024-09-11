import React, { useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"

import Tasks from "./tasks";
import Activities from "./activities";
import Reminders from "./reminders";
import ColorTabBar from "src/components/color/color-tab-bar";

import ColorContainer from "src/components/color/color-container";

const Tab = createMaterialTopTabNavigator();

const EntryList = () => {
    const [openedEntryId, setOpenedEntryId] = useState(-1);

    return <ColorContainer>
        <Tab.Navigator
            tabBar={props => <ColorTabBar {...props} />}
            sceneContainerStyle={{ backgroundColor: "transparent" }}
            screenOptions={{
                tabBarStyle: { backgroundColor: "transparent" }
            }}
        >
            <Tab.Screen name="Tasks">
                {props => <Tasks {...props} openedEntryId={openedEntryId} setOpenedEntryId={setOpenedEntryId} />}
            </Tab.Screen>
            <Tab.Screen name="Reminders">
                {props => <Reminders {...props} openedEntryId={openedEntryId} setOpenedEntryId={setOpenedEntryId} />}
            </Tab.Screen>
            <Tab.Screen name="Activities">
                {props => <Activities {...props} openedEntryId={openedEntryId} setOpenedEntryId={setOpenedEntryId} />}
            </Tab.Screen>
        </Tab.Navigator>
    </ColorContainer>
}

export default EntryList;