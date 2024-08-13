import { MutableRefObject, useEffect, useState } from "react";
import { type Status } from "../components/InitialScreen";

type Props = {
  time?: number;
  timeoutId: MutableRefObject<ReturnType<typeof setTimeout> | null>;
  userTime: React.MutableRefObject<{
    start: number;
    end: number;
  }>;
};

const useStatusHook = ({ time = 1000, timeoutId, userTime }: Props) => {
  const [status, setStatus] = useState<Status>("IDLE");

  useEffect(() => {
    if (status === "IDLE") return;
    const randomTime = Math.floor(Math.random() * 3000) + time;
    timeoutId.current = setTimeout(() => {
      setStatus((current) => (current === "RUSHED" ? "RUSHED" : "CLICKING"));
      userTime.current.start = performance.now();
    }, randomTime);
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [status, timeoutId, time, userTime]);

  return { status, setStatus };
};

export default useStatusHook;
