<template>
  <div class="bg-white border border-gray-200 rounded-lg">
    <!-- Caixa de texto para criar um novo post -->
    <div class="p-4">
      <textarea
        v-model="newPostBody"
        class="p-4 w-full bg-gray-100 rounded-lg"
        placeholder="O que esta pensando?"
      ></textarea>
    </div>

    <!-- Botão para publicar o post -->
    <div class="p-4 border-t border-gray-100 flex justify-end">
      <button
        class="inline-block py-4 px-6 bg-indigo-800 text-white rounded-lg"
        @click="postContent"
      >
        Post
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CaixaPost",
  data() {
    return {
      newPostBody: "", // Armazena o corpo do novo post
    };
  },
  methods: {
  async postContent() {
    if (!this.newPostBody.trim()) {
      alert("A caixa não pode estar vazia.");
      return;
    }

    // Gera um ID único com base na sessão ou nos posts locais
    const storedPosts = JSON.parse(sessionStorage.getItem("posts-11")) || [];
    const maxId = Math.max(...storedPosts.map((post) => post.id), 100); // Garante que os IDs comecem a partir de 101
    const newId = maxId + 1;

    const post = {
      userId: 11,
      id: newId, // ID único gerado dinamicamente
      title: "New Post",
      body: this.newPostBody.trim(),
    };

    try {
      console.log("Adicionando post na API:", post);
      // Envia o novo post para a API
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        post
      );

      const addedPost = { ...response.data, id: newId }; // Mantém o ID gerado localmente
        console.log("Post criado dinamicamente com sucesso:", addedPost);
        console.log("Conteúdo adicionado à API:", response.data); // Log do conteúdo da resposta da API

        // Emite um evento para notificar o componente pai
        this.$emit("postAdded", addedPost);

        // Persiste o post no sessionStorage
        storedPosts.unshift(addedPost);
        sessionStorage.setItem("posts-11", JSON.stringify(storedPosts));

        // Limpa o campo de entrada
        this.newPostBody = "";
    } catch (error) {
      console.error("Erro ao criar o post:", error);
    }
  },
},

};
</script>
