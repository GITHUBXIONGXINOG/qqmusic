<template>
  <div class="recommend">
    <recommend-swiper

    />
  </div>
</template>

<script>
    import RecommendSwiper from '@/components/main/homepage/RecommendSwiper'
    export default {
      components:{
        RecommendSwiper
      },
      methods:{
        async fetchRecommendSwiper(){
          const res = await this.$http.get('/recommend/playlist/u')
          console.log(res.data)
        }
      },
      created() {

      }
    }
</script>
