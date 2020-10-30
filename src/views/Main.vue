<template>
  <div class="main">
    <main-header
        title="音乐馆"
        @nav-click="toPath"
    />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>


  </div>
 </template>

<script>
import MainHeader from '@/components/main/MainHeader'
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
