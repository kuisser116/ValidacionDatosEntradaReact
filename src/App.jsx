import React, { useState } from 'react'
import { Login } from './Login'
import { RegistroVehiculos } from './RegistroVehiculos'
import './index.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  return (
    <div>
      <header>
        <h1>Validación de datos de entrada en React</h1>
        {isAuthenticated && (
          <button onClick={handleLogout}>Cerrar Sesión</button>
        )}
      </header>
      <br />
      <main>
        {!isAuthenticated ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : (
          <RegistroVehiculos />
        )}
      </main>
    </div>
  )
}

export default App
