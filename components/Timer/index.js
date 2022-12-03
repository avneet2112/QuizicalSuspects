import React from 'react';
import { useTimer } from 'react-timer-hook';
function MyTimer({ expiryTimestamp, handleSubmit }) {
  const {
    seconds,
    minutes,
    hours,
    //   days,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => handleSubmit(),
  });

  return (
    <div style={{ textAlign: 'center' }}>
      <div>
        <span className='timer'>{minutes}</span>
        <b>:</b>
        <span className='timer'>
          {seconds.toString().length == 1 ? `0${seconds}` : seconds}
        </span>
      </div>
    </div>
  );
}
const Timer = ({ handleSubmit }) => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 120); // 10 minutes timer
  return (
    <div>
      <MyTimer expiryTimestamp={time} handleSubmit={handleSubmit} />
    </div>
  );
};

export default Timer;
