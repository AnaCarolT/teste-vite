<template>
  <!-- Estrutura principal da página -->
  <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
    <!-- Coluna esquerda: Perfil do usuário -->
    <div class="main-left col-span-1">
      <div>
        <!-- Exibe mensagem de carregamento enquanto busca o usuário -->
        <div v-if="loading" class="text-center">Carregando...</div>
        <!-- Exibe o componente de perfil se o usuário for encontrado -->
        <div v-else-if="user">
          <ProfileUsuario :user="user" />
        </div>
        <!-- Exibe mensagem de erro caso o usuário não seja encontrado -->
        <div v-else class="text-center text-red-500">
          Usuário não encontrado.
        </div>
      </div>
    </div>

    <!-- Coluna central: Caixa de posts e feed -->
    <div class="main-center col-span-2 space-y-4">
      <!-- Exibe a caixa de posts apenas para o usuário com ID 11 (main) -->
      <div v-if="user && user.id === 11" class="mb-4">
        <CaixaPost :userId="user.id" @postAdded="addPostToFeed" />
      </div>
      <!-- Exibe o feed com os posts do usuário -->
      <Feed :userId="user?.id" ref="feed" />
    </div>

    <!-- Coluna direita: Componentes "Pessoas que talvez conheça" e "Trends" -->
    <div class="main-right col-span-1 space-y-4">
      <PessoasQueTalvezConheca />
      <Trends />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PessoasQueTalvezConheca from "../components/PessoasQueTalvezConheca.vue";
import Trends from "../components/Trends.vue";
import ProfileUsuario from "../components/ProfileUsuario.vue";
import Feed from "../components/Feed.vue";
import CaixaPost from "../components/CaixaPost.vue";

export default {
  name: "JanelaProfile",
  components: {
    PessoasQueTalvezConheca,
    Trends,
    ProfileUsuario,
    Feed,
    CaixaPost,
  },
  data() {
    return {
      user: null, // Dados do usuário
      loading: true, // Estado de carregamento
    };
  },
  beforeCreate() {
    // Evento antes de recarregar a página
    window.addEventListener("beforeunload", () => {
      const [navigation] = performance.getEntriesByType("navigation");
      if (navigation && navigation.type === "reload") {
        // Remove os dados armazenados no sessionStorage ao recarregar a página
        sessionStorage.removeItem("user-11");
        sessionStorage.removeItem("posts-11");
      }
    });
  },
  methods: {
    // Adiciona um post ao feed utilizando referência do componente Feed
    addPostToFeed(post) {
      this.$refs.feed.addPostToFeed(post);
    },
  },
  async created() {
    const userId = parseInt(this.$route.params.id, 10); // Obtém o ID do usuário da rota

    // Verifica se os dados do usuário 11 estão armazenados no sessionStorage
    if (userId === 11) {
      const storedUser = sessionStorage.getItem("user-11");
      if (storedUser) {
        this.user = JSON.parse(storedUser); // Carrega os dados do usuário armazenados
        this.loading = false;
        return;
      }
    }

    try {
      // Tenta buscar os dados do usuário na API
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      this.user = response.data;

      // Armazena os dados do usuário 11 no sessionStorage
      if (userId === 11) {
        sessionStorage.setItem("user-11", JSON.stringify(this.user));
      }
    } catch (error) {
      // Adiciona dinamicamente o usuário 11 para fins de teste
      if (userId === 11) {
        console.log("Usuário 11 adicionado dinamicamente para fins de teste.");
        this.user = {
          id: 11,
          name: "John Doe",
          username: "Software Developer",
          email: "john.doe@example.com",
          phone: "+1 (555) 123-4567",
          address: {
            city: "San Francisco, CA",
          },
        };
        sessionStorage.setItem("user-11", JSON.stringify(this.user));
      } else {
        console.error("Erro ao buscar dados do usuário:", error);
        this.user = null; // Garante que o usuário será nulo em caso de erro
      }
    } finally {
      this.loading = false; // Define o estado de carregamento como concluído
    }
  },
};
</script>
