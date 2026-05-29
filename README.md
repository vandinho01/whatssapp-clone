# 🚀 Projeto WhatsApp Clone

Este projeto é um acompanhamento do progresso no curso **Projeto WhatsApp Clone**, que consiste na criação de um clone do WhatsApp utilizando tecnologias modernas de desenvolvimento web.

## 📌 Funcionalidades

O projeto tem como objetivo principal a construção de um clone do WhatsApp, com as seguintes funcionalidades:

- **Envio de mensagens de texto, áudio, documentos e fotos**
- **Exibição de imagens e documentos**
- **Gerenciamento de contatos**
- **Envio de notificações em tempo real**
- **Integração com Firebase para autenticação e armazenamento**
- **Histórico de chats e mensagens**


## 🛠 Tecnologias Utilizadas

- **JavaScript**: Para a lógica de interação com a API e front-end.
- **Firebase**: Para autenticação de usuários, envio de mensagens e armazenamento de dados.
- **Webpack**: Para empacotamento e otimização dos arquivos JavaScript.
- **SweetAlert2**: Para exibição de alertas bonitos e personalizáveis.
- **PDF.js**: Para visualização de documentos PDF dentro da aplicação.
- **Webpack Dev Server**: Para desenvolvimento local com live reload.

## 🌎 Estrutura do Projeto

```plaintext
├── 📂 audio
│   └── alert.mp3 # Arquivo de áudio para notificações
├── 📂 css
│   └── style.css # Arquivo de estilo para a aplicação
├── 📂 functions
│   └── .eslintrc.json # Arquivo de configuração do ESLint
├── 📂 img
│   └── # Imagens utilizadas no projeto
├── 📂 src
│   └── # Código-fonte principal
├── 📂 controller
│   ├── CameraController.js # Controlador para interação com a câmera
│   ├── ContactsController.js # Controlador para gerenciar os contatos
│   ├── DocumentPreviewController.js # Controlador para pré-visualização de documentos
│   ├── MicrophoneController.js # Controlador para interação com o microfone
│   └── WhatsAppController.js # Controlador principal do WhatsApp
├── 📂 model
│   ├── Chat.js # Modelo de chat
│   ├── Message.js # Modelo de mensagem
│   ├── Model.js # Modelo genérico de dados
│   └── User.js # Modelo de usuário
├── 📂 utils
│   ├── Base64.js # Funções utilitárias para codificação e decodificação Base64
│   ├── ClassEvent.js # Funções para manipulação de eventos customizados
│   ├── Firebase.js # Funções para interação com Firebase
│   ├── Format.js # Funções auxiliares de formatação
│   └── Upload.js # Funções para upload de arquivos
├── app.js # Arquivo principal que inicializa o aplicativo
├── .firebaserc # Configuração do Firebase CLI
├── .gitignore # Arquivo para ignorar arquivos desnecessários no Git
├── firebase.json # Arquivo de configuração do Firebase
├── index.html # Arquivo HTML principal
├── package-lock.json # Versões exatas das dependências instaladas
├── package.json # Gerenciador de dependências e scripts
├── webpack.config.js # Configuração do Webpack
└── README.md # Documentação do projeto
```

## 📦 Pacotes Instalados

### Dependências:

```json
{
  "firebase": "^4.13.1",
  "pdfjs-dist": "^2.0.489",
  "sweetalert2": "^11.16.0",
  "webpack": "^3.1.0",
  "webpack-dev-server": "^2.5.1"
}
```

## 🔧 Como Rodar o Projeto

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/vandinho01/whatssapp-clone

2. **Instale as dependências:**

   ```bash
npm install

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm start

4. **Acesse o projeto no navegador:**
    Abra o navegador e acesse o seguinte endereço: http://localhost:8080

## 🔧 Tecnologias
- **JavaScript: Utilizado para interatividade com a API.**
- **Firebase: Para autenticação e gerenciamento de dados em tempo real.**
- **Webpack: Para empacotamento de arquivos JavaScript e CSS.**
- **SweetAlert2: Para exibição de alertas interativos.**
- **PDF.js: Para visualização de arquivos PDF.**
- **Node.js: Ambiente de execução do JavaScript no servidor.**
