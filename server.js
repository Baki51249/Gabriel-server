const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { Manifestacao } = require("./manifestacaoSchema");
const port = 9000;

// Configuração para servir arquivos estáticos
app.use(express.static('public'));

// Outras configurações do seu servidor

app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log("Servidor aberto na porta " + port);
});

app.get("/", (req, res) => {
  res.sendFile('public/index.html', { root: __dirname });
});

app.post("/", (req, res) => {
  console.log(req.body)
  const { nome, telefone, endereco, descricao, foto } = req.body;
  insertManifestacao(nome, telefone, endereco, descricao, foto);
  res.send(`<h1> Obrigado pela manifestação, ${req.body.nome}!</h1>`)
});

app.get("/manifestacao", async (req, res) => {
  const manifestacao = await getManifestacao();
  var ul = "";
  manifestacao.forEach(manifestacao => {
    ul = ul + `<li><h2>${manifestacao.nome}</h2><h3>${manifestacao.telefone}</h3><h3>${manifestacao.endereco}</h3><h3>${manifestacao.descricao}</h3></li>`
  });
  res.send(`<ul>${ul}</Ul>`);
});

mongoose.connect("mongodb+srv://turma0046pmi:jhHSdqqtzCaqOAc5@clusterturma0046.yamifru.mongodb.net/?retryWrites=true&w=majority");

// Restante do seu código
