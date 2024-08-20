import express from "express";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(express.json());

const supabase = createClient(process.env.PROJECT_URL, process.env.API_KEY);

// get users
app.get("/", async (req, res) => {
  const users = await supabase
    .from("users")
    .select()
    .order("score", { ascending: true })
    .limit(10);
  res.status(200).send({ data: users.data });
});

// update user

app.listen(3000, () => {
  console.log("server listening...");
});

export default app;
