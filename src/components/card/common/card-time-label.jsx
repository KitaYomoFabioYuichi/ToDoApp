import React from "react";
import { StyleSheet, Text } from "react-native";
import Animated from "react-native-reanimated";

import dayjs from "dayjs";
import calendar from 'dayjs/plugin/calendar';
dayjs.extend(calendar);

const CardTimeLabel = ({
    style,
    date,
    colorData:{fillStyles}
})=>{
    const getTimeFromDate = (date)=>{
        return dayjs(date).calendar(undefined, {
            lastWeek: '[Last] dddd, hh:mm A', // Last week ( Last Monday at 2:30 AM )
            lastDay: '[Yesterday,] hh:mm A', // The day before ( Yesterday at 2:30 AM )
            sameDay: '[Today,] hh:mm A', // The same day ( Today at 2:30 AM )
            nextDay: '[Tomorrow,] hh:mm A', // The next day ( Tomorrow at 2:30 AM )
            nextWeek: '[Next] dddd, hh:mm A', // The next week ( Sunday at 2:30 AM )
            sameElse: 'DD/MM/YY, hh:mm A ', // Everything else ( 7/10/2011 )
        })
    }

    return <Animated.View style={[styles.Container, styles.fill, fillStyles.darkColor].concat(style)}>
        <Text style={styles.DateTextFill}>{getTimeFromDate(date)}</Text>
    </Animated.View>
}

const styles = StyleSheet.create({
    Container:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:8,
    },
    fill:{
        paddingHorizontal:18,
        paddingVertical:6
    },
    DateTextFill:{
        fontSize:14,
        fontWeight:500,
        color:"white"
    }
});

export default CardTimeLabel;