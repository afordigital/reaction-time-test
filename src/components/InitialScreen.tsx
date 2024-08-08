import { useRef } from "react";
import { cn } from "../common/utils";
import {
  IdleScreen,
  WaitingScreen,
  ClickingScreen,
  RushedScreen,
  ResultsScreen,
} from "./screen";
import useStatusHook from "../hooks/useStatusHook";

export type Status = "IDLE" | "WAITING" | "CLICKING" | "RUSHED" | "RESULTS";

const Backgrounds = {
  IDLE: "bg-[#3783CA]",
  WAITING: "bg-[#ce8c1b]",
  CLICKING: "bg-[#3bab63]",
  RUSHED: "bg-[#b01d13]",
  RESULTS: "bg-[#3783CA]",
} as const satisfies Record<Status, string>;

export const InitialScreen = () => {
  const userTime = useRef({ start: 0, end: 0 });
  const finalTime = userTime.current.end - userTime.current.start;

  const { status, setStatus } = useStatusHook(2000);

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
