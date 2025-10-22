<template>
    <div>
        <v-main>
            <v-container class="pt-0">
                <!-- <pre>{{ data }}</pre> -->
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
                        <v-btn icon="mdi-facebook" flat></v-btn>
                        <v-btn icon="mdi-email-box" flat></v-btn>
                        <!-- <v-icon icon="mdi-facebook"></v-icon> -->
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
</style>