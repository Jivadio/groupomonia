<template>
    <div>
        <Navbar />
        <div class="grid grid-cols-1 gap-1">
            <div
                class="width-90 mb-10 m-auto p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 text-center">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Créer un nouveau
                    post</h5>
                <form method="post" @submit.prevent="sendPost">
                    <textarea class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" rows="4"
                        v-model="textArea" required></textarea>

                    <label class="block">
                        <span class="sr-only">Choose File</span>
                        <input v-on:change="handleImage" type="file" ref="file"
                            class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                    </label>
                    <button
                        class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Poster
                        <svg class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </form>
            </div>
        </div>
        <PostCard v-for="posts in post" :post="posts" />
        <Chat />
    </div>
</template>

<script>

import { mapGetters } from 'vuex'
import Navbar from '../components/Navbar.vue'
import PostCard from '../components/PostCard.vue'
import Chat from '../components/Chat.vue'

export default {
    middleware: "auth",
    data() {
        return {
            post: [],
            textArea: '',
            image: null
        }
    },
    mounted() {
        this.post = this.fetchPosts();
    },
    methods: {
        async fetchPosts() {
            try {
                const response = await this.$axios.get('post');
                this.post = response.data;
            } catch (e) {
                console.log(e)
            }
        },

        async sendPost() {
            try {
                console.log(this.image);
                await this.$axios.post('post', {
                    content: this.textArea,
                    image: this.image
                });

                this.textArea = '';
                this.$refs.file.value = '';
                this.image = null;
                this.fetchPosts();
            } catch (e) {
                console.log(e)
            }
        },
        async handleImage(e) {
            const selectedImage = e.target.files[0];
            this.createBase64Image(selectedImage);
        },
        async createBase64Image(selectedImage) {
            const reader = new FileReader();
            reader.onload = () => {
                this.image = reader.result;
            };
            reader.readAsDataURL(selectedImage);
        },
    },
    created() {
        this.$nuxt.$on('deletingPost', ($event) => this.fetchPosts());
    },
    computed: {
        ...mapGetters(["isAuthenticated", "loggedInUser"])
    },
    components: {
        Navbar,
        PostCard,
        Chat,
    }
}
</script>

<style scoped>
.width-90 {
    width: 90%;
}
</style>