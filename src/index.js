import express from "express";
import bcrypt from "bcrypt";

const app = express();

app.use(express.json());

let pessoas = [];


app.post("/login", (req, res) => {
  const login = req.body
  const id = login.id;
  const senha = login.senha;

  const index = pessoas.find(p=> p.id === id);

  if(!index) {
      return res.status(402).json("Por favor, digite um id valido");
  }

  bcrypt.compare(senha, index.senha, function(err, result) {
    console.log(result)
    console.log(senha) 
    console.log(index.senha)
      if(result){
          return res.status(200).json("Usuario valido");
      } else {
          return res.status(406).json("Usuario invalido");
      }
  });
});

// Aqui estou fazendo a criação de um usuário, usando o método Math() para gerar ID aleatórios sem decimais
app.post("/cadastro", (req, res) => {
  const pessoa = req.body;

  const saltRounds = 8;

  const validarEmail = pessoas.find((p) => p.email === pessoa.email);
  if (validarEmail) {
    return res.status(406).json("Email já cadastrado");
  }

  const vSenha = /^(?=.*[a-zA-Z])[0-9a-zA-Z]{1,8}$/;
  if (!vSenha.test(req.body.senha)) {
    return res.status(406).json("Senha inválida");
  }

  bcrypt.hash(pessoa.senha, saltRounds, function (err, hash) {
    if (hash) {
      pessoas.push({
        id: Math.floor(Math.random() * 5050),
        email: pessoa.email,
        senha: hash,
        recado: (pessoa.recado = []),
      });
    } else {
      return err.status(401).json("Senha inválida" + err);
    }
  });

  console.log(pessoas);
  res.status(204).json(pessoas);
});

// Aqui usei post para poder registrar recados após login
app.post("/cadastro/:id", (req, res) => {
  const pessoa = req.body;
  const id = Number(req.params.id);
  const indexPessoa = pessoas.findIndex((pessoa) => pessoa.id === id);

  // Valida se existe pessoa cadastrada
  if (indexPessoa === -1) {
    return res.status(406).json("ID não cadastrado");
  }

  pessoas[indexPessoa].recado.push({
    id: Math.floor(Math.random() * 5050),
    titulo: pessoa.titulo,
    descricao: pessoa.descricao,
  });

  console.log(pessoas);
  res.send("Recado inserido com sucesso");
});

app.get("/pessoas", (req, res) => {
  const pessoasComRecados = pessoas.map((pessoa) => {
    return {
      ...pessoa,
      recado: pessoa.recado,
    };
  });
  res.send(pessoasComRecados);
});

app.listen(8081, () => {
  console.log("Servidor Aberto");
});
