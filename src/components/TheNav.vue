<script setup>
import IconHome from '@/components/base/icons/IconHome.vue';
import IconOrder from '@/components/base/icons/IconOrder.vue';

const links = [
	{
		text: 'Главная',
		url: '/',
		icon: IconHome,
	},
	{
		text: 'Мои заказы',
		url: '#',
		icon: IconOrder,
		disabled: true,
	},
];
</script>

<template lang="pug">
nav.nav
    ul.nav__list
        li.nav__item(v-for="(link, i) in links" :key="i")
            RouterLink.nav__link(:to='link.url' :class="{'nav--disabled': link.disabled}")
                .nav__icon
                    component(:is="link.icon")
                span {{ link.text }}
</template>

<style lang="scss" scoped>
@import '@/assets/styles/base/vars.scss';
@import '@/assets/styles/base/mixins.scss';
.nav {
	@include center;
	height: 83px;
	width: 100%;
	border-top: 1px solid $primaryGraySeccond;
	.nav__list {
		@include center;
		width: 100%;
		flex-wrap: wrap;
	}
	.nav__item {
		width: 50%;
		min-width: 100px;
		@include center;
	}
	.nav__link {
		text-decoration: none;
		color: $primaryLight;
	}
	.nav__icon {
		@include center;
        margin-bottom: 4px;
	}
	.router-link-active {
		color: $highlight;
	}
	.nav--disabled {
		color: $primaryLight;
	}
}
</style>
