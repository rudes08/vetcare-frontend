import React from 'react';
import './PetList.css'; // Estilos para las tarjetas

export const PetList = ({ pets, onEdit, onDelete }) => {
    if (pets.length === 0) {
        return <p className="no-pets-message">Aún no has registrado ninguna mascota. ¡Añade una!</p>;
    }

    return (
        <div className="pet-list-container">
            {pets.map((pet) => (
                <div key={pet.uid} className="pet-card">
                    <h3>{pet.name}</h3>
                    <p><strong>Especie:</strong> {pet.species}</p>
                    <p><strong>Raza:</strong> {pet.breed || 'No especificada'}</p>
                    <p><strong>Edad:</strong> {pet.age ? `${pet.age} años` : 'No especificada'}</p>
                    <div className="pet-card-actions">
                        <button onClick={() => onEdit(pet)} className="btn-edit">Editar</button>
                        <button onClick={() => onDelete(pet.uid)} className="btn-delete">Eliminar</button>
                    </div>
                </div>
            ))}
        </div>
    );
};