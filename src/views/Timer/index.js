import { useState, useEffect } from "react";

const Timer = () => {
  const [time, setTime] = useState("");
  let counter = 0;

  function refreshClock() {
    let date = new Date();
    let hrs = date.getHours();
    let mins = date.getMinutes();
    let period = "AM";
    if (hrs === 0) {
      hrs = 12;
    } else if (hrs === 12) {
      hrs = 12;
      period = "PM";
    } else if (hrs > 12) {
      hrs = hrs - 12;
      period = "PM";
    }
    hrs = hrs < 10 ? "0" + hrs : hrs;
    mins = mins < 10 ? "0" + mins : mins;

    let time = `${hrs}:${mins} ${period}`;
    setTime(time);
    counter = counter++;
    // console.log(counter++ / 60);
  }
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  return <div>{`${time}  | Timer : ${counter} Mins`} </div>;
};

export default Timer;
