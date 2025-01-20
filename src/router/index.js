import { createRouter, createWebHistory } from "vue-router";
import MenuPrincipal from "@/views/MenuPrincipal.vue";
import Usuarios from "@/views/Usuarios.vue"; // Este será o componente usado para exibir a lista de usuários
import Chat from "@/views/Chat.vue";
import JanelaProfileUsuario from "@/views/JanelaProfileUsuario.vue";
import DetalhesPosts from "@/views/DetalhesPosts.vue"; // Importar componente
import Notificacoes from "@/views/Notificacoes.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/teste-vite'),
  routes: [
    {
      path: "/",
      name: "home",
      component: MenuPrincipal,
    },
    {
      path: "/users", // A rota para a lista de usuários
      name: "users",
      component: Usuarios, // Usando Usuarios.vue aqui
    },
    {
      path: "/profile/:id",
      name: "detalhes-profile",
      component: JanelaProfileUsuario,
    },
    {
      path: "/post/:postId",
      name: "detalhes-posts",
      component: DetalhesPosts, // Rota para detalhes do post
    },
    {
      path: "/chat",
      name: "chat",
      component: Chat,
    },
    {
      path: "/notificacoes",
      name: "notificacoes",
      component: Notificacoes,
    },
  ],
});

export default router;
