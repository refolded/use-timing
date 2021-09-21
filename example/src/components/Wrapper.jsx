import React from "react";
import Navbar from "./Navbar";

const Wrapper = (props) => {
  return (
    <div className='h-screen max-h-screen flex flex-col p-12'>
      <Navbar />
      <div
        className={`pt-12 flex flex-col justify-center font-mono w-full m-auto items-center prose prose-2xl ${props.className}`}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Wrapper;
