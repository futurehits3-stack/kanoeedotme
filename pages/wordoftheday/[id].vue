<template>
    <div>
        <v-main>
            <v-container class="pt-0" v-if="data">
                <!-- <pre>{{ data[0] }}</pre> -->
                 <v-card class="pa-3" flat>
                    <section class="py-3 bg-pink rounded-lg elevation-3">
                        <v-row>
                            <v-col cols="7" md="9" sm="9">
                                <v-breadcrumbs :items="breadcrumbsItems" class="py-0 pl-0 text-caption"></v-breadcrumbs>
                            </v-col>
                            <v-col cols="5" md="3" sm="3">
                                <p class="text-right text-caption py-0 pr-4">{{formatDate(data[0].dateWordPublished)}}</p>
                            </v-col>
                        </v-row>
                        
                    </section>
                    <div class="mt-2 bg-pink-lighten-2 pa-5 rounded-lg elevation-2 ">
                        <h1 class="text-h4 text-white font-weight-black">{{ data[0].todayWordTitle }}</h1>
                    <p class="text-subtitle-2 py-2 mb-0">Author {{data[0].authorOfThePost}}</p>
                    <section id="social">
                        
                        <SocialShare
                        v-for="network in ['facebook','email']"
                        :key="network"
                        :network="network"
                        :label="false">
                            <template #icon><v-btn :icon="`mdi-${network}`" color="white" flat variant="text"></v-btn></template>
                        </SocialShare>
                    </section>
                    </div>
                    <div class="pa-5 mt-2 rounded-lg bg-grey-lighten-4 elevation-1">
                        
                <v-card-text class="px-0">
                    <section id="main-story">
                    <PortableText :value="data[0].wordOfTheDay" class="text-body-1" #/>
                    </section>
                </v-card-text>
                    </div>
                    
                </v-card>
            </v-container>
        </v-main>
    </div>
</template>
<script setup>
import { PortableText } from '@portabletext/vue'
const params = useRoute().params
const queryG = groq `*[_type == "dailyWord" && slug.current == '${params.id}']`
const sanity = useSanity()
const {
    data
} = await useAsyncData(`dailyWord:${params.id}`, () => sanity.fetch(queryG))
useHead({
  title: `${data.value[0].todayWordTitle} | Kanoee.Me`,
  meta: [
    { name: 'description', content: `${data.value[0].smallExercpt}` },
  ],
})
const replaceImgString = (imgstring) => {

    let img = imgstring
    img = img.replace('image-', '')
    if (img.indexOf('-jpg') === -1) {
        img = img.replace('-png', '.png')
    } else {
        img = img.replace('-jpg', '.jpg')
    }
    //img = img.replace('-jpg', '.jpg')
    console.log(img)
    return `https://cdn.sanity.io/images/bkw931fv/production/${img}`
}
useSeoMeta({
  title: `${data.value[0].todayWordTitle} | Kanoee.Me`,
  ogTitle: `${data.value[0].todayWordTitle} | Kanoee.Me`,
  description: `${data.value[0].smallExercpt}`,
  ogDescription: `${data.value[0].smallExercpt}`,
  ogImage: `${replaceImgString(data.value[0].soicalImage.asset._ref)}`,
  twitterCard: 'summary_large_image',
})
//console.log(data.value[0].todayWordTitle)
const breadcrumbsItems = [{
    title: 'Home' ,
    disabled: false,
    href: '/' 
},
{
    title: data.value[0].todayWordTitle,
    disabled: true
}]

const formatDate = (date) => {
    let d = new Date(date)
    return d.getMonth()+1 + '/' + d.getDate() + '/' + d.getFullYear()
}

</script>
<style>
     #main-story p{
        margin-bottom: 20px;
    }
    #social a{
        display: inline-block;
        color: #000;
        padding: 3px;
        margin: 0 1px;
    }
    ul{
        list-style: decimal;
        margin-left: 20px;
        border-radius: 10px;
    }
    
</style>