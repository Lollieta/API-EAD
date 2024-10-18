const pool = require('../config/database');

const CursoModel = {
    getAll: async () => {
        const res = await pool.query('SELECT * FROM Curso');
        return res.rows;
    },

    getById: async (id) => {
        const res = await pool.query('SELECT * FROM Curso WHERE ID_Curso = $1', [id]);
        return res.rows[0];
    },

    create: async (curso) => {
        const { titulo, descricao, id_instrutor } = curso;
        const res = await pool.query(
            'INSERT INTO Curso (Titulo, Descricao, ID_Instrutor) VALUES ($1, $2, $3) RETURNING *',
            [titulo, descricao, id_instrutor]
        );
        return res.rows[0];
    },

    update: async (id, curso) => {
        const { titulo, descricao, id_instrutor } = curso;
        const res = await pool.query(
            'UPDATE Curso SET Titulo = $1, Descricao = $2, ID_Instrutor = $3 WHERE ID_Curso = $4 RETURNING *',
            [titulo, descricao, id_instrutor, id]
        );
        return res.rows[0];
    },

    delete: async (id) => {
        const res = await pool.query('DELETE FROM Curso WHERE ID_Curso = $1 RETURNING *', [id]);
        return res.rows[0];
    }
};

module.exports = CursoModel;
