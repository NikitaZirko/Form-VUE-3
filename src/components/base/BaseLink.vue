<script setup>
const {dark} = defineProps({
    url: {
        type: String,
        default: '#'
    },
    dark: {
        type: Boolean,
        default: false
    },
    button: {
        type: Boolean,
        default: false
    },
})

const theme = dark ? 'dark' : 'light';
</script>

<template lang="pug">
button(v-if="button" type="submit" :class="[theme, 'btn']") 
    slot
router-link(v-else :to="{name: url}" :class="[theme, 'btn']") 
    slot
</template>

<style lang="scss" scoped>
@import "@/assets/styles/base/vars.scss";
@import "@/assets/styles/base/mixins.scss";
.btn {
    @include center;
    height: 60px;
    width: 363px;
    border-radius: 12px;
    border: none;
    text-decoration: none;
    transition: opacity .5s;
    cursor: pointer;
    color: $primaryDark;
    font-family: "Journal Sans New Regular", sans-serif;
    font-size: 18px;
    line-height: 25px;
    &:hover {
        opacity: 0.8;
    }
}

.light {
    background-color: $primaryLight;
}

.dark {
    background-color: $highlight;
}
</style>