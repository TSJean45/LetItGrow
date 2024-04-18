import React, { useState, useEffect } from "react";
import { DashboardSidebar, DashboardNavbar } from "../components";
import { RoughNotation } from "react-rough-notation";
import "./MyGarden.scss";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { plants } from "../constants/plants";
import Select from "react-select";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Bars } from "react-loading-icons";
import { Button } from "@material-tailwind/react";
import germination from "../assets/germination.png";
import seedling from "../assets/seedling.png";
import vegetative from "../assets/vegetative-growth.png";
import buddev from "../assets/bud-development.png";
import flowering from "../assets/flowering.png";
import fruit from "../assets/fruit-formation.png";
import ripening from "../assets/ripening.png";
import tomato from "../assets/tomato.png";
import { Alert} from "@material-tailwind/react";

const Groq = require("groq-sdk");
const groq = new Groq({
  dangerouslyAllowBrowser: true,
  apiKey: "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",
});

const PlantButton = ({ label, imageSrc, onClick, selected }) => {
  return (
    <Button className={`${selected ? "clicked" : ""} mb-10`} onClick={onClick}>
      <div className="font-bold text-black text-lg mb-5">{label}</div>
      <div className="object-fit flex justify-center">
        <img src={imageSrc} alt="" />
      </div>
    </Button>
  );
};

const soil = [
  { label: "Loamy Soil", value: "Loamy Soil" },
  { label: "Sandy Soil", value: "Sandy Soil" },
  { label: "Clay Soil", value: "Clay Soil" },
  { label: "Silt Soil", value: "Silt Soil" },
  { label: "Peat Soil", value: "Peat Soil" },
  { label: "Chalky Soil", value: "Chalky Soil" },
  { label: "Rocky Soil", value: "Rocky Soil" },
  { label: "Acidic Soil", value: "Acidic Soil" },
  { label: "Saline Soil", value: "Saline Soil" },
  { label: "Alkaline Soil", value: "Alkaline Soil" },
];

const fertilizer = [
  { label: "All-purpose fertilizer", value: "All-purpose fertilizer" },
  { label: "Nitrogen-based fertilizer", value: "Nitrogen-based fertilizer" },
  {
    label: "Phosphorus-based fertilizer",
    value: "Phosphorus-based fertilizer",
  },
  { label: "Potassium-based fertilizer", value: "Potassium-based fertilizer" },
  { label: "Organic compost", value: "Organic compost" },
  { label: "Fish emulsion fertilizer", value: "Fish emulsion fertilizer" },
  { label: "Bone meal fertilizer", value: "Bone meal fertilizer" },
  { label: "Seaweed fertilizer", value: "Seaweed fertilizer" },
  { label: "Manure-based fertilizer", value: "Manure-based fertilizer" },
  { label: "Liquid kelp fertilizer", value: "Liquid kelp fertilizer" },
];

const light = [
  { label: "Sunlight", value: "Sunlight" },
  { label: "LED grow lights", value: "LED grow lights" },
  { label: "Fluorescent grow lights", value: "Fluorescent grow lights" },
  {
    label: "High-pressure sodium (HPS) grow lights",
    value: "High-pressure sodium (HPS) grow lights",
  },
  {
    label: "Metal halide (MH) grow lights",
    value: "Metal halide (MH) grow lights",
  },
  {
    label: "Compact fluorescent lamps (CFL)",
    value: "Compact fluorescent lamps (CFL)",
  },
  { label: "Incandescent grow lights", value: "Incandescent grow lights" },
  { label: "Halogen lamps", value: "Halogen lamps" },
  {
    label: "Ceramic metal halide (CMH) grow lights",
    value: "Ceramic metal halide (CMH) grow lights",
  },
  { label: "Induction grow lights", value: "Induction grow lights" },
];

