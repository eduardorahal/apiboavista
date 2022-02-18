import express from 'express';
const app = express();
const port = process.env.PORT || 3000;

import { veiculosPorCPF } from "./routes/veiculos/cpf/cpf.js";
import { veiculosPorCNPJ } from "./routes/veiculos/cnpj/cnpj.js";
import { empresasPorCPF } from "./routes/empresas/cpf/cpf.js";
import { empresasPorCNPJ } from "./routes/empresas/cnpj/cnpj.js";
import { sociosPorCPF } from "./routes/socios/cpf/cpf.js";
import { sociosPorCNPJ } from "./routes/socios/cnpj/cnpj.js";
import { detentosPorCPF } from "./routes/detentos/cpf/cpf.js";
import { visitantesPorCPF } from "./routes/visitantes/cpf/cpf.js";

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
  });


app.get("/veiculos/cpf/:cpf", async (req, res) => {
    const response = await veiculosPorCPF(req, res);
});

app.get("/veiculos/cnpj/:cnpj", async (req, res) => {
  const response = await veiculosPorCNPJ(req, res);
});

app.get("/empresas/cpf/:cpf", async (req, res) => {
  const response = await empresasPorCPF(req, res);
});

app.get("/empresas/cnpj/:cnpj", async (req, res) => {
const response = await empresasPorCNPJ(req, res);
});

app.get("/socios/cpf/:cpf", async (req, res) => {
  const response = await sociosPorCPF(req, res);
});

app.get("/socios/cnpj/:cnpj", async (req, res) => {
const response = await sociosPorCNPJ(req, res);
});

app.get("/detentos/cpf/:cpf", async (req, res) => {
  const response = await detentosPorCPF(req, res);
});

app.get("/visitantes/cpf/:cpf", async (req, res) => {
  const response = await visitantesPorCPF(req, res);
});