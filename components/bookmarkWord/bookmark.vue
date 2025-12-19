<template>

    <v-btn color="white" flat variant="text" icon="mdi-bookmark-outline" @click="addToBookmarks" v-if="!bookmarkStore.bookmarkFound"></v-btn>
    <v-btn color="white" flat variant="text" icon="mdi-bookmark" @click="removeBookmark" v-else></v-btn>
</template>

<script setup>

    import {
    useBookMarkStore
} from '~/stores/bookmark'
const bookmarkStore = useBookMarkStore()
    const props = defineProps({
        word: Object,
    });
onMounted(() => {
    bookmarkStore.getBookmarks(props.word._id)
})
const addToBookmarks = () => {
    bookmarkStore.addToBookmarks(props.word.todayWordTitle, props.word.smallExercpt,props.word.slug, props.word.dateWordPublished, props.word._id, props.word.timetoread, props.word.authorOfThePost)
}
const removeBookmark =() => {
    bookmarkStore.removeBookmark(props.word._id)
}
</script>