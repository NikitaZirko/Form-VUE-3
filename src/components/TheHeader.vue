<template lang="pug">
.header
    h1.header__title {{ $route.meta.title }}
</template>

<style lang="scss" scoped>
@import "@/assets/styles/base/vars.scss";
@import "@/assets/styles/base/mixins.scss";

.header {
    max-width: 341px;
    margin: 0 auto;
    @include center;

    .header__title {
        margin: 39px 0 20px;
        font-size: 32px;
        line-height: 39px;
        letter-spacing: 0.05em;
        text-align: center;
        text-transform: uppercase;
        color: $primaryLight;
    }
}
</style>