import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import vetcareApi from '../api/vetcareApi'; // Nuestra instancia de Axios
import { AuthContext } from '../context/AuthContext';
import { PetList } from '../components/PetList';
import { Modal } from '../components/Modal';
import { PetForm } from '../components/PetForm';
import './DashboardPage.css';

export const DashboardPage = () => {
    const { user, logOut } = useContext(AuthContext);
    const [pets, setPets] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPet, setSelectedPet] = useState(null); // Para saber si creamos o editamos

    // Función para obtener las mascotas de la API
    const fetchPets = async () => {
        try {
            const { data } = await vetcareApi.get('/pets');
            setPets(data.pets);
        } catch (error) {
            console.error("Error al obtener las mascotas:", error);
            Swal.fire('Error', 'No se pudieron cargar las mascotas.', 'error');
        }
    };

    // useEffect para cargar las mascotas cuando el componente se monta
    useEffect(() => {
        fetchPets();
    }, []);

    // Funciones para manejar el modal
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPet(null); // Limpiamos la mascota seleccionada al cerrar
    };
    
    // Funciones de manejo de CRUD
    const handleAddPet = () => {
        setSelectedPet(null); // Nos aseguramos que no haya mascota seleccionada
        openModal();
    };

    const handleEditPet = (pet) => {
        setSelectedPet(pet); // Guardamos la mascota a editar
        openModal();
    };

    const handleDeletePet = (petId) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, ¡eliminar!',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await vetcareApi.delete(`/pets/${petId}`);
                    Swal.fire('Eliminada', 'La mascota ha sido eliminada.', 'success');
                    fetchPets(); // Actualizamos la lista
                } catch (error) {
                    Swal.fire('Error', 'No se pudo eliminar la mascota.', 'error');
                }
            }
        });
    };

    const handleFormSubmit = async (petData) => {
        try {
            if (selectedPet) {
                // Modo Editar (PUT)
                await vetcareApi.put(`/pets/${selectedPet.uid}`, petData);
                Swal.fire('Actualizada', 'La mascota se actualizó correctamente.', 'success');
            } else {
                // Modo Crear (POST)
                await vetcareApi.post('/pets', petData);
                Swal.fire('Creada', 'La mascota se añadió correctamente.', 'success');
            }
            fetchPets(); // Actualizamos la lista en ambos casos
            closeModal();
        } catch (error) {
            const errorMsg = error.response?.data?.msg || 'Ocurrió un error.';
            Swal.fire('Error', errorMsg, 'error');
        }
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>VetCare+ Dashboard</h1>
                <div className="user-info">
                    <span>Bienvenido, <strong>{user?.name}</strong></span>
                    <button onClick={logOut} className="btn-logout">Cerrar Sesión</button>
                </div>
            </header>

            <main className="dashboard-content">
                <div className="content-header">
                    <h2>Mis Mascotas</h2>
                    <button onClick={handleAddPet} className="btn-add">
                        + Añadir Nueva Mascota
                    </button>
                </div>
                <PetList pets={pets} onEdit={handleEditPet} onDelete={handleDeletePet} />
            </main>

            <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedPet ? 'Editar Mascota' : 'Añadir Nueva Mascota'}>
                <PetForm 
                    selectedPet={selectedPet}
                    onFormSubmit={handleFormSubmit}
                    onCancel={closeModal}
                />
            </Modal>
        </div>
    );
};