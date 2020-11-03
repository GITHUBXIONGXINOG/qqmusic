<template>
  <div class="lovesong">
      <rotation-show
            :slide-list="LovesongList"
      />
  </div>

</template>

<script>
  // import LoveSongSwiper from '@/components/main/homepage/LoveSongSwiper'
  import RotationShow from "@/components/main/RotationShow";

  export default {
      data(){
        return {
            LovesongList: [],
        }
      },
      components:{
        // LoveSongSwiper
          RotationShow
      },
      methods:{
        async fetchRecommendSwiper(){


          const res = await this.$http.get('/songlist/list?category=148')
          // console.log(res)
          this.LovesongList = res.data.data.list.map(item => ({
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
