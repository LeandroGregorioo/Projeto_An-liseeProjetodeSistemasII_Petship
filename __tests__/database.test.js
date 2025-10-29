const fs = require('fs');
const path = require('path');

describe('Database Tests', () => {
    test('deve ter arquivo de banco de dados', () => {
        const dbPath = path.join(__dirname, '..', 'petship.db');
        expect(fs.existsSync(dbPath)).toBe(true);
    });

    test('deve ter arquivo de script SQL', () => {
        const sqlPath = path.join(__dirname, '..', 'database.sql');
        expect(fs.existsSync(sqlPath)).toBe(true);
    });

    test('deve ter estrutura SQL válida', () => {
        const sqlPath = path.join(__dirname, '..', 'database.sql');
        const sqlContent = fs.readFileSync(sqlPath, 'utf8');
        
        // Verificar se contém as tabelas principais
        expect(sqlContent).toContain('CREATE TABLE');
        expect(sqlContent).toContain('funcionarios');
        expect(sqlContent).toContain('donos');
        expect(sqlContent).toContain('animais');
        expect(sqlContent).toContain('consultas');
    });
});
