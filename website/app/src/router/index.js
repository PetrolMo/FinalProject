import {createRouter, createWebHistory} from 'vue-router'
import Layout from "../layout/Layout";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store/index'
const routes = [
  {
    path:'/',
    redirect:'/data'
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      requireAuth: true
    },
    component: () => import('views/login/Login')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: '注册',
      requireAuth: true
    },
    component: () => import('views/register/Register')
  },
  // {
  //   path:'/main',
  //   redirect: '/home',
  //   icon:'el-icon-s-home',
  //   name: 'home',
  //   meta: {
  //     title:'首页',
  //     requireAuth:true
  //   },
  //   component:Layout,
  //   children:[
  //     {
  //       path:'/home',
  //       name: "home",
  //       icon: "el-icon-s-home",
  //       meta: {title: "欢迎页", requireAuth: true},
  //       component: () => import('@/views/Home.vue')
  //     }
  //   ],
  // },
  {
    path: '/data',
    name: 'data',
    meta: {
      title: '数据统计',
      requireAuth: true
    },
    icon: 'el-icon-s-data',
    component: Layout,
    redirect: '/analysis',
    children: [
      {
        path:'/analysis',
        name: 'analysis',
        icon: 'el-icon-data-line',
        meta: {
          title: '分析页',
          requireAuth: true
        },
        component: () => import('@/views/analysis/index.vue')
      }
    ]
  },
  {
    path: '/user-manager',
    name: 'user-manager',
    meta: {
      title: '用户管理',
      requireAuth: true
    },
    icon: 'el-icon-s-claim',
    component: Layout,
    children: [
      {
        path: '/user-list',
        name: 'user-list',
        icon: 'el-icon-s-claim',
        meta: {
          title: '用户列表',
          requireAuth: true
        },
        component:() => import('@/views/user/user-list/index')
      }
    ]
  },
  {
    path: '/good-manager',
    name: 'good-manager',
    meta: {
      title: '商品管理',
      requireAuth: true
    },
    icon: 'el-icon-s-claim',
    component: Layout,
    children: [
      {
        path: '/good-list',
        name: 'good-list',
        icon: 'el-icon-s-claim',
        meta: {
          title: '商品列表',
          requireAuth: true
        },
        component:() => import('@/views/good/good-list/index')
      }
    ]
  },
  {
    path: '/certification',
    name: 'certification',
    icon: 'el-icon-s-claim',
    meta: {
      title: '认证管理',
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: '/certification-data',
        name: 'certification-list',
        icon: 'el-icon-s-claim',
        meta: {
          title: '认证列表',
          requireAuth: true
        },
        component:() => import('@/views/certification/index')
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
