import React from "react";

import { padStart } from "../utils/index";

const TimeComponent = (props) => (
  <div className='flex flex-col p-2 bg-neutral rounded-box text-neutral-content'>
    <span className='font-mono text-9xl countdown'>
      <span style={{ "--value": padStart(props.value) }}></span>
    </span>
    {props.label}
  </div>
);

export default TimeComponent;
