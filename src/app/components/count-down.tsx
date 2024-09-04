"use client";

// Import Statements
import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Input } from "@/app/components/components/ui/input";
import { Button } from "@/app/components/components/ui/button";
import { clear } from "console";
import { Timer } from "lucide-react";

// State and References

// ......Main Function......
export default function Countdown() {
  const [duration, setDuration] = useState<number | string>("");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timeRef = useRef<NodeJS.Timeout | null>(null);
  // ........Functions for Timer Control.........

  // Function to Handle the duration of countdown timer

  const handleSetDuration = (): void => {
    if (typeof duration === "number" && duration > 0) {
      setTimeLeft(duration);
      setIsActive(false);
      setIsPaused(false);
      if (timeRef.current) {
        clearInterval(timeRef.current);
      }
    }
  };

  // Function to Handel the start time of countdown timer

  const handleStart = (): void => {
    if (timeLeft > 0) {
      setIsActive(true);
      setIsPaused(false);
    }
  };

  // Function to Handle the pasue time of countdown timer
  const handlePause = (): void => {
    if (isActive) {
      setIsPaused(true);
      setIsActive(false);
      if (timeRef.current) {
        clearInterval(timeRef.current);
      }
    }
  };

  // Function to Reset the time of countdown timer

  const handleReset = (): void => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(typeof duration === "number" ? duration : 0);
    if (timeRef.current) {
      clearInterval(timeRef.current);
    }
  };

  // useEffect for Countdown Logic

  useEffect(() => {
    if (isActive && !isPaused) {
      timeRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timeRef.current!);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => {
      if (timeRef.current) {
        clearInterval(timeRef.current);
      }
    };
  }, [isActive, isPaused]);

  // .........Helper Functions.........

  // Function for format time in countdown timer
  const formatTime = (time: number): string => {
    const minuts = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minuts).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // Fnction for handle duration change in countdown timer

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDuration(Number(e.target.value) || "");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-100 dark:bg-gray-900">
      {/* Timer Box container */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        {/* Title of the countdown timer */}
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200 text-center">
          Countdown Timer
        </h1>
        {/* Input and set button container */}
        <div className="flex items-center mb-6">
          <Input
            type="number"
            id="duration"
            placeholder="Enter duration in seconds"
            value={duration}
            onChange={handleDurationChange}
            className="flex-1 mr-4 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          />
          <Button
            onClick={handleSetDuration}
            variant="outline"
            className="text-gray-800 dark:text-gray-200"
          >
            SET
          </Button>
        </div>
        {/* dispaly the formated time left */}
        <div className="text-center text-6xl font-bold text-gray-800 dark:text-gray-200 mb-8">
          {formatTime(timeLeft)}
        </div>
        {/* Buttons to start, pause and reset the timmer */}
        <div className="flex justify-center gap-4">
          {/* Button to start countdown timer */}
          <Button
            onClick={handleStart}
            variant="outline"
            className="text-gray-800 dark:text-gray-200 "
          >
            {isPaused ? "Resume" : "Start"}
          </Button>
          {/*  Button to pause timer */}
          <Button
            onClick={handlePause}
            variant={"outline"}
            className="text-gray-800 dark:text-gray-200"
          >
            Pause
          </Button>
          <Button
            onClick={handleReset}
            variant={"outline"}
            className="text-gray-800 dark:text-gray-200"
          >
            {" "}
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
