<template>
  <!-- Layout principal com duas colunas: detalhes do post e barra lateral -->
  <div class="bg-gray-100 min-h-screen p-8 grid grid-cols-4 gap-4">
    <!-- Coluna principal: Detalhes do post -->
    <div class="col-span-3">
      <!-- Mostra mensagem de carregamento enquanto os dados estão sendo buscados -->
      <div v-if="loading" class="text-center">Carregando detalhes do post...</div>

      <!-- Exibe o post se encontrado -->
      <div v-else-if="post" class="p-4 bg-white border border-gray-200 rounded-lg mb-4">
        <!-- Cabeçalho do post -->
        <div class="mb-6 flex items-center justify-between">
          <div class="flex items-center space-x-6">
            <!-- Avatar do usuário -->
            <img
              :src="`https://i.pravatar.cc/300?img=${post.userId}`"
              class="w-[40px] rounded-full"
              alt="Avatar do usuário"
            />
            <!-- Nome do usuário com link para o perfil -->
            <router-link
              :to="`/profile/${post.userId}`"
              class="font-bold text-indigo-800 hover:underline"
            >
              {{ getUserName(post.userId) }}
            </router-link>
          </div>
          <p class="text-gray-600">Agora</p>
        </div>

        <!-- Corpo do post -->
        <p class="mt-2 text-gray-700">{{ post.body }}</p>

        <!-- Estatísticas do post -->
        <div class="my-6 flex justify-between">
          <!-- Seção de curtidas e comentários -->
          <div class="flex space-x-6">
            <div class="flex items-center space-x-2">
              <!-- Ícone de curtidas -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                ></path>
              </svg>
              <span class="text-gray-500 text-xs">82 Curtidas</span>
            </div>
            <div class="flex items-center space-x-2">
              <!-- Ícone de comentários -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                ></path>
              </svg>
              <span class="text-gray-500 text-xs">0 Comentários</span>
            </div>
          </div>
          <!-- Ícone de opções -->
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Mensagem de erro se o post não for encontrado -->
      <div v-else class="text-center text-gray-600">Post não encontrado!</div>
    </div>

    <!-- Barra lateral com "Pessoas Que Talvez Conheça" e "Trends" -->
    <div class="col-span-1 space-y-4">
      <PessoasQueTalvezConheca />
      <Trends />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PessoasQueTalvezConheca from "../components/PessoasQueTalvezConheca.vue";
import Trends from "../components/Trends.vue";

export default {
  name: "DetalhesPosts",
  components: {
    PessoasQueTalvezConheca,
    Trends,
  },
  data() {
    return {
      post: null, // Dados do post
      users: {}, // Mapeamento de IDs de usuários para nomes
      loading: true, // Indicador de carregamento
    };
  },
  async created() {
    const postId = parseInt(this.$route.params.postId, 10); // Obtém o ID do post da rota

    try {
      // Tenta buscar o post na API
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      this.post = response.data;
    } catch (error) {
      console.warn("Post não encontrado na API, verificando o sessionStorage.");

      // Verifica no sessionStorage se o post não foi encontrado na API
      const storedPosts = JSON.parse(sessionStorage.getItem("posts-11")) || [];
      this.post = storedPosts.find((post) => post.id === postId) || null;
    }

    // Busca os dados dos usuários, se necessário
    try {
      const usersResponse = await axios.get("https://jsonplaceholder.typicode.com/users");
      this.users = usersResponse.data.reduce((acc, user) => {
        acc[user.id] = user.name;
        return acc;
      }, {});
    } catch (error) {
      console.error("Erro ao buscar dados de usuários:", error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    getUserName(userId) {
      // Retorna o nome do usuário pelo ID ou "Usuário Desconhecido"
      if (userId === 11) {
        return "John Doe";
      }
      return this.users[userId] || "Usuário Desconhecido";
    },
  },
};
</script>
