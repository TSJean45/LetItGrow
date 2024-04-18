import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  Login,
  Signup,
  PlantSimulation,
  MyGarden,
  FarmerDashboard,
  DiseaseDetect,
  GrowBot,
  CropForecast,
  PersonalDashboard,
  Forum,
  SpaceMapping,
  ClassesEvents,
  Market,
  Services,
  SoilMonitoring,
  RoomTemperature
} from './pages'
import { ThemeProvider } from '@material-tailwind/react'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/Login',
    element: <Login />,
  },
  {
    path: '/Signup',
    element: <Signup />,
  },
  {
    path: '/PlantSimulation',
    element: <PlantSimulation />,
  },
  {
    path: '/MyGarden',
    element: <MyGarden />,
  },
  {
    path: '/DiseaseDetect',
    element: <DiseaseDetect />,
  },
  {
    path: '/FarmerDashboard',
    element: <FarmerDashboard />,
  },
  {
    path: '/GrowBot',
    element: <GrowBot />,
  },
  {
    path: '/CropForecast',
    element: <CropForecast />,
  },
  {
    path: '/Forum',
    element: <Forum />,
  },
  {
    path: '/PersonalDashboard',
    element: <PersonalDashboard />,
  },
  {
    path: '/Market',
    element: <Market />,
  },
  {
    path: '/SpaceMapping',
    element: <SpaceMapping />,
  },
  {
    path: '/ClassesEvents',
    element: <ClassesEvents />,
  },
  {
    path: '/Services',
    element: <Services />,
  },
  {
    path: '/SoilMonitoring/:id',
    element: <SoilMonitoring />,
  },
  {
    path: '/RoomTemperature/:id',
    element: <RoomTemperature />,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
