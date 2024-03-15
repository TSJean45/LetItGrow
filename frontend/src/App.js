import React from 'react'
import {
  HeroSection,
  SectionTitle,
  SectionDescription,
  MainContainer,
  FeatureSection,
  HomeCarousel,
  Button
} from "./components";
import { items, forumContent } from "./constants";

const App = () => {
  return (
    <div>
      {/* <div className='absolute inset-0 blur-xl h-[580px]' style={{ background: "linear-gradient(143.6deg, rgba(192, 132, 252, 0) 20.79%, rgba(232, 121, 249, 0.26) 40.92%, rgba(204, 171, 238, 0) 70.35%)" }}></div> */}
      <HeroSection />
      <MainContainer bgColor="bg-lightGreen">
        <SectionTitle>Your Personal Garden Assistant</SectionTitle>
        <SectionDescription>
          Say farewell to uncertainty and welcome the abundance of a flourishing
          garden.<br></br>
          Experience the gratification of green living with effortless precision
          and delight.
        </SectionDescription>
        <FeatureSection
          cardText="text-dullGreen"
          features={[
            {
              title: 'Plant Condition Simulation',
              image: 'descImg-1.png',
            },
            {
              title: 'Plant Disease Detection',
              image: 'descImg-2.png',
            },
            {
              title: 'Soil Monitoring Dashboard',
              image: 'descImg-3.png',
            },
          ]}
        />
      </MainContainer>
      <MainContainer>
        <SectionTitle>AI-Powered Farming</SectionTitle>
        <SectionDescription>
          Enter the realm of AI-powered farming by revolutionize traditional
          practices, empowering farmers with data-driven insights for optimal
          efficiency and bountiful yields.
        </SectionDescription>
        <FeatureSection
          features={[
            {
              title: 'Space Mapping',
              image: 'descImg-4.png',
            },
            {
              title: 'AI Yield Prediction',
              image: 'descImg-5.png',
            },
            {
              title: 'Project Management Dashboard',
              image: 'descImg-6.png',
            },
          ]}
          cardColor="bg-midDarkGreen"
          cardText="text-darkGreen"
        />
      </MainContainer>
      <MainContainer bgColor="bg-lightGreen">
        <SectionTitle>Sun & Soil Market</SectionTitle>
        <HomeCarousel items={items} type={"market"} />
        <Button text="Check Out More ->"  bgColor="bg-mediumGreen" hoverBg="bg-lightGreen" textColor="text-white" hoverText="text-white"/>
      </MainContainer>
      <MainContainer>
        <SectionTitle>From The Forum</SectionTitle>
        <HomeCarousel items={forumContent} type={"forum"}/>
        <Button text="Check Out More ->" bgColor="bg-navyBlue" hoverBg="bg-lightBlue" textColor="text-white" hoverText="text-white"/>
      </MainContainer>
    </div>
  )
}

export default App
