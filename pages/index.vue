<template>
    <div>
        <v-main>
            <section class="bg-grey-darken-4 py-4">
                <v-container>
                    <h2 class="text-h4 font-weight-bold">Search The Bible</h2>
                    <p class="text-body-2">Need to gain knowledge? Or just looking for a specific chapter? Go explore the Bible today!</p>
                    <v-btn color="pink" class="mt-3" to="/search-the-bible/">Explore Today</v-btn>
                </v-container>
            </section>
            <v-container>
                <div class="bg-pink rounded-lg elevation-3 py-3 px-5 mb-3">
                    <v-row class="pt-3 pb-1">
                        <v-col cols="9" md="9">
                            <h1 class="text-h5 text-white font-weight-bold " style="line-height: 1;">The Daily W.O.W </h1>
                            <span class="text-body-2 text-white">(Words of Wonder)</span>
                        </v-col>
                        <v-col cols="3" md="3">
                            <p class="text-right text-white"><nuxt-link to="/wordoftheday/view-all/" class="text-white text-decoration-underline">View All</nuxt-link></p>
                        </v-col>
                    </v-row>
                </div>
                
                <v-row>
                    <v-col v-for="(word,wk) in data" :key="wk" cols="12" md="6" sm="12" class="card-height"> 
                        <nuxt-link :to="`/wordoftheday/${word.slug.current}/`">
                        <v-card class="rounded-lg mb-2 elevation-3" min-height="200">
                            
                                 <section id="topheader" class="bg-pink-lighten-1 py-2 px-4 border-b-sm">
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
                            <p class="text-grey-darken-4">{{ word.smallExercpt }}</p>
                            <p class="text-caption font-weight-bold mt-2">Read More...</p>

                            
                        </v-card-text>
                        <div class="px-3 py-2 bg-grey-lighten-5 datebottom">
                                <p class="text-caption text-grey-darken-4">Date Published: {{formatDate(word.dateWordPublished)}}</p>
                            </div>
                            
                       
                </v-card>
                </nuxt-link>
                    </v-col>
                </v-row>
                <div class="mt-3">
                    <v-btn class="text-center text-white rounded-lg" block color="pink" to="/wordoftheday/view-all/" >View All Posts</v-btn>
                        
                </div>
            </v-container>
            
        </v-main>
        
    </div>
</template>
<script setup>
// import { PortableText } from '@portabletext/vue'
const params = useRoute().params
const queryG = groq `*[_type == "dailyWord"] | order(dateWordPublished desc) [0...10]`
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