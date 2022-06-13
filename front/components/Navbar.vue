<template>
    <nav class="relative w-full p-6 bg-transparent">
        <div class="flex items-center justify-between">

            <!-- Header logo -->
            <div>
                <img src="~/assets/img/logo_pink.png" alt="Logo" class="h-8">
            </div>

            <!-- Mobile toggle -->
            <div class="md:hidden">
                <button @click="drawer">
                    <svg class="h-8 w-8 fill-current text-black" fill="none" stroke-linecap="round"
                        stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>

            <!-- Navbar -->
            <div class="hidden md:block">
                <ul class="flex space-x-8 text-sm font-sans">
                    <li>
                        <NuxtLink to="/" class="border-b-2 border-blue-500 pb-1">Acceuil</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/" href="#"
                            class="cta bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded text-white font-semibold">{{
                                    loggedInUser.user.pseudo
                            }}</NuxtLink>
                    </li>
                    <li><a class="cursor-pointer cta bg-red-500 hover:bg-red-600 px-3 py-2 rounded text-white font-semibold"
                            @click="logout">Déconnexion</a></li>
                </ul>
            </div>

            <!-- Dark Background Transition -->
            <transition enter-class="opacity-0" enter-active-class="ease-out transition-medium"
                enter-to-class="opacity-100" leave-class="opacity-100" leave-active-class="ease-out transition-medium"
                leave-to-class="opacity-0">
                <div @keydown.esc="isOpen = false" v-show="isOpen" class="z-10 fixed inset-0 transition-opacity">
                    <div @click="isOpen = false" class="absolute inset-0 bg-black opacity-50" tabindex="0"></div>
                </div>
            </transition>

            <!-- Drawer Menu -->
            <aside
                class="p-5 transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30"
                :class="isOpen ? 'translate-x-0' : '-translate-x-full'">

                <div class="close">
                    <button class="absolute top-0 right-0 mt-4 mr-4" @click="isOpen = false">
                        <svg class="w-6 h-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <span @click="isOpen = false" class="flex w-full items-center p-4 border-b">
                    <Tailwind />
                </span>

                <ul class="divide-y font-sans">
                    <li><a href="#" @click="isOpen = false" class="my-4 inline-block">Home</a></li>
                    <li><a href="#" @click="isOpen = false"
                            class="my-8 w-full text-center font-semibold cta inline-block bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded text-white">{{
                                    loggedInUser.user.pseudo
                            }}</a></li>
                </ul>

            </aside>

        </div>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            isOpen: false
        };
    },
    computed: {
        ...mapGetters(['loggedInUser'])
    },
    methods: {
        drawer() {
            this.isOpen = !this.isOpen;
        },
        async logout() {
            await this.$auth.logout();
            this.$router.push('/login');
        },
    },
    watch: {
        isOpen: {
            immediate: true,
            handler(isOpen) {
                if (process.client) {
                    if (isOpen) document.body.style.setProperty("overflow", "hidden");
                    else document.body.style.removeProperty("overflow");
                }
            }
        }
    },
    mounted() {
        document.addEventListener("keydown", e => {
            if (e.keyCode == 27 && this.isOpen) this.isOpen = false;
        });
    }
};
</script>