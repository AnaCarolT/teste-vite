# Projeto Rede Social com Vue.js e Tailwind CSS

Este projeto foi desenvolvido para explorar as funcionalidades do Vue.js e Tailwind CSS, consumindo dados de uma API aberta para criar uma interface funcional e responsiva de uma rede social fictícia.

---
## 🖥️ **Deploy no GitHub Pages**

O projeto foi configurado para funcionar no GitHub Pages utilizando `baseURL` corretamente. Acesse:
- [Demo do Projeto](https://anacarolt.github.io/teste-vite/)

---

## 🎯 **Objetivo do Projeto**

O objetivo principal era criar um sistema funcional utilizando **Vue.js** e **Tailwind CSS**, consumindo adequadamente uma API aberta para simular funcionalidades básicas de uma rede social, como:
- Perfis de usuários.
- Sistema de postagens.
- Mensagens interativas em um chat.
- Notificações e tendências.
  
---

## ✔️ **To-Do List Completos**

### **1. Configurações Iniciais**
- Início do projeto com `Vite` para facilitar visualização em tempo real.
- Utilização de:
  - [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) para dados de posts e usuários.
  - [Pravatar](https://pravatar.cc/) para imagens dinâmicas de perfis.
  - [HeroIcons](https://heroicons.com/) para ícones.

### **2. Componentização**
- Criação dos seguintes componentes para maior modularidade:
  - **UserLogado**: Simula o usuário autenticado (`id: 11`).
  - **ProfileUsuario**: Exibe informações do usuário.
  - **Feed**: Mostra postagens filtradas por ID do usuário.
  - **PessoasQueTalvezConheca**: Lista de usuários aleatórios.
  - **CaixaPost**: Disponível apenas para o usuário "logado".
  - **Trends**: Tendências fixas, devido à ausência de API correspondente.

### **3. Views Criadas**
- **MenuPrincipal**: Página inicial com posts de todos os usuários.
- **JanelaProfileUsuario**: Página do perfil, com posts e detalhes do usuário.
- **Usuarios**: Lista de usuários com detalhes básicos.
- **Notificacoes**: Notificações simuladas, baseadas em IDs de usuários.
- **Chat**: Simula uma conversa com um bot usando comentários aleatórios da API.
- **DetalhesPosts**: Detalhes de postagens individuais.

### **4. Funcionalidades Implementadas**
- Filtragem de dados:
  - Posts exibidos por ID do usuário.
  - Exclusão do usuário atual na lista de "Pessoas que talvez conheça".
- **Sessão simulada**:
  - Informações do usuário "logado" (`id: 11`) e seus posts armazenadas no `sessionStorage` para persistência temporária.
- **Criação de Posts**:
  - Posts adicionados tanto na API quanto localmente (armazenados na sessão para evitar sobrescrições).
- **Navegação e Links**:
  - Navegação entre rotas utilizando `<router-link>` e `@click` para evitar problemas de compatibilidade com o GitHub Pages.

---

## 🛠️ **Desafios Enfrentados**

### **Problemas e Soluções**
1. **Persistência de Dados Entre Rotas:**
   - Problema: Dados do usuário e posts eram perdidos ao navegar entre rotas.
   - Solução: Implementação de `sessionStorage` para manter os dados.

2. **IDs de Posts na API:**
   - Problema: IDs de novos posts na API sempre começavam em `101`, causando sobrescrições.
   - Solução: Armazenar os novos posts localmente para uso.

3. **Compatibilidade com GitHub Pages:**
   - Problema: Rotas não eram reconhecidas corretamente no GitHub Pages.
   - Solução: Ajuste no `index.js` para usar `createWebHashHistory` e evitar problemas de navegação.

4. **Problemas com `<a>` e Links Dinâmicos:**
   - Problema: Uso de `<a>` causava recarregamento total da página.
   - Solução: Substituição por `<router-link>` ou `@click` para navegação suave.

---

## 📖 **Organização do Código**

### **Estrutura de Pastas**
```
src/
├── components/
│   ├── CaixaPost.vue
│   ├── Feed.vue
│   ├── PessoasQueTalvezConheca.vue
│   ├── ProfileUsuario.vue
│   ├── Trends.vue
│   └── UserLogado.vue
├── views/
│   ├── Chat.vue
│   ├── DetalhesPosts.vue
│   ├── JanelaProfileUsuario.vue
│   ├── MenuPrincipal.vue
│   ├── Notificacoes.vue
│   └── Usuarios.vue
├── router/
│   └── index.js
├── App.vue
└── main.js
```

---

## 🌟 **Conceitos Adquiridos**

- Organização e componentização em Vue.js.
- Uso prático de Tailwind CSS para estilização.
- Integração de APIs externas com `axios`.
- Persistência de dados no navegador com `sessionStorage`.
- Solução de problemas relacionados ao GitHub Pages.

---

## 🚀 **Como Executar**

1. Clone o repositório:
   ```bash
   git clone https://github.com/AnaCarolT/teste-vite.git
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

---


# projeto_rede_social

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
