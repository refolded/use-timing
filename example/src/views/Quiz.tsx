import { useCountdown, useInOut } from "@refolded/use-timing";
import React, { useCallback, useState } from "react";
import CubeIcon from "../components/CubeIcon";
import Wrapper from "../components/Wrapper";
import { padStart } from "../utils/index";

const answers = [`A. 3`, `B. 42`, `C. 45`, `D. I don't eat apples!`];

const Quiz = () => {
  const [delay] = useState(10000);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const {
    start: startInOut,
    stop: stopInOut,
    reset,
  } = useInOut(
    [
      () => {
        setStarted(true);
      },
      () => {
        setFinished(true);
      },
    ],
    delay
  );

  const {
    start: startCountdown,
    stop: stopCountdown,
    reset: resetCountdown,
    currentTime: remaining,
  } = useCountdown(delay);

  const start = useCallback(() => {
    startInOut();
    startCountdown();
  }, [startInOut, startCountdown]);

  const stop = useCallback(() => {
    stopInOut();
    stopCountdown();
  }, [stopInOut, stopCountdown]);

  return (
    <Wrapper>
      <div className='flex'>
        <h1>useInOut</h1>
        <span className='m-auto font-mono text-3xl'>
          {padStart(remaining / 1000)}s
        </span>
      </div>
      {!started && !finished && (
        <button
          className='inline-flex w-full gap-3 btn btn-lg btn-primary '
          onClick={start}
        >
          <CubeIcon />
          <span>Start</span>
        </button>
      )}
      {started && !finished && (
        <div className='grid items-center justify-center w-full grid-cols-1 gap-10'>
          <h3>
            There are 45 apples in your basket. You take three apples out of the
            basket. How many apples are left?
          </h3>
          <button
            className='inline-flex gap-3 btn btn-lg btn-primary '
            onClick={() => {
              reset();
              resetCountdown();
            }}
          >
            <CubeIcon />
            <span>Reset</span>
          </button>
          {answers.map((answer) => (
            <button className='btn btn-primary btn-lg' onClick={stop}>
              {answer}
            </button>
          ))}
        </div>
      )}
      {finished && (
        <div className='text-center'>
          <h3>Quiz Completed! Thank you for participating.</h3>
        </div>
      )}
    </Wrapper>
  );
};
export default Quiz;
