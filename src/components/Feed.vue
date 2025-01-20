<template>
  <div>
    <!-- Exibição de carregamento enquanto os dados não são carregados -->
    <div v-if="loading" class="text-center">Carregando...</div>
    <div v-else>
      <!-- Verifica se há posts filtrados para exibir -->
      <div v-if="filteredPosts.length > 0">
        <!-- Renderiza cada post filtrado -->
        <div
          v-for="post in filteredPosts"
          :key="post.id"
          class="p-4 bg-white border border-gray-200 rounded-lg mb-4 cursor-pointer hover:shadow-xl"
          @click="navigateToDetalhesPosts(post.id)"
        >
          <!-- Cabeçalho do post com imagem do usuário e nome clicável -->
          <div class="mb-6 flex items-center justify-between">
            <div class="flex items-center space-x-6">
              <!-- Imagem do usuário -->
              <img
                :src="`https://i.pravatar.cc/300?img=${post.userId}`"
                class="w-[40px] rounded-full"
                alt="User Avatar"
              />
              <!-- Nome do usuário clicável para redirecionar para o perfil -->
              <router-link
                :to="`/profile/${post.userId}`"
                @click.stop
                :class="{
                  'font-bold text-indigo-800 hover:underline':
                    $route.params.id != post.userId.toString(),
                  'font-bold text-indigo-800 pointer-events-none':
                    $route.params.id == post.userId.toString(),
                }"
              >
                {{ getUserName(post.userId) }}
              </router-link>
            </div>

            <!-- Data de publicação do post -->
            <p class="text-gray-600">Agora</p>
          </div>

          <!-- Corpo do post -->
          <p class="mt-2 text-gray-700">{{ post.body }}</p>

          <!-- Estatísticas e ações do post -->
          <div class="my-6 flex justify-between">
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

            <div>
              <!-- Ícone de opções do post -->
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
      </div>
      <div v-else class="text-center text-gray-600">
        Parece que não tem nenhum post ainda!
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Feed",
  props: {
    isMainRoute: {
      type: Boolean,
      default: false, // Indica se está na rota principal
    },
    userId: {
      type: Number, // Identificador do usuário, se aplicável
      required: false,
    },
  },
  data() {
    return {
      posts: [], // Lista de posts a serem exibidos
      users: {}, // Informações de usuários
      loading: true, // Indica se os dados estão sendo carregados
    };
  },
  computed: {
    filteredPosts() {
      // Filtra os posts com base no ID do usuário, se fornecido
      return this.userId
        ? this.posts.filter((post) => post.userId === this.userId)
        : this.posts.sort((a, b) => b.userId - a.userId);
    },
  },
  async created() {
    try {
      console.log("Carregando posts e usuários da API");
      const [postsResponse, usersResponse] = await Promise.all([
        axios.get("https://jsonplaceholder.typicode.com/posts"),
        axios.get("https://jsonplaceholder.typicode.com/users"),
      ]);

      // Define os dados de posts e usuários
      this.posts = postsResponse.data;

      this.users = usersResponse.data.reduce((acc, user) => {
        acc[user.id] = user.name;
        return acc;
      }, {});

      // Carrega posts armazenados na sessão
      const storedPosts = JSON.parse(sessionStorage.getItem("posts-11")) || [];
      console.log(
        "Carregando posts armazenados para o usuário 11:",
        storedPosts
      );
      this.posts = [...this.posts, ...storedPosts].filter(
        (post, index, self) => index === self.findIndex((p) => p.id === post.id) // Evita duplicatas
      );
    } catch (error) {
      console.error("Erro ao carregar posts ou usuários:", error);
    } finally {
      this.loading = false; // Indica que o carregamento terminou
    }
  },
  methods: {
    getUserName(userId) {
      // Retorna o nome do usuário com base no ID
      if (userId === 11) {
        return "John Doe";
      }
      return this.users[userId] || "Usuário Desconhecido";
    },
    addPostToFeed(post) {
      console.log("Adicionando post ao estado local:", post);

      // Adiciona o post ao estado local
      this.posts.unshift(post);

      // Persiste novos posts para o usuário 11 no sessionStorage
      if (post.userId === 11) {
        const storedPosts =
          JSON.parse(sessionStorage.getItem("posts-11")) || [];
        if (!storedPosts.some((p) => p.id === post.id)) {
          storedPosts.unshift(post);
          sessionStorage.setItem("posts-11", JSON.stringify(storedPosts));
        }
      }
    },
    navigateToDetalhesPosts(postId) {
      // Navega para a página de detalhes do post
      this.$router.push(`/post/${postId}`);
    },
  },
};
</script>
