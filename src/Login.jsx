import React, { useState } from 'react';

export const Login = ({ onLoginSuccess }) => {
    /*
      === BLOQUE 1: GUARDAR DATOS SEGUROS EN REACT ===
      React guarda lo que el usuario escribe de forma segura.
      No usamos el HTML directo (DOM) porque alguien podría
      inyectar código malicioso ahí.
    */
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    /*
      === BLOQUE 2: ERRORES AISLADOS ===
      Los errores se guardan en su propio espacio.
      Validamos antes de guardar y sin afectar lo que sigues 
      escribiendo. ¡Todo en tiempo real y seguro!
    */
    const [errors, setErrors] = useState({});

    /*
      === BLOQUE 3: COMPROBACIONES ESTRICTAS Y EN TIEMPO REAL ===
      Aquí revisamos que la información sea correcta al instante:
      - Que los campos no estén vacíos.
      - Que el correo tenga forma real de correo (usando Regex).
      - Que la contraseña tenga buena longitud, mayúsculas y números.
    */
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

    /*
      === BLOQUE 4: CAPTURAR DATOS AL INSTANTE ===
      Cada vez que el usuario teclea, guardamos el dato al momento.
      También validamos tecla por tecla, por lo que el mensaje de 
      error se mostrará o borrará automáticamente.
    */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        validateField(name, value);
    };

    /*
      === BLOQUE 5: FRENAR EL ENVÍO INSEGURO ===
      preventDefault() evita que la página parpadee y mande 
      los datos a ciegas. Obligamos a que pasen primero 
      por nuestra validación estricta (Bloque 3).
    */
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Credenciales válidas:', formData);
            onLoginSuccess();
        } else {
            console.log('Errores de validación en el Login');
        }
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>

            {/* 
        === BLOQUE 6: DESACTIVAR VALIDAR EN HTML ===
        'noValidate' apaga las validaciones fáciles del navegador
        porque queremos que nuestra seguridad de React tenga el control total.
      */}
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
