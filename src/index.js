import express from "express";
import bcrypt from "bcrypt";

const app = express();

app.use(express.json());

let pessoas = [];

const validaIdPessoa = (req, res, next) => {
  const id  = req.params.id;
  const pessoa = pessoas.findIndex((p) => p.id === Number(id));
  console.log(pessoa)
  if (pessoa === -1) {
      return res.status(404).json("Pessoa não encontrada");
  } else{
    next();
  }

}

//Inicio do CRUD

app.post("/login", (req, res) => {
  const login = req.body
  const id = login.id;
  const senha = login.senha;

  const idPessoa = pessoas.find(p=> p.id === id);

  if(!idPessoa) {
      return res.status(402).json("Por favor, digite um id valido");
  }

  bcrypt.compare(senha, idPessoa.senha, function(err, result) {
    
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

  res.status(204).json(pessoas);
});

// Aqui usei post para poder registrar recados após login
app.post("/cadastro/:id", validaIdPessoa,(req, res) => {
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
      ...pessoa   
    };
  });
  res.send(pessoasComRecados);
});

app.get("/pessoas/:id", validaIdPessoa, (req, res) => {
  const recadoDaPessoa = pessoas.map((pessoa) => {
    return {
      recado: pessoa.recado.map((recado) => {
        return {
        ...recado,
        };
      }),
    };
  })
  res.send(recadoDaPessoa); 
});
app.listen(8081, () => {
  console.log("Servidor Aberto");
});
