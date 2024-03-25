import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Calendrier from './Calendrier';
import Reservation from './Reservation';


function App() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  }



  return (
    <div className="App">

      <Calendrier onChange={handleDateChange} />
      {selectedDate && <Reservation selectedDate={selectedDate} />}

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
