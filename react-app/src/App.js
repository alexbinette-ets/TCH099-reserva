import { useState } from 'react';
import Calendrier from './Calendrier';
import Login from './Login';
import HomePage from './HomePage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Reservation from './Reservation';
import TopBar from './TopBar';
import Commentaire from './Commentaire';
import Menu from './Menu.js'

function App() {
  const [LoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (username) => {
    setLoggedIn(true);
    setUsername(username);
  }

  const handleLogout = () => {
    setUsername('');
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
                <Calendrier username={username} onLogout={handleLogout} />
              ) : (
                <Login onLogin={handleLogin} />
              )}
            </Route>

            <Route exact path="/reservation">
              <Reservation />
            </Route>

            <Route exact path="/commentaire">
              <Commentaire />
            </Route>
           
            <Route exact path="/menu">
              <Menu />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
