import { createContext, useEffect, useReducer } from 'react';
import vetcareApi from '../api/vetcareApi';

// 1. Definir cómo se ve la información (el estado)
const initialState = {
    status: 'checking', // 'authenticated', 'not-authenticated'
    token: null,
    user: null,
    errorMessage: '',
};

// 2. Crear el contexto
export const AuthContext = createContext({});

// 3. El Reducer: una función pura que maneja los cambios de estado
const authReducer = (state, action) => {
    switch (action.type) {
        case 'signIn':
            return {
                ...state,
                status: 'authenticated',
                token: action.payload.token,
                user: action.payload.user,
                errorMessage: '',
            };
        case 'addError':
            return {
                ...state,
                status: 'not-authenticated',
                token: null,
                user: null,
                errorMessage: action.payload,
            };
        case 'logOut':
        case 'notAuthenticated':
            return {
                ...state,
                status: 'not-authenticated',
                token: null,
                user: null,
            };
        case 'clearErrorMessage':
            return {
                ...state,
                errorMessage: '',
            };
        default:
            return state;
    }
};

// 4. El Proveedor: el componente que provee la información
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Efecto para revisar el token al cargar la app
    useEffect(() => {
        checkAuthToken();
    }, []);

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch({ type: 'notAuthenticated' });

        try {
            const { data } = await vetcareApi.get('/auth/renew');
            localStorage.setItem('token', data.token);
            dispatch({
                type: 'signIn',
                payload: {
                    token: data.token,
                    user: { uid: data.uid, name: data.name },
                },
            });
        } catch (error) {
            localStorage.removeItem('token');
            dispatch({ type: 'notAuthenticated' });
        }
    };

    const signIn = async ({ email, password }) => {
        try {
            const { data } = await vetcareApi.post('/auth', { email, password });
            dispatch({
                type: 'signIn',
                payload: {
                    token: data.token,
                    user: { uid: data.uid, name: data.name },
                },
            });
            // Guardamos el token en el almacenamiento local del navegador 🔑
            localStorage.setItem('token', data.token);
        } catch (error) {
            dispatch({
                type: 'addError',
                payload: error.response.data?.msg || 'Información incorrecta',
            });
        }
    };

    const signUp = async ({ name, email, password }) => {
        try {
            const { data } = await vetcareApi.post('/auth/new', { name, email, password });
            dispatch({
                type: 'signIn',
                payload: {
                    token: data.token,
                    user: { uid: data.uid, name: data.name },
                },
            });
            localStorage.setItem('token', data.token);
        } catch (error) {
            dispatch({
                type: 'addError',
                payload: error.response.data?.msg || 'El correo ya está registrado',
            });
        }
    };

    const logOut = () => {
        localStorage.removeItem('token');
        dispatch({ type: 'logOut' });
    };

    const removeError = () => {
        dispatch({ type: 'clearErrorMessage' });
    };

    return (
        <AuthContext.Provider
            value={{
                ...state, // Exportamos el estado (status, user, token, etc.)
                // Y también las funciones para modificarlo
                signIn,
                signUp,
                logOut,
                removeError,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};