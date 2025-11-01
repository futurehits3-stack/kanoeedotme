<template>
    <div>
        <v-main>
            <v-container class="pt-0" v-if="data">
                <!-- <pre>{{ data[0] }}</pre> -->
                 <v-card class="pa-3" flat>
                    <section class="py-3">
                        <v-row>
                            <v-col cols="7" md="9" sm="9">
                                <v-breadcrumbs :items="breadcrumbsItems" class="py-0 pl-0 text-caption"></v-breadcrumbs>
                            </v-col>
                            <v-col cols="5" md="3" sm="3">
                                <p class="text-right text-caption py-0">{{formatDate(data[0].dateWordPublished)}}</p>
                            </v-col>
                        </v-row>
                        
                    </section>
                    <h1 class="text-h3 font-weight-black">{{ data[0].todayWordTitle }}</h1>
                    <p class="text-subtitle-1 py-2 mb-0">Author {{data[0].authorOfThePost}}</p>
                    <section id="social">
                        
                        <SocialShare
                        v-for="network in ['facebook','email']"
                        :key="network"
                        :network="network"
                        :label="false">
                            <template #icon><v-btn :icon="`mdi-${network}`" flat></v-btn></template>
                        </SocialShare>
                    </section>
                <v-card-text class="px-0">
                    <section id="main-story">
                    <PortableText :value="data[0].wordOfTheDay" class="text-body-1" #/>
                    </section>
                </v-card-text>
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
useSeoMeta({
  title: `${data.value[0].todayWordTitle} | Kanoee.Me`,
  ogTitle: `${data.value[0].todayWordTitle} | Kanoee.Me`,
  description: `${data.value[0].smallExercpt}`,
  ogDescription: `${data.value[0].smallExercpt}`,
  ogImage: 'https://example.com/image.png',
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
    
</style>