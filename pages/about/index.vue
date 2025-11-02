<template>
    <v-main>
        <v-container>
            <h1 class="text-h4 text-pink font-weight-bold">About {{data[0].aboutTitle}}</h1>
            <PortableText :value="data[0].aboutPage" class="text-body-1" #/>
        </v-container>
            
    </v-main>
</template>
<script setup>
import { PortableText } from '@portabletext/vue'
    const params = useRoute().params
    const queryG = groq `*[_type == "about"]`
    const sanity = useSanity()
    const {
        data
    } = await useAsyncData(`about`, () => sanity.fetch(queryG))
    useHead({
    title: `All things Kanoee`,
    meta: [
        { name: 'description', content: `Read everything about Kanoee.` },
    ],
    })
</script>