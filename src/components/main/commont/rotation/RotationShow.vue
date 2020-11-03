<template>
    <div class="rotation-show">

        <div class="slide-content">
            <!--图片内容-->
            <div class="slide-view"
                 v-for="(page,index) in pages" :key="index"
                 v-show="n==index"
            >
                <div class="slide-img " v-for="(v,i) in page" :key="i">
                    <div class="img-wrap ">
                        <img  class="img-info  checkedSyle"
                              :src="v.img"
                        >
                        <nav>
                             <a href="javascript:;" class="img_cover_wrap" >
                                 <img src="../../../../../public/img/cover_play@2x.png" alt="" class="img_cover_button">
                              </a>
                        </nav>


                    </div>

                    <!--图片标题内容-->
                    <div class="text-info" >
                        <a href="javascript:;">{{v.title}}</a>
                        <div>播放量:&nbsp;&nbsp;{{numToTenThousand(v.listen_num)}}</div>
                    </div>
                </div>
            </div>
            <!--后退按钮-->
            <div class="up-page checkedSyle"
                 @click="clickPage('up')"
            >
                <span class="iconfont icon-jiantou3"></span>
            </div>
            <!--前进按钮-->
            <div class="next-page checkedSyle"
                 @click="clickPage('next')"
            >
                <span class="iconfont icon-jiantouyouxi"></span>
            </div>
            <!--导航按钮-->
            <ul class="slide-index">
                <li v-for="(v,i) in pages" :key="i"
                    class=" checkedSyle"
                    @click="clickNav(i)"
                >
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="[ n == i ? '#icon-nav-middle-deep' : '#icon-nav-shallow'] ">
                        </use>
                    </svg>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>

    export default {
        props:{
          slideList: {
                type: Array,
                required: true
            }
        },
        data(){
            return{
                n:0,
                interId:null,
                upToPage:null,
                nextToPage:null
            }
        },
        methods:{
              /*定时器
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
            },*/
            //点击按钮
            clickPage(str){
                if (str === 'up'){
                    this.n--
                    if (this.n<0){
                        this.n = this.pages.length-1
                    }
                }
                if (str === 'next'){
                    this.n++
                    if (this.n == Math.floor(this.slideList.length/5)){
                        this.n = 0
                    }
                }
            },
            //点击导航
            clickNav(index){
                this.n = index
            },
            //转换位数
            numToTenThousand(num){
                if (num < 10000){
                    return num
                }
                let res = num / 10000
                //  toFixed 四舍五入 保留指定小数位数
                return res.toFixed(1)+'万'
            },
        },
        //mounted 在页面加载完成后执行的函数
        mounted() {
            // this.go()
        },
        computed:{
            pages () {
                const pages = []
                //savePage为保留页数,只保留slideList为5倍数的页数
                const savePage = Math.floor(this.slideList.length/5)
                this.slideList.forEach((item, index) => {
                    // debugger
                    //Math.floor() 返回小于或等于一个给定数字的最大整数
                    const page = Math.floor(index / 5)
                    //page是页数,5是每页可完整显示的数据,如果index是5,说明有6条数据,剩下的一条将被放在下一张轮播图中
                    //固定只显示两页
                    // debugger
                        if (!pages[page]  && page<savePage) {
                            pages[page] = []
                        }
                        if (pages[page]){
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
            },
        }
    }

</script>

