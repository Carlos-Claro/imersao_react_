import React from "react";

export const colorModeContext = React.createContext({
    mode:"",
    setMode: ()=> alert("configurar mode"),
    toggleMode: ()=> alert("configurar togglemode"),
});
export default function ColorModeProvider(props){
    const [mode, setMode] = React.useState(props.initialMode)

    function toggleMode(){
        if(mode == "dark") setMode("light");
        if(mode == "light") setMode("dark");
    }

    return(
        <colorModeContext.Provider value={{ mode: mode, toggleMode:toggleMode }}>
            {props.children}
        </colorModeContext.Provider>
    )
}