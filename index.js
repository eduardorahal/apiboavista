import express from 'express';
const app = express();
const PORT = process.env.port || 3000;

import { pesquisaCPF } from "./routes/cpf.js";

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
  });


app.get("/cpf/:cpf", async (req, res) => {
    const response = await pesquisaCPF(req, res);
})

