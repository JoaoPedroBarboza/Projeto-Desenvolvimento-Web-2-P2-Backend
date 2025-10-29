-- =============================================
-- Sistema de Gestão Financeira - Backend
-- Banco de Dados: financeiro
-- =============================================

-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS financeiro;
USE financeiro;

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    email VARCHAR(100) NULL DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de transações financeiras
CREATE TABLE IF NOT EXISTS transacoes_financeiras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    tipo ENUM('receita', 'despesa') NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    data DATE NOT NULL,
    usuario_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Criar usuário de teste (login: admin / senha: 1234)
INSERT INTO usuarios (username, senha, email) VALUES 
('admin', MD5('1234'), 'admin@gestorfinancas.com');

-- Inserir transações de exemplo
INSERT INTO transacoes_financeiras (descricao, valor, tipo, categoria, data, usuario_id) VALUES
('Salário Mensal', 3500.00, 'receita', 'salario', '2025-01-01', 1),
('Compra no Supermercado', 250.00, 'despesa', 'alimentacao', '2025-01-02', 1),
('Conta de Luz', 150.00, 'despesa', 'contas', '2025-01-05', 1),
('Freelance Design', 800.00, 'receita', 'outros', '2025-01-10', 1),
('Gasolina', 200.00, 'despesa', 'transporte', '2025-01-12', 1),
('Aluguel', 1200.00, 'despesa', 'moradia', '2025-01-15', 1);

-- Criar índices para melhor performance
CREATE INDEX idx_transacoes_usuario ON transacoes_financeiras(usuario_id);
CREATE INDEX idx_transacoes_data ON transacoes_financeiras(data);
CREATE INDEX idx_transacoes_tipo ON transacoes_financeiras(tipo);

-- Verificar dados
SELECT 'Usuários cadastrados:' AS Status;
SELECT * FROM usuarios;

SELECT 'Transações cadastradas:' AS Status;
SELECT * FROM transacoes_financeiras;
