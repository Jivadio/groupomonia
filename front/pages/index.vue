<template>
    <div>

        <NuxtLink to="/" class="nav-link" exact>{{ loggedInUser.user.email }}</NuxtLink>
        <NuxtLink to="/logout" class="nav-link" exact>Deconnexion</NuxtLink>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters(['isAuthenticated', 'loggedInUser'])
    },
}
</script>