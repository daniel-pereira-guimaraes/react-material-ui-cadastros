import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { ThemeProvider } from '@mui/material';
import { DarkTheme, LightTheme } from "../themes";
import { Box } from '@mui/system';

type ThemeName = 'light' | 'dark';

interface IThemeContextData {
    themeName: ThemeName;
    toggleTheme: () => void;
};

const ThemeContext = createContext({} as IThemeContextData);

export const useAppThemeContext = () => {
    return useContext(ThemeContext);
};

interface IThemeContextProps {
    children: React.ReactNode;
};

export const AppThemeProvider: React.FC<IThemeContextProps> = ({ children }) => {
    const [themeName, setThemeName] = useState<ThemeName>('light');

    const toggleTheme = useCallback(() => {
        console.log('toggleTheme chamada.')
        setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light');
    }, []);

    const theme = useMemo(() => {
        if (themeName === 'light') 
            return LightTheme;
        return DarkTheme;
    }, [themeName]);

    return (
        <ThemeContext.Provider value={{ themeName, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
                    {children}
                </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};