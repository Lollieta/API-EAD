const pool = require('../config/database');

const LicaoModel = {
    getAllByModuloId: async (idModulo) => {
        const res = await pool.query('SELECT * FROM Licao WHERE ID_Modulo = $1', [idModulo]);
        return res.rows;
    },

    getById: async (id) => {
        const res = await pool.query('SELECT * FROM Licao WHERE ID_Licao = $1', [id]);
        return res.rows[0];
    },

    create: async (licao) => {
        const { titulo, tipo, conteudo, id_modulo } = licao;
        const res = await pool.query(
            'INSERT INTO Licao (Titulo, Tipo, Conteudo, ID_Modulo) VALUES ($1, $2, $3, $4) RETURNING *',
            [titulo, tipo, conteudo, id_modulo]
        );
        return res.rows[0];
    },

    update: async (id, licao) => {
        const { titulo, tipo, conteudo } = licao;
        const res = await pool.query(
            'UPDATE Licao SET Titulo = $1, Tipo = $2, Conteudo = $3 WHERE ID_Licao = $4 RETURNING *',
            [titulo, tipo, conteudo, id]
        );
        return res.rows[0];
    },

    delete: async (id) => {
        const res = await pool.query('DELETE FROM Licao WHERE ID_Licao = $1 RETURNING *', [id]);
        return res.rows[0];
    }
};

module.exports = LicaoModel;
