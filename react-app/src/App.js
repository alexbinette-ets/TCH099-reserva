import { useState } from 'react';
import Calendrier from './Calendrier';
import Login from './Login';

function App() {
  const [LoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  }

  const handleLogout = () => {
    setLoggedIn(false);
  }

  return (
    <div className="App">
      {LoggedIn ? (
        <Calendrier onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;