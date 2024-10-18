const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UsuarioModel = require('../models/usuarioModel');

const AuthController = {
    register: async (req, res) => {
        try {
            const { nome, email, senha, tipo } = req.body;
            const usuarioExistente = await UsuarioModel.getByEmail(email);
            if (usuarioExistente) {
                return res.status(400).json({ error: 'Email já registrado' });
            }

            const novoUsuario = await UsuarioModel.create({ nome, email, senha, tipo });
            res.status(201).json(novoUsuario);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao registrar usuário' });
        }
    },

    login: async (req, res) => {
        try {
            const { email, senha } = req.body;
            const usuario = await UsuarioModel.getByEmail(email);

            if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
                return res.status(400).json({ error: 'Credenciais inválidas' });
            }
            delete usuario.senha
            const token = jwt.sign({ id: usuario.id_usuario, email: usuario.email }, process.env.JWT_SECRET, {
                expiresIn: '12h'
            });

            res.status(200).json({ usuario, token });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao fazer login' });
        }
    }
};

module.exports = AuthController;
