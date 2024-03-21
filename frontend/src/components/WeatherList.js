import {
    List,
    ListItem,
    ListItemPrefix,
    Card,
    Typography,
  } from "@material-tailwind/react";
  
  const WeatherList = () => {
    return (
      <Card>
        <List className="bg-lightBlue text-black font-bold">
          {/* Today */}
          <ListItem className="flex items-center">
            <div className="grid grid-cols-3 gap-5">
              <ListItemPrefix>
                <Typography variant="h6" className="font-bold">
                  Today
                </Typography>
              </ListItemPrefix>
              <div className="flex items-center justify-center">
                <img
                  src={require("../assets/forecastIcon-1.svg")}
                  alt="Icon"
                  className="h-8 w-8"
                />
              </div>
              <div className="flex items-center justify-between">
                <Typography variant="small" color="gray" className="font-normal">
                  31°C / 28°C
                </Typography>
              </div>
            </div>
          </ListItem>
  
          {/* Tuesday */}
          <ListItem className="flex items-center">
            <div className="grid grid-cols-3 gap-5">
              <ListItemPrefix>
                <Typography variant="h6" className="font-bold">
                  Tuesday
                </Typography>
              </ListItemPrefix>
              <div className="flex items-center justify-center">
                <img
                  src={require("../assets/forecastIcon-1.svg")}
                  alt="Icon"
                  className="h-8 w-8"
                />
              </div>
              <div className="flex items-center justify-between">
                <Typography variant="small" color="gray" className="font-normal">
                  27°C / 24°C
                </Typography>
              </div>
            </div>
          </ListItem>
  
          {/* Wednesday */}
          <ListItem className="flex items-center">
            <div className="grid grid-cols-3 gap-5">
              <ListItemPrefix>
                <Typography variant="h6" className="font-bold">
                  Wednesday
                </Typography>
              </ListItemPrefix>
              <div className="flex items-center justify-center">
                <img
                  src={require("../assets/forecastIcon-1.svg")}
                  alt="Icon"
                  className="h-8 w-8"
                />
              </div>
              <div className="flex items-center justify-between">
                <Typography variant="small" color="gray" className="font-normal">
                  29°C / 28°C
                </Typography>
              </div>
            </div>
          </ListItem>
  
          {/* Thursday */}
          <ListItem className="flex items-center">
            <div className="grid grid-cols-3 gap-5">
              <ListItemPrefix>
                <Typography variant="h6" className="font-bold">
                  Thursday
                </Typography>
              </ListItemPrefix>
              <div className="flex items-center justify-center">
                <img
                  src={require("../assets/forecastIcon-1.svg")}
                  alt="Icon"
                  className="h-8 w-8"
                />
              </div>
              <div className="flex items-center justify-between">
                <Typography variant="small" color="gray" className="font-normal">
                  28°C / 26°C
                </Typography>
              </div>
            </div>
          </ListItem>
  
          {/* Friday */}
          <ListItem className="flex items-center">
            <div className="grid grid-cols-3 gap-5">
              <ListItemPrefix>
                <Typography variant="h6" className="font-bold">
                  Friday
                </Typography>
              </ListItemPrefix>
              <div className="flex items-center justify-center">
                <img
                  src={require("../assets/forecastIcon-1.svg")}
                  alt="Icon"
                  className="h-8 w-8"
                />
              </div>
              <div className="flex items-center justify-between">
                <Typography variant="small" color="gray" className="font-normal">
                  26°C / 24°C
                </Typography>
              </div>
            </div>
          </ListItem>
  
          {/* Saturday */}
          <ListItem className="flex items-center">
            <div className="grid grid-cols-3 gap-5">
              <ListItemPrefix>
                <Typography variant="h6" className="font-bold">
                  Saturday
                </Typography>
              </ListItemPrefix>
              <div className="flex items-center justify-center">
                <img
                  src={require("../assets/forecastIcon-1.svg")}
                  alt="Icon"
                  className="h-8 w-8"
                />
              </div>
              <div className="flex items-center justify-between">
                <Typography variant="small" color="gray" className="font-normal">
                  31°C / 28°C
                </Typography>
              </div>
            </div>
          </ListItem>
  
          {/* Sunday */}
          <ListItem className="flex items-center">
            <div className="grid grid-cols-3 gap-5">
              <ListItemPrefix>
                <Typography variant="h6" className="font-bold">
                  Sunday
                </Typography>
              </ListItemPrefix>
              <div className="flex items-center justify-center">
                <img
                  src={require("../assets/forecastIcon-1.svg")}
                  alt="Icon"
                  className="h-8 w-8"
                />
              </div>
              <div className="flex items-center justify-between">
                <Typography variant="small" color="gray" className="font-normal">
                  31°C / 28°C
                </Typography>
              </div>
            </div>
          </ListItem>
        </List>
      </Card>
    );
  };
  
  export default WeatherList;
  