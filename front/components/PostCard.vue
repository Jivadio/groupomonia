<template>
    <div>
        <div
            class="width-90 mb-10 m-auto p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 text-center">
            <img class="width-30 m-auto" :src="post.image">
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ post.content }}</p>
            <p class="mt-3 font-normal text-xs text-gray-300 dark:text-gray-300">Posté le: {{ new
                    Date(post.createdAt).toLocaleString()
            }}</p>
            <p class="font-normal text-xs text-gray-300 dark:text-gray-300">Par: {{ post.createBy }}</p>
        </div>
    </div>
</template>

<style scoped>
.width-90 {
    width: 90%;
}

.width-30 {
    width: 30%;
}

</style>

<script>
export default {
    name: 'PostCard',
    props: ['post']
}
</script>