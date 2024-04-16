import React from 'react';
import { Card, CardBody, Typography } from "@material-tailwind/react";

const SoilCard = ({ icon, title, value, constant }) => {
  return (
    <Card className="w-64 mb-4 border">
      <CardBody className=" p-3 flex items-center">
        <div className="grid grid-cols-3 gap-5 items-center justify-center">
          <div className="flex items-center col-span- w-12 justify-center">
            {icon && <img src={require(`../assets/${icon}`)} alt="Icon" className="h-8 w-8" />}
          </div>
          <div className='col-span-2'>
            <Typography variant="small" className="font-bold text-left" color="gray">
              {title}
            </Typography>
            <div className="flex items-center justify-items-start">
              <Typography variant="h5" className="font-bold" color="black" style={{ marginRight: '4px' }}>
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

export default SoilCard;
