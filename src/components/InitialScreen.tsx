import { useEffect, useRef, useState } from "react";
import { cn } from "../common/utils";
import {
  IdleScreen,
  WaitingScreen,
  ClickingScreen,
  RushedScreen,
  ResultsScreen,
} from "./screen";
import useStatusHook from "../hook/useStatusHook";
import { createClient } from "@supabase/supabase-js";

export type Status = "IDLE" | "WAITING" | "CLICKING" | "RUSHED" | "RESULTS";

const Backgrounds = {
  IDLE: "bg-[#3783CA]",
  WAITING: "bg-[#ce8c1b]",
  CLICKING: "bg-[#3bab63]",
  RUSHED: "bg-[#b01d13]",
  RESULTS: "bg-[#3783CA]",
} as const satisfies Record<Status, string>;

const supabase = createClient(
  import.meta.env.VITE_PROJECT_URL,
  import.meta.env.VITE_API_KEY
);

const getUsersFromDB = async () => {
  const users = await supabase
    .from("users")
    .select()
    .order("score", { ascending: true })
    .limit(10);
  return users.data;
};

export type Leaderboard = {
  id: number;
  name: string;
  created_at: Date;
  score: number;
};

console.log("Si lees esto suscríbete");

export const InitialScreen = () => {
  const userTime = useRef({ start: 0, end: 0 });
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [user, setUser] = useState("");
  const [leaderboard, setLeaderboard] = useState<Leaderboard[] | null>(null);

  const finalTime = userTime.current.end - userTime.current.start;

  useEffect(() => {
    if (leaderboard) return;
    getUsersFromDB().then(setLeaderboard);
  }, [leaderboard]);

  useEffect(() => {
    const channel = supabase
      .channel("changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "users" },
        (payload: any) => {
          const doc = payload.new;
          setLeaderboard((prev) => {
            if (prev === null) return prev;

            const newLeader = structuredClone(prev);
            newLeader.push(doc);
            newLeader.sort((a, b) => a.score - b.score);

            if (newLeader.length > 10) {
              newLeader.pop();
            }

            return newLeader;
          });
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const { status, setStatus } = useStatusHook({
    timeoutId,
    userTime,
  });

  const handleStatus = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }

    switch (status) {
      case "WAITING":
        setStatus("RUSHED");
        break;
      case "RUSHED":
        setStatus("WAITING");
        break;
      case "CLICKING":
        userTime.current.end = performance.now();
        saveUserInDB();
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

  const startGame = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const usernameInput = form.elements.namedItem(
      "username"
    ) as HTMLInputElement;
    const username = usernameInput.value;

    setUser(username);
    setStatus("WAITING");
  };

  const saveUserInDB = async () => {
    const newFinalTime = userTime.current.end - userTime.current.start;
    await supabase.from("users").insert({ name: user, score: newFinalTime });
  };

  return (
    <section
      onClick={handleStatus}
      className={cn(
        Backgrounds[status],
        "flex flex-col gap-4 items-center justify-center w-full h-full"
      )}
    >
      {status === "IDLE" && (
        <IdleScreen startGame={startGame} leaderboard={leaderboard} />
      )}
      {status === "WAITING" && <WaitingScreen />}
      {status === "CLICKING" && <ClickingScreen />}
      {status === "RUSHED" && <RushedScreen />}
      {status === "RESULTS" && <ResultsScreen time={finalTime} />}
    </section>
  );
};
