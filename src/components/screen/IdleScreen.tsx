import { cn } from "../../common/utils";

export const IdleScreen = () => {
  return (
    <div>
      <img
        src="/images/hamster.png"
        className={cn(
          "hover:rotate-[8deg] transition ease-in-out",
          "absolute top-[180px] right-[600px]"
        )}
      />
      <div className="relative bg-[#3783CA]">
        <h1 className=" text-center text-7xl font-semibold">
          Reaction Time Test
        </h1>
        <div className="flex flex-col text-center">
          <p className="text-3xl">
            When the red box turns green, click as quickly as you can.
          </p>
          <p className="text-3xl">Click anyway to start</p>
        </div>
      </div>
    </div>
  );
};
