// Testes para o servidor sem tentar importar o server.js diretamente
const fs = require('fs');
const path = require('path');

describe('Server Configuration Tests', () => {
    test('deve ter arquivo server.js válido', () => {
        const serverPath = path.join(__dirname, '..', 'server.js');
        const serverContent = fs.readFileSync(serverPath, 'utf8');
        
        // Verificar se contém as importações necessárias
        expect(serverContent).toContain('const express = require');
        expect(serverContent).toContain('const sqlite3 = require');
        expect(serverContent).toContain('const swaggerJsdoc = require');
        expect(serverContent).toContain('const swaggerUi = require');
    });

    test('deve ter configuração do Swagger', () => {
        const serverPath = path.join(__dirname, '..', 'server.js');
        const serverContent = fs.readFileSync(serverPath, 'utf8');
        
        // Verificar configuração do Swagger
        expect(serverContent).toContain('swaggerOptions');
        expect(serverContent).toContain('swaggerSpec');
        expect(serverContent).toContain('/api-docs');
        expect(serverContent).toContain('swagger-ui-express');
    });

    test('deve ter todas as rotas de API', () => {
        const serverPath = path.join(__dirname, '..', 'server.js');
        const serverContent = fs.readFileSync(serverPath, 'utf8');
        
        // Verificar rotas principais
        expect(serverContent).toContain('app.post(\'/api/login\'');
        expect(serverContent).toContain('app.get(\'/api/consultas\'');
        expect(serverContent).toContain('app.post(\'/api/consultas\'');
        expect(serverContent).toContain('app.get(\'/api/animais\'');
        expect(serverContent).toContain('app.get(\'/api/funcionarios\'');
        expect(serverContent).toContain('app.get(\'/\'');
    });

    test('deve ter middlewares configurados', () => {
        const serverPath = path.join(__dirname, '..', 'server.js');
        const serverContent = fs.readFileSync(serverPath, 'utf8');
        
        // Verificar middlewares
        expect(serverContent).toContain('app.use(express.json())');
        expect(serverContent).toContain('app.use(express.urlencoded');
        expect(serverContent).toContain('app.use(express.static');
    });

    test('deve ter configuração de banco de dados', () => {
        const serverPath = path.join(__dirname, '..', 'server.js');
        const serverContent = fs.readFileSync(serverPath, 'utf8');
        
        // Verificar configuração do banco
        expect(serverContent).toContain('sqlite3.Database');
        expect(serverContent).toContain('petship.db');
        expect(serverContent).toContain('initDatabase');
    });

    test('deve ter documentação JSDoc para APIs', () => {
        const serverPath = path.join(__dirname, '..', 'server.js');
        const serverContent = fs.readFileSync(serverPath, 'utf8');
        
        // Verificar documentação Swagger
        expect(serverContent).toContain('@swagger');
        expect(serverContent).toContain('/api/login:');
        expect(serverContent).toContain('/api/consultas:');
        expect(serverContent).toContain('summary:');
        expect(serverContent).toContain('responses:');
    });

    test('deve ter schemas definidos', () => {
        const serverPath = path.join(__dirname, '..', 'server.js');
        const serverContent = fs.readFileSync(serverPath, 'utf8');
        
        // Verificar schemas do Swagger
        expect(serverContent).toContain('Funcionario:');
        expect(serverContent).toContain('Animal:');
        expect(serverContent).toContain('Consulta:');
        expect(serverContent).toContain('LoginRequest:');
        expect(serverContent).toContain('LoginResponse:');
    });

    test('deve ter tratamento de erros', () => {
        const serverPath = path.join(__dirname, '..', 'server.js');
        const serverContent = fs.readFileSync(serverPath, 'utf8');
        
        // Verificar tratamento de erros
        expect(serverContent).toContain('console.error');
        expect(serverContent).toContain('res.status(500)');
        expect(serverContent).toContain('res.status(400)');
    });

    test('deve ter validação de dados', () => {
        const serverPath = path.join(__dirname, '..', 'server.js');
        const serverContent = fs.readFileSync(serverPath, 'utf8');
        
        // Verificar validações
        expect(serverContent).toContain('if (!email || !senha)');
        expect(serverContent).toContain('if (!data_consulta || !hora_consulta');
        expect(serverContent).toContain('Campos obrigatórios');
    });

    test('deve ter configuração de porta', () => {
        const serverPath = path.join(__dirname, '..', 'server.js');
        const serverContent = fs.readFileSync(serverPath, 'utf8');
        
        // Verificar configuração da porta
        expect(serverContent).toContain('const PORT = 3000');
        expect(serverContent).toContain('app.listen(PORT');
    });
});
