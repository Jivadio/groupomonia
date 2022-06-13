<template>
    <div>
        <div
            class="width-90 mb-10 m-auto p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 text-center">
            <img class="width-30 m-auto" :src="post.image">
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ post.content }}</p>
            <p class="mt-3 font-normal text-xs text-gray-300 dark:text-gray-300">Posté le: {{ new
                    Date(post.createdAt).toLocaleString()
            }}</p>
            <p class="font-normal text-xs text-gray-300 dark:text-gray-300">Par:
                {{ post.createBy }}</p>
            <div class="react_icon">
                <div :number_comment="number_comment" class="icon_comment cursor-pointer" v-on:click="showModal">
                </div>
                <div number_like="1" class="icon_like">
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
import CommentCard from '../components/CommentCard.vue'
export default {
    data() {
        return {
            commentModal: false,
            textArea: '',
            comments: [],
            number_comment: '',
            number_like: ''
        }
    },
    components: {
        CommentCard,
    },
    mounted() {
        this.fetchComment();
    },
    methods: {
        async closeModal() {
            this.commentModal = false;
        },

        async showModal() {
            this.commentModal = true;
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

                this.comments = response.data;
                this.number_comment = response.data.length;
            } catch (e) {
                console.log(e)
            }
        },
    },
    name: 'PostCard',
    props: ['post']
}
</script>