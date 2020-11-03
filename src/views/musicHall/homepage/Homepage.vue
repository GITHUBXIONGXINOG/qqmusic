<template>
  <div class="homepage">
    <singer-list-title-show
        @nav-click="toPath"
    />

      <rotation-show />

      <router-view></router-view>
<!--      <router-view></router-view>-->

  </div>

</template>

<script>
    import SingerListTitleShow from '@/components/main/homepage/SingerListTitleShow'
    import RotationShow from "@/components/main/RotationShow";
    export default {
      data(){
        return{
          swiperList:[],
          swiperOption: {
            pagination: {
              el: '.swiper-pagination'
            },
          },
        }

      },
      methods:{
        toPath(path){
          this.$router.push(path)
        }
      },

      created() {

      },
      components: {
        SingerListTitleShow,
          RotationShow
      }
    }




</script>
