import React, { useEffect } from 'react';
import { useForm } from '../hooks/useForm'; // Reutilizamos nuestro hook

export const PetForm = ({ selectedPet, onFormSubmit, onCancel }) => {
    // Si hay una mascota seleccionada, usamos sus datos, si no, un objeto vacío.
    const initialFormState = selectedPet || {
        name: '',
        species: '',
        breed: '',
        age: '',
    };
    
    const [formValues, handleInputChange, reset] = useForm(initialFormState);
    const { name, species, breed, age } = formValues;

    // Efecto para resetear el formulario si la mascota seleccionada cambia
    useEffect(() => {
        reset(initialFormState);
    }, [selectedPet]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onFormSubmit(formValues);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Nombre</label>
                <input type="text" name="name" value={name} onChange={handleInputChange} className="form-control" required />
            </div>
            <div className="form-group">
                <label>Especie (Ej: Canino, Felino)</label>
                <input type="text" name="species" value={species} onChange={handleInputChange} className="form-control" required />
            </div>
            <div className="form-group">
                <label>Raza</label>
                <input type="text" name="breed" value={breed} onChange={handleInputChange} className="form-control" />
            </div>
            <div className="form-group">
                <label>Edad</label>
                <input type="number" name="age" value={age} onChange={handleInputChange} className="form-control" />
            </div>
            <div className="form-actions">
                <button type="submit" className="btnSubmit">
                    {selectedPet ? 'Actualizar Mascota' : 'Añadir Mascota'}
                </button>
                <button type="button" onClick={onCancel} className="btnCancel">
                    Cancelar
                </button>
            </div>
        </form>
    );
};