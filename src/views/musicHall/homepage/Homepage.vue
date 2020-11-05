<!--首页页面-->
<template>
    <div class="homepage">
        <div class="showStation" v-for="(item,index) in 5" :key="index"
             :class="`showStyle-${index}`"
        >
            <!--父组件homepage的子组件retation-title
                 v:bind:index传递值index给子组件,子组件里使用props接收父组件传递的值
                        index是首页的循环值,每个index代表首页的一个轮播图组件部分
                 v-on: 绑定函数,这里用@nav-click绑定子组件定义的nav-click派发函数,函数里面的值存入toPath函数中
            -->

            <rotation-title
                @nav-click="toPath"
                :index="index"
            />
<!--            <router-view></router-view>-->
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
          /*调用toPath函数,进行路由跳转
          * */
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
