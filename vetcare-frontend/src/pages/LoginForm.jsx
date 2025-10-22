import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { AuthContext } from '../context/AuthContext';

export const LoginForm = () => {

    const { signIn } = useContext( AuthContext );
    const [ formValues, handleInputChange ] = useForm({
        email: '',
        password: ''
    });

    const { email, password } = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();
        signIn({ email, password });
    }

    return (
        <div className="form-container">
            <h3>Iniciar Sesión</h3>
            <form onSubmit={ handleSubmit }>
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
                        placeholder="Contraseña"
                        value={ password }
                        onChange={ handleInputChange }
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="submit"
                        className="btnSubmit"
                        value="Login" 
                    />
                </div>
            </form>
            <p>¿No tienes una cuenta? <Link to="/auth/register">Regístrate aquí</Link></p>
        </div>
    )
}