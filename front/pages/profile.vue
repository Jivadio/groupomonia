<template>
    <div>
        <Navbar />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '../components/Navbar.vue'

export default {
    middleware: 'auth',
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters(["isAuthenticated", "loggedInUser"])
    },
    components: {
        Navbar
    }
} 
</script>
