import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import RegisterForm from './components/RegisterForm'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
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
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App