import React from 'react';
const CountryItem = ({ country, onDelete, onEdit }) => {
    return (
        <div className="country-item">
            <div className="country-info">
                <h3>{country.name}</h3>
                <h4>{country.eid}</h4>
                <p><strong>Departamento:</strong> {country.department || 'No especificado'}</p>
                <p><strong>Ciudad:</strong> {country.city || 'No especificada'}</p>
                <p><strong>País:</strong> {country.country || 'No especificado'}</p>
                <p><strong>Empresa:</strong> {country.empresa || 'No especificada'}</p>
            </div>
            <div className="country-actions">
                <button onClick={onEdit} className="edit-btn">Editar</button>
                <button onClick={onDelete} className="delete-btn">Eliminar</button>
            </div>
        </div>
    );
};
export default CountryItem;