const pool = require('../config/database');

const TesteModel = {
    getAll: async () => {
        const res = await pool.query('SELECT * FROM Teste');
        return res.rows;
    },

    getById: async (id) => {
        const testeRes = await pool.query('SELECT * FROM Teste WHERE ID_Teste = $1', [id]);
        const teste = testeRes.rows[0];

        if (!teste) {
            return null;
        }

        const perguntasRes = await pool.query('SELECT * FROM Pergunta WHERE ID_Teste = $1', [id]);
        const perguntas = perguntasRes.rows;

        for (let pergunta of perguntas) {
            const opcoesRes = await pool.query('SELECT * FROM Opcao WHERE ID_Pergunta = $1', [pergunta.id_pergunta]);
            pergunta.opcoes = opcoesRes.rows;
        }

        return {
            ...teste,
            perguntas: perguntas
        };
    },

    create: async (teste) => {
        const { titulo, descricao, id_curso } = teste;
        const res = await pool.query(
            'INSERT INTO Teste (Titulo, Descricao, ID_Curso) VALUES ($1, $2, $3) RETURNING *',
            [titulo, descricao, id_curso]
        );
        return res.rows[0];
    },

    update: async (id, teste) => {
        const { titulo, descricao } = teste;
        const res = await pool.query(
            'UPDATE Teste SET Titulo = $1, Descricao = $2 WHERE ID_Teste = $3 RETURNING *',
            [titulo, descricao, id]
        );
        return res.rows[0];
    },

    delete: async (id) => {
        const res = await pool.query('DELETE FROM Teste WHERE ID_Teste = $1 RETURNING *', [id]);
        return res.rows[0];
    },

    getPerguntasByTesteId: async (idTeste) => {
        const res = await pool.query('SELECT * FROM Pergunta WHERE ID_Teste = $1', [idTeste]);
        return res.rows;
    },

    createPergunta: async (idTeste, pergunta) => {
        const { texto } = pergunta;
        const res = await pool.query(
            'INSERT INTO Pergunta (Texto, ID_Teste) VALUES ($1, $2) RETURNING *',
            [texto, idTeste]
        );
        return res.rows[0];
    },

    createOpcao: async (idPergunta, opcao) => {
        const { texto, correta } = opcao;
        const res = await pool.query(
            'INSERT INTO Opcao (Texto, Correta, ID_Pergunta) VALUES ($1, $2, $3) RETURNING *',
            [texto, correta, idPergunta]
        );
        return res.rows[0];
    },

    createResposta: async (idPergunta, resposta) => {
        const { id_opcao, id_usuario } = resposta;
        const res = await pool.query(
            'INSERT INTO Resposta (ID_Pergunta, ID_Opcao, ID_Usuario) VALUES ($1, $2, $3) RETURNING *',
            [idPergunta, id_opcao, id_usuario]
        );
        return res.rows[0];
    },
};

module.exports = TesteModel;
