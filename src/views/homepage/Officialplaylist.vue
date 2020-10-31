<template>
  <div class="officialplaylist">
    <official-play-list-swiper
        :recommend-list="RecommendList"
        :swiper-option="swiperOption"
    />
  </div>
</template>



<script>
import OfficialPlayListSwiper from '@/components/main/homepage/OfficialPlayListSwiper'

export default {
  data(){
    return {
      RecommendList: [],

      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  components:{
    OfficialPlayListSwiper,
  },
  methods:{
    async fetchRecommendSwiper(){
      const res = await this.$http.get('/recommend/playlist')
      // console.log(res)
      this.RecommendList = res.data.data.list.map(item => ({
        img:item.cover_url_big,
        title:item.title,
        username:item.username,
        id:item.content_id,
        listen_num:item.access_num,
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
