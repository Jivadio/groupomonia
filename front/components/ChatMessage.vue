<template>
    <div>
        <li class="flex justify-end" v-if="loggedInUser.user.pseudo == message.username">
            <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                <span class="block">{{ message.message }}</span>
            </div>
        </li>
        <li class="flex justify-start" v-else-if="loggedInUser.user.pseudo != message.username">
            <div class="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                <span class="block">{{ message.username }}: {{ message.message }}</span>
            </div>
        </li>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'ChatMessage',
    props: ['message'],
    computed: {
        ...mapGetters(['loggedInUser'])
    },
}
</script>