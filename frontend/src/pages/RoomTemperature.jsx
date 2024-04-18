import React, { useState } from "react";
import {
  DashboardSidebar,
  DashboardNavbar,
  DashboardTitle,
  SoilCard,
} from "../components";
import {
  Stepper,
  Step,
  Button,
  Typography,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Spinner,
  Alert,
} from "@material-tailwind/react";
import OtpInput from "react-otp-input";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const SoilMonitoring = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [plantData, setPlantData] = useState(null);

  const { id } = useParams();

  const fetchMapData = async () => {
    try {
      const response = await fetch(`/personal-plant/${id}`);
      const data = await response.json();
      console.log("Map data:", data);
      setPlantData(data);
    } catch (error) {
      console.error("Error fetching map data:", error);
    }
  };

  const handleLoading = async () => {
    setIsLoading(true);
    try {
      console.log("Updating data for ID:", id);

      const response = await fetch(`/personal-plant/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();
      console.log("Response from server:", responseData);

      if (!response.ok) {
        throw new Error("Failed to update data");
      }
      fetchMapData();
      setTimeout(handleNext, 2000);
    } catch (error) {
      console.error("Error updating data:", error);
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setActiveStep((cur) => cur + 1);
      setIsLoading(false); // Reset isLoading in handleNext
    }
  };

  const handleFinal = () => {
    setActiveStep((cur) => cur + 1);
    handleCloseDialog();
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className="overflow-hidden bg-white">
      <DashboardSidebar type="farmer" />
      <div className="ml-20 px-2 sm:px-4 py-4 sm:py-8 max-h-full">
        <DashboardNavbar identity="farmer" name="Farm A" />
        <div className="flex justify-between items-center">
          <DashboardTitle>Pairing IOT Devices</DashboardTitle>
        </div>
        <div className="w-full px-24 py-4">
          <Stepper
            activeStep={activeStep}
            isLastStep={(value) => setIsLastStep(value)}
            isFirstStep={(value) => setIsFirstStep(value)}
          >
            {/* Step 1 */}
            <Step onClick={() => setActiveStep(0)}>
              <Typography>1</Typography>
              <div className="absolute -bottom-[2rem] w-max text-center">
                <Typography
                  color={activeStep === 0 ? "blue-gray" : "gray"}
                  className="font-normal"
                >
                  Input Serial Number
                </Typography>
              </div>
            </Step>
            {/* Step 2 */}
            <Step onClick={() => setActiveStep(1)}>
              <Typography>2</Typography>
              <div className="absolute -bottom-[2rem] w-max text-center">
                <Typography
                  color={activeStep === 1 ? "blue-gray" : "gray"}
                  className="font-normal"
                >
                  Confirmation
                </Typography>
              </div>
            </Step>
            {/* Step 3 */}
            <Step onClick={() => setActiveStep(2)}>
              <Typography>3</Typography>
              <div className="absolute -bottom-[2rem] w-max text-center">
                <Typography
                  color={activeStep === 2 ? "blue-gray" : "gray"}
                  className="font-normal"
                >
                  Success
                </Typography>
              </div>
            </Step>
          </Stepper>

          {isLoading ? (
            <div className="mt-20 flex justify-center flex-col items-center">
              <Spinner className="h-32 w-32 text-mediumGreen" />
              <Typography className="text-center m-5 text-xl font-bold">
                Connecting To Devices...
              </Typography>
            </div>
          ) : (
            <>
              {/* Step 1 Content */}
              {activeStep === 0 && (
                <div className="mt-20 flex justify-center flex-col items-center">
                  <Typography className="text-center m-5">
                    Please enter the 6 digit serial number of your thermometers.
                  </Typography>
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    separator={<span style={{ width: "10px" }}></span>}
                    renderInput={(props) => <input {...props} />}
                    inputStyle={{
                      border: "2px solid #CFD3DB",
                      borderRadius: "8px",
                      width: "54px",
                      height: "54px",
                      fontSize: "20px",
                      color: "#000",
                      fontWeight: "400",
                      caretColor: "black",
                      margin: "0 10px",
                    }}
                    focusStyle={{
                      border: "1px solid #CFD3DB",
                      outline: "none",
                    }}
                  />
                  <Button
                    onClick={handleLoading} 
                    className="mt-4 text-md w-96 bg-mediumGreen"
                    disabled={isLoading}
                  >
                    Start Pairing
                  </Button>

                  <a href="/FarmerDashboard">
                    <Typography className="mt-4 w-96 underline text-center text-[#CBCACA] font-bold">
                      Back
                    </Typography>
                  </a>
                </div>
              )}

              {/* Step 2 Content */}
              {activeStep === 1 && (
                <div className="mt-20 flex justify-center flex-col items-center">
                  <div className="grid grid-cols-2 gap-10">
                    <div className="col-span-1 flex flex-col">
                        <img
                            src={plantData && require(`../assets/${plantData.image}`)}
                            alt="Icon"
                            className="h-64 w-64"
                        />
                    </div>
                    <div className="col-span-1 flex justify-center flex-col items-center">
                      <Alert className="text-xl mb-2 flex items-center justify-center bg-ultLightGreen text-black font-bold">
                        {(plantData && plantData.name) ?? "N/A"}
                      </Alert>
                      <div className="gap-10">
                        {/* First column */}
                        <div className="flex flex-col col-span-1">
                          <SoilCard
                            icon="weatherIcon-5.svg"
                            title="Soil Temperature"
                            value={(plantData && plantData.temp) ?? "N/A"}
                            constant="°C"
                            className="mb-4" // Add margin bottom to each SoilCard
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleOpenDialog} // Call handleLoading when button is clicked
                    className="mt-4 text-md w-96 bg-mediumGreen"
                    disabled={isLoading}
                  >
                    Confirmed Pairing
                  </Button>
                </div>
              )}

              {/* Step 3 Content */}
              {activeStep === 2 && (
                <div className="mt-20 flex justify-center flex-col items-center">
                  <img
                    src={require("../assets/soilMonitor-1.jpg")}
                    alt="Icon"
                    className="h-64 w-64"
                  />
                  <Typography className="text-darkGreen font-bold text-2xl">
                    Success! Your IOT devices are paired.
                  </Typography>
                  <Typography>
                    You can start monitoring your room temperature with the
                    system.
                  </Typography>
                  <Link
                    to={'/PersonalDashboard'}
                  >
                    <Button
                      className="mt-4 text-md w-96 bg-mediumGreen"
                      disabled={isLoading}
                    >
                      Dashboard
                    </Button>
                  </Link>
                </div>
              )}
            </>
          )}

          {/* Dialog for Step 2 */}
          <Dialog open={openDialog} handler={handleCloseDialog}>
            <DialogHeader>Confirmation</DialogHeader>
            <DialogBody>Are you sure you want to pair this device?</DialogBody>
            <DialogFooter className="gap-5">
              <Button onClick={handleCloseDialog} color="red">
                Cancel
              </Button>
              <Button onClick={handleFinal} color="green">
                Confirm
              </Button>
            </DialogFooter>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default SoilMonitoring;
