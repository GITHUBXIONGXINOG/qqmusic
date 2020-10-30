<template>
  <div class="homepage">
        <my-swiper
          :swiper-list="swiperList"
          :swiper-option="swiperOption"
        />

  </div>
</template>

<script>
    import MySwiper from '@/components/main/homepage/MySwiper'

    export default {
      data(){
        return{
          swiperList:[],
          swiperOption: {
            pagination: {
              el: '.swiper-pagination'
            },
          },
         singerList:[
           {path: '',name:'为你推荐'},
           {path: '',name:'官方歌单'},
           {path: '',name:'情歌'},
           {path: '',name:'网络歌曲'},
           {path: '',name:'经典'},
           {path: '',name:'KTV热歌'},
         ],
        }

      },
      methods:{

          async fetchSwiperList(){
          const res = await this.$http.get('/recommend/playlist/u')
          console.log(res.data)
            console.log(res.data.data)

            //res 获取到的连接
            //data 响应数据保存在data里面,第二个data保存数据list是数据里定义的数组名字
            this.swiperList = res.data.data.list.map(item => ({img:item.cover}))
            console.log(this.swiperList.map(item=>item.img))
        },

      },
      created() {
        this.fetchSwiperList()
      },
      components: {
        MySwiper
      }
    }




</script>
