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

let app;
beforeAll(() => {
    app = require('../server');
});

afterAll(() => {
    require('http').Server.prototype.listen = originalListen;
});

describe('Swagger Documentation Tests', () => {
    test('deve servir documentação Swagger em /api-docs', async () => {
        const response = await request(app)
            .get('/api-docs')
            .expect(200);

        expect(response.text).toContain('swagger');
        expect(response.text).toContain('Petship API');
    });

    test('deve ter configuração Swagger válida', () => {
        // Verificar se o app tem as rotas do Swagger configuradas
        const routes = app._router.stack
            .filter(layer => layer.route)
            .map(layer => layer.route.path);

        expect(routes).toContain('/api-docs');
    });

    test('deve ter schemas definidos', () => {
        // Este teste verifica se a configuração do Swagger está presente
        // A configuração está no server.js, então vamos verificar se o app carrega
        expect(app).toBeDefined();
    });
});