const TesteModel = require('../models/testeModel');

const TesteController = {
    getAllTestes: async (req, res) => {
        try {
            const testes = await TesteModel.getAll();
            res.status(200).json(testes);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar testes' });
        }
    },

    getTesteById: async (req, res) => {
        try {
            const teste = await TesteModel.getById(req.params.id);
            if (!teste) {
                return res.status(404).json({ error: 'Teste não encontrado' });
            }
            res.status(200).json(teste);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar teste' });
        }
    },

    createTeste: async (req, res) => {
        try {
            const novoTeste = await TesteModel.create(req.body);
            res.status(201).json(novoTeste);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar teste' });
        }
    },

    updateTeste: async (req, res) => {
        try {
            const testeAtualizado = await TesteModel.update(req.params.id, req.body);
            if (!testeAtualizado) {
                return res.status(404).json({ error: 'Teste não encontrado' });
            }
            res.status(200).json(testeAtualizado);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar teste' });
        }
    },

    deleteTeste: async (req, res) => {
        try {
            const testeDeletado = await TesteModel.delete(req.params.id);
            if (!testeDeletado) {
                return res.status(404).json({ error: 'Teste não encontrado' });
            }
            res.status(200).json({ message: 'Teste deletado com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar teste' });
        }
    },

    getPerguntasByTesteId: async (req, res) => {
        try {
            const perguntas = await TesteModel.getPerguntasByTesteId(req.params.idTeste);
            res.status(200).json(perguntas);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar perguntas' });
        }
    },

    createPergunta: async (req, res) => {
        try {
            const novaPergunta = await TesteModel.createPergunta(req.params.idTeste, req.body);
            res.status(201).json(novaPergunta);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar pergunta' });
        }
    },

    createOpcao: async (req, res) => {
        try {
            const novaOpcao = await TesteModel.createOpcao(req.params.idPergunta, req.body);
            res.status(201).json(novaOpcao);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar opção' });
        }
    },

    createResposta: async (req, res) => {
        try {
            const novaResposta = await TesteModel.createResposta(req.params.idPergunta, req.body);
            res.status(201).json(novaResposta);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar resposta' });
        }
    },
};

module.exports = TesteController;
