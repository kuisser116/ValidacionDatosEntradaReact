# Validación de Datos de Entrada en React

**Equipo DevCore Nexus**

Este proyecto es una práctica académica donde implementamos una **Seguridad y Validación Estricta de Datos de Entrada** utilizando exclusivamente **React Puro**. No usamos librerías externas para los formularios, todo está hecho a mano para entender cómo proteger nuestra información.

## Buena práctica implementada
Validación estricta de datos de entrada en frontend

## Librerías utilizadas
react, react-dom, vite, @vitejs/plugin-react, eslint, globals (Toda la validación se realizó mediante código nativo de React y Regex sin dependencias externas).


## 🛡️ ¿Qué hace cada cosa y cómo funciona?

Hemos estructurado dos formularios principales (`Login.jsx` y `RegistroVehiculos.jsx`) donde aplicamos varias estrategias de seguridad para garantizar que los datos estén íntegros e incorruptos:

### 1. Control de los Inputs desde React (Componentes Controlados)
En vez de extraer la información directamente del documento (DOM), **React almacena cada pulsación del teclado** en su propia "memoria" segura (`useState`). Esto evita inyecciones maliciosas que buscan modificar los campos HTML directamente y previene manipulaciones antes de ser enviadas.

### 2. Validación "Tecla por Tecla" (En tiempo real)
Las comprobaciones suceden en el evento `onChange`. Cada vez que el usuario escribe, la información es analizada inmediatamente. Si existe una falla sintáctica, se muestra un mensaje de advertencia y se bloquea el procesamiento; si se corrige, el error desaparece al instante.

### 3. Expresiones Regulares (Regex)
Utilizamos **métodos de coincidencia de patrones (Regex)** para comparar lo que el usuario escribió contra un "molde" estricto y seguro:
- **Correos Electrónicos:** Validamos obligando la existencia de un `@` y un dominio bien estructurado.
- **Contraseñas:** Establecemos un requerimiento mediante regex obligando el uso de al menos una mayúscula y un número, además de la lógica para medir el largo de la cadena.
- **Placas de Vehículos:** Las forzamos a seguir un molde exacto de 3 letras mayúsculas, un guion y 3 a 4 números (`/^[A-Z]{3}-[0-9]{3,4}$/`).

### 4. Sanitización y Transformación de Texto 
- Usamos el método `.trim()` para **eliminar silenciosamente los espacios en blanco residuales** ingresados por accidente al inicio o final de las cadenas de texto, mitigando ataques o errores de dedo.
- Al escribir en el campo "Placa", interceptamos el texto minúsculo y lo convertimos a **MAYÚSCULAS** automáticamente gracias al método `.toUpperCase()`.
- Para el campo del año vehicular, validamos la conversión estricta al estándar numérico impidiendo la inyección de letras usando `parseInt()` y analizando con `isNaN()`.

### 5. Apagado de la Validación Insegura del Navegador
Se integró el atributo HTML `noValidate` en los `<form>` y en las funciones de envío agregamos el método `e.preventDefault()`. Esto tiene el objetivo de **deshabilitar las validaciones débiles por defecto de los navegadores web** (las cuales son saltables por atacantes) y le permite a nuestra lógica estricta de React tomar el control total y exclusivo del formulario. Si nuestros requisitos no se cumplen en React, la información no se envía.

---

## 🚀 Instrucciones de Ejecución

Sigue estos pasos para desplegar el proyecto localmente y verificar su funcionamiento:

1. Clona el repositorio o descarga el código fuente.
2. Abre una terminal dentro de la carpeta raíz del proyecto.
3. Instala las dependencias ejecutando:
   ```bash
   npm install
   ```
4. Levanta el servidor local con:
   ```bash
   npm run dev
   ```
5. Accede al sistema desde la URL local proporcionada en consola (generalmente `http://localhost:5173`).
