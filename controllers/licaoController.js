const LicaoModel = require('../models/licaoModel');

const LicaoController = {
    getAllByModuloId: async (req, res) => {
        try {
            const licoes = await LicaoModel.getAllByModuloId(req.params.id_modulo);
            res.status(200).json(licoes);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar lições' });
        }
    },

    getLicaoById: async (req, res) => {
        try {
            const licao = await LicaoModel.getById(req.params.id);
            if (!licao) {
                return res.status(404).json({ error: 'Lição não encontrada' });
            }
            res.status(200).json(licao);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar lição' });
        }
    },

    createLicao: async (req, res) => {
        try {
            const novaLicao = await LicaoModel.create(req.body);
            res.status(201).json(novaLicao);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar lição' });
        }
    },

    updateLicao: async (req, res) => {
        try {
            const licaoAtualizada = await LicaoModel.update(req.params.id, req.body);
            if (!licaoAtualizada) {
                return res.status(404).json({ error: 'Lição não encontrada' });
            }
            res.status(200).json(licaoAtualizada);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar lição' });
        }
    },

    deleteLicao: async (req, res) => {
        try {
            const licaoDeletada = await LicaoModel.delete(req.params.id);
            if (!licaoDeletada) {
                return res.status(404).json({ error: 'Lição não encontrada' });
            }
            res.status(200).json({ message: 'Lição deletada com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar lição' });
        }
    }
};

module.exports = LicaoController;
