import React, { useState, useEffect } from "react";
import "./App.css"; // Importing CSS for styling

export default function CountdownTimer() {
  const [time, setTime] = useState(""); // Keeps input empty initially
  const [milliseconds, setMilliseconds] = useState(0); // Stores countdown time in milliseconds
  const [isRunning, setIsRunning] = useState(false); // Tracks if the timer is running

  useEffect(() => {
    let timer;
    if (isRunning && milliseconds > 0) {
      timer = setInterval(() => {
        setMilliseconds((prev) => prev - 10); // Reduce 10ms per interval
      }, 10);
    } else if (milliseconds === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, milliseconds]);

  const handleStart = () => {
    if (!isRunning && time > 0) {
      setMilliseconds(time * 60 * 1000); // Convert minutes to milliseconds
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setMilliseconds(0);
    setTime(""); // Reset input to empty
  };

  const formatTime = () => {
    const min = Math.floor(milliseconds / 60000); // Convert to minutes
    const sec = Math.floor((milliseconds % 60000) / 1000); // Convert to seconds
    const ms = Math.floor((milliseconds % 1000) / 10); // Convert to milliseconds (2 digits)

    return `${min}:${sec < 10 ? "0" : ""}${sec}:${ms < 10 ? "0" : ""}${ms}`;
  };

  return (
    <div className="container">
      <div className="timer-box">
        <h1>Countdown Timer</h1>
        <input
          type="number"
          placeholder="Enter time in minutes"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          disabled={isRunning}
        />
        <div className="timer-display">{formatTime()}</div>
        <div className="buttons">
          <button onClick={handleStart} className="start">Start</button>
          <button onClick={handlePause} className="pause">
            {isRunning ? "Pause" : "Resume"}
          </button>
          <button onClick={handleReset} className="reset">Reset</button>
        </div>
      </div>
    </div>
  );
}
