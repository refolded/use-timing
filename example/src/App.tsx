import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Countdown from "./views/Countdown";
import Counter from "./views/Counter";
import Debounce from "./views/Debounce";
import Pomodoro from "./views/Pomodoro";
import Quiz from "./views/Quiz";

const App = () => {
  return (
    <Router>
      <div className='text-white'>
        <Switch>
          <Route path='/cycle'>
            <Pomodoro />
          </Route>
          <Route path='/inout'>
            <Quiz />
          </Route>
          <Route path='/countdown'>
            <Countdown />
          </Route>
          <Route path='/debounce'>
            <Debounce />
          </Route>
          <Route path='/'>
            <Counter />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
