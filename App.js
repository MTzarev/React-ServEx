import logo from './logo.svg';
import './App.css';
import ParkingPlace from './componenets/ParkingPlace';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       <ParkingPlace/>
   
   
      </header>
    </div>
  );
}

export default App;
