import React, { useState, useEffect } from 'react'
import { DashboardSidebar, DashboardNavbar } from '../components'
import { RoughNotation } from 'react-rough-notation'
import './MyGarden.scss'
import { FaPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { plants } from '../constants/plants'
import Select from 'react-select'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

import germination from '../assets/germination.png'
import seedling from '../assets/seedling.png'
import vegetative from '../assets/vegetative-growth.png'
import buddev from '../assets/bud-development.png'
import flowering from '../assets/flowering.png'
import fruit from '../assets/fruit-formation.png'
import ripening from '../assets/ripening.png'
import tomato from '../assets/tomato.png'

const PlantButton = ({ label, imageSrc, onClick, selected }) => {
  return (
    <button className={selected ? 'clicked' : ''} onClick={onClick}>
      {label} <img src={imageSrc} alt="" />
    </button>
  )
}

const soil = [
  { label: 'Loamy Soil', value: 'Loamy Soil' },
  { label: 'Sandy Soil', value: 'Sandy Soil' },
  { label: 'Clay Soil', value: 'Clay Soil' },
  { label: 'Silt Soil', value: 'Silt Soil' },
  { label: 'Peat Soil', value: 'Peat Soil' },
  { label: 'Chalky Soil', value: 'Chalky Soil' },
  { label: 'Rocky Soil', value: 'Rocky Soil' },
  { label: 'Acidic Soil', value: 'Acidic Soil' },
  { label: 'Saline Soil', value: 'Saline Soil' },
  { label: 'Alkaline Soil', value: 'Alkaline Soil' },
]

const fertilizer = [
  { label: 'All-purpose fertilizer', value: 'All-purpose fertilizer' },
  { label: 'Nitrogen-based fertilizer', value: 'Nitrogen-based fertilizer' },
  {
    label: 'Phosphorus-based fertilizer',
    value: 'Phosphorus-based fertilizer',
  },
  { label: 'Potassium-based fertilizer', value: 'Potassium-based fertilizer' },
  { label: 'Organic compost', value: 'Organic compost' },
  { label: 'Fish emulsion fertilizer', value: 'Fish emulsion fertilizer' },
  { label: 'Bone meal fertilizer', value: 'Bone meal fertilizer' },
  { label: 'Seaweed fertilizer', value: 'Seaweed fertilizer' },
  { label: 'Manure-based fertilizer', value: 'Manure-based fertilizer' },
  { label: 'Liquid kelp fertilizer', value: 'Liquid kelp fertilizer' },
]

const light = [
  { label: 'Sunlight', value: 'Sunlight' },
  { label: 'LED grow lights', value: 'LED grow lights' },
  { label: 'Fluorescent grow lights', value: 'Fluorescent grow lights' },
  {
    label: 'High-pressure sodium (HPS) grow lights',
    value: 'High-pressure sodium (HPS) grow lights',
  },
  {
    label: 'Metal halide (MH) grow lights',
    value: 'Metal halide (MH) grow lights',
  },
  {
    label: 'Compact fluorescent lamps (CFL)',
    value: 'Compact fluorescent lamps (CFL)',
  },
  { label: 'Incandescent grow lights', value: 'Incandescent grow lights' },
  { label: 'Halogen lamps', value: 'Halogen lamps' },
  {
    label: 'Ceramic metal halide (CMH) grow lights',
    value: 'Ceramic metal halide (CMH) grow lights',
  },
  { label: 'Induction grow lights', value: 'Induction grow lights' },
]

const MyGarden = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [selection, setSelection] = useState('')
  const navigate = useNavigate()
  const [isClicked, setIsClicked] = useState(false)

  // get the selected value/adjustments of the plants
  const [selectedPlant, setSelectedPlant] = useState(null)
  const [selectedStage, setSelectedStage] = useState(null)
  const [temperature, setTemperature] = useState(50)
  const [watering, setWatering] = useState(50)
  const [selectedSoil, setSelectedSoil] = useState(null)
  const [selectedFertilizer, setSelectedFertilizer] = useState(null)
  const [selectedLight, setSelectedLight] = useState(null)

  // species of plant
  const handlePlantChange = (selectedOption) => {
    setSelectedPlant(selectedOption)
  }

  // growing stage
  const handleStageChange = (selectedStage) => {
    setSelectedStage(selectedStage)
  }

  // temperature
  const handleTemperatureChange = (event, newValue) => {
    setTemperature(newValue)
  }

  // watering
  const handleWateringChange = (event, newValue) => {
    setWatering(newValue)
  }

  // soil
  const handleSoilChange = (selectedOption) => {
    setSelectedSoil(selectedOption)
  }

  // fertilizer
  const handleFertilizerChange = (selectedOption) => {
    setSelectedFertilizer(selectedOption)
  }

  // light
  const handleLightChange = (selectedOption) => {
    setSelectedLight(selectedOption)
  }

  // send selected adjustment to backend and retrieve the result from there
  const result = () => {
    const data = {
      plant: selectedPlant,
      stage: selectedStage,
      temperature: temperature,
      watering: watering,
      soil: selectedSoil,
      fertilizer: selectedFertilizer,
      light: selectedLight,
    }

    console.log('Data to be sent to backend:', data)

    fetch('http://localhost:5000/plant_simulation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response from backend:', data)
        // Handle response from backend if needed
      })
      .catch((error) => {
        console.error('Error sending data to backend:', error)
        // Handle error if needed
      })
  }

  // change to next step
  const handleNext = (selected) => {
    setSelection(selected)
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 2)) // Max step 2
  }

  const handleCancel = () => {
    navigate('/')
  }

  return (
    <div className="MyGarden">
      <DashboardSidebar type="personal" />
      <div className="ml-20 w-full px-2 py-5 sm:px-4 max-h-full">
        <DashboardNavbar identity="personal" name="Personal" />
      </div>

      {/* select or add new plant in my garden */}
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
                fontSize: '50px',
                fontFamily: 'baloo',
              }}
            >
              My Garden
            </RoughNotation>
          </div>

          <plants>
            <button onClick={() => handleNext('plus')}>
              Tomato
              <img src={tomato} alt="" />
            </button>

            <button onClick={() => handleNext('plus')}>
              <FaPlus size={40} />
            </button>
          </plants>
        </div>
      )}

      {/* add new plant */}
      {currentStep === 1 && (
        <div className="plant-info">
          <searchbar>
            <Select options={plants} onChange={handlePlantChange} />
          </searchbar>

          <input type="name" required placeholder="Give a Name to Your Plant" />
          <div className="stages">
            <h4>Current Stages of Plants/Tree Growth</h4>

            <selection>
              <PlantButton
                label="Germination"
                imageSrc={germination}
                onClick={() => handleStageChange('Germination')}
                selected={selectedStage === 'Germination'}
              />
              <PlantButton
                label="Seedling"
                imageSrc={seedling}
                onClick={() => handleStageChange('Seedling')}
                selected={selectedStage === 'Seedling'}
              />
              <PlantButton
                label="Vegetative Growth"
                imageSrc={vegetative}
                onClick={() => handleStageChange('Vegetative Growth')}
                selected={selectedStage === 'Vegetative Growth'}
              />
              <PlantButton
                label="Bud Development"
                imageSrc={buddev}
                onClick={() => handleStageChange('Bud Development')}
                selected={selectedStage === 'Bud Development'}
              />
              <PlantButton
                label="Flowering"
                imageSrc={flowering}
                onClick={() => handleStageChange('Flowering')}
                selected={selectedStage === 'Flowering'}
              />
              <PlantButton
                label="Fruit Formation"
                imageSrc={fruit}
                onClick={() => handleStageChange('Fruit Formation')}
                selected={selectedStage === 'Fruit Formation'}
              />
              <PlantButton
                label="Ripening"
                imageSrc={ripening}
                onClick={() => handleStageChange('Ripening')}
                selected={selectedStage === 'Ripening'}
              />
            </selection>
          </div>

          <button className="proceed" onClick={() => handleNext('plus')}>
            proceed
          </button>
        </div>
      )}

      {currentStep === 2 && (
        <div className="simulation">
          <results>
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
                  fontSize: '50px',
                  fontFamily: 'open sans',
                  fontWeight: '700',
                }}
              >
                Results
              </RoughNotation>
            </div>
            <p>
              Your tomato plants is overwatering. Stems will turn yellow and the
              leaves wilting. The best amount of water is around 100 ml. If this
              condition continue for 5 days, your plant will start to wilt.{' '}
              <br />
              <br />
              <b>Your plant expected to bud in 24th March 2024</b>
            </p>
            <img src={vegetative} alt="" />
          </results>

          <adjustment>
            <temperature>
              <p>Temperature(°C)</p>
              <Box sx={{ width: 500 }}>
                <Slider
                  defaultValue={50}
                  min={-50}
                  max={50}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  onChange={handleTemperatureChange}
                />
              </Box>
            </temperature>
            <watering>
              <p>Watering (ml)</p>
              <Box sx={{ width: 500 }}>
                <Slider
                  defaultValue={50}
                  min={0}
                  max={1000}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  color="secondary"
                  onChange={handleWateringChange}
                />
              </Box>
            </watering>

            <soil>
              <p>Soil Condition</p>
              <searchbar>
                <Select options={soil} onChange={handleSoilChange} />
              </searchbar>
            </soil>
            <fertilizer>
              <p>Fertilizer</p>
              <searchbar>
                <Select
                  options={fertilizer}
                  onChange={handleFertilizerChange}
                />
              </searchbar>
            </fertilizer>
            <light>
              <p>Light</p>
              <searchbar>
                <Select options={light} onChange={handleLightChange} />
              </searchbar>
            </light>

            <button className="confirm" onClick={result}>
              Confirm
            </button>
          </adjustment>
        </div>
      )}
    </div>
  )
}

export default MyGarden
