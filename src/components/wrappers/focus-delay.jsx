import React, { useState } from "react";
import useOnFocus from "src/hooks/on-focus";

const FocusDelay = ({
    children,
    placeholderComponent = <></>,
    delay = 250
})=>{
    const [ready, setReady] = useState(false);

    useOnFocus(()=>{
        setTimeout(()=>setReady(true),delay);
    },[]);

    if(!ready) return placeholderComponent;
    return children;
}

export default FocusDelay;