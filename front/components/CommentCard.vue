<template>
    <div>
        <div
            class="width-90 mb-10 m-auto p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 text-center">
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ comment.content }}</p>
            <p class="mt-3 font-normal text-xs text-gray-300 dark:text-gray-300">Posté le: {{ new Date(comment.createdAt).toLocaleString() }}</p>
            <p class="font-normal text-xs text-gray-300 dark:text-gray-300">Par: {{comment.createBy}}</p>
        </div>
    </div>
</template>

<style scoped>
.width-90 {
    width: 90%;
}
</style>

<script scoped>
export default {
    name: 'CommentCard',
    props: ['comment'],
}
</script>
