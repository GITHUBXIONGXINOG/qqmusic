<template>
  <div class="recommend-swiper">
    <div v-swiper:mySwiper="swiperOption" class="my-swiper swiper-container">
        <div class="swiper-wrapper wrap">
            <div class="swiper-slide swiperStyle" v-for="(page,index) in pages" :key="index" >
                <div class="swiperPageImgList" v-for="item in page" :key="item.id">
                  <img :src="item.img" class="img">
                </div>
            </div>
        </div>
        <div class="wrap-prev">
            <div class="swiper-button-prev" @click="changePage"></div>
        </div>

        <div class="wrap-next">
           <div class="swiper-button-next" @click="changePage"></div>
        </div>

    </div>

  </div>
</template>


<script>


    export default {

      props:{
        recommendList:{
          type: Array,
          required:true
        },
        swiperOption: {
          type: Object,
          required: true
        }
      },
      computed:{
        pages () {
          const pages = []
          this.recommendList.forEach((item, index) => {
            //Math.floor() 返回小于或等于一个给定数字的最大整数
            const page = Math.floor(index / 5)
            //page是页数,5是每页可完整显示的数据,如果index是5,说明有6条数据,剩下的一条将被放在下一张轮播图中
            //固定只显示两页
            if (page < 2){
              if (!pages[page] ) {
                pages[page] = []
              }
              pages[page].push(item)
            }
            //进行判断
            //如果page是0,给pages添加一个下标为0的数组,即5条数据
            //forEach循环,0-4经过Math.floor后都为0,即page为0
            //再把对应的item入栈push到pages[0]里面
            //5-9 经过Math.floor后都为1,即page为1
            //再把对应的item入栈push到pages[1]里面
          })
          return pages
        }
      },
      methods:{
        changePage(){

          let cssText = document.querySelector('.swiper-wrapper').style.transform
          let a = "translate3d(0px, 0px, 0px)"
          let b = "translate3d(-1549px, 0px, 0px)"
            if (cssText == a){
              document.querySelector('.swiper-wrapper').style.transform = "translate3d(-1549px, 0px, 0px)";
              return
            }
            if (cssText == b){
              document.querySelector('.swiper-wrapper').style.transform = "translate3d(0px, 0px, 0px)";
              return
            }



        }
      }
    }
 </script>
