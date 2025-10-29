const request = require('supertest');

// Mock do banco de dados SQLite
jest.mock('sqlite3', () => {
    const mockDb = {
        get: jest.fn(),
        all: jest.fn(),
        run: jest.fn(),
        close: jest.fn(),
        serialize: jest.fn((callback) => callback())
    };
    
    return {
        verbose: () => ({
            Database: jest.fn((dbPath, callback) => {
                setTimeout(() => callback(null), 0);
                return mockDb;
            })
        })
    };
});

// Mock do processo para evitar que o servidor inicie
const originalListen = require('http').Server.prototype.listen;
require('http').Server.prototype.listen = jest.fn((port, callback) => {
    if (callback) callback();
    return { close: jest.fn() };
});

// Importar o app após os mocks
let app;
beforeAll(() => {
    app = require('../server');
});

afterAll(() => {
    // Restaurar o método original
    require('http').Server.prototype.listen = originalListen;
});

describe('API Tests', () => {
    let mockDb;

    beforeEach(() => {
        // Reset dos mocks
        jest.clearAllMocks();
        
        // Mock do banco de dados
        const sqlite3 = require('sqlite3');
        mockDb = {
            get: jest.fn(),
            all: jest.fn(),
            run: jest.fn()
        };
        
        // Mock da instância do banco
        sqlite3.verbose().Database.mockImplementation((dbPath, callback) => {
            callback(null);
            return mockDb;
        });
    });

    describe('GET /', () => {
        test('deve retornar a página de login', async () => {
            const response = await request(app)
                .get('/')
                .expect(200);
            
            expect(response.text).toContain('login');
        });
    });

    describe('POST /api/login', () => {
        test('deve fazer login com credenciais válidas', async () => {
            const userData = {
                id: 1,
                nome: 'Admin',
                email: 'admin@petship.com',
                cargo: 'Recepcionista'
            };

            mockDb.get.mockImplementation((query, params, callback) => {
                callback(null, userData);
            });

            const response = await request(app)
                .post('/api/login')
                .send({
                    email: 'admin@petship.com',
                    senha: '123'
                })
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.user.nome).toBe('Admin');
        });

        test('deve retornar erro com credenciais inválidas', async () => {
            mockDb.get.mockImplementation((query, params, callback) => {
                callback(null, null);
            });

            const response = await request(app)
                .post('/api/login')
                .send({
                    email: 'admin@petship.com',
                    senha: 'senha_errada'
                })
                .expect(200);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Email ou senha incorretos');
        });

        test('deve retornar erro com dados faltando', async () => {
            const response = await request(app)
                .post('/api/login')
                .send({
                    email: 'admin@petship.com'
                    // senha faltando
                })
                .expect(200);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Email e senha são obrigatórios');
        });
    });

    describe('GET /api/consultas', () => {
        test('deve retornar lista de consultas', async () => {
            const consultasMock = [
                {
                    id: 1,
                    data_consulta: '2024-01-15',
                    hora_consulta: '09:00:00',
                    descricao: 'Consulta de rotina',
                    animal_nome: 'Rex',
                    dono_nome: 'João Silva',
                    funcionario_nome: 'Admin'
                }
            ];

            mockDb.all.mockImplementation((query, params, callback) => {
                callback(null, consultasMock);
            });

            const response = await request(app)
                .get('/api/consultas')
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body[0].animal_nome).toBe('Rex');
        });

        test('deve retornar erro interno do servidor', async () => {
            mockDb.all.mockImplementation((query, params, callback) => {
                callback(new Error('Erro no banco'), null);
            });

            const response = await request(app)
                .get('/api/consultas')
                .expect(500);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Erro interno do servidor');
        });
    });

    describe('POST /api/consultas', () => {
        test('deve criar nova consulta com dados válidos', async () => {
            mockDb.run.mockImplementation((query, params, callback) => {
                callback(null, { lastID: 1 });
            });

            const novaConsulta = {
                data_consulta: '2024-01-20',
                hora_consulta: '10:00:00',
                animal_id: 1,
                funcionario_id: 1,
                descricao: 'Nova consulta'
            };

            const response = await request(app)
                .post('/api/consultas')
                .send(novaConsulta)
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.consulta.id).toBe(1);
        });

        test('deve retornar erro com dados faltando', async () => {
            const consultaIncompleta = {
                data_consulta: '2024-01-20',
                // hora_consulta faltando
                animal_id: 1,
                funcionario_id: 1
            };

            const response = await request(app)
                .post('/api/consultas')
                .send(consultaIncompleta)
                .expect(400);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toContain('Campos obrigatórios');
        });
    });

    describe('GET /api/animais', () => {
        test('deve retornar lista de animais', async () => {
            const animaisMock = [
                {
                    id: 1,
                    nome: 'Rex',
                    especie: 'Cachorro',
                    dono_id: 1,
                    dono_nome: 'João Silva'
                }
            ];

            mockDb.all.mockImplementation((query, params, callback) => {
                callback(null, animaisMock);
            });

            const response = await request(app)
                .get('/api/animais')
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body[0].nome).toBe('Rex');
        });
    });

    describe('GET /api/funcionarios', () => {
        test('deve retornar lista de funcionários', async () => {
            const funcionariosMock = [
                {
                    id: 1,
                    nome: 'Admin',
                    cargo: 'Recepcionista'
                }
            ];

            mockDb.all.mockImplementation((query, params, callback) => {
                callback(null, funcionariosMock);
            });

            const response = await request(app)
                .get('/api/funcionarios')
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body[0].nome).toBe('Admin');
        });
    });

    describe('GET /api-docs', () => {
        test('deve retornar documentação Swagger', async () => {
            const response = await request(app)
                .get('/api-docs')
                .expect(200);

            expect(response.text).toContain('swagger');
        });
    });
});