import { Routes, Route, Navigate } from 'react-router-dom';
import { /*useAppThemeContext,*/ useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Dashboard } from '../pages';

export const AppRoutes = () => {

    //const { toggleTheme } = useAppThemeContext();    
    const { /*toggleDrawerOpen, */ setDrawerOptions } = useDrawerContext();

    useEffect(() => {
        setDrawerOptions([
            {
                icon: 'home',
                label: 'Página inicial',
                path: '/'
            },
            {
                icon: 'star',
                label: 'Pessoas',
                path: '/pessoas'
            },
            {
                icon: 'circle',
                label: 'Contas',
                path: '/contas'
            }

        ]);
    }, [setDrawerOptions])

    // <Button onClick={toggleDrawerOpen} variant='contained' color='primary'>Menu</Button>

    return (
        <>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/pessoas' element={<h1>Cadastro de pessoas</h1>} />
                <Route path='/contas' element={<h1>Cadastro de contas</h1>} />
                <Route path='*' element={<Navigate to="/" />} />
            </Routes>
        </>
    )
}