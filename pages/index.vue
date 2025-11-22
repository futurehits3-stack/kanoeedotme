<template>
    <div>
        <v-main>
            <v-container>
                <h1 class="text-h5 text-pink font-weight-black pt-3 pb-4">The Daily W.O.W (Words of Wonder)</h1>
                <v-row>
                    <v-col v-for="(word,wk) in data" :key="wk" cols="12" md="6" sm="12" class="card-height"> 
                        <nuxt-link :to="`/wordoftheday/${word.slug.current}/`">
                        <v-card class="rounded-lg mb-2 elevation-6" min-height="220">
                            
                                 <section id="topheader" class="bg-pink py-2 px-4 border-b-sm">
                            <v-row class="py-1">
                                <v-col cols="2" md="1" xs="2" class="pr-1">
                                        <v-avatar :image="`${replaceImgString(word.profileImage.asset._ref)}?h=80`" class="text-center" ></v-avatar>
                                </v-col>
                                <v-col cols="10" md="11" xs="10" class="pl-1">
                                    <div class="py-1 mt-1">
                                        <p class="text-uppercase mb-0 ml-2 text-subtitle-1 font-weight-bold wordTitle text-truncate">{{ word.todayWordTitle }}</p>
                                        <span class="text-caption ml-2">Author: {{word.authorOfThePost}}</span>
                                    </div>
                                </v-col>
                            </v-row>
                        </section>
                        <v-card-text class=" text-grey-darken-4">
                            <p class="text-grey-darken-4">{{ formatWord(word.wordOfTheDay[0].children[0].text) }}</p>
                            <p class="text-caption font-weight-bold mt-2">Read More...</p>

                            
                        </v-card-text>
                        <div class="px-3 py-2 bg-grey-lighten-5 datebottom">
                                <p class="text-caption text-grey-darken-4">Date Published: {{formatDate(word.dateWordPublished)}}</p>
                            </div>
                            
                       
                </v-card>
                </nuxt-link>
                    </v-col>
                </v-row>
                
            </v-container>
            
        </v-main>
        
    </div>
</template>
<script setup>
// import { PortableText } from '@portabletext/vue'
const params = useRoute().params
const queryG = groq `*[_type == "dailyWord"] | order(dateWordPublished desc)`
const sanity = useSanity()
const {
    data
} = await useAsyncData(`daily:${params.id}`, () => sanity.fetch(queryG))
useHead({
  title: `Welcome to Everything about Kanoee!`,
  meta: [
    { name: 'description', content: `Everything about kanoee` },
  ],
})
const formatWord =  (word) => {
    return `${word.slice(0, 250).trim()}...`;
}
const formatDate = (date) => {
    let d = new Date(date)
    return d.getMonth()+1 + '/' + d.getDate() + '/' + d.getFullYear()
}
const replaceImgString = (imgstring) => {

    let img = imgstring
    img = img.replace('image-', '')
    if (img.indexOf('-jpg') === -1) {
        img = img.replace('-webp', '.webp')
    } else {
        img = img.replace('-jpg', '.jpg')
    }
    img = img.replace('-jpg', '.jpg')
    return `https://cdn.sanity.io/images/bkw931fv/production/${img}`
}

</script>
<style scoped>
.wordTitle{
    line-height: 12px;
}
a{
    text-decoration: none;
}
.card-height{
    position: relative;
}
.card-height .datebottom{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
}
</style>