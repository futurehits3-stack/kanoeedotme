<template>
<div>
    <v-app>
        <v-app-bar :elevation="0" color="pink-darken-1" height="44" density="compact">
    </v-app-bar>
    <v-app-bar :elevation="2" color="white" height="84">
        <v-app-bar-title class="font-weight-black text-center text-uppercase text-white text-pink">Kanoee.Me</v-app-bar-title>
        <v-btn to="/" color="pink" variant="plain" class="hidden-sm-and-down">Home</v-btn>
        <v-btn to="/about/" color="pink" variant="plain" class="hidden-sm-and-down">About</v-btn>
        <v-menu class="hidden-md-and-up">
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-dots-vertical" variant="text" color="pink" v-bind="props" class="hidden-md-and-up"></v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(item, i) in navItem"
                :key="i"
                :value="i"
                :to="item.to"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
    </v-app-bar>
        <slot />
    </v-app>
</div>
</template>
<script setup>
    const navItem = ref([
        { title: 'Home',
            to: '/'
         },
    { title: 'About',
            to: '/about/' },
    ])
</script>
