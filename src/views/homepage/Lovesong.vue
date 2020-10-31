<template>
  <div class="lovesong">
      <love-song-swiper
          :recommend-list="RecommendList"
          :swiper-option="swiperOption"
      />
  </div>

</template>

<script>
  import LoveSongSwiper from '@/components/main/homepage/LoveSongSwiper'
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
          },
        }
      },
      components:{
        LoveSongSwiper
      },
      methods:{
        async fetchRecommendSwiper(){


          const res = await this.$http.get('/songlist/list?category=148')
          // console.log(res)
          this.RecommendList = res.data.data.list.map(item => ({
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
