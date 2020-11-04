<!--
<template>
  <div class="classic">
   <rotation-show
        :slide-list="ClassicList"
   />
  </div>
</template>



<script>
import RotationShow from "@/components/main/commont/rotation/RotationShow";

export default {
  data(){
    return {
      ClassicList: [],

    }
  },
  components:{
      RotationShow,
  },
  methods:{
    async fetchRecommendSwiper(){
      const res = await this.$http.get('/songlist/list?category=136')
      // console.log(res)
      this.ClassicList = res.data.data.list.map(item => ({
        img:item.imgurl,
        title:item.dissname,
        username:item.creator.name,
        id:item.dissid,
        listen_num:item.listennum,
        type:item.creator.type
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
