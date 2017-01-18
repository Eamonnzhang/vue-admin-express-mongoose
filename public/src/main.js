import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import NProgress from 'nprogress'//页面顶部进度条
import 'nprogress/nprogress.css'

import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Main from './components/Main.vue'
import Table from './components/nav1/Table.vue'
import Form from './components/nav1/Form.vue'
import Tabs from './components/nav1/Tabs.vue'
import VuexComp from './components/nav2/VuexComp.vue'
import Page5 from './components/nav2/Page5.vue'
import Page6 from './components/nav3/Page6.vue'
import echarts from './components/charts/echarts.vue'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

const routes = [
    {
        path: '/login',
        component: Login,
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '导航一',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/', component: Main, name: 'Home' ,hidden:true},
            { path: '/table', component: Table, name: '用户管理' },
            { path: '/form', component: Form, name: '表单提交' },
            { path: '/tabs', component: Tabs, name: '标签页' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '导航二',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/vuex', component: VuexComp, name: 'Vuex' },
            { path: '/page5', component: Page5, name: '测试页面' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '导航三',
        iconCls: 'fa fa-address-card',
        leaf: true,
        children: [
            { path: '/page6', component: Page6, name: '导航三' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        redirect: '/',
        hidden: true
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    NProgress.start();
    next()
})

router.afterEach(transition => {
    NProgress.done();
});

new Vue({
    el: '#app',
    template: '<App/>',
    router,
    store,
    components: { App }
}).$mount('#app')

//router.replace('/login')

