<template>
    <div>
        <v-main>
            <v-container>
                <v-row>
                    <v-col cols="12" md="6"> 
                        <v-card v-for="(word,wk) in data" :key="wk" class="rounded-lg">
                            <nuxt-link :to="`/wordoftheday/${word.slug.current}/`">
                                 <section id="topheader" class="bg-pink py-2 px-4 border-b-sm">
                            <v-row class="py-1">
                                <v-col cols="2" md="1" xs="2" class="pr-1">
                                        <v-avatar image="https://picsum.photos/200" class="text-center" ></v-avatar>
                                </v-col>
                                <v-col cols="10" md="11" xs="10" class="pl-1">
                                    <div class="py-1 mt-1">
                                        <p class="text-uppercase mb-0 ml-2 text-subtitle-1 font-weight-bold wordTitle">{{ word.todayWordTitle }}</p>
                                        <span class="text-caption ml-2">Author: {{word.authorOfThePost}}</span>
                                    </div>
                                </v-col>
                            </v-row>
                        </section>
                        <v-card-text class=" text-grey-darken-4">
                            <p class="text-grey-darken-4">{{ formatWord(word.wordOfTheDay[0].children[0].text) }}</p>
                            <p class="text-caption font-weight-bold mt-2">Read More...</p>

                            
                        </v-card-text>
                        <div class="px-3 py-2 bg-grey-lighten-5">
                                <p class="text-caption text-grey-darken-4">Date Published: October, 21st, 2025</p>
                            </div>
                            </nuxt-link>
                       
                </v-card>
                    </v-col>
                </v-row>
                
            </v-container>
            
        </v-main>
        
    </div>
</template>
<script setup>
// import { PortableText } from '@portabletext/vue'
const params = useRoute().params
const queryG = groq `*[_type == "dailyWord"]`
const sanity = useSanity()
const {
    data
} = await useAsyncData(`daily:${params.id}`, () => sanity.fetch(queryG))
useHead({
  title: `Welcome to Everything about Kanoee!`,
  meta: [
    { name: 'description', content: `EVerything about kanoee` },
  ],
})
const formatWord =  (word) => {
    return `${word.slice(0, 250).trim()}...`;
}

</script>
<style scoped>
.wordTitle{
    line-height: 12px;
}
a{
    text-decoration: none;
}
</style>