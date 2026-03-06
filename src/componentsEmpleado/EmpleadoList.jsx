import React, { useState, useEffect } from 'react';
import { getEmpleados, deleteEmpleado } from '../services/api';
import EmpleadoItem from './EmpleadoItem';
import EmpleadoForm from './EmpleadoForm';
const EmpleadoList = () => {
    const [empleados, setEmpleados] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const fetchEmpleados = async () => {
        setLoading(true);
        try {
            const data = await getEmpleados();
            setEmpleados(data);
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
                await deleteEmpleado(id);
                setEmpleados(empleados.filter(emp => emp.id !== id));
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
        fetchEmpleados();
        setEditingId(null);
    };

    if (loading) return <div>Cargando empleados...</div>;
    if (error) return <div className="error">{error}</div>;
    return (
        <div className="empleado-list">
            <h2>Lista de Empleados</h2>
            {!editingId && (
                <div className="new-empleado">
                    <h3>Agregar Nuevo Empleado</h3>
                    <EmpleadoForm onSubmitSuccess={handleFormSubmit} />
                </div>
            )}
            <div className="empleados">
                {empleados.length === 0 ? (
                    <p>No hay empleados registrados.</p>
                ) : (
                    empleados.map(emp => (
                        <div key={emp.id}>
                            {editingId === emp.id ? (
                                <div className="edit-form">
                                    <h3>Editar Empleado</h3>
                                    <EmpleadoForm
                                        empleado={emp}
                                        onSubmitSuccess={handleFormSubmit}
                                        onCancel={handleCancelEdit}
                                    />
                                </div>
                            ) : (
                                <EmpleadoItem
                                    empleado={emp}
                                    onDelete={() => handleDelete(emp.id)}
                                    onEdit={() => handleEdit(emp.id)}
                                />
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
export default EmpleadoList;