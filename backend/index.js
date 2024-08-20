import express from "express";
import { createClient } from "@supabase/supabase-js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

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
app.patch("/update/:id", async (req, res) => {
    
  await supabase.from("users").update({ id: req.params.id, score: req.body.score }).eq('name', req.body.name);
  res.status(200).send({ res: "ok" });
});

// insert user
app.post("/insert", async (req, res) => {
  await supabase.from("users").insert({ name: req.body.user, score: req.body.score });
  res.status(200).send({ res: "ok" });
});

app.listen(3000, () => {
  console.log("server listening...");
});

export default app;
