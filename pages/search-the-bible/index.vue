<template>
    <v-main>
        <v-container>
            <div class="mb-6">
                <h2 class="text-h4 font-weight-bold text-pink">Search The Bible</h2>
                <p class="text-body-2 text-grey-darken-2" style="line-height: 1;">Below are books of the bible. Please click one to view the chapters.</p>
            </div>
            
            <v-row v-if="!loadingBible">
                <v-col cols="12" md="6" class="pa-1" v-for=" (bd,bdk) in bibleData" :key="bdk">
                    <v-card  class="mb-2 rounded-lg card-pointer">
                        <!-- {{ bd }} -->
                          <div class="pa-4 bg-pink-lighten-1">
                            <v-row @click="bd.showData = !bd.showData">
                                <v-col cols="10">
                                    <h3 class="text-subheading text-white text-truncate" style="line-height: 2.5;">{{ bd.name }} - {{ bd.abbreviation }}</h3>
                                </v-col>
                                <v-col cols="2" class="text-right">
                                    <v-btn :icon="bd.showData ? 'mdi-chevron-up' : 'mdi-chevron-down'" variant="text" ></v-btn>
                                </v-col>
                            </v-row>
                          </div>
                        <v-expand-transition>
                            <v-card-text class="bg-grey-darken-3" v-show="bd.showData">
                                <v-chip v-for="(chap,chapK) in bd.chapters" :key="chapK" :to="`/search-the-bible/passage/${chap.id}`" v-show="chap.number !== 'intro'" class="mb-2 ml-2">
                                    
                                    {{ chap.bookId }} {{ chap.number }}
                                </v-chip>
                            </v-card-text>
                        </v-expand-transition>
                        
                        
                    </v-card>
                </v-col>
            </v-row>
            <v-skeleton-loader type="card" v-else v-for="i in 3" :key="i"></v-skeleton-loader>

        </v-container>
        
    </v-main>
</template>
<script setup>
    const bibleData = ref()
    const showData = ref(false)
    const loadingBible = ref(true)
     useHead({
            title: `Search The Bible - Kanoee.me`,
            meta: [
                { name: 'description', content: `Search The Bible - Kanoee.me` },
            ],
        })
    onMounted( async()=> {
         const res = await $fetch('https://rest.api.bible/v1/bibles/555fef9a6cb31151-01/books?include-chapters=true', {
            method: 'GET',
            headers: {
            'api-key' : `oKfPeujlWx8RUIwaQ_9-T`, // Use the API key securely
            // Or specific header name for your API, e.g., 'X-API-Key'
        }
        })
        bibleData.value = res.data
       
        loadingBible.value = false
    })
</script>
<style scoped>
    .card-pointer{
        cursor: pointer;
    }
</style>