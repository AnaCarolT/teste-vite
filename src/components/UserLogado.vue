<template>
  <!-- Link clicável para o perfil do usuário principal -->
  <div 
    @click="navigateToProfile" 
    class="cursor-pointer" 
    v-show="!$route.path.includes('/profile/')"  <!-- Ensures this is hidden on any profile page -->
  >
    <!-- Imagem do perfil do usuário principal com efeitos de hover -->
    <img
      :src="`https://i.pravatar.cc/50?img=${main}`"
      class="rounded-full border-4 border-blue-900 transition-transform duration-600 hover:scale-105 hover:border-indigo-500"
      alt="User Avatar"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      // ID do usuário principal que está logado
      main: 11, // Substituir pelo ID do usuário autenticado
    };
  },
  methods: {
    navigateToProfile() {
      // Navega para a rota do perfil do usuário
      this.$router.push(`/profile/${this.main}`);
    },
  },
};
</script>
