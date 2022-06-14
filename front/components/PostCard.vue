<template>
    <div>
        <div
            class="width-90 mb-10 m-auto p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 text-center">
            <a :href="post.image" target="_blank"><img class="width-30 m-auto" :src="post.image" /></a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ post.content }}</p>
            <p class="mt-3 font-normal text-xs text-gray-300 dark:text-gray-300">{{ loggedInUser.user.pseudo }} le: {{
                    new
                        Date(post.createdAt).toLocaleString()
            }}</p>
            <p class="font-normal text-xs text-gray-300 dark:text-gray-300">Par:
                {{ post.createBy }}</p>
            <div class="react_icon">
                <div :number_comment="number_comment" class="icon_comment cursor-pointer" v-on:click="showModal">
                </div>
                <div :number_like="number_like" class="icon_like cursor-pointer" v-on:click="sendLike"
                    v-if="this.alreadyLike === false">
                </div>
                <div :number_like="number_like" class="icon_like cursor-pointer" v-on:click="deleteLike" v-else>
                </div>
                <div class="cursor-pointer"
                    v-if="loggedInUser.user.isAdmin == true || post.createBy == loggedInUser.user.pseudo"
                    v-on:click="openEdit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" viewBox="0 0 512 512">
                        <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                        <path
                            d="M495.9 166.6C499.2 175.2 496.4 184.9 489.6 191.2L446.3 230.6C447.4 238.9 448 247.4 448 256C448 264.6 447.4 273.1 446.3 281.4L489.6 320.8C496.4 327.1 499.2 336.8 495.9 345.4C491.5 357.3 486.2 368.8 480.2 379.7L475.5 387.8C468.9 398.8 461.5 409.2 453.4 419.1C447.4 426.2 437.7 428.7 428.9 425.9L373.2 408.1C359.8 418.4 344.1 427 329.2 433.6L316.7 490.7C314.7 499.7 307.7 506.1 298.5 508.5C284.7 510.8 270.5 512 255.1 512C241.5 512 227.3 510.8 213.5 508.5C204.3 506.1 197.3 499.7 195.3 490.7L182.8 433.6C167 427 152.2 418.4 138.8 408.1L83.14 425.9C74.3 428.7 64.55 426.2 58.63 419.1C50.52 409.2 43.12 398.8 36.52 387.8L31.84 379.7C25.77 368.8 20.49 357.3 16.06 345.4C12.82 336.8 15.55 327.1 22.41 320.8L65.67 281.4C64.57 273.1 64 264.6 64 256C64 247.4 64.57 238.9 65.67 230.6L22.41 191.2C15.55 184.9 12.82 175.3 16.06 166.6C20.49 154.7 25.78 143.2 31.84 132.3L36.51 124.2C43.12 113.2 50.52 102.8 58.63 92.95C64.55 85.8 74.3 83.32 83.14 86.14L138.8 103.9C152.2 93.56 167 84.96 182.8 78.43L195.3 21.33C197.3 12.25 204.3 5.04 213.5 3.51C227.3 1.201 241.5 0 256 0C270.5 0 284.7 1.201 298.5 3.51C307.7 5.04 314.7 12.25 316.7 21.33L329.2 78.43C344.1 84.96 359.8 93.56 373.2 103.9L428.9 86.14C437.7 83.32 447.4 85.8 453.4 92.95C461.5 102.8 468.9 113.2 475.5 124.2L480.2 132.3C486.2 143.2 491.5 154.7 495.9 166.6V166.6zM256 336C300.2 336 336 300.2 336 255.1C336 211.8 300.2 175.1 256 175.1C211.8 175.1 176 211.8 176 255.1C176 300.2 211.8 336 256 336z" />
                    </svg>
                    <div class="absolute w-40" v-if="this.showEdit == true">
                        <div x-show="openSort" x-transition:enter="transition ease-out duration-100"
                            x-transition:enter-start="transform opacity-0 scale-95"
                            x-transition:enter-end="transform opacity-100 scale-100"
                            x-transition:leave="transition ease-in duration-75"
                            x-transition:leave-start="transform opacity-100 scale-100"
                            x-transition:leave-end="transform opacity-0 scale-95"
                            class="absolute z-50 w-full  origin-top-right">
                            <div class="px-2 pt-2 pb-2 bg-white rounded-md shadow-lg dark-mode:bg-gray-700">
                                <div class="flex flex-col">
                                    <a class="flex flex-row items-start rounded-lg bg-transparent p-2 hover:bg-gray-200 "
                                        v-on:click="deletePost">

                                        <div class="">
                                            <p class="font-semibold">Supprimer</p>
                                        </div>
                                    </a>

                                    <a class="flex flex-row items-start rounded-lg bg-transparent p-2 hover:bg-gray-200 "
                                        v-on:click="showModalEdit">

                                        <div class="">
                                            <p class="font-semibold">Editer</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal modal-active opacity-1 fixed w-full h-full top-0 left-0 flex items-center justify-center"
            v-if="commentModal == true">
            <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
            <div class="modal-container bg-white w-11/12 mx-auto rounded shadow-lg z-50 height-90 overflow-auto	">
                <div class="modal-content py-4 text-left px-6">
                    <div class="flex justify-between items-center pb-3">
                        <p class="text-2xl font-bold">Commentaires</p>
                        <div class="modal-close cursor-pointer z-50" v-on:click="closeModal">
                            <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18"
                                height="18" viewBox="0 0 18 18">
                                <path
                                    d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z">
                                </path>
                            </svg>
                        </div>
                    </div>

                    <form method="post" @submit.prevent="sendComment" class="text-center mb-3">
                        <textarea class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" rows="2"
                            v-model="textArea" required></textarea>
                        <button
                            class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Envoyer
                            <svg class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clip-rule="evenodd"></path>
                            </svg>
                        </button>
                    </form>
                    <CommentCard v-for="comment in comments" :comment="comment"></CommentCard>
                </div>
            </div>
        </div>
        <div class="modal modal-active opacity-1 fixed w-full h-full top-0 left-0 flex items-center justify-center"
            v-if="editModal == true">
            <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
            <div class="modal-container bg-white w-11/12 mx-auto rounded shadow-lg z-50 overflow-auto	">
                <div class="modal-content py-4 text-left px-6">
                    <div class="flex justify-between items-center pb-3">
                        <p class="text-2xl font-bold">Edition</p>
                        <div class="modal-close cursor-pointer z-50" v-on:click="closeModalEdit">
                            <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18"
                                height="18" viewBox="0 0 18 18">
                                <path
                                    d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z">
                                </path>
                            </svg>
                        </div>
                    </div>

                    <form method="post" @submit.prevent="sendEditModal" class="text-center mb-3">
                        <textarea class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" rows="2"
                            v-model="textEdit" required></textarea>
                        <label class="block">
                            <span class="sr-only">Editer l'image</span>
                            <input v-on:change="handleImage" type="file" ref="file"
                                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                        </label>
                        <button
                            class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Envoyer
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
        </div>
    </div>
