'use client'
import { useEffect, useState, useMemo } from 'react';

const calculateAge = (birthDate) => {
  const now = new Date();
  const diffInMs = now.getTime() - birthDate.getTime();

  const seconds = Math.floor(diffInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365.25);
  const months = Math.floor((days % 365.25) / 30.44);

  return {
    years,
    months,
    days: Math.floor(days % 30.44),
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
  };
};

const AgeCounter = () => {
  // Replace this date with your birthdate
  const birthDate = useMemo(() => new Date('1998-09-21'), []); // Example birthdate: January 1, 1990
  const [age, setAge] = useState(calculateAge(birthDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setAge(calculateAge(birthDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [birthDate]);

  return (
    <div className="mx-auto max-w-md rounded-md bg-gray-800 p-4 text-white shadow-md">
      <h2 className="mb-4 text-center text-xl font-semibold">Your Age</h2>
      <div className="grid grid-cols-2 gap-4 text-lg font-medium">
        <div className="text-right">Years:</div>
        <div>{age.years}</div>
        <div className="text-right">Months:</div>
        <div>{age.months}</div>
        <div className="text-right">Days:</div>
        <div>{age.days}</div>
        <div className="text-right">Hours:</div>
        <div>{age.hours}</div>
        <div className="text-right">Minutes:</div>
        <div>{age.minutes}</div>
        <div className="text-right">Seconds:</div>
        <div>{age.seconds}</div>
      </div>
    </div>
  );
};

export default AgeCounter;
