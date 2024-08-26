import express from "express";
import cors from "cors";
import routes from "./src/routes/index.js";

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use(routes());

// Error handling
app.use((error, req, res) => {
  res.status(500).send({ message: 'Internal server error' });
});

app.listen(3000, () => {
  console.log("server listening...");
});

export default app;
