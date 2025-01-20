import { createRouter, createWebHashHistory } from 'vue-router'; // Usando Hash History para GitHub Pages
import MenuPrincipal from '@/views/MenuPrincipal.vue';
import Usuarios from '@/views/Usuarios.vue'; // Este será o componente usado para exibir a lista de usuários
import Chat from '@/views/Chat.vue';
import JanelaProfileUsuario from '@/views/JanelaProfileUsuario.vue';
import DetalhesPosts from '@/views/DetalhesPosts.vue'; // Componente para detalhes dos posts
import Notificacoes from '@/views/Notificacoes.vue';

const router = createRouter({
  history: createWebHashHistory('/teste-vite/'), // Substitua 'repository-name' pelo nome do seu repositório
  routes: [
    {
      path: '/',
      name: 'home',
      component: MenuPrincipal,
    },
    {
      path: '/users', // A rota para a lista de usuários
      name: 'users',
      component: Usuarios, // Usando Usuarios.vue aqui
    },
    {
      path: '/profile/:id',
      name: 'detalhes-profile',
      component: JanelaProfileUsuario,
    },
    {
      path: '/post/:postId',
      name: 'detalhes-posts',
      component: DetalhesPosts, // Rota para detalhes do post
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat,
    },
    {
      path: '/notificacoes',
      name: 'notificacoes',
      component: Notificacoes,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: () => import('@/views/NotFound.vue'), // Componente opcional para 404
    },
  ],
});

export default router;
