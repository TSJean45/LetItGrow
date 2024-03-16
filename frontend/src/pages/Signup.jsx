import React, { useState } from 'react'
import { Header } from '../components'
import './Signup.scss'
import { RoughNotation } from 'react-rough-notation'
import { useNavigate  } from 'react-router-dom';

const steps = ['Step 1', 'Step 2', 'Step 3']

const Signup = () => {

  //    Progress bar
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1))
  }

  const handlePrev = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0))
  }

  //   Cancel Button
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="signup">
      <Header />
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <RoughNotation
            type="highlight"
            show={true}
            color="#DFEFCD"
            animationDelay="10"
            animationDuration="2000"
            padding="0"
            strokeWidth="0"
            style={{
              fontSize: '64px',
              fontFamily: 'baloo',
            }}
          >
            Register
          </RoughNotation>
        </div>

        <div className="form">
          <div className="progress-bar">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`progress-step ${
                  currentStep >= index ? 'active' : ''
                }`}
              >
                {step}
              </div>
            ))}
          </div>

          {currentStep === 0 && (
            <div className="form-content">
              <button>Farmer</button>
              <button>Plant People</button>
            </div>
          )}
          {currentStep === 1 && (
            <div className="form-content">
              <h3>Hello step 2</h3>
            </div>
          )}
          {currentStep === 2 && (
            <div className="form-content">
              <h3>Hello step 3</h3>
            </div>
          )}
        </div>

        <div className="identity"></div>

        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  )
}

export default Signup
