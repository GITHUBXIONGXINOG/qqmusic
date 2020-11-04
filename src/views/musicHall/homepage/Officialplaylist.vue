<!--
<template>
  <div class="officialplaylist">
      <rotation-show
      :slide-list="OfficialplayList"
      />
  </div>
</template>



<script>
import RotationShow from "@/components/main/commont/rotation/RotationShow";
export default {
  data(){
    return {
      OfficialplayList: [],

    }
  },
  components:{

      RotationShow
  },
  methods:{
    async fetchRecommendSwiper(){
      const res = await this.$http.get('/recommend/playlist')
      // console.log(res)
      this.OfficialplayList = res.data.data.list.map(item => ({
        img:item.cover_url_big,
        title:item.title,
        username:item.username,
        id:item.content_id,
        listen_num:item.access_num,
        type:item.type
      }))
    }
  },
  created() {
    this.fetchRecommendSwiper()
  },

}
</script>
-->
