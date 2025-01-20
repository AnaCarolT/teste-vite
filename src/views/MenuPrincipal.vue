<template>
    <!-- Estrutura principal da página -->
    <div class="max-w-7xl mx-auto grid grid-cols-3 gap-4">
      <!-- Coluna principal esquerda -->
      <div class="main-left col-span-2 space-y-4">
        <!-- Componente Caixa de posts -->
        <CaixaPost :isMainRoute="true" @postAdded="addPostToFeed" />
        <!-- Componente Feed -->
        <Feed :isMainRoute="true" ref="feed" />
      </div>
  
      <!-- Coluna direita com recomendações e tendências -->
      <div class="main-right col-span-1 space-y-4">
        <!-- Componente Pessoas que Talvez Conheça -->
        <PessoasQueTalvezConheca />
        <!-- Componente Trends -->
        <Trends />
      </div>
    </div>
  </template>
  
  <script>
  import PessoasQueTalvezConheca from '../components/PessoasQueTalvezConheca.vue';
  import Trends from '../components/Trends.vue';
  import CaixaPost from '../components/CaixaPost.vue';
  import Feed from '../components/Feed.vue';
  
  export default {
    name: 'MenuPrincipal',
    components: {
      PessoasQueTalvezConheca, // Componente que exibe sugestões de pessoas
      Trends, // Componente que exibe tendências populares
      CaixaPost, // Componente para criar novos posts
      Feed, // Componente que exibe o feed de posts
    },
    methods: {
      /**
       * Adiciona um novo post ao feed.
       * Este método utiliza uma referência para o componente Feed.
       * @param {Object} post - O novo post que será adicionado.
       */
      addPostToFeed(post) {
        this.$refs.feed.addPostToFeed(post); // Adiciona o post diretamente no componente Feed
      },
    },
  };
  </script>
  