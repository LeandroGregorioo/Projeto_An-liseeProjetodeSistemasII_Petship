// Testes para funções específicas do banco de dados
const fs = require('fs');
const path = require('path');

describe('Database Functions Tests', () => {
    test('deve ter script SQL com todas as tabelas', () => {
        const sqlPath = path.join(__dirname, '..', 'database.sql');
        const sqlContent = fs.readFileSync(sqlPath, 'utf8');
        
        // Verificar criação de tabelas (PostgreSQL)
        expect(sqlContent).toContain('CREATE TABLE IF NOT EXISTS funcionarios');
        expect(sqlContent).toContain('CREATE TABLE IF NOT EXISTS donos');
        expect(sqlContent).toContain('CREATE TABLE IF NOT EXISTS animais');
        expect(sqlContent).toContain('CREATE TABLE IF NOT EXISTS consultas');
    });

    test('deve ter estrutura correta da tabela funcionarios', () => {
        const sqlPath = path.join(__dirname, '..', 'database.sql');
        const sqlContent = fs.readFileSync(sqlPath, 'utf8');
        
        // Verificar campos da tabela funcionarios (PostgreSQL)
        expect(sqlContent).toContain('id SERIAL PRIMARY KEY');
        expect(sqlContent).toContain('nome VARCHAR(100) NOT NULL');
        expect(sqlContent).toContain('email VARCHAR(100) UNIQUE NOT NULL');
        expect(sqlContent).toContain('senha VARCHAR(255) NOT NULL');
        expect(sqlContent).toContain('cargo VARCHAR(50) NOT NULL');
    });

    test('deve ter estrutura correta da tabela donos', () => {
        const sqlPath = path.join(__dirname, '..', 'database.sql');
        const sqlContent = fs.readFileSync(sqlPath, 'utf8');
        
        // Verificar campos da tabela donos (PostgreSQL)
        expect(sqlContent).toContain('id SERIAL PRIMARY KEY');
        expect(sqlContent).toContain('nome VARCHAR(100) NOT NULL');
        expect(sqlContent).toContain('telefone VARCHAR(20) NOT NULL');
    });

    test('deve ter estrutura correta da tabela animais', () => {
        const sqlPath = path.join(__dirname, '..', 'database.sql');
        const sqlContent = fs.readFileSync(sqlPath, 'utf8');
        
        // Verificar campos da tabela animais (PostgreSQL)
        expect(sqlContent).toContain('id SERIAL PRIMARY KEY');
        expect(sqlContent).toContain('nome VARCHAR(100) NOT NULL');
        expect(sqlContent).toContain('especie VARCHAR(50) NOT NULL');
        expect(sqlContent).toContain('dono_id INT REFERENCES donos(id)');
    });

    test('deve ter estrutura correta da tabela consultas', () => {
        const sqlPath = path.join(__dirname, '..', 'database.sql');
        const sqlContent = fs.readFileSync(sqlPath, 'utf8');
        
        // Verificar campos da tabela consultas (PostgreSQL)
        expect(sqlContent).toContain('id SERIAL PRIMARY KEY');
        expect(sqlContent).toContain('data_consulta DATE NOT NULL');
        expect(sqlContent).toContain('hora_consulta TIME NOT NULL');
        expect(sqlContent).toContain('descricao TEXT');
        expect(sqlContent).toContain('animal_id INT REFERENCES animais(id)');
        expect(sqlContent).toContain('funcionario_id INT REFERENCES funcionarios(id)');
    });

    test('deve ter dados de exemplo inseridos', () => {
        const sqlPath = path.join(__dirname, '..', 'database.sql');
        const sqlContent = fs.readFileSync(sqlPath, 'utf8');
        
        // Verificar inserção de dados de exemplo
        expect(sqlContent).toContain('INSERT INTO funcionarios');
        expect(sqlContent).toContain('INSERT INTO donos');
        expect(sqlContent).toContain('INSERT INTO animais');
        expect(sqlContent).toContain('INSERT INTO consultas');
    });

    test('deve ter dados de exemplo válidos', () => {
        const sqlPath = path.join(__dirname, '..', 'database.sql');
        const sqlContent = fs.readFileSync(sqlPath, 'utf8');
        
        // Verificar dados específicos (PostgreSQL)
        expect(sqlContent).toContain('admin@vetsystem.com');
        expect(sqlContent).toContain('João Silva');
        expect(sqlContent).toContain('Rex');
        expect(sqlContent).toContain('Cachorro');
    });

    test('deve ter arquivo de banco SQLite', () => {
        const dbPath = path.join(__dirname, '..', 'petship.db');
        expect(fs.existsSync(dbPath)).toBe(true);
    });

    test('deve ter arquivo de banco com tamanho válido', () => {
        const dbPath = path.join(__dirname, '..', 'petship.db');
        const stats = fs.statSync(dbPath);
        expect(stats.size).toBeGreaterThan(0);
    });
});
