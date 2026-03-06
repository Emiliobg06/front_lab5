import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import EmpleadoList from './componentsEmpleado/EmpleadoList';
import './App.css'
function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="App">
      <header className="App-header">
        <h1>Administrador de Empleados</h1>
      </header>
      <main>
        <EmpleadoList />
      </main>
      <footer>
        <p>CRUD de Empleados © 2026</p>
      </footer>
    </div>
  )
}
export default App