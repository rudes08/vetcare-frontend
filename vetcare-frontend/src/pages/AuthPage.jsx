import React, { useContext, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2'; // Una librería para alertas más bonitas
import './AuthPage.css'; // Crearemos este archivo para los estilos

export const AuthPage = () => {

    const { errorMessage, removeError } = useContext( AuthContext );

    // Efecto para mostrar una alerta de error cuando errorMessage cambie
    useEffect(() => {
        if ( errorMessage.length > 0 ) {
            Swal.fire('Error de Autenticación', errorMessage, 'error');
            removeError(); // Limpiamos el error después de mostrarlo
        }
    }, [errorMessage]);


    return (
        <div className="auth-container">
            <div className="auth-box">
                <Routes>
                    <Route path="login" element={ <LoginForm /> } />
                    <Route path="register" element={ <RegisterForm /> } />
                    
                    {/* Cualquier otra ruta dentro de /auth redirige al login */}
                    <Route path="*" element={ <Navigate to="/auth/login" /> } /> 
                </Routes>
            </div>
        </div>
    )
}