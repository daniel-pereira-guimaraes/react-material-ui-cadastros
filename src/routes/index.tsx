import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { Dashboard, DetalheCidade, ListagemCidades } from '../pages';

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
                icon: 'location_city',
                label: 'Cidades',
                path: '/cidades'
            }

        ]);
    }, [setDrawerOptions])

    // <Button onClick={toggleDrawerOpen} variant='contained' color='primary'>Menu</Button>

    return (
        <>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/pessoas' element={<h1>Cadastro de pessoas</h1>} />
                <Route path='/cidades' element={<ListagemCidades />} />
                <Route path='/cidades/detalhe/:id' element={<DetalheCidade />} />
                <Route path='*' element={<Navigate to="/" />} />
            </Routes>
        </>
    )
}