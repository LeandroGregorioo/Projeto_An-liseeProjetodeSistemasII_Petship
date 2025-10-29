// Testes para estrutura das APIs sem importar o server.js
const fs = require('fs');
const path = require('path');

describe('API Structure Tests', () => {
    let serverContent;

    beforeAll(() => {
        const serverPath = path.join(__dirname, '..', 'server.js');
        serverContent = fs.readFileSync(serverPath, 'utf8');
    });

    describe('Login API', () => {
        test('deve ter rota POST /api/login', () => {
            expect(serverContent).toContain('app.post(\'/api/login\'');
        });

        test('deve ter validação de email e senha', () => {
            expect(serverContent).toContain('if (!email || !senha)');
            expect(serverContent).toContain('Email e senha são obrigatórios');
        });

        test('deve ter query SQL para login', () => {
            expect(serverContent).toContain('SELECT * FROM funcionarios WHERE email = ? AND senha = ?');
        });

        test('deve ter resposta de sucesso', () => {
            expect(serverContent).toContain('res.json({');
            expect(serverContent).toContain('success: true');
            expect(serverContent).toContain('user:');
        });

        test('deve ter resposta de erro', () => {
            expect(serverContent).toContain('Email ou senha incorretos');
        });
    });

    describe('Consultas API', () => {
        test('deve ter rota GET /api/consultas', () => {
            expect(serverContent).toContain('app.get(\'/api/consultas\'');
        });

        test('deve ter rota POST /api/consultas', () => {
            expect(serverContent).toContain('app.post(\'/api/consultas\'');
        });

        test('deve ter query JOIN para consultas', () => {
            expect(serverContent).toContain('LEFT JOIN animais a ON c.animal_id = a.id');
            expect(serverContent).toContain('LEFT JOIN donos d ON a.dono_id = d.id');
            expect(serverContent).toContain('LEFT JOIN funcionarios f ON c.funcionario_id = f.id');
        });

        test('deve ter validação de campos obrigatórios', () => {
            expect(serverContent).toContain('if (!data_consulta || !hora_consulta || !animal_id || !funcionario_id)');
            expect(serverContent).toContain('Campos obrigatórios: data_consulta, hora_consulta, animal_id, funcionario_id');
        });

        test('deve ter INSERT para nova consulta', () => {
            expect(serverContent).toContain('INSERT INTO consultas');
        });
    });

    describe('Animais API', () => {
        test('deve ter rota GET /api/animais', () => {
            expect(serverContent).toContain('app.get(\'/api/animais\'');
        });

        test('deve ter query JOIN para animais', () => {
            expect(serverContent).toContain('SELECT a.*, d.nome as dono_nome');
            expect(serverContent).toContain('FROM animais a');
            expect(serverContent).toContain('LEFT JOIN donos d ON a.dono_id = d.id');
        });
    });

    describe('Funcionários API', () => {
        test('deve ter rota GET /api/funcionarios', () => {
            expect(serverContent).toContain('app.get(\'/api/funcionarios\'');
        });

        test('deve ter query SELECT para funcionários', () => {
            expect(serverContent).toContain('SELECT id, nome, cargo FROM funcionarios');
        });
    });

    describe('Swagger API', () => {
        test('deve ter rota GET /api-docs', () => {
            expect(serverContent).toContain('app.use(\'/api-docs\'');
        });

        test('deve ter configuração swaggerUi', () => {
            expect(serverContent).toContain('swaggerUi.serve');
            expect(serverContent).toContain('swaggerUi.setup');
        });
    });

    describe('Tratamento de Erros', () => {
        test('deve ter tratamento de erro de banco', () => {
            expect(serverContent).toContain('if (err) {');
            expect(serverContent).toContain('console.error');
            expect(serverContent).toContain('res.status(500)');
        });

        test('deve ter mensagens de erro padronizadas', () => {
            expect(serverContent).toContain('Erro interno do servidor');
            expect(serverContent).toContain('success: false');
        });
    });

    describe('Validações', () => {
        test('deve ter validação de dados de entrada', () => {
            expect(serverContent).toContain('req.body');
            expect(serverContent).toContain('const {');
        });

        test('deve ter verificação de campos obrigatórios', () => {
            expect(serverContent).toContain('if (!');
            expect(serverContent).toContain('return res');
        });
    });
});
