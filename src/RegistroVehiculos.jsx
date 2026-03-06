import React, { useState } from 'react';

export const RegistroVehiculos = () => {
    const [formData, setFormData] = useState({
        propietario: '',
        placa: '',
        anio: ''
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const validateField = (name, value) => {
        let errorMessage = null;
        const currentYear = new Date().getFullYear();

        if (name === 'propietario') {
            const propietarioTrimmed = value.trim();
            if (!propietarioTrimmed) {
                errorMessage = "El propietario es obligatorio";
            } else if (propietarioTrimmed.length < 3) {
                errorMessage = "Mínimo 3 caracteres";
            }
        }

        if (name === 'placa') {
            const placaRegex = /^[A-Z]{3}-[0-9]{3,4}$/;
            if (!value) {
                errorMessage = "La placa es obligatoria";
            } else if (!placaRegex.test(value)) {
                errorMessage = "Formato inválido. Usa MAYÚSCULAS y guión (ej. ABC-1234)";
            }
        }

        if (name === 'anio') {
            const anioNum = parseInt(value, 10);
            if (!value) {
                errorMessage = "El año es obligatorio";
            } else if (isNaN(anioNum)) {
                errorMessage = "Debe ser un número real";
            } else if (anioNum < 1990 || anioNum > currentYear + 1) {
                errorMessage = `El año debe estar entre 1990 y ${currentYear + 1}`;
            }
        }

        setErrors(prev => ({
            ...prev,
            [name]: errorMessage
        }));

        return errorMessage === null;
    };

    const validateForm = () => {
        const isPropietarioValid = validateField('propietario', formData.propietario);
        const isPlacaValid = validateField('placa', formData.placa);
        const isAnioValid = validateField('anio', formData.anio);

        return isPropietarioValid && isPlacaValid && isAnioValid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        const newValue = name === 'placa' ? value.toUpperCase() : value;

        setFormData({
            ...formData,
            [name]: newValue
        });

        validateField(name, newValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            setSuccessMessage("¡Vehículo registrado con integridad asegurada!");
            setFormData({ propietario: '', placa: '', anio: '' });
            setErrors({});
            setTimeout(() => setSuccessMessage(''), 3000);
        } else {
            setSuccessMessage('');
        }
    };

    return (
        <div>
            <h2>REGISTRO DE VEHÍCULOS</h2>

            <form onSubmit={handleSubmit} noValidate>

                <div>
                    <label>Propietario:</label><br />
                    <input
                        type="text"
                        name="propietario"
                        value={formData.propietario}
                        onChange={handleChange}
                    />
                    {errors.propietario && <p>{`> Error: ${errors.propietario}`}</p>}
                </div>
                <br />
                <div>
                    <label>Placa (Ej. ABC-1234):</label><br />
                    <input
                        type="text"
                        name="placa"
                        value={formData.placa}
                        onChange={handleChange}
                        maxLength={8}
                    />
                    {errors.placa && <p>{`> Error: ${errors.placa}`}</p>}
                </div>
                <br />
                <div>
                    <label>Año del Modelo:</label><br />
                    <input
                        type="number"
                        name="anio"
                        value={formData.anio}
                        onChange={handleChange}
                    />
                    {errors.anio && <p>{`> Error: ${errors.anio}`}</p>}
                </div>
                <br />
                <button type="submit">Guardar Vehículo</button>
                {successMessage && <p>{successMessage}</p>}
            </form>
        </div>
    );
};
