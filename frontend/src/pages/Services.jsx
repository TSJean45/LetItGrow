import React, { useState } from 'react'
import { Header } from '../components'
import './Services.scss'
import { RoughNotation } from 'react-rough-notation'
import Select from 'react-select'
import Typewriter from 'typewriter-effect'

import forecast from '../assets/services-forecast.jpg'
import spacemap from '../assets/services-spacemap.png'
import farmdashboard from '../assets/services-dashboard.png'
import personaldashboard from '../assets/services-dashboard2.png'
import septoria from '../assets/septoria.png'

const plants = [
  { label: 'Tomato', value: 'Tomato' },
  { label: 'Potato', value: 'Potato' },
]

const area = [
  { label: 'Farm A', value: 'Farm A' },
  { label: 'Farm B', value: 'Farm B' },
]

const Services = () => {
  const [FarmerButton, setFarmerButton] = useState('yield')
  const [PersonalButton, setPersonalButton] = useState('plantsimulate')

  const handleFarmerClick = (button) => {
    setFarmerButton(button)
  }

  const handlePersonalClick = (button) => {
    setPersonalButton(button)
  }

  return (
    <div className="Services">
      <Header />

      {/* FARMER */}
      <div className="Farmer">
        <div className="buttons">
          <button onClick={() => handleFarmerClick('yield')}>
            Yield Prediction
          </button>
          <button onClick={() => handleFarmerClick('spacemap')}>
            Space Mapping
          </button>
          <button onClick={() => handleFarmerClick('dashboard')}>
            Dedicated Dashboard
          </button>
        </div>

        <div className={FarmerButton === 'yield' ? 'yield-content' : 'hidden'}>
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
              Yield Prediction
            </RoughNotation>
          </div>

          <div className="container">
            <content>
              <p>
                Forecasting crop outcomes based on data like weather, soil
                quality, and past yields
                <br />
                <br />A magical fusion of data science and farming intuition,
                empowering growers to cultivate fields of abundance year after
                year.
              </p>
              <button className="try">
                <a href="./CropForecast">Try Now</a>
              </button>
            </content>
            <demo>
              <searchbar>
                <Select options={plants} placeholder="Select Plants" />
                <Select options={area} placeholder="Select Farm" />
              </searchbar>

              <img src={forecast} alt="" />
            </demo>
          </div>
        </div>

        <div
          className={
            FarmerButton === 'spacemap' ? 'spacemap-content' : 'hidden'
          }
        >
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
              Space Mapping
            </RoughNotation>
          </div>

          <div className="container">
            <content>
              <p>
                Agricultural farm space mapping involves the systematic analysis
                and planning of land parcels for optimal crop cultivation.{' '}
                <br />
                Utilizing geographic information systems (GIS) and remote
                sensing technologies, it delineates field boundaries, soil
                types, and topographic features.{' '}
              </p>
              <button className="try">
                <a href="/SpaceMapping">Try Now</a>
              </button>
            </content>

            <img src={spacemap} alt="" />
          </div>
        </div>

        <div
          className={
            FarmerButton === 'dashboard' ? 'dashboard-content' : 'hidden'
          }
        >
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
              Dedicated Dashboard
            </RoughNotation>
          </div>

          <div className="container">
            <content>
              <p>
                <b>A Digital Farmer's Assistant</b> <br />
                Offering vital data on soil temperature, moisture, pH levels,
                fertility, light exposure, and weather forecasts, empowering
                farmers with actionable intelligence for optimal yield and
                resource management.
              </p>
              <button className="try">
                <a href="/FarmerDashboard">Try Now</a>
              </button>
            </content>
            <img src={farmdashboard} alt="" />
          </div>
        </div>
      </div>

      {/* PERSONAL */}
      <div className="personal">
        <div className="buttons">
          <button onClick={() => handlePersonalClick('plantsimulate')}>
            Plant Condition Simulation
          </button>
          <button onClick={() => handlePersonalClick('dashboard')}>
            Dedicated Dashboard
          </button>
          <button onClick={() => handlePersonalClick('diseasedetect')}>
            Disease Detector
          </button>
        </div>

        <div
          className={
            PersonalButton === 'plantsimulate' ? 'plantsim-content' : 'hidden'
          }
        >
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
              Plant Condition Simulation
            </RoughNotation>
          </div>

          <div className="container">
            <content>
              <p>
                By inputting specific parameters, such as temperature ranges,
                soil moisture levels, nutrient concentrations, and light
                intensity, the simulation forecasts potential plant responses,
                including growth rates, flowering, fruiting, and susceptibility
                to pests or diseases.
                <br /> <br />
                It serves as a virtual testbed, aiding farmers, botanists, and
                researchers in optimizing cultivation practices and predicting
                crop behavior under various environmental scenarios.
              </p>
              <button className="try">
                <a href="/PlantSimulation">Try Now</a>
              </button>
            </content>

            <demo>
              <div className="typewriter1">
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .typeString('Temperature: 24°C <br/>')
                      .typeString('Watering: 400 ml <br/>')
                      .typeString('Soil Condition: Loam Soil <br/>')
                      .typeString('Fertilizer: All Purpose Fertilizer <br/>')
                      .typeString('Light Source: Sunlight <br/>')
                      .pauseFor(Infinity)
                      .start()
                  }}
                />
              </div>
              <div className="typewriter2">
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .pauseFor(20000)
                      .typeString(
                        'Your tomato plants is overwatering. Stems will turn yellow and the leaves wilting. The best amount of water is around 100 ml. If this condition continue for 5 days, your plant will start to wilt.'
                      )
                      .start()
                  }}
                  options={{
                    loop: true,
                  }}
                />
              </div>
            </demo>
          </div>
        </div>

        <div
          className={
            PersonalButton === 'dashboard' ? 'dashboard-content' : 'hidden'
          }
        >
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
              Dedicated Dashboard
            </RoughNotation>
          </div>

          <div className="container">
            <content>
              <p>
                Monitor plant ages like milestones, track room temperatures to
                ensure cozy conditions, and maintain a watering schedule with
                precision. <br />
                It's like a green-fingered symphony, conducted from your
                fingertips.
              </p>
              <button className="try">
                <a href="/PersonalDashboard">Try Now</a>
              </button>
            </content>

            <img src={personaldashboard} alt="" />
          </div>
        </div>

        <div
          className={
            PersonalButton === 'diseasedetect'
              ? 'diseasedetect-content'
              : 'hidden'
          }
        >
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
              Disease Detector
            </RoughNotation>
          </div>

          <div className="container">
            <content>
              <p>
                <b>AI botany detective!</b>
                <br />
                It scrutinizes plants like a hawk, detecting signs of illness
                quicker than a blink.
                <br />
                Armed with algorithms, it deciphers leafy mysteries, saving
                crops from peril with a digital green thumb.
              </p>
              <button className="try">
                <a href="/DiseaseDetect">Try Now</a>
              </button>
            </content>

            <img src={septoria} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services
