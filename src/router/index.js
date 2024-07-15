import {createRouter, createWebHistory} from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('../views/HomeView.vue'),
            meta: {
                title: 'Услуги',
            }
		},
		{
			path: '/order',
			name: 'order',
			component: () => import('../views/OrderView.vue'),
            meta: {
                title: 'Вызов официанта',
            }
		},
	],
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
});

export default router;
