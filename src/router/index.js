import { createRouter, createWebHistory } from 'vue-router';
const routes = [
    {
        path: '/',
        name: 'Home',
        redirect: { name: 'Advertising' },
        component: () => import('../App.vue'),

    },
    {
        path: '/advertising',
        name: 'Advertising',
        component: () => import('../view/Advertising/index.vue')
    },
    {
        path: '/addkeygroup',
        name: 'Addkeygroup',
        component: () => import('../view/Addkeygroup/index.vue')
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes // short for `routes: routes`
});
export default router;