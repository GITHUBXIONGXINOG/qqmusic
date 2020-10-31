<template>
  <div class="my-swiper">
<!--    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">

        <div class="swiper-slide"  v-for="(item,index) of swiperList" :key="index">
          <div class="imgList" >
            <div v-if="index<5">
              <img :src="item.img">
            </div>
          </div>
        </div>
        &lt;!&ndash;   <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>&ndash;&gt;
      </div>
      <div class="swiper-pagination"></div>
    </div>-->
    <swiper :options="swiperOption" ref="mySwiper" class="wrap">
      <swiper-slide v-for="(page,index) in pages" :key="index" class="swiperStyle">
        <div class="swiperPageImgList" v-for="item in page" :key="item.id">
            <img class="img" :src="item.img" alt="">
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
    export default {

      props:{
        swiperList:{
          type: Array,
          required: true
        },
        swiperOption:{
          type: Object,
          required: true
        }
      },
      computed:{
        pages () {
          const pages = []
          this.swiperList.forEach((item, index) => {
            //Math.floor() 返回小于或等于一个给定数字的最大整数
            const page = Math.floor(index / 5)
            //page是页数,5是每页可完整显示的数据,如果index是5,说明有6条数据,剩下的一条将被放在下一张轮播图中
            if (!pages[page]) {
              pages[page] = []
            }
            //进行判断
            //如果page是0,给pages添加一个下标为0的数组,即5条数据
            pages[page].push(item)
            //forEach循环,0-4经过Math.floor后都为0,即page为0
            //再把对应的item入栈push到pages[0]里面
            //5-9 经过Math.floor后都为1,即page为1
            //再把对应的item入栈push到pages[1]里面
          })
          return pages
        }
      }
    }
</script>

