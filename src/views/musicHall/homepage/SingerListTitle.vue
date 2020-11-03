<template>
  <div class="singer-list-title">
    <singer-list-title-show
        @nav-click="toPath"

    />

  </div>
</template>

<script>
import SingerListTitleShow from '@/components/main/homepage/SingerListTitleShow'
export default {
  methods:{
    toPath(path){
     this.$router.push(path)

      console.log(path)
    }
  },
  components: {
    SingerListTitleShow
  },
  isActive(path){
    if (path === this.$route.path){
      return true
    }
    if (path === '/homepage' && this.$route.path === '/'){
      return true
    }
    return false
  }
}




</script>
