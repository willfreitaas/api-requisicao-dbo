const { alunoModel } = require('../models/alunoModel');
const { Op, where } = require('sequelize')
const { parseDateBd} = require('../utils/dateUtils');

const alunoController = {
    listarAluno: async (req, res) => {
            try {
                let {nomeAluno} = req.query;

                let conditions = {};

                if (ID_Aluno) {
                    conditions.ID_Aluno = ID_Aluno;
                }

                if (nomeAluno) {
                    conditions.nomeAluno = nomeAluno;
                }

                let alunos = await alunoModel.findAll({
                    where: conditions
                });

                //map percorre a array e gera uma nova aplicando o mapeamento para cara dado contido na array
                aluno = alunos.map(aluno => {
                    aluno.dataNascimentoAluno = parseDateBd(aluno.dataNascimentoAluno);
                    return aluno;
                })

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
                
                let consultaAluno = await alunoModel.findOne({where: {[Op.or]: [{cpfAluno}, {emailAluno}]}});
                if(consultaAluno){
                    return res.status(409).json({message: "Email ou cpf já cadastrado"});
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
    deletarAluno: async (req, res) => {

            try {
                const {ID_Aluno} = req.params;
    
                let aluno = await alunoModel.findByPk(ID_Aluno);
                if(!aluno){
                        return res.status(404).json({message: "Aluno não encontrado!"});
                    }
    
                let nomeAluno = aluno.nomeAluno;
    
                let result = await alunoModel.destroy({where: {ID_Aluno}});
                
                if (result > 0) {
                    res.status(200).json({message: `Aluno ${nomeAluno} foi de comes e bebes`})
                }else{
                    res.status(404).json({message: `Erro ao excluir aluno ${nomeAluno}`});
                }
                
            } catch (error) {
                console.error("Erro ao excluir aluno", error)
                return res.error(500).json({message: "Erro ao excluir aluno!"});
            }
        }
};

module.exports = {alunoController};