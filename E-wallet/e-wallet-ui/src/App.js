import './App.css';
import SignIn from './Login/SignIn';
import SignUp from './Login/SignUp';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import Wallet from './wallet/wallet';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/sign-in">
          <SignIn/>
          </Route>
          <Route path="/sign-up">
          <SignUp/>
          </Route>
          <Route path="/home">
          <Home/>
          </Route>
          <Route path="/profile">
          <Profile/>
          </Route>
          <Route path="/wallet">
          <Wallet/>
          </Route>
          <Route path="/">
          <SignIn/>
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;
