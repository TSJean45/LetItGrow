import React, { useState, useMemo } from 'react'
import { Header } from '../components'
import './Signup.scss'
import { RoughNotation } from 'react-rough-notation'
import { useNavigate } from 'react-router-dom'
import farmer from '../assets/register-farmer.png'
import plantppl from '../assets/register-plantppl.png'
import success from '../assets/register-success.png'

const steps = ['Step 1', 'Step 2', 'Step 3']

const Signup = () => {
  //    Progress bar
  const [currentStep, setCurrentStep] = useState(0)
  const [selection, setSelection] = useState('')

  const handleNext = (selected) => {
    setSelection(selected)
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1))
  }

  const handlePrev = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0))
  }

  //   Cancel Button
  const navigate = useNavigate()

  const handleCancel = () => {
    navigate('/')
  }

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
          {/* Progress Bar */}
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

          {/* Step 1 */}
          {currentStep === 0 && (
            <div className="form-content1">
              <div className="identity">
                <button onClick={() => handleNext('farmer')}>
                  Farmer
                  <img src={farmer} alt="farmer" />
                </button>
                <button onClick={() => handleNext('plantppl')}>
                  Plant People
                  <img src={plantppl} alt="plant-ppl" />
                </button>
              </div>

              <button className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          )}

          {/* Step 2 */}
          {currentStep === 1 && (
            <div className="form-content2">
              {selection === 'farmer' ? (
                <form className="farmer-form">
                  <input type="first name" required placeholder="First Name" />
                  <input type="last name" required placeholder="Last Name" />
                  <input type="username" required placeholder="Username" />
                  <input type="email" required placeholder="Email" />
                  <input type="password" required placeholder="Password" />
                  <input
                    type="password"
                    required
                    placeholder="Confirm Password"
                  />
                  <input type="text" required placeholder="Farm Name" />
                  <input type="address" required placeholder="Farm Address" />

                  <div className="button-container">
                    <button
                      className="next-button"
                      onClick={() => handleNext()}
                    >
                      Next
                    </button>
                    <button
                      className="previous-button"
                      disabled={currentStep === 0}
                      onClick={handlePrev}
                    >
                      previous
                    </button>
                  </div>
                </form>
              ) : selection === 'plantppl' ? (
                <form className="plantppl-form">
                  <input type="first name" required placeholder="First Name" />
                  <input type="last name" required placeholder="Last Name" />
                  <input type="username" required placeholder="Username" />
                  <input type="email" required placeholder="Email" />
                  <input type="password" required placeholder="Password" />
                  <input
                    type="password"
                    required
                    placeholder="Confirm Password"
                  />

                  <div className="button-container">
                    <button
                      className="next-button"
                      onClick={() => handleNext()}
                    >
                      Next
                    </button>

                    <button
                      className="previous-button"
                      disabled={currentStep === 0}
                      onClick={handlePrev}
                    >
                      previous
                    </button>
                  </div>
                </form>
              ) : null}
            </div>
          )}

          {/* Step 3 */}
          {currentStep === 2 && (
            <div className="form-content3">
              <img src={success} alt="Register Success" />
              <h4>Created Successfully!</h4>
              <p>You can start to manage your crop with LetItGrow!</p>
              <button>Get Started</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Signup
