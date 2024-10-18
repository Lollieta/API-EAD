const pool = require('../config/database');
const bcrypt = require('bcrypt');

const UsuarioModel = {
    create: async (usuario) => {
        const { nome, email, senha, tipo } = usuario;
        const hashedPassword = await bcrypt.hash(senha, 10);
        const res = await pool.query(
            'INSERT INTO Usuario (Nome, Email, Senha, Tipo) VALUES ($1, $2, $3, $4) RETURNING *',
            [nome, email, hashedPassword, tipo]
        );
        return res.rows[0];
    },

    getByEmail: async (email) => {
        const res = await pool.query('SELECT * FROM Usuario WHERE Email = $1', [email]);
        return res.rows[0];
    },

    getAll: async () => {
        const res = await pool.query('SELECT * FROM Usuario');
        return res.rows;
    },

    getById: async (id) => {
        const res = await pool.query('SELECT * FROM Usuario WHERE ID_Usuario = $1', [id]);
        return res.rows[0];
    },

    update: async (id, usuario) => {
        const { nome, email, senha, tipo } = usuario;
        const res = await pool.query(
            'UPDATE Usuario SET Nome = $1, Email = $2, Senha = $3, Tipo = $4 WHERE ID_Usuario = $5 RETURNING *',
            [nome, email, senha, tipo, id]
        );
        return res.rows[0];
    },

    delete: async (id) => {
        const res = await pool.query('DELETE FROM Usuario WHERE ID_Usuario = $1 RETURNING *', [id]);
        return res.rows[0];
    }
};

module.exports = UsuarioModel;
