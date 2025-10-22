import { useState } from 'react';

// Un hook personalizado es simplemente una función que podemos reutilizar
export const useForm = ( initialState = {} ) => {
    
    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues( initialState );
    }

    // Esta función se encarga de actualizar el estado cada vez que se escribe en un input
    const handleInputChange = ({ target }) => {
        setValues({
            ...values,
            [ target.name ]: target.value
        });
    }

    return [ values, handleInputChange, reset ];
}