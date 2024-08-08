import { useEffect, useState } from "react";
import { type Status } from "../components/InitialScreen";


const useStatusHook = (time: number) => {
  const [status, setStatus] = useState<Status>("IDLE");

  useEffect(() => {
    const randomTime = Math.floor(Math.random() * time);
    if (status !== "RESULTS") {
      const timeoutId = setTimeout(() => {
        setStatus((current) => (current === "RUSHED" ? "RUSHED" : "CLICKING"));
      }, randomTime + 1000);
      return () => clearInterval(timeoutId);
    }
  }, [status, time]);


  return { status, setStatus }
}

export default useStatusHook