import './App.css';
import WeatherApp from './Components/WeatherApp/WeatherApp';
import templatebg from './Components/Assets/rain-6243559_1920.jpg'
import { CurrentWeather } from './Components/WeatherApp/CurrentWeather';

function App() {

  return (
    <div>
      <div className='mainbg overflow-hidden '>  
        <CurrentWeather/>
      </div>
    </div>
  
  );
}
  

export default App;
