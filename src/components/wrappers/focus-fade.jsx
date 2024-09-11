import React, { useEffect, useState } from "react";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import useOnFocus from "src/hooks/on-focus";

const FocusFade = ({
    children,
    duration = 250
})=>{
    const [show, setShow] = useState(false);

    useOnFocus(()=>{
        setShow(true);
        return ()=>setShow(false);
    },[]);

    const fadeStyle = useAnimatedStyle(()=>{
        return {
            opacity:withTiming(show?1:0,{duration})
        };
    },[show]);

    return <Animated.View style={[{flex:1}, fadeStyle]}>
        {children}
    </Animated.View>;
}

export default FocusFade;