import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const useOnFocus = (focusCallback = ()=>{}, dependencies)=>{
    useFocusEffect(useCallback(focusCallback, dependencies));
}

export default useOnFocus;