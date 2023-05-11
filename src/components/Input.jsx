import React, { useState } from 'react'
import {UilSearch , UilLocationPoint} from "@iconscout/react-unicons"
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { latitude,longitude,API_KEY } from '../services/weatherService';


function Input({setQuery , units , setUnits}) {
 
  const [city,setCity] = useState("");
  

  const [aqi, setAqi] = useState(null);
  const [components, setComponents] = useState("");

  const handleSearch = () => {
    if(city !== '') setQuery({q: city})
  }

  const handleloco = () => {
    if(navigator.geolocation){
      toast.info('Fetching Location');
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("Location Fetched");
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  }

  const handleUnit = (a) => {
    const selectedUnit = a.currentTarget.name;
    // console.log(selectedUnit);
    // console.log(units);
    
    if(units !== selectedUnit) setUnits({selectedUnit});
  
    // console.log(units)
  }

  window.onload = function(){
  
}

  const handleAQI = () =>{


      // Fetch the AQI data from the API
      fetch(`http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
          // Set the AQI and SO2 values
          setAqi(data.list[0].main.aqi);
     
          // Create an object that contains all the pollutant measurements in the components object
          const componentsObj = {
            co: data.list[0].components.co,
            no: data.list[0].components.no,
            no2: data.list[0].components.no2,
            o3: data.list[0].components.o3,
            so2: data.list[0].components.so2,
            pm2_5: data.list[0].components.pm2_5,
            pm10: data.list[0].components.pm10,
            nh3: data.list[0].components.nh3
          };
          // Set the components object
          setComponents(componentsObj);
          const targetDiv = document.getElementById("aqi-block");
          const btn = document.getElementById("aqi-button");
          btn.onclick = function() {
          if (targetDiv.style.display !== "none") {
            targetDiv.style.display = "none";
          } else {
            targetDiv.style.display = "block";
          }
        };
        
        })
        .catch(error => console.error(error));
    };
  
  

  return (
    <div className='flex flex-row justify-center my-6'>
        <div className='ml-10 flex flex-row w-3/4 items-center justify-center space-x-2'>
            <input 
            value= {city}
            onChange={(e) => setCity(e.currentTarget.value)}
            type="text" 
            className="text-md font-light p-2 w-full shadow-xl focus:outline-none capitalize" 
            placeholder='Search for cities..... '
            />
            <UilSearch size={25} className="text-white cursor-pointer transition ease-out  hover:scale-125" 
            onClick={handleSearch} />
            <UilLocationPoint size={25} className="text-white cursor-pointer transition ease-out hover:scale-125"
            onClick={handleloco}/>
        </div>

        <div className='flex flex-row w-1/4 items-center justify-center'>
            <button name="metric"
            className='ml-2 text-xl text-white font-light hover:scale-110'
            onClick={handleUnit}>
               &deg;C 
            </button>
            <p className='text-xl ml-2 mr-2 text-white mx-1'>|</p>
            <button name="imperial"
            className='text-xl text-white font-light hover:scale-110'
            onClick={handleUnit}>
               &deg;F 
            </button>
            <p className='text-xl ml-2 mr-2 text-white mx-1'>|</p>

            <button name="aqi" id='aqi-button'
            className='text-xl text-white font-light hover:scale-110'
            onClick={handleAQI}>
               AQI
              <div id='aqi-block' className='absolute mt-3 w-36 flex flex-col gap-1.5 border p-[5px] border-solid
              	backdrop-blur-sm border-[#363636]' >
                
                <div className='w-full flex flex-row justify-around text-base p-1'>
                  <span>AQI</span><span>-</span> <span>{aqi}</span>
                </div>
                
                <div className='w-full flex flex-row justify-around text-base p-1'>
                  <span>SO<sub>2</sub></span> <span>-</span><span>{components.so2}</span>
                </div>
                <div className='w-full flex flex-row justify-around text-base p-1'>
                  <span >PM<sub>2.5</sub></span><span>-</span> <span>{components.pm2_5}</span>
                </div>
                <div className='w-full flex flex-row justify-around text-base p-1'>
                  <span>PM<sub>10</sub></span><span>-</span> <span>{components.pm10}</span>
                </div>
                <div className='w-full flex flex-row justify-around text-base p-1'>
                  <span>CO</span> <span>-</span><span>{components.co}</span>
                </div>

              </div> 
            </button>
        </div>

    </div>
  )
}

export default Input