<template>
  <!-- Componente de Exibição de Perfil do Usuário -->
  <div class="p-4 bg-white border border-gray-200 text-center rounded-lg shadow">
    <!-- Informações básicas do usuário -->
    <div class="text-center mb-8 md:mb-0">
      <!-- Imagem do perfil do usuário -->
      <img
        :src="'https://i.pravatar.cc/300?img=' + user.id"
        alt="Profile Picture"
        class="mb-4 rounded-full mx-auto border-4 border-blue-900"
      />
      <!-- Nome e nome de usuário -->
      <h1 class="text-2xl font-bold text-indigo-800 dark:text-white mb-2">
        {{ user.name }}
      </h1>
      <p class="text-gray-600 dark:text-gray-300">{{ user.username }}</p>
    </div>

    <!-- Estatísticas do perfil -->
    <div class="mt-6 flex justify-around mb-4">
      <p class="text-xs text-gray-500">182 amigos</p>
      <p class="text-xs text-gray-500">120 posts</p>
    </div>

    <!-- Detalhes adicionais do usuário -->
    <div class="mt-6 justify-around mb-4">
      <!-- Seção 'Sobre mim' -->
      <h2 class="text-xl font-semibold text-indigo-800 dark:text-white mb-4">
        Sobre mim
      </h2>
      <p class="text-gray-700 dark:text-gray-300 mb-6">
        Nada adicionado.
      </p>

      <!-- Seção de Contato -->
      <h2 class="text-xl font-semibold text-indigo-800 dark:text-white mb-4">
        Contato
      </h2>
      <ul class="space-y-2 text-gray-700 dark:text-gray-300">
        <!-- Email -->
        <li class="flex items-center">
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
        <!-- Telefone -->
        <li class="flex items-center">
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
        <!-- Cidade -->
        <li class="flex items-center">
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
</template>

<script>
export default {
  props: {
    // Propriedade que recebe os dados do usuário
    user: {
      type: Object,
      required: true, // Torna o envio da prop obrigatório
    },
  },
};
</script>
