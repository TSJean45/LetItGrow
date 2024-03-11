import React from 'react';

const FeatureSection = ({ features, cardColor, cardText }) => {
  return (
    <div className="max-w-screen-xl mx-auto py-16 px-4 sm:px-1 md:px-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className={`relative ${cardColor ? cardColor : 'bg-white'} rounded-lg shadow-md max-w-md`}> {/* Adjust max-width here */}
            <div className="p-6" style={{ paddingBottom: '25px' }}>
              <h2 className={`text-4xl leading-10 font-bold ${cardText ? cardText : ''} mb-4`} style={{ lineHeight: '1.5', width: '60%' }}>
                {feature.title}
              </h2>
            </div>
            <img
              src={require(`../assets/${feature.image}`)}
              alt={feature.title}
              className="absolute bottom-0 right-0 mb-[-50px] mr-[-20px] max-w-[120px] max-h-[220px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
