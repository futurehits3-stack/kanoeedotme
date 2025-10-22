<template>
<div>
    <v-app>
        <v-app-bar :elevation="0" color="pink-darken-1" height="44" density="compact">
    </v-app-bar>
    <v-app-bar :elevation="2" color="white" height="84">
        <v-app-bar-title class="font-weight-bold text-center text-uppercase text-white text-pink">Kanoee.Me</v-app-bar-title>
    </v-app-bar>
        <slot />
    </v-app>
</div>
</template>
