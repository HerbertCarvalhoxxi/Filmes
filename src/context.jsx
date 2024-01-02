import { createContext, useState } from "react";

export const Context = createContext({})

export default function ContextProvider({ children }){

    const [saves, setSaves] = useState(1)

    return(<Context.Provider value={{
        
        setSaves,
        saves

    }}>
        {children}
    </Context.Provider>
    )
}