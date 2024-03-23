import React from 'react'
import { DashboardSidebar, DashboardNavbar } from '../components'
import { RoughNotation } from 'react-rough-notation'
import plantsimulation1 from '../assets/plant-simulation1.png'
import './PlantSimulation.scss'

const PlantSimulation = () => {
  return (
    <div className="plant-simulation">
      <DashboardSidebar type="personal" />
      <div className="ml-20 w-full px-2 py-2 sm:px-4 max-h-full">
        <DashboardNavbar identity="personal" name="Personal" />
      </div>

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
      <h4>
        Ever found yourself frustrated by wilting plants or uncertain about the
        best care regimen?
      </h4>

      <content>
        <div className="text-container">
          <p>
            It's not just about gardening—
            <br/>it's a journey of discovery, where you
            uncover the secrets of cultivation and safeguard against real-world
            horticultural mishaps.
            <br /> <br/>
            Say goodbye to green woes and hello to a flourishing, foolproof
            garden adventure!
          </p>

          <button><a href="/MyGarden">Start Now</a></button>
        </div>

        <img src={plantsimulation1} alt="Plant Simulation 1" />
      </content>
    </div>
  )
}

export default PlantSimulation
