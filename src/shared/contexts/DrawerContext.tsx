import React, { createContext, useCallback, useContext, useState } from "react";

interface IDrawerContextData {
    isDrawerOpen: boolean;
    toggleDrawerOpen: () => void;
};

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
    return useContext(DrawerContext);
};

interface IDrawerContextProps {
    children: React.ReactNode;
};

export const DrawerProvider: React.FC<IDrawerContextProps> = ({ children }) => {
    const [isDrawerOpen, SetIsDrawerOpen] = useState(false);

    const toggleDrawerOpen = useCallback(() => {
        console.log('toggleDrawerOpen chamada.')
        SetIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
    }, []);

    return (
        <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen }}>
            {children}
        </DrawerContext.Provider>
    );
};