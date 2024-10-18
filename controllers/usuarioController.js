const UsuarioModel = require('../models/usuarioModel');

const UsuarioController = {
    getAllUsuarios: async (req, res) => {
        try {
            const usuarios = await UsuarioModel.getAll();
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar usuários' });
        }
    },

    getUsuarioById: async (req, res) => {
        try {
            const usuario = await UsuarioModel.getById(req.params.id);
            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            res.status(200).json(usuario);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar usuário' });
        }
    },

    createUsuario: async (req, res) => {
        try {
            const novoUsuario = await UsuarioModel.create(req.body);
            res.status(201).json(novoUsuario);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar usuário' });
        }
    },

    updateUsuario: async (req, res) => {
        try {
            const usuarioAtualizado = await UsuarioModel.update(req.params.id, req.body);
            if (!usuarioAtualizado) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            res.status(200).json(usuarioAtualizado);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar usuário' });
        }
    },

    deleteUsuario: async (req, res) => {
        try {
            const usuarioDeletado = await UsuarioModel.delete(req.params.id);
            if (!usuarioDeletado) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            res.status(200).json({ message: 'Usuário deletado com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar usuário' });
        }
    }
};

module.exports = UsuarioController;
