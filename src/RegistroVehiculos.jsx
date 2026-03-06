import React, { useState } from 'react';

export const RegistroVehiculos = () => {
    /*
      === BLOQUE 1: CENTRALIZAR DATOS ===
      React guarda todo lo que escribes de inmediato en "formData".
      Así evitamos usar valores del HTML directo, porque los 
      atacantes podrían intentar cambiarlos con código oculto.
    */
    const [formData, setFormData] = useState({
        propietario: '',
        placa: '',
        anio: ''
    });

    /*
      === BLOQUE 2: ERRORES AISLADOS ===
      Los errores se guardan en su propio espacio.
      Validamos antes de guardar y sin afectar lo que sigues 
      escribiendo. ¡Todo en tiempo real y seguro!
    */
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    /*
      === BLOQUE 3: VALIDACIÓN Y LIMPIEZA EN TIEMPO REAL ===
      Aquí comprobamos tecla por tecla que los datos sean legítimos:
      - trim() quita espacios falsos (ej: "  a  ").
      - Usamos Regex para exigir un formato exacto de placa.
      - Bloqueamos letras en el campo de Año (solo números reales).
    */
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

    /*
      === BLOQUE 4: CAPTURAR Y FORZAR REGLAS ===
      Atrapamos la letra y la validamos al instante. 
      Además, si es el campo 'placa', la forzamos a MAYÚSCULAS 
      de forma automática para evitar que envíen minúsculas.
    */
    const handleChange = (e) => {
        const { name, value } = e.target;

        const newValue = name === 'placa' ? value.toUpperCase() : value;

        setFormData({
            ...formData,
            [name]: newValue
        });

        validateField(name, newValue);
    };

    /*
      === BLOQUE 5: FRENAR EL BOTÓN ENVIAR ===
      preventDefault() evita que la página se actualice al enviar.
      Luego manda todo el texto al Bloque 3 para una revisión final 
      y estricta. ¡Si pasa, se guarda; si no, se frena de inmediato!
    */
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log("Datos validados de formar segura:", formData);
            setSuccessMessage("¡Vehículo registrado con integridad asegurada!");
            setFormData({ propietario: '', placa: '', anio: '' });
            setErrors({});
            setTimeout(() => setSuccessMessage(''), 3000);
        } else {
            console.log("Intento de envío bloqueado, hay errores sintácticos");
            setSuccessMessage('');
        }
    };

    return (
        <div>
            <h2>REGISTRO DE VEHÍCULOS</h2>

            {/* 
        === BLOQUE 6: APAGAR EL NAVEGADOR ===
        El "noValidate" le dice al navegador (Chrome, Edge) que 
        no se meta. React y nuestra seguridad ahora mandan.
      */}
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
