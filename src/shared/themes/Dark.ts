import { createTheme } from '@mui/material';
import { yellow, cyan } from '@mui/material/colors'; 

export const DarkTheme = createTheme({
    palette: {
        primary: {
            main: yellow[700],
            dark: yellow[800],
            light: yellow[500],
            contrastText: 'white'
        },
        secondary: {
            main: cyan[500],
            dark: cyan[400],
            light: cyan[300],
            contrastText: 'white'
        },
        background: {
            default: '#303134',
            paper: '#202124'
        }
    }
});
