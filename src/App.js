import logo from './logo.svg';
import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButtons from './components/TopButtons';
import Input from './components/Input';
import TimeLocation from './components/TimeLocation';
import TempAndDetail from './components/TempAndDetail';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState } from 'react';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  const [query, setQuery] = useState({ q: 'delhi' });
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);
  
  
  useEffect(() => {

    const fetchWeather = async () => {
      const msg = query.q ? query.q : 'current location';
      toast.info('fetchinging weather for '+ msg);
      await getFormattedWeatherData({...query,units }).then(
        (data) => {

          toast.success(`Successfulluy fetehed for ${data.name} , ${data.country}`);
          console.log(data);  
          setWeather(data);
        }
      );
    };

    fetchWeather();

  }, [query, units])

  
  const bgChange = () => {
    if (!weather) return 'bg-main';
    if(weather.temp< 5 )
      return 'bg-snow';
    if(weather.temp>25)
      return 'bg-sunny';
    return 'bg-haze';
  
  }
  return (
    <div className={`w-full h-full ${bgChange()} bg-cover , bg-no-repeat py-5`}>
      <div className='mx-auto  w-3/5 py-5 px-32
      bg-white bg-opacity-20 
      backdrop-blur-xl rounded drop-shadow-lg
      bg-slate-600' >
        <TopButtons setQuery={setQuery}/>
        <Input setQuery={setQuery} units={units} setUnits={setUnits} />
        {weather && (
          <div>
            <TimeLocation weather={weather} />
            <TempAndDetail weather={weather} />
            
            <Forecast title="hourly forecast" items={weather.hourly}/>
            <Forecast title="daily forecast" items={weather.daily}/>
          </div>
        )}
      </div>
          
    <ToastContainer autoClose={3000} theme="colored" newestOnTop={true}/>
    </div>
  );
}

export default App;
