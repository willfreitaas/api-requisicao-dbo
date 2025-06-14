const { alunoModel } = require('../models/alunoModel');
const { Op } = require('sequelize')

const alunoController = {
    listarAluno: async (req, res) => {
            try {
                let alunos = await alunoModel.findAll();
                return res.status(200).json(alunos);
            } catch (error) {
                console.error(`Erro ao listar alunos`, error)
                return res.status(500).json({message: "Erro ao listar alunos"});
            }

            
        },
    criarAluno: async (req, res) => {


            try {
                const {nomeAluno, cpfAluno, dataNascimentoAluno, emailAluno, telefoneAluno, enderecoAluno} = req.body;

                //Validação para que os campos obrigatorios sejam preenchidos
                if (!nomeAluno || !cpfAluno || !dataNascimentoAluno || !emailAluno){
                    return res.status(400).json({message: "Campos obrigatórios não preenchidos"});
                }
                    
               
                let aluno = await alunoModel.findOne({where: {[Op.or]: [{cpfAluno}, {emailAluno}]}});
                if(aluno){
                    return res.status(409).json({message: "Aluno já cadastrado"});
                }

                await alunoModel.create({nomeAluno, cpfAluno, dataNascimentoAluno, emailAluno, telefoneAluno, enderecoAluno});
                return res.status(201).json({message: "Aluno cadastrado com sucesso"});

            } catch (error) {
                console.error("Erro ao cadastrar aluno: ", error);
                return res.status(500).json({message: "Erro cadastrar aluno"});
            }
        },
    atualizarAluno: async (req, res) => {
            try {
                const {ID_Aluno} = req.params;
                const {nomeAluno, cpfAluno, dataNascimentoAluno, emailAluno, telefoneAluno, enderecoAluno} = req.body;
    
                let aluno = await alunoModel.findByPk(ID_Aluno);
                if(!aluno){
                    return res.status(404).json({message: "Aluno não encontrado!"});
                }
                let dadosAtualizados = {nomeAluno, cpfAluno, dataNascimentoAluno, emailAluno, telefoneAluno, enderecoAluno};
    
                await alunoModel.update(dadosAtualizados, {where:{ID_Aluno}});
    
                aluno = await alunoModel.findByPk(ID_Aluno);
                return res.status(200).json({message: "Aluno atualizado com sucesso!", Aluno: aluno});
                
            } catch (error) {
                console.error("Erro ao atualizar aluno", error)
                return res.error(500).json({message: "Erro ao atualizar!"});
            }

        },
    deletarAluno: (req, res) => {
            const {ID_Aluno} = req.params;
            res.send(`Aluno ${ID_Aluno} deletado`);
        }
};

module.exports = {alunoController};