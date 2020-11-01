<template>
    <div class="rotation-show">
<!--        我在RotationShow.vue-->
        <div class="slide-content">
            <div class="slide-view">
                <a href="javascript:;" class="slide-img">
                    <img  v-for="(item,index) in slideList" :key="index"
                          :src="item.url"
                          v-show="n == index"
                          @mouseenter="clearGo"
                          @mouseleave="go"
                    >
                </a>
                <div class="up-pag checkedSyle"
                     @click="clickPage('up')"
                     @mouseenter="clearGo"
                     @mouseleave="go"
                >
                    <span class="iconfont icon-jiantou"></span>
                </div>
                <div class="next-page checkedSyle"
                     @click="clickPage('next')"
                     @mouseenter="clearGo"
                     @mouseleave="go"
                >
                    <span class="iconfont icon-arrow-right"></span>
                </div>

                <ul class="slide-index">
                    <li v-for="(v,i) in slideList" :key="i"
                        class="iconfont icon-circle checkedSyle"
                        :class="[ n == i ? 'icon-yuan' : ''] "
                        @click="clickNav(i)"
                        @mouseenter="clearGo"
                        @mouseleave="go"
                    >
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                slideList:[
                    {
                       url: require('../assets/img/1.jpg')
                    },
                    {
                        url: require('../assets/img/2.jpg')
                    },
                    {
                        url: require('../assets/img/3.jpg')
                    },
                    {
                        url: require('../assets/img/4.jpg')
                    },
                    {
                        url: require('../assets/img/5.jpg')
                    },
                    {
                        url: require('../assets/img/6.jpg')
                    },
                    {
                        url: require('../assets/img/7.jpg')
                    },
                    {
                        url: require('../assets/img/8.jpg')
                    },
                    {
                        url: require('../assets/img/9.jpg')
                    },
                    {
                        url: require('../assets/img/10.jpg')
                    },

                ],
                n:0,
                interId:null
            }
        },
        methods:{
            //开始改变变量n 作为是否轮播的比较参数
            go(){
                //循环定时器
               this.interId = setInterval(()=>{
                    this.n++
                    if (this.n == this.slideList.length){
                      this.n = 0
                    }
                 },1500)
            },
            //清除定时器
            clearGo(){
                clearInterval(this.interId)
            },
            //点击按钮
            clickPage(str){
                if (str === 'up'){
                    this.n--
                    if (this.n<0){
                        this.n = this.slideList.length-1
                    }
                }
                if (str === 'next'){
                    this.n++
                    if (this.n == this.slideList.length){
                        this.n = 0
                    }
                }
            },
            //点击导航
            clickNav(index){
                this.n = index
            }
        },
        //mounted 在页面加载完成后执行的函数
        mounted() {
            this.go()
        }
    }
</script>
