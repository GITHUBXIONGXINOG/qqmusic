<template>
  <div class="main">
      <!--头部公共组件-->
    <main-header
        @nav-click="toPath"
    />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <main-footer
        @nav-click="toPath"
    />

  </div>
 </template>

<script>
import MainHeader from '@/components/main/commont/MainHeader'
import MainFooter from '@/components/main/commont/MainFooter'
export default {

  methods:{
    toPath(path){
      this.$router.push(path)
    }
  },
  components:{
      MainHeader,
      MainFooter
  }
}
</script>
