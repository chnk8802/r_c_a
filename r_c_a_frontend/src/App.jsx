import './App.css'
import Home from './pages/Home'
import Demo from './pages/Demo'
import { Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserProvider'

function App() {

  return (
    <UserProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/demo' element={<Demo />} />
      </Routes>
    </UserProvider>
  )
}

export default App
