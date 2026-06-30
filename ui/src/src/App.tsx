import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import RegisterForm from './components/RegisterForm'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={<RegisterForm onSwitchToLogin={() => {}} />}
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App