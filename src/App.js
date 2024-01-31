import './App.css';
import WeatherApp from './Components/WeatherApp/WeatherApp';
import templatebg from './Components/Assets/rain-6243559_1920.jpg'

function App() {

  return (
    // <div className="bg-black w-screen h-screen">
    //   <img src={templatebg} className='opacity-20 h-screen w-screen'></img>
    //     <WeatherApp/>
    // </div>

    <div>
      <div className='mainbg'>
        <WeatherApp/>
      </div>
    </div>
  
  );
}
  

export default App;
