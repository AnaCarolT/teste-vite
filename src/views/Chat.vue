<template>
    <!-- Container principal do layout -->
    <div class="bg-gray-100 min-h-screen mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
      <!-- Coluna da esquerda (informações do bot) -->
      <div class="main-left md:col-span-1">
        <!-- Cartão com informações sobre o bot -->
        <div class="p-4 bg-white border border-gray-200 rounded-lg">
          <div class="space-y-4">
            <!-- Cabeçalho com ícone do bot e informações -->
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <!-- Ícone do bot com interação hover -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-[40px] rounded-full hover:fill-yellow-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                  />
                </svg>
                <p class="text-xs"><strong>Bot em Treinamento</strong></p>
              </div>
              <!-- Informações de tempo da mensagem -->
              <span class="text-xs text-gray-500">Agora</span>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Coluna central (chat principal) -->
      <div class="main-center md:col-span-3 space-y-4">
        <!-- Seção de mensagens -->
        <div class="bg-white border border-gray-200 rounded-lg">
          <div class="flex flex-col flex-grow p-4 space-y-4">
            <!-- Itera sobre as mensagens existentes -->
            <div
              v-for="message in messages"
              :key="message.id"
              :class="{
                'flex w-full mt-2 space-x-3 max-w-md ml-auto justify-end': message.type === 'bot',
                'flex w-full mt-2 space-x-3 max-w-md': message.type === 'user',
              }"
            >
              <!-- Avatar do usuário ou bot -->
              <div
                class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"
                :class="{ 'order-2 ml-2': message.type === 'bot' }"
              >
                <!-- Exibe a imagem do usuário se for mensagem do tipo 'user' -->
                <img
                  v-if="message.type === 'user'"
                  src="https://i.pravatar.cc/300?img=11"
                  class="w-[40px] rounded-full"
                  alt="Avatar do usuário"
                />
                <!-- Exibe o ícone padrão se for mensagem do bot -->
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-[40px] rounded-full"
                  alt="Avatar do bot"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                  />
                </svg>
              </div>
              <!-- Conteúdo da mensagem -->
              <div>
                <div
                  :class="{
                    'bg-gray-300 p-3 rounded-r-lg rounded-bl-lg': message.type === 'user',
                    'bg-indigo-900 text-white p-4 rounded-l-lg rounded-br-lg': message.type === 'bot',
                  }"
                >
                  <p class="text-sm">{{ message.text }}</p>
                </div>
                <!-- Hora da mensagem -->
                <div
                  :class="{
                    'text-xs text-gray-500 leading-none': true,
                    'flex justify-end': message.type === 'bot',
                  }"
                >
                  Agora
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Área de entrada de novas mensagens -->
        <div class="bg-white border border-gray-200 rounded-lg">
          <div class="p-4">
            <!-- Campo de texto para escrever a mensagem -->
            <textarea
              v-model="newMessage"
              class="p-4 w-full bg-gray-100 rounded-lg"
              placeholder="Fale com o bot!"
            ></textarea>
          </div>
          <!-- Botão para enviar a mensagem -->
          <div class="p-4 border-t border-gray-100 flex justify-end">
            <button
              @click="addMessage"
              class="inline-block py-4 px-6 bg-indigo-900 text-white rounded-lg"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "Chat",
    data() {
      return {
        // Lista de mensagens predefinidas
        messages: [
          { id: 1, type: "user", text: "Ola!" },
          { id: 2, type: "user", text: "Tudo bem?" },
          { id: 3, type: "bot", text: "Tudo!" },
        ],
        newMessage: "", // Mensagem digitada pelo usuário
      };
    },
    methods: {
      async addMessage() {
        if (!this.newMessage.trim()) {
          alert("Digite algo");
          return;
        }
  
        // Adicionar mensagem do usuário
        this.messages.push({
          id: Date.now(),
          type: "user",
          text: this.newMessage.trim(),
        });
  
        this.newMessage = "";
  
        // Buscar resposta aleatória do bot
        try {
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/comments"
          );
          const randomComment =
            response.data[Math.floor(Math.random() * response.data.length)];
          this.messages.push({
            id: Date.now() + 1,
            type: "bot",
            text: randomComment.body,
          });
        } catch (error) {
          console.error("Erro ao buscar resposta do bot:", error);
        }
      },
    },
  };
  </script>
  