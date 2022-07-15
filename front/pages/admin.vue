<template>
    <div>
        <Navbar />
        <div class="flex flex-col mt-8">
            <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div
                    class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                    <table class="min-w-full">
                        <thead>
                            <tr>
                                <th
                                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                    Pseudo</th>
                                <th
                                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                    Email</th>
                                <th
                                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                    Admin</th>
                                <th
                                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                    Bannir</th>
                            </tr>
                        </thead>

                        <tbody class="bg-white">
                            <tr v-for="(user, index) in users">
                                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div class="text-sm font-medium leading-5 text-gray-900">
                                        {{ user.pseudo }}
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div class="text-sm leading-5 text-gray-500">{{ user.email }}</div>
                                </td>

                                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <label for="toggle-example" class="flex items-center cursor-pointer relative mb-4">
                                        <input type="checkbox" id="toggle-example" class="sr-only"
                                            v-model="checkboxAdmin[index]">
                                        <div
                                            class="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full">
                                        </div>
                                    </label>
                                </td>
                                <td
                                    class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-red-400 cursor-pointer"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <br><br>
        <div class="grid grid-cols-1 gap-1">
            <div
                class="width-90 mb-10 m-auto p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 text-center">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Liste des postes
                    signalés</h5>
                <PostCard v-for="posts in post" :post="posts" :reported="1" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '../components/Navbar.vue'

export default {
    middleware: 'auth',
    data() {
        return {
            users: [],
            checkboxAdmin: [],
            post: [],
        }
    },
    mounted() {
        this.getUsers(),
            this.fetchReportedPost()
    },
    watch: {
        checkboxAdmin() {
            console.log(this.checkboxAdmin);
        }
    },
    computed: {
        ...mapGetters(["isAuthenticated", "loggedInUser"])
    },
    created() {
        this.$nuxt.$on('allowPost', ($event) => this.fetchReportedPost());
    },
    components: {
        Navbar
    },
    methods: {
        async getUsers() {
            await this.$axios.get('user/getusers').then(response => {
                this.users = response.data
                this.checkboxAdmin = response.data.map(user => {
                    return user.isAdmin
                })

                console.log("1: " + this.checkboxAdmin);
            })
        },

        async fetchReportedPost() {
            try {
                const response = await this.$axios.get('post/reportpost');
                this.post = response.data;
            } catch (e) {
                console.log(e)
            }
        },
    },
} 
</script>

<style scoped>
.toggle-bg:after {
    content: '';
    @apply absolute top-0.5 left-0.5 bg-white border border-gray-300 rounded-full h-5 w-5 transition shadow-sm;
}

input:checked+.toggle-bg:after {
    transform: translateX(100%);
    @apply border-white;
}

input:checked+.toggle-bg {
    @apply bg-blue-600 border-blue-600;
}

.width-90 {
    width: 90%;
}
</style>
