import React, { useState } from 'react'
import { Header } from '../components'
import { RoughNotation } from 'react-rough-notation'
import './MyGarden.scss'
import { FaPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { plants } from '../constants/plants'
import germination from '../assets/germination.png'
import seedling from '../assets/seedling.png'
import vegetative from '../assets/vegetative-growth.png'
import buddev from '../assets/bud-development.png'
import flowering from '../assets/flowering.png'
import fruit from '../assets/fruit-formation.png'
import ripening from '../assets/ripening.png'

const MyGarden = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [selection, setSelection] = useState('')
  const navigate = useNavigate()

  const handleNext = (selected) => {
    setSelection(selected)
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 2)) // Max step 2
  }

  const handleCancel = () => {
    navigate('/')
  }

  return (
    <div className="MyGarden">
      <Header />

      {currentStep === 0 && (
        <div className="add-plant">
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
              My Garden
            </RoughNotation>
          </div>

          <p>Your garden is empty...</p>

          <button onClick={() => handleNext('plus')}>
            <FaPlus size={40} />
          </button>
        </div>
      )}

      {currentStep === 1 && (
        <div className="plant-info">
          <searchbar>
            <Select options={plants} />
          </searchbar>

          <input type="name" required placeholder="Give a Name to Your Plant" />
          <div className="stages">
            <h4>Current Stages of Plants/Tree Growth</h4>

            <selection>
              <button>
                Germination <img src={germination} alt="" />
              </button>
              <button>
                Seedling <img src={seedling} alt="" />
              </button>
              <button>
                Vegetative Growth <img src={vegetative} alt="" />
              </button>
              <button>
                Bud Development <img src={buddev} alt="" />
              </button>
              <button>
                Flowering <img src={flowering} alt="" />
              </button>
              <button>
                Fruit Formation <img src={fruit} alt="" />
              </button>
              <button>
                Ripening <img src={ripening} alt="" />
              </button>
            </selection>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="form-content2">
          <p>Page 3</p>
        </div>
      )}
    </div>
  )
}

export default MyGarden
