import React from "react";
import Navbar from "./Navbar";

const Wrapper = (props: {
  className?: string;
  children?: React.ReactNode;
}): React.ReactElement => {
  return (
    <div className='flex flex-col h-screen max-h-screen p-12'>
      <Navbar
        routeOptions={[
          {
            path: "/",
            label: "useInterval",
          },
          {
            path: "/cycle",
            label: "useCycle",
          },
          {
            path: "/inout",
            label: "useInOut",
          },
          {
            path: "/countdown",
            label: "useCountdown",
          },
          {
            path: "/debounce",
            label: "useDebounce",
          },
        ]}
      />
      <div
        className={`pt-12 flex flex-col justify-center font-mono w-full m-auto items-center prose prose-2xl ${props?.className}`}
      >
        {props?.children}
      </div>
    </div>
  );
};

export default Wrapper;
