import {createRouter, createWebHistory} from 'vue-router'
import Layout from "../layout/Layout";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store/index'
const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path: '/login',
    name: 'login',
    meta: {title: '登录',requireAuth: true},
    component: () => import('views/login/Login')
  },
  {
    path: '/register',
    name: 'register',
    meta: {title: '注册',requireAuth: true},
    component: () => import('views/register/Register')
  },
  {
    path:'/main',
    redirect: '/home',
    icon:'el-icon-s-home',
    meta:{title:'工作台', requireAuth:true},
    component:Layout,
    children:[
      {
        path:'/home',
        name: "工作台",
        icon: "el-icon-s-home",
        meta: {title: "工作台", requireAuth: true},
        component: () => import('@/views/Home.vue')
      }
    ],
  },
  {
    path: '/user-manager',
    name:'用户管理',
    meta: {title: '用户管理',requireAuth: true},
    icon:'el-icon-s-claim',
    component: Layout,
    redirect: '/user-data',
    children: [
      {
        path: '/user-list',
        name:'用户列表',
        icon:'el-icon-s-claim',
        meta: {title: '用户列表',requireAuth: true},
        component:() => import('@/views/user/user-list/index')
      },
      {
        path: '/certification-list',
        name:'认证列表',
        icon:'el-icon-s-claim',
        meta: {title: '认证列表',requireAuth: true},
        component:() => import('@/views/user/certification-list/index')
      }
    ]
  }
]
const router = createRouter({
  history:createWebHistory(process.env.BASE_URL),
  routes
})

NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 600, showSpinner: false })

// 设置title
router.beforeEach((to, from, next) => {
  // 启动进度条
  NProgress.start()

  // 设置头部
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = "admin"
  }
  if(to.path === '/login' || to.path === '/register'){
    store.commit('setToken','')
    store.commit('setUserName','')
    next()
  }
  if (localStorage.getItem('username')) {
    store.commit('setUserName',localStorage.getItem('username'))
    store.commit('setToken', localStorage.getItem('token'))
    next()
  } else {
    next({ name: 'login' })
  }
})

router.afterEach(() => {
  // 关闭进度条
  NProgress.done()
})


export default router
