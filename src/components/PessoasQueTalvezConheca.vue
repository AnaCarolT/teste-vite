<template>
  <!-- Componente de sugestão de pessoas que talvez você conheça -->
  <div class="p-4 bg-white border border-gray-200 rounded-lg shadow">
    <h3 class="mb-6 text-xl">Pessoas que talvez conheça</h3>

    <div class="space-y-4">
      <!-- Lista de usuários sugeridos -->
      <div
        v-for="user in filteredUsers"
        :key="user.id"
        class="flex items-center justify-between flex-wrap"
      >
        <!-- Avatar e nome do usuário -->
        <div class="flex items-center space-x-2">
          <img
            :src="'https://i.pravatar.cc/300?img=' + user.id"
            class="w-[40px] rounded-full"
            alt="Avatar do usuário"
          />
          <p class="text-xs truncate">
            <strong>{{ user.name }}</strong>
          </p>
        </div>

        <!-- Botão para visualizar o perfil do usuário -->
        <button
          @click="navigateToProfile(user.id)"
          class="py-2 px-3 bg-indigo-800 text-white text-xs rounded-lg hover:bg-indigo-700"
        >
          Mostrar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      users: [], // Todos os usuários buscados da API
      randomUsers: [], // Usuários aleatórios filtrados
    };
  },
  computed: {
    filteredUsers() {
      // Filtra os usuários para excluir o usuário atual (baseado nos parâmetros da rota)
      const currentUserId = parseInt(this.$route.params.id, 10);
      return this.randomUsers.filter((user) => user.id !== currentUserId);
    },
  },
  methods: {
    async fetchUsers() {
      try {
        // Faz a requisição à API para buscar usuários
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        this.users = response.data;

        // Seleciona quatro usuários aleatórios, garantindo que não sejam duplicados
        this.randomUsers = this.getRandomUsers(
          this.users,
          4,
          parseInt(this.$route.params.id, 10)
        );
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    },
    getRandomUsers(users, count, currentUserId) {
      // Embaralha a lista de usuários e seleciona os necessários
      const shuffled = [...users].sort(() => 0.5 - Math.random());
      const selected = [];

      // Garante que o ID do usuário atual não esteja nos selecionados
      for (let i = 0; i < shuffled.length && selected.length < count; i++) {
        if (shuffled[i].id !== currentUserId) {
          selected.push(shuffled[i]);
        }
      }

      return selected;
    },
    navigateToProfile(userId) {
      // Navega para home e depois para o perfil do usuário
      if (this.$route.name === "detalhes-profile") {
        this.$router.push({ name: "home" }).then(() => {
          this.$router.push({ name: "detalhes-profile", params: { id: userId } });
        });
      } else {
        this.$router.push({ name: "detalhes-profile", params: { id: userId } });
      }
    },
  },
  mounted() {
    // Chama a função de busca quando o componente é montado
    this.fetchUsers();
  },
};
</script>

<style scoped>
/* Garante que o layout não fique "amassado" em telas menores */
.flex-wrap {
  flex-wrap: wrap;
}
img {
  max-width: 100%;
  height: auto;
}
</style>



<!-- Codigo para teste local -->
<!-- <template>
  <div class="p-4 bg-white border border-gray-200 rounded-lg shadow">
    <h3 class="mb-6 text-xl">Pessoas que talvez conheça</h3>

    <div class="space-y-4">

      <div
        v-for="user in filteredUsers"
        :key="user.id"
        class="flex items-center justify-between flex-wrap"
      >

        <div class="flex items-center space-x-2">
          <img
            :src="'https://i.pravatar.cc/300?img=' + user.id"
            class="w-[40px] rounded-full"
            alt="Avatar do usuário"
          />
          <p class="text-xs truncate">
            <strong>{{ user.name }}</strong>
          </p>
        </div>
        <a
          :href="`${baseURL}profile/${user.id}`"
          class="py-2 px-3 bg-indigo-800 text-white text-xs rounded-lg hover:bg-indigo-700"
        >
          Mostrar
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [], // Todos os usuários buscados da API
      randomUsers: [], // Usuários aleatórios filtrados
      baseURL: '/', // Define the base URL dynamically
    };
  },
  computed: {
    filteredUsers() {
      // Filtra os usuários para excluir o usuário atual (baseado nos parâmetros da rota)
      const currentUserId = parseInt(this.$route.params.id);
      return this.randomUsers.filter((user) => user.id !== currentUserId);
    },
  },
  methods: {
    async fetchUsers() {
      try {
        // Faz a requisição à API para buscar usuários
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/users'
        );
        this.users = response.data;

        // Seleciona quatro usuários aleatórios, garantindo que não sejam duplicados
        this.randomUsers = this.getRandomUsers(
          this.users,
          4,
          parseInt(this.$route.params.id)
        );
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    },
    getRandomUsers(users, count, currentUserId) {
      // Embaralha a lista de usuários e seleciona os necessários
      const shuffled = [...users].sort(() => 0.5 - Math.random());
      const selected = [];

      // Garante que o ID do usuário atual não esteja nos selecionados
      for (let i = 0; i < shuffled.length && selected.length < count; i++) {
        if (shuffled[i].id !== currentUserId) {
          selected.push(shuffled[i]);
        }
      }

      return selected;
    },
  },
  mounted() {
    // Chama a função de busca quando o componente é montado
    this.fetchUsers();
    this.baseURL = import.meta.env.BASE_URL || '/'; // Define o base URL dinamicamente
  },
};
</script>

<style scoped>
/* Garante que o layout não fique "amassado" em telas menores */
.flex-wrap {
  flex-wrap: wrap;
}
img {
  max-width: 100%;
  height: auto;
}
</style> -->
