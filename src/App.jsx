// import { useState } from 'react';
import './App.css'
import './components/location.css';
import ".//components/prayercard.css"
import Location from './components/Location';
import Logo from "./assets/logo.png";
import PrayerCards from './components/PrayerCards';
import { CityProvider } from './components/context/Context';


function App() {
  // const [count, setCount] = useState(0)

  return (
    <CityProvider>
    <div className='container'>
      <div className="image">
        <img src={Logo} alt="logol" />
      </div>
      <div><Location /></div>
      <PrayerCards/>
      </div>
    </CityProvider>
      
  )
}

export default App
