const pool = require('../config/database');

const ModuloModel = {
    getAll: async () => {
        const res = await pool.query('SELECT * FROM Modulo');
        return res.rows;
    },

    getById: async (id) => {
        const res = await pool.query('SELECT * FROM Modulo WHERE ID_Modulo = $1', [id]);
        return res.rows[0];
    },

    getByCursoId: async (id_curso) => {
        const res = await pool.query('SELECT * FROM Modulo WHERE ID_Curso = $1', [id_curso]);
        return res.rows;
    },

    create: async (modulo) => {
        const { titulo, descricao, id_curso } = modulo;
        const res = await pool.query(
            'INSERT INTO Modulo (Titulo, Descricao, ID_Curso) VALUES ($1, $2, $3) RETURNING *',
            [titulo, descricao, id_curso]
        );
        return res.rows[0];
    },

    update: async (id, modulo) => {
        const { titulo, descricao, id_curso } = modulo;
        const res = await pool.query(
            'UPDATE Modulo SET Titulo = $1, Descricao = $2, ID_Curso = $3 WHERE ID_Modulo = $4 RETURNING *',
            [titulo, descricao, id_curso, id]
        );
        return res.rows[0];
    },

    delete: async (id) => {
        const res = await pool.query('DELETE FROM Modulo WHERE ID_Modulo = $1 RETURNING *', [id]);
        return res.rows[0];
    }
};

module.exports = ModuloModel;
