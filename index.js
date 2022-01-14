import express from 'express';
const app = express();
const port = process.env.PORT || 3000;

import { pesquisaCPF } from "./routes/cpf/cpf.js";

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
  });


app.get("/cpf/:cpf", async (req, res) => {
    const response = await pesquisaCPF(req, res);
})

