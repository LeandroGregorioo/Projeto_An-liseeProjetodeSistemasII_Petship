const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// Configuração do banco de dados SQLite
const db = new sqlite3.Database('./petship.db', (err) => {
    if (err) {
        console.error('Erro ao conectar com o banco:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite');
        initDatabase();
    }
});

// Inicializar banco de dados
function initDatabase() {
    // Criar tabelas
    db.serialize(() => {
        // Tabela funcionarios
        db.run(`CREATE TABLE IF NOT EXISTS funcionarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            senha TEXT NOT NULL,
            cargo TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // Tabela donos
        db.run(`CREATE TABLE IF NOT EXISTS donos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            telefone TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // Tabela animais
        db.run(`CREATE TABLE IF NOT EXISTS animais (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            especie TEXT NOT NULL,
            dono_id INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (dono_id) REFERENCES donos (id)
        )`);

        // Tabela consultas
        db.run(`CREATE TABLE IF NOT EXISTS consultas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            data_consulta DATE NOT NULL,
            hora_consulta TIME NOT NULL,
            descricao TEXT,
            animal_id INTEGER,
            funcionario_id INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (animal_id) REFERENCES animais (id),
            FOREIGN KEY (funcionario_id) REFERENCES funcionarios (id)
        )`);

        // Inserir dados de exemplo
        db.run(`INSERT OR IGNORE INTO funcionarios (nome, email, senha, cargo) 
                VALUES ('Admin', 'admin@petship.com', '123', 'Recepcionista')`);

        db.run(`INSERT OR IGNORE INTO donos (nome, telefone) VALUES 
                ('João Silva', '(11) 99999-1111'),
                ('Maria Santos', '(11) 99999-2222'),
                ('Pedro Oliveira', '(11) 99999-3333')`);

        db.run(`INSERT OR IGNORE INTO animais (nome, especie, dono_id) VALUES 
                ('Rex', 'Cachorro', 1),
                ('Mimi', 'Gato', 2),
                ('Thor', 'Cachorro', 3)`);

        db.run(`INSERT OR IGNORE INTO consultas (data_consulta, hora_consulta, descricao, animal_id, funcionario_id) VALUES 
                ('2024-01-15', '09:00:00', 'Consulta de rotina', 1, 1),
                ('2024-01-15', '10:30:00', 'Vacinação', 2, 1),
                ('2024-01-16', '14:00:00', 'Exame clínico', 3, 1)`);
    });
}

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// API de Login
app.post('/api/login', (req, res) => {
    const { email, senha } = req.body;
    
    if (!email || !senha) {
        return res.json({ 
            success: false, 
            message: 'Email e senha são obrigatórios' 
        });
    }

    const query = 'SELECT * FROM funcionarios WHERE email = ? AND senha = ?';
    db.get(query, [email, senha], (err, row) => {
        if (err) {
            console.error('Erro no login:', err);
            return res.json({ 
                success: false, 
                message: 'Erro interno do servidor' 
            });
        }
        
        if (row) {
            res.json({ 
                success: true, 
                user: {
                    id: row.id,
                    nome: row.nome,
                    cargo: row.cargo
                }
            });
        } else {
            res.json({ 
                success: false, 
                message: 'Email ou senha incorretos' 
            });
        }
    });
});

// API para buscar todas as consultas
app.get('/api/consultas', (req, res) => {
    const query = `
        SELECT c.*, a.nome as animal_nome, a.especie, d.nome as dono_nome, f.nome as funcionario_nome
        FROM consultas c
        LEFT JOIN animais a ON c.animal_id = a.id
        LEFT JOIN donos d ON a.dono_id = d.id
        LEFT JOIN funcionarios f ON c.funcionario_id = f.id
        ORDER BY c.data_consulta DESC, c.hora_consulta DESC
    `;
    
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Erro ao buscar consultas:', err);
            return res.status(500).json({ 
                success: false, 
                message: 'Erro interno do servidor' 
            });
        }
        res.json(rows);
    });
});

// API para criar nova consulta
app.post('/api/consultas', (req, res) => {
    const { data_consulta, hora_consulta, animal_id, funcionario_id, descricao } = req.body;
    
    if (!data_consulta || !hora_consulta || !animal_id || !funcionario_id) {
        return res.status(400).json({ 
            success: false, 
            message: 'Campos obrigatórios: data_consulta, hora_consulta, animal_id, funcionario_id' 
        });
    }

    const query = `
        INSERT INTO consultas (data_consulta, hora_consulta, descricao, animal_id, funcionario_id)
        VALUES (?, ?, ?, ?, ?)
    `;
    
    db.run(query, [data_consulta, hora_consulta, descricao, animal_id, funcionario_id], function(err) {
        if (err) {
            console.error('Erro ao criar consulta:', err);
            return res.status(500).json({ 
                success: false, 
                message: 'Erro interno do servidor' 
            });
        }
        
        res.json({
            success: true,
            consulta: {
                id: this.lastID,
                data_consulta,
                hora_consulta,
                descricao,
                animal_id,
                funcionario_id
            }
        });
    });
});

// API para buscar animais
app.get('/api/animais', (req, res) => {
    const query = `
        SELECT a.*, d.nome as dono_nome
        FROM animais a
        LEFT JOIN donos d ON a.dono_id = d.id
        ORDER BY a.nome
    `;
    
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Erro ao buscar animais:', err);
            return res.status(500).json({ 
                success: false, 
                message: 'Erro interno do servidor' 
            });
        }
        res.json(rows);
    });
});

// API para buscar funcionários
app.get('/api/funcionarios', (req, res) => {
    const query = 'SELECT id, nome, cargo FROM funcionarios ORDER BY nome';
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Erro ao buscar funcionários:', err);
            return res.status(500).json({ 
                success: false, 
                message: 'Erro interno do servidor' 
            });
        }
        res.json(rows);
    });
});

// Rota para servir o login como página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log('Para testar o login, use:');
    console.log('Email: admin@petship.com');
    console.log('Senha: 123');
});

// Fechar banco ao encerrar o servidor
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Conexão com banco fechada.');
        process.exit(0);
    });
});
