
import { Navigate } from 'react-router-dom'

const Login = () => {
  const user = {
    role: "admin",
  }

  if (user) {
    return <Navigate to="/" />
  }
  return (
    <div>Login</div>
  )
}

export default Login