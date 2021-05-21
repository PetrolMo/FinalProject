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
    meta: {title: '登录账号',requireAuth: true},
    component: () => import('views/login/Login')
  },
  {
    path: '/register',
    name: 'register',
    meta: {title: '注册账号',requireAuth: true},
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
    path: '/test',
    name:'测试练习',
    icon:'el-icon-s-promotion',
    component: Layout,
    meta: {title:'测试练习',requireAuth: true},
    children: [
      {
        path: '/test1',
        name:'判断三角形类型',
        icon:'el-icon-s-promotion',
        meta: {title: '判断三角形类型',requireAuth: true},
        component:() => import('@/views/test/Test1')
      },
      {
        path: '/test2',
        name:'销售管理系统',
        icon:'el-icon-s-promotion',
        meta: {title: '销售管理系统',requireAuth: true},
        component:() => import('@/views/test/Test2')

      },
      {
        path: '/test3',
        name:'电脑销售系统',
        icon:'el-icon-s-promotion',
        meta: {title: '电脑销售系统',requireAuth: true},
        component:() => import('@/views/test/Test3')
      },
      // {
      //   path: '/test4',
      //   name:'电商平台系统',
      //   icon:'el-icon-s-promotion',
      //   meta: {title: '电商平台系统',requireAuth: true},
      //   component:() => import('@/views/test/Test4')
      // },
      {
        path: '/test5',
        name:'边界值测试项目',
        icon:'el-icon-s-promotion',
        meta: {title: '边界值测试项目',requireAuth: true},
        component:() => import('@/views/test/Test5')
      },
      {
        path: '/test6',
        name:'电信收费系统',
        icon:'el-icon-s-promotion',
        meta: {title: '电信收费系统',requireAuth: true},
        component:() => import('@/views/test/Test6')
      },
      // {
      //   path: '/test7',
      //   name:'实时C/S系统',
      //   icon:'el-icon-s-promotion',
      //   meta: {title: '实时C/S系统',requireAuth: true},
      //   component:() => import('@/views/test/Test7')
      // },
      {
        path: '/test8',
        name:'万年历问题',
        icon:'el-icon-s-promotion',
        meta: {title: '万年历问题',requireAuth: true},
        component:() => import('@/views/test/Test8')
      },
    ]
  },
  {
    path: '/projectTest',
    name:'项目测试项目',
    meta: {title: '项目测试项目',requireAuth: true},
    icon:'el-icon-s-claim',
    component: Layout,
    redirect: '/project1',
    children: [
      {
        path: '/project1',
        name:'项目测试项目',
        icon:'el-icon-s-claim',
        meta: {title: '项目测试项目',requireAuth: true},
        component:() => import('@/views/project/ProjectTest')
      }
    ]
  },
  {
    path: '/projectPro',
    name:'专业综合项目',
    meta: {title: '专业综合项目',requireAuth: true},
    icon:'el-icon-s-opportunity',
    component: Layout,
    redirect: '/project2',
    children: [
      {
        path: '/project2',
        name:'专业综合项目',
        icon:'el-icon-s-opportunity',
        meta: {title: '专业综合项目',requireAuth: true},
        component:() => import('@/views/projectpro/ProjectPro')
      }
    ]
  },
  {
    path: '/progress',
    name:'项目过程管理',
    icon:'el-icon-s-marketing',
    component: Layout,
    meta: {title: '项目过程管理', requireAuth: true},
    children: [
      {
        path: '/businessCase',
        name:'案例分析',
        icon:'el-icon-s-data',
        meta: {title:'案例分析',requireAuth: true},
        component:() => import('@/views/process/BusinessCase')
      },
      {
        path: '/Falys',
        name:'可行性分析',
        icon:'el-icon-s-data',
        meta: {title:'案例分析',requireAuth: true},
        component:() => import('@/views/process/BusinessCase')
      }
    ]
    //component:() => import('@/views/process/Process')
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
    document.title = "测试中心"
  }
  if(to.path === '/login' || to.path === '/register'){
    store.commit('setToken','')
    store.commit('setUserName','')
    next()
  }else{
    next()
  }
})

router.afterEach(() => {
  // 关闭进度条
  NProgress.done()
})


export default router