import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({res: "ok"})
});

app.listen(3000, () => {
  console.log("server listening...");
});

export default app