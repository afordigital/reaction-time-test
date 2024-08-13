import { cn } from "../../common/utils";
import { Leaderboard } from "../InitialScreen";

export const IdleScreen = ({
  startGame,
  leaderboard,
}: {
  startGame: (event: React.FormEvent<HTMLFormElement>) => void;
  leaderboard: Leaderboard[] | null;
}) => {
  return (
    <div>
      <img
        src="/images/hamster.png"
        className={cn(
          "hover:rotate-[8deg] transition ease-in-out",
          "absolute top-[100px] right-[600px]"
        )}
      />
      <div className="relative bg-[#3783CA]">
        <h1 className="pb-6 font-semibold text-center text-7xl">
          Reaction Time{" "}
          <span className="inline-flex transition ease-in-out bg-[#042e55] p-2 transform -rotate-6 hover:-rotate-12">
            Test
          </span>
        </h1>
        <div className="flex flex-col gap-4 text-center">
          <div>
            <p className="text-3xl">
              When the red box turns green, click as quickly as you can.
            </p>
            <p className="text-3xl">Write your name to start</p>
          </div>
          <form
            onSubmit={startGame}
            className="flex self-center justify-center w-full max-w-2xl gap-4"
          >
            <input
              required
              name="username"
              className="flex text-lg self-center w-full max-w-xl p-4 text-black rounded-lg border-4 border-[#042e55]"
              placeholder="Enter your name..."
            />
            <button className="text-2xl self-center bg-[#042e55] hover:bg-[#073a6a] px-16 py-4 rounded-lg">
              Start
            </button>
          </form>
        </div>
        <ul>
          {leaderboard?.map((user) => {
            return (
              <li key={user.name} className="flex gap-4">
                <p>{user.name}</p>
                <p>{user.score}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
