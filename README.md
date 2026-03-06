# Práctica: Validación de Datos de Entrada en React

Este proyecto es una práctica académica enfocada en la **Seguridad y Validación Estricta de Datos de Entrada** utilizando exclusivamente **React Puro** (sin dependencias externas como Zod o Formik).

## Conceptos Clave Implementados

1. **Componentes Controlados:** React es la única fuente de verdad (`useState`). Se evita extraer datos directamente del DOM, previniendo manipulaciones maliciosas.
2. **Validación en Tiempo Real:** Las comprobaciones suceden "tecla por tecla" (en el evento `onChange`), brindando feedback instantáneo al usuario y forzando reglas antes del envío.
3. **Expresiones Regulares (Regex):** Uso de patrones estrictos para garantizar formatos exactos (Ej. correos y placas vehiculares) y evitar inyecciones.
4. **Prevención de Defectos HTML:** Uso del atributo `noValidate` y de `e.preventDefault()` en el envío del formulario. Esto apaga la validación débil del navegador, forzando a que los datos pasen primero por la lógica segura de React.

## Componentes

- **`Login.jsx`**: Demuestra validación concurrente de credenciales estandarizadas (correo y contraseña segura).
- **`RegistroVehiculos.jsx`**: CRUD simulado que ejemplifica la sanitización de inputs (forzando mayúsculas), manejo de rangos numéricos y la limpieza de espacios blancos residuales.

## Ejecución

1. Clonar el repositorio.
2. `npm install`
3. `npm run dev`
