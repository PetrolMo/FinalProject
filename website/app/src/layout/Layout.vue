<template>
<el-container class="container">
  <el-aside :style="defaultHeight" :width="asideWidth">
    <el-affix :z-index="1200">
      <div class="aside-logo" @click="onRefresh">
        <el-image class="logo-image" :src="logo" fit="contain"/>
        <span :class="[isCollapse ? 'is-collapse' : '']">
                    <span class="logo-name">JiDao Admin</span>
                    <span></span>
                </span>
      </div>
    </el-affix>
    <el-menu class="aside-menu"
             router
             :default-active="$route.path"
             :collapse="isCollapse"
             background-color="#001529" text-color="#fff" active-text-color="#fff"
    >
      <div v-for="menu in routers" :key="menu">
        <el-menu-item v-if="menu.children && menu.name === 'home'" :index="menu.children[0].path">
          <i :class="menu.children[0].icon"></i>
          <template #title>
            {{menu.children[0].meta.title}}
          </template>
        </el-menu-item>
        <el-submenu v-else-if="menu.children" :index="menu.path">
          <template #title>
            <i :class="menu.icon"></i>
            <span :class="[isCollapse ? 'is-collapse' : '']">{{menu.meta.title}}</span>
          </template>
          <el-menu-item v-for="child in menu.children" :key="child" :index="child.path">
            <i :class="child.icon"></i>
            <template #title>
              {{child.meta.title}}
            </template>
          </el-menu-item>
        </el-submenu>
      </div>
    </el-menu>
  </el-aside>
  <el-container>
    <el-header>
      <el-row :gutter="20">
        <el-col :span="1">
          <div class="header-collapse" @click="onCollapse">
            <i :class="[isCollapse ? 'el-icon-s-fold':'el-icon-s-unfold']"/>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="header-breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$route.matched[0].path === '/main'">
              <el-breadcrumb-item>
                <span>工作台</span>
              </el-breadcrumb-item>
            </el-breadcrumb>
            <el-breadcrumb separator-class="el-icon-arrow-right" v-else>
              <el-breadcrumb-item v-for="(matched,m) in this.$route.matched" :key="m">
                <span>{{matched.meta.title}}</span>
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-col>
        <el-col :span="6" :offset="8" class="rightHeader">
          <div style="float: right" class="right">
            <span class="el-icon-bell item"></span>
            <el-dropdown>
              <div class="right">
                <el-avatar :size="30" :src="avatar" style="margin-right: 8px"></el-avatar>
                <span>{{userInfo.username}}</span>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <el-button type="text" @click="logout">{{label}}</el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main :style="defaultHeight">
      <router-view/>
    </el-main>
  </el-container>
  <el-backtop></el-backtop>
</el-container>
</template>

<script>
import {ref, reactive, toRefs, onBeforeMount, getCurrentInstance} from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
export default {
  name: "Layout",
  setup(props, ctx){
    const router = useRouter()
    const store = useStore()
    let userInfo = reactive({username:'请先登录！'})
    let label = ref('登录')
    const state = reactive({
      routers:[],
      logo:require('@/assets/logo2.jpg'),
      avatar: require('@/assets/avatar.jpeg'),
      isCollapse: false,
      asideWidth:'220px',
      defaultHeight:{
        height:''
      }
    });
    onBeforeMount(() => {
      state.defaultHeight.height = document.body.clientHeight + 'px'
      state.routers = router.options.routes
      if(!store.state.userInfo.username){
        label.value = '登录'
      }else{
        userInfo.username = store.state.userInfo.username
        label.value = '退出登录'
      }
    })
    const onCollapse = () => {
      if (state.isCollapse) {
        state.asideWidth = '220px'
        state.isCollapse = false
      } else {
        state.isCollapse = true
        state.asideWidth = '64px'
      }
    }
    const onRefresh = () => {
      router.push({ path: 'main'})
    }
    const logout = () => {
      localStorage.setItem('username', '')
      localStorage.setItem('token', '')
      router.replace('/login')
    }
    return{
      ...toRefs(state),
      onCollapse,
      onRefresh,
      logout,
      userInfo,
      label
    }
  }
}
</script>

<style lang="less">
.container{
  background: rgb(245, 247, 249);
  .el-aside{
    height: 100%;
    transition: all .5s;
    background-color: #001529;
    overflow-y: auto;
    overflow-x: hidden;
    white-space: nowrap;

    .aside-logo{
      height: 59px;
      color: white;
      cursor: pointer;
      //border-bottom: 1px #cccccc solid;
      .logo-image {
        width: 40px;
        height: 40px;
        top: 12px;
        padding-left: 12px;
      }
      .logo-name{
        font-family: Alibaba PuHuiTi;
        font-size: 20px;
        font-weight: bold;
        padding: 2px;
      }
    }
    .aside-menu:not(.el-menu--collapse) {
      width: 220px;
      .el-menu-item.is-active {
        background-color: #00b0ff !important;
      }
    }
    .is-collapse {
      display: none;
    }
  }

  .el-aside::-webkit-scrollbar{
    width: 0px;
  }

  .el-header{
    background: white;
    line-height: 60px;
    font-size: 24px;
    border-bottom: 1px #cccccc solid;
    .header-collapse{
      cursor: pointer;
    }
    .header-breadcrumb{
      padding-top: 0.9em;
      span {
        cursor: default;
      }
    }
    .header-menu{
      text-align: right;
    }
  }
  .el-main{
    padding: 24px;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .el-main::-webkit-scrollbar{
    width: 0px;
  }
  .rightHeader{
    //text-align: right;
    font-size: 14px;
    .right {
      flex-direction: row;
      display: flex;
      align-items: center;
      height: 60px;
      margin-right: 8px;
      .item {
        margin-right: 15px;
      }
    }
  }
}
</style>
