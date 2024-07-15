<script setup>
import TheNav from './components/TheNav.vue';
import TheHeader from './components/TheHeader.vue';
</script>

<template lang="pug">
.wrapper
    header
        TheHeader
        
    main
        RouterView

    footer
        TheNav
</template>
