const ModuloModel = require('../models/moduloModel');

const ModuloController = {
    getAllModulos: async (req, res) => {
        try {
            const modulos = await ModuloModel.getAll();
            res.status(200).json(modulos);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar módulos' });
        }
    },

    getModuloById: async (req, res) => {
        try {
            const modulo = await ModuloModel.getById(req.params.id);
            if (!modulo) {
                return res.status(404).json({ error: 'Módulo não encontrado' });
            }
            res.status(200).json(modulo);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar módulo' });
        }
    },

    getModulosByCursoId: async (req, res) => {
        try {
            const modulos = await ModuloModel.getByCursoId(req.params.id_curso);
            if (modulos.length === 0) {
                return res.status(404).json({ error: 'Nenhum módulo encontrado para este curso' });
            }
            res.status(200).json(modulos);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar módulos do curso' });
        }
    },

    createModulo: async (req, res) => {
        try {
            const novoModulo = await ModuloModel.create(req.body);
            res.status(201).json(novoModulo);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar módulo' });
        }
    },

    updateModulo: async (req, res) => {
        try {
            const moduloAtualizado = await ModuloModel.update(req.params.id, req.body);
            if (!moduloAtualizado) {
                return res.status(404).json({ error: 'Módulo não encontrado' });
            }
            res.status(200).json(moduloAtualizado);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar módulo' });
        }
    },

    deleteModulo: async (req, res) => {
        try {
            const moduloDeletado = await ModuloModel.delete(req.params.id);
            if (!moduloDeletado) {
                return res.status(404).json({ error: 'Módulo não encontrado' });
            }
            res.status(200).json({ message: 'Módulo deletado com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar módulo' });
        }
    }
};

module.exports = ModuloController;
