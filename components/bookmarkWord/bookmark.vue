<template>

    <v-btn color="white" flat variant="text" icon="mdi-bookmark-outline" @click="addToBookmarks" v-if="!bookmarkStore.bookmarkFound"></v-btn>
    <v-btn color="white" flat variant="text" icon="mdi-bookmark" @click="removeBookmark" v-else></v-btn>
    <v-snackbar v-model="snackbarBookmark" color="pink">
                {{ snackbarBookmarkText }}
                <template v-slot:actions>
        <v-btn
          color="white"
          variant="text"
          @click="snackbarBookmark = false"
        >
          Close
        </v-btn>
      </template>
            </v-snackbar>
</template>

<script setup>

    import {
    useBookMarkStore
} from '~/stores/bookmark'
const bookmarkStore = useBookMarkStore()
    const props = defineProps({
        word: Object,
    });
    const snackbarBookmark = ref(false)
const snackbarBookmarkText = ref('Bookmark Added')
onMounted(() => {
    bookmarkStore.getBookmarks(props.word._id)
})
const addToBookmarks = () => {
    bookmarkStore.addToBookmarks(props.word.todayWordTitle, props.word.smallExercpt,props.word.slug, props.word.dateWordPublished, props.word._id, props.word.timetoread, props.word.authorOfThePost)
    snackbarBookmarkText.value = 'Bookmark Added'
    snackbarBookmark.value = true
}
const removeBookmark =() => {
    bookmarkStore.removeBookmark(props.word._id)
    snackbarBookmarkText.value = 'Bookmark Removed'
    snackbarBookmark.value = true
}
</script>