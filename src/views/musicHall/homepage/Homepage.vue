<!--首页页面-->
<template>
    <div class="homepage">
        <div class="showStation" v-for="(item,index) in 5" :key="index"
             :class="`showStyle-${index}`"
        >
            <rotation-title
                @nav-click="toPath"
                :index="index"
            />
            <router-view></router-view>
        </div>

    </div>
</template>

<script>
    // import SingerListTitleShow from '@/components/main/homepage/SingerListTitleShow'
    import RotationShow from "@/components/main/commont/rotation/RotationShow";
    import RotationTitle from "@/components/main/commont/rotation/RotationTitle";
    export default {
      data(){
        return{

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
          RotationShow,
          RotationTitle
      }
    }




</script>
