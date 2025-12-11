<template>
    <v-main>
        <v-container v-if="bibleverusData">
            <h1 class="text-h4 text-pink font-weight-bold">{{ bibleverusData.reference }}</h1>
            <div class="bg-pink rounded-lg py-4 px-3">
                <p class="text-body-2" style="line-height: 1;">Verse Count - {{ bibleverusData.verseCount }}</p>
            </div>
            
            <div class=" mt-2 rounded-lg bg-grey-lighten-5 elevation-1">
                <div v-html="bibleverusData.content" class="px-6 py-4 text-body-1" id="main"></div>
            </div>
            <p class="text-grey pa-3 text-caption text-center">{{ bibleverusData.copyright }}</p>
        </v-container>
        
    </v-main>
</template>
<script setup>
    const params = useRoute().params
    const bibleverusData = ref()
    onMounted( async()=> {
        console.log(params)
         const res = await $fetch(`https://rest.api.bible/v1/bibles/555fef9a6cb31151-01/passages/${params.id}?content-type=html&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false&use-org-id=false`, {
            method: 'GET',
            headers: {
            'api-key' : `oKfPeujlWx8RUIwaQ_9-T`, // Use the API key securely
            // Or specific header name for your API, e.g., 'X-API-Key'
        }
        })
        bibleverusData.value = res.data
    })
   
    //
    //oKfPeujlWx8RUIwaQ_9-T
    // const { data } = await useAsyncData('item', () => $fetch('https://rest.api.bible/v1/bibles/555fef9a6cb31151-01/books?include-chapters=false'))
</script>
<style>
    .v{
        font-weight: bold;
        color: #353535
    }
    .v::after{
        content: ". ";
    }
    #main > p{ 
        color: #353535
    }
    .s2{
        font-weight: bold;
    }
</style>