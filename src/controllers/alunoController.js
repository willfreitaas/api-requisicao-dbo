const { alunoModel } = require('../models/alunoModel');

const alunoController = {
    listarAluno: async (req, res) => {
            try {
                let alunos = await alunoModel.findAll();
                return res.send(200).json(alunos);
            } catch (error) {
                console.error(`Erro ao listar alunos`, error)
                return res.status(500).json({message: "Erro ao listar alunos"});
            }

            
        },
    criarAluno: (req, res) => {
            res.send(`Aluno criado`);
        },
    atualizarAluno: (req, res) => {
            const {ID_Aluno} = req.params;
            res.send(`Aluno ${ID_Aluno} atualizado`);
        },
    deletarAluno: (req, res) => {
            const {ID_Aluno} = req.params;
            res.send(`Aluno ${ID_Aluno} deletado`);
        }
};

module.exports = {alunoController};