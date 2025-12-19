<template>
    <v-main>
        <v-container>
            <div>
                <h1 class="text-h4 font-weight-bold text-pink mb-2">Your Bookmarks</h1>
            </div>
            <section v-if="bookmarkStore.bookmarks.length> 0">
                <v-row>
                    <v-col cols="12" md="4" xs="6" v-for="(bookmark,bk) in bookmarkStore.bookmarks" :key="bk">
                        <nuxt-link :to="`/wordoftheday/${bookmark.slug}`" class="text-decoration-none">
                             <v-card class="rounded-lg mb-2 elevation-3" min-height="200">
                                <p class="pa-4 bg-pink font-weight-bold text-truncate">{{ bookmark.title }}</p>
                                <v-card-text>
                                    <p class="text-body-1 font-weight-bold text-pink">{{ bookmark.exercpt }}</p>
                                    <p class="text-caption text-grey-darken-3"><span class="font-weight-bold">Author:</span> {{ bookmark.author }}</p>
                                    <p class="text-caption text-grey-darken-3"><span class="font-weight-bold">Date Published:</span> {{ formatDate(bookmark.dateWordPublished) }}</p>
                                    <div class="mt-1">
                                        <v-chip variant="outlined">{{ bookmark.timetoread }} read</v-chip>
                                    </div>
                                </v-card-text>
                                <!-- {{ bookmark }} -->
                            </v-card>
                        </nuxt-link>
                       
                    </v-col>
                </v-row>
            </section>
            <section v-else>
                <v-card flat>
                        <p class="text-body-1">No bookmark were found. Click the button below to start browsing.</p>
                   
                    <v-card-actions class="pl-0">
                        <v-btn to="/wordoftheday/view-all/" class="ml-0" color="pink" variant="outlined">Browse</v-btn>
                    </v-card-actions>
                </v-card>

            </section>
        </v-container>
        
    </v-main>
</template>
<script setup>

    import {
    useBookMarkStore
} from '~/stores/bookmark'
const bookmarkStore = useBookMarkStore()
useHead({
  title: `My Bookmarks | Kanoee.me`,
  meta: [
    { name: 'description', content: `Everything about kanoee` },
  ],
})
onMounted( () => {
    const allBookmarks = bookmarkStore.getAllBookmarks()
})
const formatDate = (date) => {
    let d = new Date(date)
    return d.getMonth()+1 + '/' + d.getDate() + '/' + d.getFullYear()
}

</script>