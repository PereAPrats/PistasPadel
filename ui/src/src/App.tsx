import { useState } from 'react'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'

function App() {
  const [isLogin, setIsLogin] = useState(false)

  if (isLogin) {
    return <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
  }

  return <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
}

export default App
