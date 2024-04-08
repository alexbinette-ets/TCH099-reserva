import { useState } from 'react';
import Calendrier from './Calendrier';
import Login from './Login';
import HomePage from './HomePage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Reservation from './Reservation';
import TopBar from './TopBar';

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
        <TopBar />
        <div>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>

            <Route exact path="/serveur">
              {LoggedIn ? (
                <Calendrier onLogout={handleLogout} />
              ) : (
                <Login onLogin={handleLogin} />
              )}
            </Route>

            <Route exact path="/reservation">
              <Reservation />
            </Route>
            
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;