import React from "react";
import "./App.css";
import Counter from "./views/Counter";
import Pomodoro from "./views/Pomodoro";
import Quiz from "./views/Quiz";
import Countdown from "./views/Countdown";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
          <Route path='/'>
            <Counter />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
