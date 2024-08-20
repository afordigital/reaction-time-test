import { leapfrog } from "ldrs";

leapfrog.register();

export const WaitingScreen = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <l-leapfrog size="80" speed="2.5" color="white"></l-leapfrog>
      <h1 className="text-5xl font-semibold">Waiting for green</h1>
    </div>
  );
};
