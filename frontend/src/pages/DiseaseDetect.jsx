import React, { useState } from 'react'
import { Header } from '../components'
import './DiseaseDetect.scss'
import { RoughNotation } from 'react-rough-notation'
import { FaPlus } from 'react-icons/fa'

const DiseaseDetect = () => {
  const [file, setFile] = useState()

  function handleChange(e) {
    const selectedFile = e.target.files[0]
    setFile(selectedFile ? URL.createObjectURL(selectedFile) : null)
  }

  return (
    <div className="DiseaseDetect">
      <Header />

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
          Plant Disease Detector
        </RoughNotation>
      </div>

      <content>
        <label className={`file-upload${file ? ' small' : ''}`}>
          <input type="file" onChange={handleChange} />
          <FaPlus size={30} />
          Upload Image
        </label>
        
        {file && <img src={file} alt="Uploaded Image" />}
        {file && (
          <div className="result">
            <p>
              <b>Plant</b>: Tomato
            </p>
            <p>
              <b>Disease</b>: Early Blight
            </p>
            <p>
              <b>Level of Certainty</b>: 95%
            </p>
            <p>
              <b>Solutions:</b>
            </p>
            1. Remove affected leaves. <br />
            2. Apply a fungicide specifically for early blight. <br />
            3. Ensure proper spacing for adequate air circulation.
          </div>
        )}
      </content>
    </div>
  )
}

export default DiseaseDetect
