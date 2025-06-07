const express = require('express');
const router = express.Router();

const {alunoController} = require('../controllers/alunoController');

//Rotas 
router.get("/", alunoController.listarAluno); //Rota responsavel por listagem dos alunos

router.post("/", alunoController.criarAluno); //Rota responsavel pela criacao dos alunos

router.put("/:ID_Aluno", alunoController.atualizarAluno); //Rota responsavel pela atualizacao de um aluno

router.delete("/:ID_Aluno", alunoController.deletarAluno); //Rota responsavel pela exclusao de um aluno


module.exports = { rotasAlunos: router};