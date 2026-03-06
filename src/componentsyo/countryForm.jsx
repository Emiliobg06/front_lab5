import React, { useState, useEffect } from 'react';
import { createCountry, updateCountry } from '../services/api.js';
const CountryForm = ({ country, onSubmitSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        eid: '',
        name: '',
        department: '',
        city: '',
        country: '',
        empresa: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (country) {
            setFormData({
                eid: country.Eid || '',
                name: country.name || '',
                department: country.department || '',
                city: country.city || '',
                country: country.country || '',
                empresa: country.empresa || ''
            });
        }
    }, [country]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            setError('El nombre del empleado es obligatorio');
            return;
        }
        setSubmitting(true);
        setError(null);
        try {
            if (country) {
                await updateCountry(country.id, formData);
            } else {
                await createCountry(formData);
            }
            setFormData({ name: '', capital: '', currency: '' });
            if (onSubmitSuccess) onSubmitSuccess();
        } catch (err) {
            setError('Error al guardar el empleado');
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="country-form">
            {error && <div className="error">{error}</div>}
            <div className="form-group">
                <label htmlFor="eid">Eid:</label>
                <input type="text" id="eid" name="eid" value={formData.eid}
                    onChange={handleChange} disabled={submitting} />
            </div>
            <div className="form-group">
                <label htmlFor="name">Nombre*:</label>
                <input type="text" id="name" name="name" value={formData.name}
                    onChange={handleChange} disabled={submitting} required />
            </div>
            <div className="form-group">
                <label htmlFor="department">Departamento:</label>
                <input type="text" id="department" name="department" value={formData.department}
                    onChange={handleChange} disabled={submitting} />
            </div>
            <div className="form-group">
                <label htmlFor="city">Ciudad:</label>
                <input type="text" id="city" name="city" value={formData.city}
                    onChange={handleChange} disabled={submitting} />
            </div>
            <div className="form-group">
                <label htmlFor="country">País:</label>
                <input type="text" id="country" name="country" value={formData.country}
                    onChange={handleChange} disabled={submitting} />
            </div>
            <div className="form-group">
                <label htmlFor="empresa">Empresa:</label>
                <input type="text" id="empresa" name="empresa" value={formData.empresa}
                    onChange={handleChange} disabled={submitting} />
            </div>
            <div className="form-actions">
                <button type="submit" disabled={submitting}>
                    {submitting ? 'Guardando...' : country ? 'Actualizar' : 'Crear'}
                </button>
                {onCancel && (
                    <button type="button" onClick={onCancel} disabled={submitting}>
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
};
export default CountryForm;