<template>
  <!-- Link para o perfil do usuário principal -->
  <a :href="`${baseURL}profile/${main}`">
    <!-- Imagem do perfil do usuário principal com efeitos de hover -->
    <img
      :src="`https://i.pravatar.cc/50?img=${main}`"
      class="rounded-full border-4 border-blue-900 transition-transform duration-600 hover:scale-105 hover:border-indigo-500"
      alt="User Avatar"
    />
  </a>
</template>

<script>
export default {
  data() {
    return {
      // ID do usuário principal que está logado
      main: 11, // Substituir pelo ID do usuário autenticado
      baseURL: '/', // Caminho base dinâmico
    };
  },
  mounted() {
    // Define o baseURL dinamicamente com base no ambiente do Vite
    this.baseURL = import.meta.env.BASE_URL || '/';
  },
};
</script>
