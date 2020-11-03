<template>
  <div class="ktv">
       <rotation-show
           :slide-list="KtvList"
            />
  </div>

</template>

<script>
import RotationShow from "@/components/main/commont/rotation/RotationShow";

export default {
  data(){
    return {
      KtvList: [],

    }
  },
  components:{
      RotationShow
  },
  methods:{
    async fetchRecommendSwiper(){
      const res = await this.$http.get('/songlist/list?category=141')
      // console.log(res)
      this.KtvList = res.data.data.list.map(item => ({
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
