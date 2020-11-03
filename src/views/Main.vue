<template>
  <div class="main">
      <!--头部公共组件-->
    <main-header
        @nav-click="toPath"
    />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>


  </div>
 </template>

<script>
import MainHeader from '@/components/main/commont/MainHeader'
export default {

  methods:{
    toPath(path){
      this.$router.push(path)
    }
  },
  components:{
    MainHeader
  }
}
</script>
