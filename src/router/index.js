import { createRouter, createWebHashHistory } from 'vue-router'; // Use hash history
import MenuPrincipal from '@/views/MenuPrincipal.vue';
import Usuarios from '@/views/Usuarios.vue';
import Chat from '@/views/Chat.vue';
import JanelaProfileUsuario from '@/views/JanelaProfileUsuario.vue';
import DetalhesPosts from '@/views/DetalhesPosts.vue';
import Notificacoes from '@/views/Notificacoes.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL), // Hash-based routing
  routes: [
    {
      path: '/',
      name: 'home',
      component: MenuPrincipal,
    },
    {
      path: '/users',
      name: 'users',
      component: Usuarios,
    },
    {
      path: '/profile/:id',
      name: 'detalhes-profile',
      component: JanelaProfileUsuario,
    },
    {
      path: '/post/:postId',
      name: 'detalhes-posts',
      component: DetalhesPosts,
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
  ],
});

export default router;
