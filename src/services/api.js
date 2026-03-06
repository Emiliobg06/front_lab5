import axios from 'axios';
const API_URL = 'http://localhost:5000/api/empleados';
export const getEmpleados = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los empleados:', error);
        throw error;
    }
};
export const getEmpleado = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el empleado:', error);
        throw error;
    }
};
export const createEmpleado = async (empleado) => {
    try {
        const response = await axios.post(API_URL, empleado);
        return response.data;
    } catch (error) {
        console.error('Error al crear el empleado:', error);
        throw error;
    }
};
export const updateEmpleado = async (id, empleado) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, empleado);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el empleado:', error);
        throw error;
    }
};
export const deleteEmpleado = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el empleado:', error);
        throw error;
    }
};