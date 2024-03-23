import React from 'react'
import './CropForecast.scss'
import { DashboardSidebar } from '../components'
import { plants } from '../constants/plants'
import { RoughNotation } from 'react-rough-notation'
import Select from 'react-select'

import forecast from '../assets/forecast.png'
import heatmap from '../assets/heatmap.png'

const area = [
  { label: 'MY-Melaka', value: 'MY-Melaka' },
  { label: 'MY-Kedah', value: 'MY-Kedah' },
  { label: 'MY-Kelantan', value: 'MY-Kelantan' },
  { label: 'MY-Terengganu', value: 'MY-Terengganu' },
  { label: 'MY-Perlis', value: 'MY-Perlis' },
]

const CropForecast = () => {
  return (
    <div className="CropForecast">
      <DashboardSidebar />
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
          Crop Yield Forecast
        </RoughNotation>
      </div>
      <selection>
        <searchbar>
          <Select options={plants} placeholder="Select Plants" />
        </searchbar>
        <searchbar>
          <Select options={area} placeholder="Select Area" />
        </searchbar>
      </selection>

      <result>
        <div className="forecast">
          <h4>2024 Tomato Yield Forecast</h4>
          <img src={forecast} alt="" />
          <p>Real Time Crop Yield Projection</p>
        </div>

        <div className="heatmap">
          <h4>2024 Tomato Yield Heatmap</h4>
          <img src={heatmap} alt="" />
        </div>
      </result>
    </div>
  )
}

export default CropForecast
