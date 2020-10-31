<template>
  <div class="recommend">
    <recommend-swiper
        :recommend-list="RecommendList"
        :swiper-option="swiperOption"
    />
  </div>
</template>

<script>
    import RecommendSwiper from '@/components/main/homepage/RecommendSwiper'

    export default {
      data(){
        return {
          RecommendList: [],
          /*          swiperOption: {
            pagination: {
              el: '.swiper-pagination'
            },

          }*/
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
        RecommendSwiper,
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
