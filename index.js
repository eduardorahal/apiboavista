import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

import { pessoas } from "./routes/pessoas/pessoas.js";
import { veiculos } from "./routes/veiculos/veiculos.js";
import { empresas } from "./routes/empresas/empresas.js";
import { socios } from "./routes/socios/socios.js";
import { detentos } from "./routes/detentos/cpf.js";
import { visitantes } from "./routes/visitantes/cpf.js";

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
  });


  app.get("/pessoas/:cpftel", async (req, res) => {
    const response = await pessoas(req, res);
});

app.get("/veiculos/:cpfcnpj", async (req, res) => {
    const response = await veiculos(req, res);
});

app.get("/empresas/:cpfcnpj", async (req, res) => {
  const response = await empresas(req, res);
});

app.get("/socios/:cpfcnpj", async (req, res) => {
  const response = await socios(req, res);
});

app.get("/detentos/:cpf", async (req, res) => {
  const response = await detentos(req, res);
});

app.get("/visitantes/:cpf", async (req, res) => {
  const response = await visitantes(req, res);
});
