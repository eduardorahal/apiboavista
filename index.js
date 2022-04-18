import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

import { veiculos } from "./routes/veiculos/veiculos.js";
import { empresas } from "./routes/empresas/empresas.js";
import { sociosPorCPF } from "./routes/socios/cpf/cpf.js";
import { sociosPorCNPJ } from "./routes/socios/cnpj/cnpj.js";
import { detentos } from "./routes/detentos/cpf.js";
import { visitantes } from "./routes/visitantes/cpf.js";

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
  });


app.get("/veiculos/:cpfcnpj", async (req, res) => {
    const response = await veiculos(req, res);
});

app.get("/empresas/:cpfcnpj", async (req, res) => {
  const response = await empresas(req, res);
});

app.get("/socios/cpf/:cpf", async (req, res) => {
  const response = await sociosPorCPF(req, res);
});

app.get("/socios/cnpj/:cnpj", async (req, res) => {
const response = await sociosPorCNPJ(req, res);
});

app.get("/detentos/:cpf", async (req, res) => {
  const response = await detentos(req, res);
});

app.get("/visitantes/:cpf", async (req, res) => {
  const response = await visitantes(req, res);
});