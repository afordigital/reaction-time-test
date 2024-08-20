type ResultsScreenProps = {
  time: number;
  onRestart: () => void;
  onLeaderboard: () => void;
};

export const ResultsScreen = ({
  time,
  onRestart,
  onLeaderboard,
}: ResultsScreenProps) => {
  return (
    <>
      <h1 className="font-semibold text-7xl">{Math.round(time)} ms</h1>
      <h2 className="text-4xl">Click restart to keep going</h2>
      <div className="flex gap-4">
        <button
          onClick={onRestart}
          className="text-2xl self-center bg-[#042e55] hover:bg-[#073a6a] px-16 py-4 rounded-lg"
        >
          Restart
        </button>
        <button
          onClick={onLeaderboard}
          className="text-2xl self-center bg-[#042e55] hover:bg-[#073a6a] px-16 py-4 rounded-lg"
        >
          Leaderboard
        </button>
      </div>
    </>
  );
};
