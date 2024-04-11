import React, { useState } from "react";
import { Header } from "../components";
import "./Signup.scss";
import { RoughNotation } from "react-rough-notation";
import { useNavigate } from "react-router-dom";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import {
  UserIcon,
  CogIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import farmer from "../assets/register-farmer.png";
import plantppl from "../assets/register-plantppl.png";
import success from "../assets/register-success.png";

const Signup = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const handleCancel = () => {
    navigate("/");
  };

  const [personalData, setPersonalData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    farmName: "",
    farmAddress: "",
  });

  const handleRegister = async () => {
    try {
      const response = await fetch("/registerUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(personalData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="signup">
      <Header />
      <div className="container">
        <div style={{ textAlign: "center"}}>
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
            Register
          </RoughNotation>
        </div>

        <Stepper
          activeStep={activeStep}
          isLastStep={(value) => setIsLastStep(value)}
          isFirstStep={(value) => setIsFirstStep(value)}
          className="mb-20"
        >
          <Step onClick={() => setActiveStep(0)}>
            <UserIcon className="h-5 w-5" />
            <Typography
              color={activeStep === 0 ? "blue-gray" : "gray"}
              className="font-normal"
            >
              Your account type.
            </Typography>
          </Step>
          <Step onClick={() => setActiveStep(1)}>
            <CogIcon className="h-5 w-5" />
            <Typography
              color={activeStep === 0 ? "blue-gray" : "gray"}
              className="font-normal"
            >
              Your account details.
            </Typography>
          </Step>
          <Step onClick={() => setActiveStep(2)}>
            <BuildingLibraryIcon className="h-5 w-5" />
            <Typography
              color={activeStep === 0 ? "blue-gray" : "gray"}
              className="font-normal"
            >
              Finish registration.
            </Typography>
          </Step>
        </Stepper>

        {/* Form content based on active step */}
        {activeStep === 0 && (
          <div className="form-content1">
            <div className="identity">
              <button onClick={() => handleNext("farmer")}>
                Farmer
                <img src={farmer} alt="farmer" />
              </button>
              <button onClick={() => handleNext("plantppl")}>
                Plant People
                <img src={plantppl} alt="plant-ppl" />
              </button>
            </div>
            <div className="mt-5 flex justify-between">
              <Button onClick={handlePrev} disabled={isFirstStep}>
                Prev
              </Button>
              <Button onClick={handleNext} disabled={isLastStep}>
                Next
              </Button>
            </div>
          </div>
        )}
        {activeStep === 1 && (
          <div className="form-content2">
            <form className="farmer-form">
              <input
                type="text"
                required
                placeholder="First Name"
                value={personalData.firstName}
                onChange={(e) =>
                  setPersonalData({
                    ...personalData,
                    firstName: e.target.value,
                  })
                }
              />
              <input
                type="text"
                required
                placeholder="Last Name"
                value={personalData.lastName}
                onChange={(e) =>
                  setPersonalData({ ...personalData, lastName: e.target.value })
                }
              />
            </form>
            <div className="mt-5 flex justify-between">
              <Button onClick={handlePrev} disabled={isFirstStep}>
                Prev
              </Button>
              <Button onClick={handleNext} disabled={isLastStep}>
                Next
              </Button>
            </div>
          </div>
        )}
        {activeStep === 2 && (
          <div className="form-content3">
            <img src={success} alt="Register Success" />
            <h4>Created Successfully!</h4>
            <p>You can start to manage your crop with LetItGrow!</p>
            <button onClick={handleRegister}>Get Started</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
