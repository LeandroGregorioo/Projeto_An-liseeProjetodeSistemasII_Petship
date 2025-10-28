-- Script SQL para criação do banco de dados VetSystem
-- Execute este script no PostgreSQL para criar as tabelas necessárias

-- Criar tabela de funcionários
CREATE TABLE IF NOT EXISTS funcionarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    cargo VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de donos
CREATE TABLE IF NOT EXISTS donos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de animais
CREATE TABLE IF NOT EXISTS animais (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    especie VARCHAR(50) NOT NULL,
    dono_id INT REFERENCES donos(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de consultas
CREATE TABLE IF NOT EXISTS consultas (
    id SERIAL PRIMARY KEY,
    data_consulta DATE NOT NULL,
    hora_consulta TIME NOT NULL,
    descricao TEXT,
    animal_id INT REFERENCES animais(id) ON DELETE CASCADE,
    funcionario_id INT REFERENCES funcionarios(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir usuário de teste
INSERT INTO funcionarios (nome, email, senha, cargo) 
VALUES ('Admin', 'admin@vetsystem.com', '123', 'Recepcionista')
ON CONFLICT (email) DO NOTHING;

-- Inserir alguns dados de exemplo para teste
INSERT INTO donos (nome, telefone) VALUES 
('João Silva', '(11) 99999-1111'),
('Maria Santos', '(11) 99999-2222'),
('Pedro Oliveira', '(11) 99999-3333')
ON CONFLICT DO NOTHING;

INSERT INTO animais (nome, especie, dono_id) VALUES 
('Rex', 'Cachorro', 1),
('Mimi', 'Gato', 2),
('Thor', 'Cachorro', 3)
ON CONFLICT DO NOTHING;

-- Inserir algumas consultas de exemplo
INSERT INTO consultas (data_consulta, hora_consulta, descricao, animal_id, funcionario_id) VALUES 
('2024-01-15', '09:00:00', 'Consulta de rotina', 1, 1),
('2024-01-15', '10:30:00', 'Vacinação', 2, 1),
('2024-01-16', '14:00:00', 'Exame clínico', 3, 1)
ON CONFLICT DO NOTHING;
