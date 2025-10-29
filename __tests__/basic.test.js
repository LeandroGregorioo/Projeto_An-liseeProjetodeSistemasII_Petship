// Testes básicos para verificar se o projeto está funcionando
describe('Basic Project Tests', () => {
    test('deve ter package.json configurado', () => {
        const packageJson = require('../package.json');
        
        expect(packageJson.name).toBe('petship');
        expect(packageJson.version).toBe('1.0.0');
        expect(packageJson.main).toBe('server.js');
        expect(packageJson.scripts.test).toBe('jest');
        expect(packageJson.scripts['test:coverage']).toBe('jest --coverage');
    });

    test('deve ter dependências necessárias', () => {
        const packageJson = require('../package.json');
        
        expect(packageJson.dependencies.express).toBeDefined();
        expect(packageJson.dependencies.sqlite3).toBeDefined();
        expect(packageJson.dependencies['swagger-ui-express']).toBeDefined();
        expect(packageJson.dependencies['swagger-jsdoc']).toBeDefined();
    });

    test('deve ter Jest configurado', () => {
        const packageJson = require('../package.json');
        
        expect(packageJson.jest).toBeDefined();
        expect(packageJson.jest.testEnvironment).toBe('node');
        expect(packageJson.jest.collectCoverage).toBe(true);
        expect(packageJson.jest.coverageDirectory).toBe('coverage');
    });

    test('deve ter arquivo server.js', () => {
        const fs = require('fs');
        const path = require('path');
        
        const serverPath = path.join(__dirname, '..', 'server.js');
        expect(fs.existsSync(serverPath)).toBe(true);
    });

    test('deve ter arquivo database.sql', () => {
        const fs = require('fs');
        const path = require('path');
        
        const dbPath = path.join(__dirname, '..', 'database.sql');
        expect(fs.existsSync(dbPath)).toBe(true);
    });

    test('deve ter pasta public com arquivos HTML', () => {
        const fs = require('fs');
        const path = require('path');
        
        const publicPath = path.join(__dirname, '..', 'public');
        expect(fs.existsSync(publicPath)).toBe(true);
        
        const loginPath = path.join(publicPath, 'login.html');
        const dashboardPath = path.join(publicPath, 'dashboard.html');
        const consultasPath = path.join(publicPath, 'consultas.html');
        
        expect(fs.existsSync(loginPath)).toBe(true);
        expect(fs.existsSync(dashboardPath)).toBe(true);
        expect(fs.existsSync(consultasPath)).toBe(true);
    });

    test('deve ter arquivo .gitignore', () => {
        const fs = require('fs');
        const path = require('path');
        
        const gitignorePath = path.join(__dirname, '..', '.gitignore');
        expect(fs.existsSync(gitignorePath)).toBe(true);
    });

    test('deve ter README.md', () => {
        const fs = require('fs');
        const path = require('path');
        
        const readmePath = path.join(__dirname, '..', 'README.md');
        expect(fs.existsSync(readmePath)).toBe(true);
    });
});
