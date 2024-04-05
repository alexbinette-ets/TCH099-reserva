import { useState } from 'react';
import Calendrier from './Calendrier';
import Login from './Login';
import HomePage from './HomePage';

function App() {
  const [LoggedIn, setLoggedIn] = useState(true);

  const handleLogin = () => {
    setLoggedIn(true);
  }

  const handleLogout = () => {
    setLoggedIn(false);
  }

  return (

    <div className="App">
      <HomePage/>
      {LoggedIn ? (
        <Calendrier onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>

    /*
        <div className='App'>
          <HomePage/>
        </div>
        */
  );
}

export default App;