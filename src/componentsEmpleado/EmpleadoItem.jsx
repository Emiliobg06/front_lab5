import React from 'react';
const EmpleadoItem = ({ empleado, onDelete, onEdit }) => {
    return (
        <div className="empleado-item">
            <div className="empleado-info">
                <h3>{empleado.name}</h3>
                <h4>{empleado.eid}</h4>
                <p><strong>Departamento:</strong> {empleado.department || 'No especificado'}</p>
                <p><strong>Ciudad:</strong> {empleado.city || 'No especificada'}</p>
                <p><strong>País:</strong> {empleado.country || 'No especificado'}</p>
                <p><strong>Empresa:</strong> {empleado.empresa || 'No especificada'}</p>
            </div>
            <div className="empleado-actions">
                <button onClick={onEdit} className="edit-btn">Editar</button>
                <button onClick={onDelete} className="delete-btn">Eliminar</button>
            </div>
        </div>
    );
};
export default EmpleadoItem;