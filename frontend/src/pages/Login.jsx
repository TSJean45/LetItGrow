import React from 'react'
import { Header } from '../components'
import './Login.scss'
import { RoughNotation } from 'react-rough-notation'

const Login = () => {
  return (
    <div className="login">
      <Header />

      <div className="login-card">
        <div style={{ textAlign: 'center', marginBottom: '10px', position: 'relative' }}>
          <RoughNotation
            type="highlight"
            show={true}
            color="#DFEFCD"
            animationDelay="10"
            animationDuration="2000"
            padding="0"
            strokeWidth="0"
            style={{
              fontSize: '50px',
              fontFamily: 'baloo',
            }} 
          >
            Login
          </RoughNotation>
        </div>

        <h4>
          Welcome back! <br /> Please login to your account.
        </h4>

        <input type="email" required placeholder="Email" />
        <input type="password" required placeholder="Password" />
        <button className="forgot-password">Forgot Password?</button>
        <button className="login-button">Login</button>

        <div className="register">
          <p>Don't have an account yet?</p>
          <a href="/signup">Register here</a>
        </div>
      </div>
    </div>
  )
}

export default Login
