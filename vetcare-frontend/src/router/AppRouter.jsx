// src/router/AppRouter.jsx (versión mejorada)
import { useContext } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AuthPage } from '../pages/AuthPage';
import { DashboardPage } from '../pages/DashboardPage';

export const AppRouter = () => {
    const { status } = useContext(AuthContext);

    if (status === 'checking') {
        return <h3>Cargando...</h3> // O un componente de Spinner
    }

    return (
        <BrowserRouter>
            <Routes>
                {
                    (status === 'authenticated')
                    ? <Route path="/*" element={<DashboardPage />} />
                    : <Route path="/auth/*" element={<AuthPage />} />
                }
                <Route path='/*' element={<Navigate to='/auth/login' />} />
            </Routes>
        </BrowserRouter>
    );
}