# Petship - Sistema de Gerenciamento Veterinário

Sistema web completo para gerenciamento de clínicas veterinárias, desenvolvido com Node.js, Express, PostgreSQL e HTML/CSS puro.

## 🚀 Tecnologias Utilizadas

- **Backend**: Node.js + Express
- **Banco de Dados**: SQLite
- **Frontend**: HTML5 + CSS3 (sem frameworks)
- **Documentação**: Swagger UI + Swagger JSDoc
- **Dependências**: express, sqlite3, swagger-ui-express, swagger-jsdoc

## 📁 Estrutura do Projeto

```
/petship
├── server.js              # Servidor Node.js principal
├── package.json           # Dependências do projeto
├── database.sql           # Scripts SQL para criação do banco
├── README.md             # Este arquivo
└── /public               # Arquivos estáticos (frontend)
    ├── login.html        # Página de login
    ├── dashboard.html    # Dashboard principal
    ├── consultas.html    # Página de gerenciamento de consultas
    └── style.css         # Estilos CSS
```

## 🛠️ Instalação e Configuração

### 1. Pré-requisitos

- Node.js (versão 14 ou superior)
- PostgreSQL (versão 12 ou superior)
- npm ou yarn

### 2. Instalação das Dependências

```bash
npm install
```

### 3. Configuração do Banco de Dados

1. Crie um banco de dados PostgreSQL chamado `petship`:
```sql
CREATE DATABASE petship;
```

2. Execute o script SQL para criar as tabelas:
```bash
psql -U postgres -d petship -f database.sql
```

### 4. Configuração do Servidor

Edite o arquivo `server.js` e ajuste as configurações de conexão com o banco:

```javascript
const pool = new Pool({
    user: 'seu_usuario',        // Seu usuário do PostgreSQL
    host: 'localhost',
    database: 'petship',
    password: 'sua_senha',      // Sua senha do PostgreSQL
    port: 5432,
});
```

### 5. Executar o Servidor

```bash
npm start
```

O servidor estará disponível em: `http://localhost:3000`

## 🔑 Credenciais de Teste

- **Email**: admin@petship.com
- **Senha**: 123

## 📋 Funcionalidades

### ✅ Implementadas

- **Sistema de Login**: Autenticação de funcionários
- **Dashboard Principal**: Interface principal com menu de navegação
- **Gerenciamento de Consultas**: 
  - Agendamento de consultas
  - Listagem de consultas agendadas
  - Formulários dinâmicos com dados do banco

### 🗄️ Estrutura do Banco de Dados

- **funcionarios**: Dados dos funcionários da clínica
- **donos**: Informações dos donos dos pets
- **animais**: Dados dos pets
- **consultas**: Agendamentos de consultas

## 🎨 Design

O sistema utiliza um design moderno e responsivo com:
- Menu lateral fixo com gradiente azul
- Interface limpa e intuitiva
- Formulários estilizados
- Tabelas responsivas
- Animações suaves

## 🔧 APIs Disponíveis

### 📚 Documentação Swagger
A documentação completa da API está disponível através do Swagger UI:
- **URL**: http://localhost:3000/api-docs
- **Interface interativa** para testar todas as APIs
- **Esquemas detalhados** de request/response
- **Exemplos** para cada endpoint

### Autenticação
- `POST /api/login` - Login de funcionários

### Consultas
- `GET /api/consultas` - Listar todas as consultas
- `POST /api/consultas` - Criar nova consulta

### Dados Auxiliares
- `GET /api/animais` - Listar animais
- `GET /api/funcionarios` - Listar funcionários

## 🚀 Como Usar

### Interface Web
1. Acesse `http://localhost:3000`
2. Faça login com as credenciais de teste
3. Navegue pelo dashboard usando o menu lateral
4. Acesse "Consultas" para gerenciar agendamentos
5. Use o formulário para agendar novas consultas

### Documentação da API (Swagger)
1. Acesse `http://localhost:3000/api-docs`
2. Explore todas as APIs disponíveis
3. Teste os endpoints diretamente na interface
4. Veja exemplos de request/response
5. Consulte os esquemas de dados detalhados

## 🧪 Testes e Coverage

O projeto inclui uma suíte completa de testes automatizados:

### Executar Testes
```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com coverage
npm run test:coverage
```

### Relatório de Coverage
Após executar `npm run test:coverage`, o relatório HTML estará disponível em:
- **Arquivo**: `coverage/index.html`
- **Abrir no navegador** para visualizar o relatório completo

### Cobertura de Testes
- ✅ **Testes de Configuração**: Package.json, dependências, estrutura
- ✅ **Testes de Banco de Dados**: Arquivos SQL e estrutura
- ✅ **Testes de APIs**: Endpoints e validações (em desenvolvimento)
- ✅ **Testes de Swagger**: Documentação e configuração (em desenvolvimento)

## 📝 Próximos Passos

Para expandir o sistema, considere implementar:
- Gerenciamento completo de pets e donos
- Sistema de vendedores e produtos
- Controle de estoque
- Relatórios e estatísticas
- Sistema de notificações
- Testes de integração completos

## 🤝 Contribuição

Este é um projeto de exemplo. Sinta-se à vontade para expandir e melhorar conforme suas necessidades.

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.
