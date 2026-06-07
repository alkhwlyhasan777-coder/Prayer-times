import { createContext, useState } from "react";

export const CityContext = createContext();

export function CityProvider({ children }) {
    const [city, setCity] = useState("Cairo");

    return (
        <CityContext.Provider value={{ city, setCity }}>
            {children}
        </CityContext.Provider>
    );
}