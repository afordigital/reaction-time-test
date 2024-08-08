import { useRef, useState, useEffect } from "react";
import { cn } from "../common/utils";
import {
  IdleScreen,
  WaitingScreen,
  ClickingScreen,
  RushedScreen,
  ResultsScreen,
} from "./screen";

type Status = "IDLE" | "WAITING" | "CLICKING" | "RUSHED" | "RESULTS";

const Backgrounds = {
  IDLE: "bg-[#3783CA]",
  WAITING: "bg-[#ce8c1b]",
  CLICKING: "bg-[#3bab63]",
  RUSHED: "bg-[#b01d13]",
  RESULTS: "bg-[#3783CA]",
} as const satisfies Record<Status, string>;

export const InitialScreen = () => {
  const [status, setStatus] = useState<Status>("IDLE");
  const userTime = useRef({ start: 0, end: 0 });
  const timeoutId = useRef<number | null>(null);

  const finalTime = userTime.current.end - userTime.current.start;

  const handleStatus = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }

    switch (status) {
      case "IDLE":
        setStatus("WAITING");
        startTimer();
        break;
      case "WAITING":
        setStatus("RUSHED");
        break;
      case "RUSHED":
        setStatus("WAITING");
        startTimer();
        break;
      case "CLICKING":
        userTime.current.end = performance.now();
        setStatus("RESULTS");
        break;
      case "RESULTS":
        userTime.current.start = 0;
        userTime.current.end = 0;
        setStatus("WAITING");
        startTimer();
        break;
      default:
        break;
    }
  };

  const startTimer = () => {
    const randomTime = Math.floor(Math.random() * 3000) + 1000;
    timeoutId.current = setTimeout(() => {
      setStatus((current) => (current === "RUSHED" ? "RUSHED" : "CLICKING"));
      userTime.current.start = performance.now();
    }, randomTime);
  };

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  return (
    <section
      onClick={handleStatus}
      className={cn(
        Backgrounds[status],
        "flex flex-col gap-4 items-center justify-center w-full h-full"
      )}
    >
      {status === "IDLE" && <IdleScreen />}
      {status === "WAITING" && <WaitingScreen />}
      {status === "CLICKING" && <ClickingScreen />}
      {status === "RUSHED" && <RushedScreen />}
      {status === "RESULTS" && <ResultsScreen time={finalTime} />}
    </section>
  );
};
