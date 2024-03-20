import React from 'react';

const WeatherComponent = () => {
  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-300 p-4 rounded-lg max-w-sm text-white">
      

      <hr className="my-4 border-white" />

      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Wind', value: '12 km/h' },
          { label: 'Humidity', value: '50%' },
          { label: 'Precipitation', value: '10%' },
          { label: 'UV Index', value: '8 UVI' }
        ].map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            {/* Replace with actual icons */}
            {/* You can use libraries like react-icons or heroicons-react */}
            {/* Example with react-icons */}
            {/* import { WiStrongWind } from "react-icons/wi"; */}
            {/* And use it like this ->  */}
            {/*<WiStrongWind size={24} />*/}
            
            {/* Placeholder div for icon, replace with actual icon component */}
            <div style={{ width: 24, height: 24 }}></div> 
           
            <span>{item.label}</span><strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherComponent;
