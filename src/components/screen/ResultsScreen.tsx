type ResultsScreenProps = {
  time: number;
};

export const ResultsScreen = ({ time }: ResultsScreenProps) => {
  return (
    <>
      <h1 className="text-7xl font-semibold">{Math.round(time)} ms</h1>
      <h2 className="text-4xl">Click to keep going</h2>
    </>
  );
};
