<template>
    <div class="main">
        <main-header
          title="音乐馆"
          @nav-click="toPath"
        />
    </div>
  <router-view></router-view>
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
