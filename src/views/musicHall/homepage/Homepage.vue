<!--首页页面-->
<template>
    <div class="homepage">
    <!--        <div class="homepage b1">
                <singer-list-title-show
                    @nav-click="toPath"
                />


                &lt;!&ndash;      <rotation-show />&ndash;&gt;
                <router-view></router-view>
            </div>
            <div class="homepage b3">
                <singer-list-title-show
                    @nav-click="toPath"
                />


                &lt;!&ndash;      <rotation-show />&ndash;&gt;
                <router-view></router-view>
            </div>-->
        <div class="showStation" v-for="(item,index) in 6" :key="index">
            <rotation-title
                @nav-click="toPath"
                :index="index"
            />
            <router-view></router-view>
        </div>
<!--        <div class="showStation b1">
            <rotation-title
                @nav-click="toPath"
            />
            <router-view></router-view>
        </div>-->


    </div>
</template>

<script>
    // import SingerListTitleShow from '@/components/main/homepage/SingerListTitleShow'
    import RotationShow from "@/components/main/commont/rotation/RotationShow";
    import RotationTitle from "@/components/main/commont/rotation/RotationTitle";
    export default {
      data(){
        return{
       /*   swiperList:[],
          swiperOption: {
            pagination: {
              el: '.swiper-pagination'
            },
          },*/
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
        // SingerListTitleShow,
          RotationShow,
          RotationTitle
      }
    }




</script>
