import React, { useState } from 'react';

export const Login = ({ onLoginSuccess }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const validateField = (name, value) => {
        let errorMessage = null;

        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                errorMessage = 'El correo es obligatorio';
            } else if (!emailRegex.test(value)) {
                errorMessage = 'Formato de correo no válido';
            }
        }

        if (name === 'password') {
            const passwordTrimmed = value.trim();
            if (!passwordTrimmed) {
                errorMessage = 'La contraseña es obligatoria';
            } else if (passwordTrimmed.length < 8) {
                errorMessage = 'Mínimo 8 caracteres';
            } else if (!/(?=.*[A-Z])/.test(passwordTrimmed)) {
                errorMessage = 'Falta al menos una letra mayúscula';
            } else if (!/(?=.*\d)/.test(passwordTrimmed)) {
                errorMessage = 'Falta al menos un número';
            }
        }

        setErrors(prev => ({
            ...prev,
            [name]: errorMessage
        }));

        return errorMessage === null;
    };

    const validateForm = () => {
        const isEmailValid = validateField('email', formData.email);
        const isPasswordValid = validateField('password', formData.password);
        return isEmailValid && isPasswordValid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        validateField(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onLoginSuccess();
        }
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>

            <form onSubmit={handleSubmit} noValidate>
                <div>
                    <label>Correo Electrónico:</label><br />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p>{`> Error: ${errors.email}`}</p>}
                </div>
                <br />
                <div>
                    <label>Contraseña:</label><br />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p>{`> Error: ${errors.password}`}</p>}
                </div>
                <br />
                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
};
