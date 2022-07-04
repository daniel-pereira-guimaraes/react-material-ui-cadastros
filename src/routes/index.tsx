import { Routes, Route, Navigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useAppThemeContext, useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {

    const { toggleTheme } = useAppThemeContext();    
    const { toggleDrawerOpen } = useDrawerContext();

    return (
        <Routes>
            <Route path='/' element={
                <Button
                    onClick={toggleDrawerOpen} 
                    variant='contained' 
                    color='primary'>
                    Menu
                </Button>
            } />
            <Route path='*' element={<Navigate to="/" />} />
        </Routes>
    )
}