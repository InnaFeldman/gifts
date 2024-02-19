import './App.css'
import Header from './components/header/Header'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import GiftCards from './pages/GiftCards'
import Reports from './pages/Reports'


function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gift-cards" element={<GiftCards />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </>
  )
}

export default App
