import React, { useState, useEffect } from 'react'
import { DashboardSidebar, DashboardNavbar } from '../components'
import './DiseaseDetect.scss'
import { RoughNotation } from 'react-rough-notation'
import { FaPlus } from 'react-icons/fa'
import loadingcircle from '../assets/loading-circle.svg'

import leaftnc from '../assets/leaf-tnc.jpg'
import resultleaf from '../detection-result-img/predict/image0.jpg'

const diseases = [
  {
    disease: 'leaf spot',
    intro:
      'Leaf spot is a common fungal disease that affects a wide range of plants, including trees, shrubs, vegetables, and ornamental plants. While it can be challenging to completely eradicate leaf spot once it has infected a plant',
    solutions: `
      - Remove and destroy infected leaves.
      - Ensure good air circulation around plants.
      - Apply fungicides according to label instructions.`,
  },
  {
    disease: 'lack of calcium',
    intro:
      'Calcium deficiency in plants can manifest in various ways, such as stunted growth, distorted leaves, blossom end rot in fruits, and weakened stems. ',
    solutions: `
      - Amend soil with calcium-rich materials like gypsum or lime.
      - Maintain proper soil pH.
      - Provide consistent watering to ensure calcium uptake.`,
  },
  {
    disease: 'fungal leaf spot',
    intro:
      'Fungal leaf spot is a common plant disease caused by various fungal pathogens. The symptoms typically include small, round or irregularly shaped spots on leaves, which may vary in color from brown or black to yellow or reddish.',
    solutions: `
      - Remove and destroy infected plant parts.
      - Apply fungicides labeled for fungal leaf spot control.
      - Practice good sanitation to prevent spread.`,
  },
  {
    disease: 'bacterial leaf blight',
    intro:
      'Bacterial leaf blight is a plant disease caused by various species of bacteria, including Xanthomonas and Pseudomonas. It primarily affects leaves, causing water-soaked lesions that may turn brown or black as they enlarge. The disease can lead to defoliation and reduced plant vigor if left untreated. ',
    solutions: `
    - Remove and destroy infected plant parts.
    - Apply copper-based fungicides early in the season.
    - Practice crop rotation to reduce pathogen buildup.`,
  },
  {
    disease: 'yellow vein mosaic virus',
    intro:
      'Yellow vein mosaic virus (YVMY) affects plants, particularly important crops like beans, cowpeas, and soybeans. Unfortunately, there is no specific treatment to cure viral infections in plants. ',
    solutions:
      '- Use virus-free seed or plant material.\n' +
      '- Control aphid populations to prevent transmission.\n' +
      '- Remove and destroy infected plants promptly.\n',
  },
  {
    disease: 'yellow leaf curl virus',
    intro:
      'Yellow leaf curl virus (YLCV) is a devastating viral disease that affects a wide range of plants, including tomatoes, peppers, and other solanaceous crops. Unfortunately, there is no cure for viral infections in plants. ',
    solutions: `
    - Plant resistant varieties when available.
    - Control whitefly populations, which can spread the virus.
    - Remove and destroy infected plants to prevent spread.`,
  },
  {
    disease: 'healthy',
    solutions: `
  - Regularly inspect plants for signs of disease.
  - Practice good cultural practices, including proper watering and fertilization.
  - Monitor environmental conditions and address any issues promptly.`,
  },
]

const DiseaseDetect = () => {
  const [file, setFile] = useState(null)
  const [showTips, setShowTips] = useState(true)
  const [resultData, setResultData] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = async (e) => {
    const selectedFile = e.target.files[0]
    setFile(URL.createObjectURL(selectedFile))
    setShowTips(false)

    // Send the image to the backend
    const formData = new FormData()
    formData.append('image', selectedFile)

    try {
      setLoading(true)
      const response = await fetch(
        'http://localhost:5000/disease_detect_image',
        {
          method: 'POST',
          body: formData,
        }
      )

      if (response.ok) {
        const data = await response.json()
        setResultData(data.result)
      } else {
        console.error('Failed to receive response from backend')
      }
    } catch (error) {
      console.error('Error uploading image: ', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log('Result data:', resultData)
  }, [resultData])

  return (
    <div className="DiseaseDetect overflow-hidden bg-white">
      <DashboardSidebar type="farmer" />
      <div className="ml-20 w-full px-2 py-5 sm:px-4 max-h-full">
        <DashboardNavbar identity="farmer" name="Farm A" />
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
          Plant Disease Detector
        </RoughNotation>
      </div>

      <content>
        <div className="upload-container">
          <label className={`file-upload${file ? ' small' : ''}`}>
            <input type="file" onChange={handleChange} />
            <FaPlus size={30} />
            Upload Image
          </label>

          {showTips && (
            <div className="tips">
              <h3>Instruction to take a "good" photo</h3>
              <img src={leaftnc} alt="" />
            </div>
          )}
        </div>

        {loading && (
          <div className="loading-logo">
            <img src={loadingcircle} alt="Loading" />
          </div>
        )}

        {/* Conditionally render the result */}
        {resultData && (
          <div className="result">
            {/* image */}
            {file && (
              <div className="image-container">
                <img
                  src={resultleaf}
                  alt="Uploaded Image"
                  style={{ width: '500px', height: 'auto', marginTop: '50px' }}
                />
              </div>
            )}

            {/* text result */}
            <div className="text-content">
              <p>
                <b>Disease</b>: {resultData}
              </p>
              <p>
                <b>Introduction</b>:{' '}
                {diseases.find(({ disease }) => disease === resultData)
                  ?.intro || 'No solutions found.'}
              </p>
              <p>
                <b>Solutions: <br /> </b>{' '}
                {diseases.find(({ disease }) => disease === resultData)
                  ?.solutions || 'No solutions found.'}
              </p>
            </div>
          </div>
        )}
      </content>
    </div>
  )
}

export default DiseaseDetect
