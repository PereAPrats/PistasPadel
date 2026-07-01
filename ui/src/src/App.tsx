import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/register"
            element={<RegisterForm onSwitchToLogin={() => {}} />}
          />
        </Routes>
      </main>
      <Footer />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App