const MyGarden = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selection, setSelection] = useState("");
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(false);

  // get the selected value/adjustments of the plants
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [current, setCurrent] = useState(null);
  const [selectedStage, setSelectedStage] = useState(null);
  const [temperature, setTemperature] = useState(50);
  const [watering, setWatering] = useState(50);
  const [selectedSoil, setSelectedSoil] = useState(null);
  const [selectedFertilizer, setSelectedFertilizer] = useState(null);
  const [selectedLight, setSelectedLight] = useState(null);
  const [page1Complete, setPage1Complete] = useState(false);
  const [page2Complete, setPage2Complete] = useState(false);

  // species of plant
  const handlePlantChange = (selected) => {
    console.log("Selected Plant:", selected);

    setSelectedPlant(selected);
    setCurrent(selected);
    setPage1Complete(true);
  };

  // growing stage
  const handleStageChange = (selectedStage) => {
    setSelectedStage(selectedStage);
    console.log(selectedStage);
    setPage1Complete(true);
  };

  // temperature
  const handleTemperatureChange = (event, newValue) => {
    setTemperature(newValue);
    setPage2Complete(true);
  };

  // watering
  const handleWateringChange = (event, newValue) => {
    setWatering(newValue);
    setPage2Complete(true);
  };

  // soil
  const handleSoilChange = (selectedOption) => {
    console.log("Selected Soil:", selectedOption.value);
    setSelectedSoil(selectedOption.value);
    setPage2Complete(true);
  };

  // fertilizer
  const handleFertilizerChange = (selectedOption) => {
    console.log("Selected Fertilizer:", selectedOption.value);
    setSelectedFertilizer(selectedOption.value);
    setPage2Complete(true);
  };

  // light
  const handleLightChange = (selectedOption) => {
    console.log("Selected Light:", selectedOption.value);
    setSelectedLight(selectedOption.value);
    setPage2Complete(true);
  };

  const handleNext = (selected) => {
    if (selected === "plus") {
      setSelection(selected);
      setCurrentStep((prevStep) => Math.min(prevStep + 1, 3)); // Max step 2
    } else {
      setSelectedPlant(selected);
      setSelection(""); // Reset the selection state after setting the plant
      setCurrentStep((prevStep) => Math.min(prevStep + 1, 3)); // Max step 2
    }
  };

  const passPlant = (selected) => {
    setSelectedPlant(selected);
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 3)); // Max step 2
  };

  const handleCancel = () => {
    navigate("/");
  };

  const result = async () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 3)); // Max step 2
    const data = {
      plant: selectedPlant,
      stage: selectedStage,
      temperature: temperature,
      watering: watering,
      soil: selectedSoil,
      fertilizer: selectedFertilizer,
      light: selectedLight,
    };

    console.log("Data received: ", data);

    setLoading(true);
    try {
      // Call Groq function to get plant simulation results for each message content
      const [
        survivalResult,
        tempSummaryResult,
        soilSummaryResult,
        wateringSummaryResult,
        fertilizerSummaryResult,
        lightSummaryResult,
      ] = await Promise.all([
        getGroqPlantSimulation(createSurvivalMessageContent(data), data),
        getGroqPlantSimulation(createTempSummaryMessageContent(data), data),
        getGroqPlantSimulation(createSoilSummaryMessageContent(data), data),
        getGroqPlantSimulation(createWateringSummaryMessageContent(data), data),
        getGroqPlantSimulation(
          createFertilizerSummaryMessageContent(data),
          data
        ),
        getGroqPlantSimulation(createLightSummaryMessageContent(data), data),
      ]);

      // Check if simulation results are not undefined or null
      if (
        survivalResult &&
        tempSummaryResult &&
        soilSummaryResult &&
        wateringSummaryResult &&
        fertilizerSummaryResult &&
        lightSummaryResult
      ) {
        setResultData({
          survival: survivalResult,
          tempSummary: tempSummaryResult,
          soilSummary: soilSummaryResult,
          wateringSummary: wateringSummaryResult,
          fertilizerSummary: fertilizerSummaryResult,
          lightSummary: lightSummaryResult,
        });
      } else {
        console.error("Invalid data received from Groq.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error retrieving data from Groq:", error);
      setLoading(false);
    }
  };

  // Helper functions to create different message contents
  const createSurvivalMessageContent = (data) => {
    return `Take note that temperature is in Celsius and water measurement is in millilitres. 
    Act as a horticultural expert and given the condition of a ${data.plant} plant/tree where its growth stage is ${data.stage} under growing conditions where temperature is ${data.temperature} Celsius, 
    ${data.watering} ml watering daily, planted in ${data.soil}, using ${data.fertilizer} and under ${data.light}. 
    Based on these conditions, reply only one sentence using this template, "Unfortunately, your plant did not survive!" or "Congratulations your plant survives!" Remove sentences after the first sentence.`;
  };

  const createTempSummaryMessageContent = (data) => {
    return `Take note that temperature is in Celsius and water measurement is in millilitres. Please also take note that only replies information about temperature, temperature and only only temperature.
    Act as a horticultural expert and given the condition of a ${data.plant} plant/tree where its growth stage is ${data.stage} under growing conditions where temperature is ${data.temperature} Celsius, 
    ${data.watering} ml watering daily, planted in ${data.soil}, using ${data.fertilizer} and under ${data.light}. 
    Talk about the temperature conditions and any suggestions for improvement only for temperature. For suggestions, make sure you use only the character * at the start of the sentence. Ignore other conditions and suggestions that are not related to temperature.
    Remove any words that are not temperature.`;
  };

  const createSoilSummaryMessageContent = (data) => {
    return `Take note that temperature is in Celsius and water measurement is in millilitres. Please also take note that only replies information about soil, soil and only only soil.
    Act as a horticultural expert and given the condition of a ${data.plant} plant/tree where its growth stage is ${data.stage} under growing conditions where temperature is ${data.temperature} Celsius, 
    ${data.watering} ml watering daily, planted in ${data.soil}, using ${data.fertilizer} and under ${data.light}. 
    Talk about the soil conditions and any suggestions for improvement only for soil. For suggestions, make sure you use only the character * at the start of the sentence. Ignore other conditions and suggestions that are not related to soil.
    Remove any words that are not soil.`;
  };

  const createWateringSummaryMessageContent = (data) => {
    return `Take note that temperature is in Celsius and water measurement is in millilitres. Please also take note that only replies information about watering, watering and only only watering.
    Act as a horticultural expert and given the condition of a ${data.plant} plant/tree where its growth stage is ${data.stage} under growing conditions where temperature is ${data.temperature} Celsius, 
    ${data.watering} ml watering daily, planted in ${data.soil}, using ${data.fertilizer} and under ${data.light}. 
    Talk about the watering choice and any suggestions for improvement only for watering. For suggestions, make sure you use only the character * at the start of the sentence. Ignore other conditions and suggestions that are not related to watering.
    Remove any words that are not watering.`;
  };

  const createFertilizerSummaryMessageContent = (data) => {
    return `Take note that temperature is in Celsius and water measurement is in millilitres. Please also take note that only replies information about fertilizer, fertilizer and only only fertilizer.
    Act as a horticultural expert and given the condition of a ${data.plant} plant/tree where its growth stage is ${data.stage} under growing conditions where temperature is ${data.temperature} Celsius, 
    ${data.watering} ml watering daily, planted in ${data.soil}, using ${data.fertilizer} and under ${data.light}. 
    Talk about the fertilizer choice and any suggestions for improvement only for fertilizer. For suggestions, make sure you use only the character * at the start of the sentence. Ignore other conditions and suggestions that are not related to fertilizer.
    Remove any words that are not fertilizer.`;
  };

  const createLightSummaryMessageContent = (data) => {
    return `Take note that temperature is in Celsius and water measurement is in millilitres. Please also take note that only replies information about lighting, lighting and only only lighting.
    Act as a horticultural expert and given the condition of a ${data.plant} plant/tree where its growth stage is ${data.stage} under growing conditions where temperature is ${data.temperature} Celsius, 
    ${data.watering} ml watering daily, planted in ${data.soil}, using ${data.fertilizer} and under ${data.light}. 
    Talk about the lighting choice and any suggestions for improvement only for lighting. For suggestions, make sure you use only the character * at the start of the sentence. Ignore other conditions and suggestions that are not related to lighting.
    Remove any words that are not lighting.`;
  };

  const getGroqPlantSimulation = async (messageContent, data) => {
    try {
      console.log("Received data:", data);
      // Replace the slots in messageContent with actual data values
      messageContent = messageContent.replace(
        /\${(.*?)}/g,
        (match, property) => {
          return data[property.trim()] || match;
        }
      );

      // Call Groq SDK to get plant simulation
      const response = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: messageContent, // Pass the modified messageContent
          },
        ],
        model: "mixtral-8x7b-32768",
      });

      // Extract the content of the message
      const simulationResult = response.choices[0]?.message?.content || "";

      return simulationResult;
    } catch (error) {
      console.error("Error retrieving data from Groq:", error);
      throw error; // Rethrow the error to handle it where the function is called
    }
  };

  return (
    <div className="MyGarden overflow-hidden">
      <DashboardSidebar type="personal" />
      <div className="ml-20 w-full px-2 py-5 sm:px-4 max-h-full">
        <DashboardNavbar identity="personal" name="Personal" />
      </div>

      {/* select or add new plant in my garden */}
      {currentStep === 0 && (
        <div className="add-plant">
          <div style={{ textAlign: "center", marginBottom: "10px" }}>
            <RoughNotation
              type="highlight"
              show={true}
              color="#DFEFCD"
              animationDelay="10"
              animationDuration="2000"
              padding="0"
              strokeWidth="0"
              style={{
                fontSize: "50px",
                fontFamily: "baloo",
              }}
            >
              My Garden
            </RoughNotation>
          </div>

          <plants>
            <button onClick={() => passPlant("tomato")}>
              Tomato
              <img src={tomato} alt="" />
            </button>

            <button onClick={() => handleNext("plus")}>
              <FaPlus size={40} />
            </button>
          </plants>
        </div>
      )}

      {/* add new plant */}
      {currentStep === 1 && (
        <div className="plant-info">
          {selection === "plus" && (
            <searchbar>
              <Select
                options={plants}
                onChange={(selectedOption) =>
                  handlePlantChange(selectedOption.value)
                }
                value={current}
                required
              />
            </searchbar>
          )}
          <input type="name" required placeholder="Give a Name to Your Plant" />
          <div className="stages">
            <h4>Current Stages of Plants/Tree Growth</h4>

            <selection required>
              <PlantButton
                label="Germination"
                imageSrc={germination}
                onClick={() => handleStageChange("Germination")}
                selected={selectedStage === "Germination"}
              />
              <PlantButton
                label="Seedling"
                imageSrc={seedling}
                onClick={() => handleStageChange("Seedling")}
                selected={selectedStage === "Seedling"}
              />
              <PlantButton
                label="Vegetative Growth"
                imageSrc={vegetative}
                onClick={() => handleStageChange("Vegetative Growth")}
                selected={selectedStage === "Vegetative Growth"}
              />
              <PlantButton
                label="Bud Development"
                imageSrc={buddev}
                onClick={() => handleStageChange("Bud Development")}
                selected={selectedStage === "Bud Development"}
              />
              <PlantButton
                label="Flowering"
                imageSrc={flowering}
                onClick={() => handleStageChange("Flowering")}
                selected={selectedStage === "Flowering"}
              />
              <PlantButton
                label="Fruit Formation"
                imageSrc={fruit}
                onClick={() => handleStageChange("Fruit Formation")}
                selected={selectedStage === "Fruit Formation"}
              />
              <PlantButton
                label="Ripening"
                imageSrc={ripening}
                onClick={() => handleStageChange("Ripening")}
                selected={selectedStage === "Ripening"}
              />
            </selection>
          </div>

          <button
            className="proceed font-bold p-3"
            onClick={() => handleNext("plus")}
            disabled={!page1Complete}
          >
            Proceed to Simulation
          </button>
        </div>
      )}

      {currentStep === 2 && (
        <div className="simulation">
          <h4>Set Simulation Environment</h4>
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

            <button
              className="confirm"
              onClick={result}
              disabled={!page2Complete}
            >
              Confirm
            </button>
          </adjustment>
        </div>
      )}

      {currentStep === 3 && (
        <div className="simulation">
          <results>
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              <RoughNotation
                type="highlight"
                show={true}
                color="#DFEFCD"
                animationDelay="10"
                animationDuration="2000"
                padding="0"
                strokeWidth="0"
                style={{
                  fontSize: "50px",
                  fontFamily: "open sans",
                  fontWeight: "700",
                }}
              >
                Results
              </RoughNotation>
            </div>
            {loading && <p>Loading...</p>}

            {resultData && (
              <div>
                <Alert>{resultData.survival}</Alert>

                <div className="mt-10">
                  <h4>For More Detailed Analysis</h4>

                  <h3>Temperature Summary:</h3>
                  <p>{resultData.tempSummary}</p>

                  <h3>Soil Summary:</h3>
                  <p>{resultData.soilSummary}</p>

                  <h3>Watering Summary:</h3>
                  <p>{resultData.wateringSummary}</p>

                  <h3>Fertilizer Summary:</h3>
                  <p>{resultData.fertilizerSummary}</p>

                  <h3>Lighting Summary:</h3>
                  <p>{resultData.lightSummary}</p>
                </div>
              </div>
            )}
          </results>
        </div>
      )}
    </div>
  );
};

export default MyGarden;
