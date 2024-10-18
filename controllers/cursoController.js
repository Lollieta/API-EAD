const CursoModel = require('../models/cursoModel');

const CursoController = {
    getAllCursos: async (req, res) => {
        try {
            const cursos = await CursoModel.getAll();
            res.status(200).json(cursos);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar cursos' });
        }
    },

    getCursoById: async (req, res) => {
        try {
            const curso = await CursoModel.getById(req.params.id);
            if (!curso) {
                return res.status(404).json({ error: 'Curso não encontrado' });
            }
            res.status(200).json(curso);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar curso' });
        }
    },

    createCurso: async (req, res) => {
        try {
            const novoCurso = await CursoModel.create(req.body);
            res.status(201).json(novoCurso);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar curso' });
        }
    },

    updateCurso: async (req, res) => {
        try {
            const cursoAtualizado = await CursoModel.update(req.params.id, req.body);
            if (!cursoAtualizado) {
                return res.status(404).json({ error: 'Curso não encontrado' });
            }
            res.status(200).json(cursoAtualizado);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar curso' });
        }
    },

    deleteCurso: async (req, res) => {
        try {
            const cursoDeletado = await CursoModel.delete(req.params.id);
            if (!cursoDeletado) {
                return res.status(404).json({ error: 'Curso não encontrado' });
            }
            res.status(200).json({ message: 'Curso deletado com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar curso' });
        }
    }
};

module.exports = CursoController;
