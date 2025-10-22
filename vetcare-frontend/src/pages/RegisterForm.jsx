import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { AuthContext } from '../context/AuthContext';

export const RegisterForm = () => {

    const { signUp } = useContext( AuthContext );
    const [ formValues, handleInputChange ] = useForm({
        name: '',
        email: '',
        password: '',
    });

    const { name, email, password } = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();
        signUp({ name, email, password });
    };

    return (
        <div className="form-container">
            <h3>Crear Cuenta</h3>
            <form onSubmit={ handleSubmit }>
                 <div className="form-group">
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Nombre completo"
                        value={ name }
                        onChange={ handleInputChange }
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Correo electrónico"
                        value={ email }
                        onChange={ handleInputChange }
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Contraseña (6+ caracteres)"
                        value={ password }
                        onChange={ handleInputChange }
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="submit"
                        className="btnSubmit" 
                        value="Crear cuenta" />
                </div>
            </form>
            <p>¿Ya tienes una cuenta? <Link to="/auth/login">Ingresa aquí</Link></p>
        </div>
    )
}