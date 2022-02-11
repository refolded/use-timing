import React from "react";
import { padStart } from "../utils/index";

const TimeComponent = (props: {
  label: string;
  value: number;
}): React.ReactElement => {
  const value = { "--value": padStart(props.value) } as React.CSSProperties;
  return (
    <div className='flex flex-col p-2 bg-neutral rounded-box text-neutral-content'>
      <span className='font-mono text-9xl countdown'>
        <span style={value}></span>
      </span>
      {props.label}
    </div>
  );
};

export default TimeComponent;
