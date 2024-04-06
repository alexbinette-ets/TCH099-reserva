import { useState } from 'react';
import Calendrier from './Calendrier';
import Login from './Login';
import HomePage from './HomePage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  const [LoggedIn, setLoggedIn] = useState(true);

  const handleLogin = () => {
    setLoggedIn(true);
  }

  const handleLogout = () => {
    setLoggedIn(false);
  }

  return (
    <Router>
      <div className="App">
        <HomePage />
        <div>
          <Switch>
            <Route path="/">
            {LoggedIn ? (
              <Calendrier onLogout={handleLogout} />
            ) : (
              <Login onLogin={handleLogin} />
            )}
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;