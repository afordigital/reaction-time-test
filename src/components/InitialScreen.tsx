import { useEffect, useRef, useState } from "react";
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
  const finalTime = userTime.current.end - userTime.current.start;

  const handleStatus = () => {
    switch (status) {
      case "IDLE":
        setStatus("WAITING");
        break;

      case "WAITING":
        setStatus("RUSHED");
        break;

      case "RUSHED":
        setStatus("WAITING");
        break;

      case "CLICKING":
        userTime.current.end = performance.now();
        setStatus("RESULTS");
        break;

      case "RESULTS":
        userTime.current.start = 0;
        userTime.current.end = 0;
        setStatus("WAITING");
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    const randomTime = Math.floor(Math.random() * 3000);
    if (status !== "RESULTS") {
      const timeoutId = setTimeout(() => {
        setStatus((current) => (current === "RUSHED" ? "RUSHED" : "CLICKING"));
      }, randomTime + 1000);
      return () => clearInterval(timeoutId);
    }
  }, [status]);

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
