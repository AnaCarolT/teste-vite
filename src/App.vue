<template>
  <!-- Navegação principal -->
  <nav class="py-10 px-8 border-b border-gray-400 bg-indigo-200">
    <div class="max-w-7xl mx-auto">
      <div class="flex items-center justify-between">
        <!-- Logo e nome -->
        <div class="menu-left flex items-center space-x-2">
          <router-link
            to="/"
            class="flex items-center text-2xl font-bold text-indigo-800"
          >
            <span>UP</span>
            <!-- Ícone do logo -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-7 h-7 ml-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m4.5 18.75 7.5-7.5 7.5 7.5"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m4.5 12.75 7.5-7.5 7.5 7.5"
              />
            </svg>
            <span class="ml-3">Social Media</span>
          </router-link>
        </div>

        <!-- Ícones de navegação -->
        <div class="menu-center flex space-x-12">
          <!-- Ícone Home -->
          <router-link to="/" class="text-black-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke-width="2"
              stroke="currentColor"
              class="w-6 h-6 hover:scale-105 hover:fill-indigo-800"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </router-link>

          <!-- Ícone Usuários -->
          <router-link to="/users" class="text-black-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke-width="2"
              stroke="currentColor"
              class="w-6 h-6 hover:scale-105 hover:fill-blue-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              />
            </svg>
          </router-link>

          <!-- Ícone Chat -->
          <router-link to="/chat" class="text-black-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke-width="2"
              stroke="currentColor"
              class="w-6 h-6 hover:scale-105 hover:fill-gray-200"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
              />
            </svg>
          </router-link>

          <!-- Ícone Notificações -->
          <router-link to="/notificacoes">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke-width="2"
              stroke="currentColor"
              class="w-6 h-6 hover:scale-105 hover:fill-yellow-300"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              ></path>
            </svg>
          </router-link>
        </div>

        <!-- Avatar do usuário logado -->
        <div v-if="$route.params.id !== '11'">
          <UserLogado />
        </div>
      </div>
    </div>
  </nav>

  <!-- Conteúdo principal -->
  <main class="px-8 py-6 bg-gray-100">
    <RouterView />
  </main>
</template>

<script>
import UserLogado from "./components/UserLogado.vue";

export default {
  name: "App",
  components: {
    UserLogado,
  },
};
</script>