</template>

<style scoped>
.width-90 {
    width: 90%;
}

.height-90 {
    height: 90%;
}

.width-30 {
    width: 30%;
}
.react_icon {
    margin: 10px auto 0px auto;
    width: 10%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
}

[number_comment]::before {
    content: attr(number_comment) " ";
    font-size: 10px;
    vertical-align: middle;
}

[number_like]::before {
    content: attr(number_like) " ";
    font-size: 10px;
    vertical-align: middle;
}

.icon_comment {
    width: 24px;
    background-image: url('~/assets/img/comment-regular.svg');
}

.icon_like {
    width: 24px;
    background-image: url('~/assets/img/heart-regular.svg');
}
</style>

<script>
import { mapGetters } from 'vuex'
import CommentCard from '../components/CommentCard.vue'
export default {
    data() {
        return {
            commentModal: false,
            textArea: '',
            comments: [],
            number_comment: '0',
            number_like: '0',
            alreadyLike: false,
            showEdit: false,
            editModal: false,
            textEdit: this.post.content,
            image: null,
        }
    },
    components: {
        CommentCard,
    },
    mounted() {
        this.fetchComment();
    },
    computed: {
        ...mapGetters(['loggedInUser'])
    },
    methods: {
        async closeModal() {
            this.commentModal = false;
        },

        async closeModalEdit() {
            this.editModal = false;
        },

        async showModal() {
            this.commentModal = true;
        },

        async showModalEdit() {
            this.editModal = true;
            this.showEdit = false;
        },

        async openEdit() {
            this.showEdit = true;
        },

        async sendLike() {
            try {
                await this.$axios.post('post/sendlike', {
                    postId: this.post.id,
                    type: 1,
                });

                this.alreadyLike = true;
                this.fetchComment();
            } catch (e) {
                console.log(e)
            }
        },

        async deleteLike() {
            try {
                await this.$axios.post('post/sendlike', {
                    postId: this.post.id,
                    type: 0,
                });

                this.alreadyLike = false;
                this.fetchComment();
            }
            catch (e) {
                console.log(e)
            }
        },

        async deletePost() {
            try {
                await this.$axios.post('post/delete', {
                    postId: this.post.id,
                });

                $nuxt.$emit('deletingPost');
                this.showEdit = false;
            }
            catch (e) {
                console.log(e)
            }
        },

        async sendComment() {
            try {
                await this.$axios.post('post/sendcomment', {
                    content: this.textArea,
                    postId: this.post.id,
                });

                this.textArea = '';
                this.fetchComment();
            } catch (e) {
                console.log(e)
            }
        },

        async fetchComment() {
            try {
                const response = await this.$axios.post('post/comment', {
                    postId: this.post.id,
                });

                const like = await this.$axios.post('post/like', {
                    postId: this.post.id,
                });

                this.comments = response.data;
                this.number_comment = response.data.length;
                this.number_like = like.data.length;

                let apiData = like.data;
                apiData.forEach(element => {
                    if (element.userId == this.loggedInUser.user.pseudo) {
                        this.alreadyLike = true;
                    }
                });
            } catch (e) {
                console.log(e)
            }
        },

        async sendEditModal() {
            try {
                await this.$axios.post('post/edit', {
                    postId: this.post.id,
                    content: this.textEdit,
                    image: this.image,
                });

                this.editModal = false;
                this.showEdit = false;
                $nuxt.$emit('deletingPost');
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
        this.$nuxt.$on('deletingComment', ($event) => this.fetchComment());
    },
    name: 'PostCard',
    props: ['post']
}
</script>