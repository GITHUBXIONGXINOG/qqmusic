<template>
  <div class="classic">
    <classic-swiper
        :recommend-list="RecommendList"
        :swiper-option="swiperOption"
    />
  </div>
</template>



<script>
import ClassicSwiper from '@/components/main/homepage/ClassicSwiper'

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
    ClassicSwiper,
  },
  methods:{
    async fetchRecommendSwiper(){
      const res = await this.$http.get('/songlist/list?category=136')
      console.log(res)
      this.RecommendList = res.data.data.list.map(item => ({
        img:item.imgurl,
        title:item.dissname,
        username:item.creator.name,
        id:item.dissid,
        listen_num:item.listennum,
        type:item.creator.type
      }))
      console.log(this.RecommendList.map(item=>item))
    }
  },
  created() {
    this.fetchRecommendSwiper()
  },

}
</script>
