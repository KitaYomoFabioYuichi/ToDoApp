import { useColorContext } from "src/contexts/color-context";
import useOnFocus from "./on-focus";

const useSetColor = ({
    mainColor = "#ffffff",
    darkColor,
    lightColor
})=>{
    const { setColor } = useColorContext();

    useOnFocus(()=>{
        setColor({
            mainColorString:mainColor,
            darkColorString:darkColor,
            lightColorString:lightColor
        });
    },[mainColor, darkColor, lightColor])
}

export default useSetColor;