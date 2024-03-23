import React from 'react';
import { Card, CardBody, Typography } from "@material-tailwind/react";

const WeatherCard = ({ icon, title, value, constant }) => {
  return (
    <Card className="w-full">
      <CardBody className=" p-3 flex items-center">
        <div className="grid grid-cols-3 gap-4 items-center justify-center">
          <div className="flex items-center col-span-1 justify-center">
            {icon && <img src={require(`../assets/${icon}`)} alt="Icon" className="h-8 w-8" />}
          </div>
          <div className='col-span-2'>
            <Typography variant="small" className="font-bold text-left" color="gray">
              {title}
            </Typography>
            <div className="flex items-center justify-items-start">
              <Typography variant="h3" className="font-bold" color="black" style={{ marginRight: '4px' }}>
                {value}
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                {constant}
              </Typography>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default WeatherCard;
