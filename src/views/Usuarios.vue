<template>
  <div class="flex">
    <!-- Conteúdo Principal -->
    <div class="w-3/4 p-4">
      <!-- Mostra mensagem de carregamento enquanto os dados estão sendo buscados -->
      <div v-if="loading" class="text-center">Carregando...</div>
      <div v-else class="grid gap-4">
        <!-- Itera sobre a lista de usuários e exibe suas informações -->
        <div
          v-for="user in users"
          :key="user.id"
          class="flex items-center border p-4 rounded shadow bg-white border-gray-200 rounded-lg"
        >
          <!-- Avatar do usuário -->
          <img
            :src="'https://i.pravatar.cc/300?img=' + user.id"
            alt="Avatar do Usuário"
            class="w-20 h-20 rounded-full mr-4 object-cover"
          />
          <!-- Informações do usuário -->
          <div>
            <!-- Nome do usuário clicável -->
            <router-link :to="`/profile/${user.id}`" class="font-bold text-lg text-indigo-600 hover:underline">
              {{ user.name }}
            </router-link>
            <!-- Lista de informações adicionais -->
            <ul class="space-y-1 mt-2">
              <li class="flex items-center">
                <!-- Ícone e email do usuário -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-indigo-800 dark:text-blue-900"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                  />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                {{ user.email }}
              </li>
              <li class="flex items-center">
                <!-- Ícone e telefone do usuário -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-indigo-800 dark:text-blue-900"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                  />
                </svg>
                {{ user.phone }}
              </li>
              <li class="flex items-center">
                <!-- Ícone e cidade do usuário -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-indigo-800 dark:text-blue-900"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ user.address.city }}
              </li>
            </ul>
          </div>
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
import PessoasQueTalvezConheca from "../components/PessoasQueTalvezConheca.vue"; // Importa componente para sugestões de amizade
import Trends from "../components/Trends.vue"; // Importa componente para tendências

export default {
  name: "Usuarios", // Nome do componente
  components: {
    PessoasQueTalvezConheca, // Registro do componente PessoasQueTalvezConheca
    Trends, // Registro do componente Trends
  },
  data() {
    return {
      users: [], // Lista de usuários buscada da API
      loading: true, // Indica se os dados estão sendo carregados
    };
  },
  created() {
    this.fetchUsers(); // Chama o método para buscar usuários quando o componente é criado
  },
  methods: {
    /**
     * Método para buscar usuários da API JSONPlaceholder.
     */
    async fetchUsers() {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        this.users = response.data; // Salva os dados dos usuários na propriedade 'users'
      } catch (error) {
        console.error("Erro ao buscar usuários:", error); // Exibe erro no console
      } finally {
        this.loading = false; // Define 'loading' como falso após a conclusão
      }
    },
  },
};
</script>
