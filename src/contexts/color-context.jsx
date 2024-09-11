import React, { createContext, useContext, useState } from "react";
import { pSBC } from "src/utils/color-utils";

const INITIAL_COLOR = "#ffffff";
const DARK_COLOR_PERCENTAGE = -0.6;
const LIGHT_COLOR_PERCENTAGE = 0.6;

const colorContext = createContext();

export const useColorContext = () => {
    return useContext(colorContext);
}

export const ColorProvider = ({
    children
}) => {
    const [colors, setColors] = useState({
        mainColor:INITIAL_COLOR,
        darkColor:INITIAL_COLOR,
        lightColor:INITIAL_COLOR
    });

    const { mainColor, darkColor, lightColor } = colors;

    const setColor = ({
        mainColorString,
        darkColorString = pSBC(DARK_COLOR_PERCENTAGE, mainColorString),
        lightColorString = pSBC(LIGHT_COLOR_PERCENTAGE, mainColorString)
    })=>{
        setColors({
            mainColor:mainColorString,
            darkColor:darkColorString,
            lightColor:lightColorString
        });
    }

    const targetColors = {
        mainColor,
        darkColor,
        lightColor
    }

    const parseToColorData = (colorString)=>{
        const mc = colorString;
        const dc = pSBC(DARK_COLOR_PERCENTAGE, mc);
        const lc = pSBC(LIGHT_COLOR_PERCENTAGE, mc);

        return {
            fillStyles:{
                mainColor:{ backgroundColor:mc },
                darkColor:{ backgroundColor:dc },
                lightColor:{ backgroundColor:lc }
            },
            outlineStyles:{
                mainColor:{ borderColor:mc },
                darkColor:{ borderColor:dc },
                lightColor:{ borderColor:lc }
            },
            targetColors:{
                mainColor:mc,
                darkColor:dc,
                lightColor:lc
            }
        }
    }

    return <colorContext.Provider value={{
        colorData:{
            targetColors
        },
        setColor,
        parseToColorData
    }}>
        {children}
    </colorContext.Provider>
}