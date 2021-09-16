import React from "react";
import "./App.css";
import Counter from "./components/Counter";
import Pomodoro from "./components/Pomodoro";

const App = () => {
  return (
    <div className='w-screen min-h-screen text-white p-12'>
      <Counter />
      <Pomodoro />
    </div>
  );
};

export default App;
