<template>
    <div class="flex">
      <!-- Lista de Notificações -->
      <div class="w-3/4 p-4">
        <!-- Exibe "Carregando..." enquanto os dados estão sendo carregados -->
        <div v-if="loading" class="text-center">Carregando...</div>
        <div v-else class="grid gap-4">
          <!-- Itera sobre os usuários e exibe notificações -->
          <div
            v-for="user in users"
            :key="user.id"
            class="p-4 bg-white border border-gray-200 rounded-lg shadow"
          >
            <p class="text-sm font-semibold">
              <!-- Nome do usuário clicável para navegar para o perfil -->
              <router-link
                :to="`/profile/${user.id}`"
                class="text-indigo-800 hover:underline"
                >{{ user.name }}</router-link
              >
              visualizou o seu perfil!
              <!-- Ícone de alerta flutuando à direita -->
              <span class="float-right">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="rgba(230, 0, 0, 0.7)"
                  class="size-6 ml-2 inline-block"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </p>
          </div>
        </div>
      </div>
  
      <!-- Barra Lateral -->
      <div class="w-1/4 p-4 bg-gray-100">
        <!-- Componente Pessoas Que Talvez Conheça -->
        <PessoasQueTalvezConheca />
  
        <!-- Componente de Tendências -->
        <Trends class="mt-4" />
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import PessoasQueTalvezConheca from "../components/PessoasQueTalvezConheca.vue"; // Ajuste o caminho conforme necessário
  import Trends from "../components/Trends.vue"; // Ajuste o caminho conforme necessário
  
  export default {
    name: "Usuarios",
    components: {
      PessoasQueTalvezConheca, // Sugestões de pessoas
      Trends, // Exibe tendências
    },
    data() {
      return {
        users: [], // Lista de usuários carregados da API
        loading: true, // Indica se os dados estão sendo carregados
      };
    },
    created() {
      this.fetchUsers(); // Chama o método para buscar usuários ao criar o componente
    },
    methods: {
      /**
       * Busca usuários da API JSONPlaceholder.
       * Atualiza a lista de usuários e gerencia o estado de carregamento.
       */
      async fetchUsers() {
        try {
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
          );
          this.users = response.data; // Armazena os usuários na variável 'users'
        } catch (error) {
          console.error("Erro ao buscar usuários:", error);
        } finally {
          this.loading = false; // Define 'loading' como falso após a conclusão
        }
      },
    },
  };
  </script>
  