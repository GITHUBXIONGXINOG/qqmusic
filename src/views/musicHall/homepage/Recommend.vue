<!--
<template>
  <div class="recommend">

      <rotation-show
            :slide-list="RecommendList"
      />
&lt;!&ndash;      <rotation-show
          :slide-list="RecommendList"
      />
      &ndash;&gt;
  </div>
</template>

<script>
    import RotationShow from "@/components/main/commont/rotation/RotationShow";
    export default {
      data(){
        return {
          RecommendList: [],
        }
      },
      components:{
          RotationShow
      },
      methods:{
        async fetchRecommendSwiper(){
          const res = await this.$http.get('/recommend/playlist/u')
          // console.log(res)
          this.RecommendList = res.data.data.list.map(item => ({
            img:item.cover,
            title:item.title,
            username:item.username,
            id:item.content_id,
            listen_num:item.listen_num,
            type:item.type
          }))
           // console.log(this.RecommendList.map(item=>item))
        }
      },
      created() {
        this.fetchRecommendSwiper()
      },

    }
</script>
-->
