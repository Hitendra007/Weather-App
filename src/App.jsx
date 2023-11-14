import { useEffect, useState } from 'react'
import './App.css'
import humid from "./assets/humid.svg"
import wind from './assets/wind.svg'
function App() {
  const [location, setLocation] = useState("India")
  const [temp,setTemp] = useState(0)
  const  [unittemp,setUnittemp]=useState("°F")
  const [icon,setIcon]= useState("cdn.weatherapi.com/weather/64x64/day/143.png")
  const [humidity,setHumidity]= useState("0")
  const [windspeed,setWindspeed]=useState("0")
  const [tloc,setTloc]= useState("India")
  const data = async () => {
    setLocation(tloc.charAt(0).toUpperCase() + tloc.slice(1).toLowerCase())
    
    const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=c6e766fa4fdc451c9f461143231011&q=${location}&aqi=no`).then(res => {return res.json()}).then(
      data => {
        console.log(data)
        let iconn = data['current']['condition']['icon']
        let text = data['current']['condition']['icon']
        let tempp = data['current']['temp_c']
        let wind = data["current"]['wind_kph']
        let hudity = data["current"]['humidity']

        setIcon(iconn)
        setTemp(tempp)
        setWindspeed(wind)
        setHumidity(hudity)
      }
    )
  }
  useEffect(()=>{
          data()
  },[])
  const toggleunit = () => {
    if (unittemp === "°F") {
      setTemp((prev) => ((prev * 9) / 5) + 32);
      setUnittemp("°C");
    } else if (unittemp === "°C") {
      setTemp((prev) => ((prev - 32) * 5) / 9);
      setUnittemp("°F");
    }
  };
  
  return (
    <>
      <div className="maindiv">
        <div className='main'>
          <div className="innercontent">
            <h1 id='whead'>Weather app</h1>
            <div id='form'>
              <label htmlFor="location">Location:</label>
              <input type="text" id="location" onChange={(e)=>{setTloc(e.target.value)}} placeholder='Enter city name...' />
              <button onClick={data}>🔎</button>
            </div>
            <div className="weatherlogo">
              <div className="flex-item" id="logo"><img src={`https://${icon}`} alt="" /></div>
              <div className="flex-item " id='temp'>{temp.toFixed(2)}{unittemp === "°F" ? "°C" : "°F"}  <button id='unittemp' onClick={toggleunit}>to {unittemp}</button></div>
              <div className="flex-item" id="loc">{location}</div>
            </div>
            <div className="other">
            <div className="flexitem"><img className='humid' src={humid} alt="" /><b>Humidity:{humidity}</b></div>
            <div className="flexitem"><img  className="humid" src={wind} alt="" /><b>wind:{windspeed}Kph</b></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
