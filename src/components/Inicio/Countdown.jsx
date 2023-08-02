import React, { useEffect, useState } from "react";

const Countdown = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const updateCountdown = () => {
    const targetDate = new Date("2023-08-15"); // Coloca aquí la fecha objetivo en formato YYYY-MM-DD
    const currentDate = new Date();
    const timeDifference = targetDate.getTime() - currentDate.getTime();

    // Verifica si ya ha pasado la fecha objetivo
    if (timeDifference <= 0) {
      setDays(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    } else {
      const oneSecond = 1000;
      const oneMinute = oneSecond * 60;
      const oneHour = oneMinute * 60;
      const oneDay = oneHour * 24;

      const days = Math.floor(timeDifference / oneDay);
      const hours = Math.floor((timeDifference % oneDay) / oneHour);
      const minutes = Math.floor((timeDifference % oneHour) / oneMinute);
      const seconds = Math.floor((timeDifference % oneMinute) / oneSecond);

      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    }
  };

  useEffect(() => {
    updateCountdown(); // Llama a la función para actualizar el contador inmediatamente al montar el componente
    const intervalId = setInterval(updateCountdown, 1000);

    // Limpia el intervalo al desmontar el componente para evitar fugas de memoria
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <span>{days}</span>
        </span>
        days
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <span>{hours}</span>
        </span>
        hours
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <span>{minutes}</span>
        </span>
        min
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <span>{seconds}</span>
        </span>
        sec
      </div>
    </div>
  );
};

export default Countdown;
