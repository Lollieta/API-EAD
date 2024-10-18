const pool = require('./database');

const initDb = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS Usuario (
                ID_Usuario SERIAL PRIMARY KEY,
                Nome VARCHAR(100) NOT NULL,
                Email VARCHAR(100) UNIQUE NOT NULL,
                Senha VARCHAR(100) NOT NULL,
                Tipo VARCHAR(50),
                Data_Cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Curso (
                ID_Curso SERIAL PRIMARY KEY,
                Titulo VARCHAR(100) NOT NULL,
                Descricao TEXT,
                ID_Instrutor INT REFERENCES Usuario(ID_Usuario),
                Data_Cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Modulo (
                ID_Modulo SERIAL PRIMARY KEY,
                Titulo VARCHAR(100) NOT NULL,
                Descricao TEXT,
                ID_Curso INT REFERENCES Curso(ID_Curso)
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Licao (
                ID_Licao SERIAL PRIMARY KEY,
                Titulo VARCHAR(100) NOT NULL,
                Tipo VARCHAR(20) NOT NULL,
                Conteudo TEXT,
                ID_Modulo INT REFERENCES Modulo(ID_Modulo) ON DELETE CASCADE
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Teste (
                ID_Teste SERIAL PRIMARY KEY,
                Titulo VARCHAR(100) NOT NULL,
                Descricao TEXT,
                ID_Curso INT REFERENCES Curso(ID_Curso) ON DELETE CASCADE
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Pergunta (
                ID_Pergunta SERIAL PRIMARY KEY,
                Texto TEXT NOT NULL,
                ID_Teste INT REFERENCES Teste(ID_Teste) ON DELETE CASCADE
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Opcao (
                ID_Opcao SERIAL PRIMARY KEY,
                Texto TEXT NOT NULL,
                Correta BOOLEAN DEFAULT FALSE,
                ID_Pergunta INT REFERENCES Pergunta(ID_Pergunta) ON DELETE CASCADE
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Resposta (
                ID_Resposta SERIAL PRIMARY KEY,
                ID_Pergunta INT REFERENCES Pergunta(ID_Pergunta) ON DELETE CASCADE,
                ID_Opcao INT REFERENCES Opcao(ID_Opcao) ON DELETE CASCADE,
                ID_Usuario INT REFERENCES Usuario(ID_Usuario) ON DELETE CASCADE
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Forum (
                ID_Forum SERIAL PRIMARY KEY,
                Titulo VARCHAR(100) NOT NULL,
                Descricao TEXT,
                Conteudo TEXT,
                ID_Curso INT REFERENCES Curso(ID_Curso) ON DELETE CASCADE
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Mensagem (
                ID_Mensagem SERIAL PRIMARY KEY,
                Conteudo TEXT NOT NULL,
                Data_Publicacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                ID_Usuario INT REFERENCES Usuario(ID_Usuario) ON DELETE SET NULL,
                ID_Forum INT REFERENCES Forum(ID_Forum) ON DELETE CASCADE
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Certificado (
                ID_Certificado SERIAL PRIMARY KEY,
                Data_Emissao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                ID_Usuario INT REFERENCES Usuario(ID_Usuario) ON DELETE CASCADE,
                ID_Curso INT REFERENCES Curso(ID_Curso) ON DELETE CASCADE,
                Conteudo TEXT
            );
        `);

        console.log("Tabelas verificadas/criadas com sucesso!");
    } catch (error) {
        console.error("Erro ao inicializar o banco de dados:", error);
    }
};

module.exports = initDb;
