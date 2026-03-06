import React, { useState, useEffect } from 'react';
import { getCountries, deleteCountry } from '../services/api';
import CountryItem from './countryItem';
import CountryForm from './countryForm';
const CountryList = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const fetchCountries = async () => {
        setLoading(true);
        try {
            const data = await getCountries();
            setCountries(data);
            setError(null);
        } catch (err) {
            setError('Error al cargar los empleados');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchCountries();
    }, []);
    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este empleado?')) {
            try {
                await deleteCountry(id);
                setCountries(countries.filter(country => country.id !== id));
            } catch (err) {
                setError('Error al eliminar el empleado');
            }
        }
    };
    const handleEdit = (id) => {
        setEditingId(id);
    };
    const handleCancelEdit = () => {
        setEditingId(null);
    };
    const handleFormSubmit = () => {
        fetchCountries();
        setEditingId(null);
    };

    if (loading) return <div>Cargando empleados...</div>;
    if (error) return <div className="error">{error}</div>;
    return (
        <div className="country-list">
            <h2>Lista de Empleados</h2>
            {!editingId && (
                <div className="new-country">
                    <h3>Agregar Nuevo Empleado</h3>
                    <CountryForm onSubmitSuccess={handleFormSubmit} />
                </div>
            )}
            <div className="countries">
                {countries.length === 0 ? (
                    <p>No hay empleados registrados.</p>
                ) : (
                    countries.map(country => (
                        <div key={country.id}>
                            {editingId === country.id ? (
                                <div className="edit-form">
                                    <h3>Editar Empleado</h3>
                                    <CountryForm
                                        country={country}
                                        onSubmitSuccess={handleFormSubmit}
                                        onCancel={handleCancelEdit}
                                    />
                                </div>
                            ) : (
                                <CountryItem
                                    country={country}
                                    onDelete={() => handleDelete(country.id)}
                                    onEdit={() => handleEdit(country.id)}
                                />
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
export default CountryList;