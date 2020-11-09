<template>
    <div class="rotation-show">

        <div class="slide-content"
             :class="`content-${index}`">
            <!--图片内容-->



            <div class="slide-view"
                 v-for="(page,indexPage) in pages" :key="indexPage"
                 v-show="n==indexPage"
            >
                <div class="slide-img  " v-for="(v,i) in page" :key="i"
                     :class="`slide-img-${i}`"
                >
                    <div class="img-wrap ">
                        <img  class="img-info  checkedSyle"
                              :src="v.img"
                        >
                        <nav>
                              <a href="javascript:;" class="img_cover_wrap" >
                                 <img src="../../../../../public/img/cover_play@2x.png" alt="" class="img_cover_button select">
                              </a>
                        </nav>
                    </div>

                    <!--图片标题内容-->
                    <div class="text-info" >
                        <a href="javascript:;" :setTitle="setTitle(v)">{{title}}</a>
                        <div :setContent="setContent(v)">
                            {{content}}
                            <!--如果是排行榜-->
                            <div v-if="v.song" class="isRank">
                                <div v-for="(n,p) in v.song" :key="p" class="rank-wrap">
                                    <div class="rank-title-wrap">
                                        <span class="rank-number">
                                            {{v.song[p].rank}}
                                        </span>
                                        <a class="rank-title" href="javascript:;">
<!--                                            {{v.song[p].title}}-->
                                            {{v.song[p].title.length>10
                                            ? v.song[p].title.slice(0,9)+'...'
                                            : v.song[p].title}}
                                        </a>
                                    </div>
                                    <!--隐藏超出的文字-->
                                        <a class="rank-singerName" href="javascript:;" >
                                        {{v.song[p].singerName.length>18
                                            ? v.song[p].singerName.slice(0,17)+'...'
                                            : v.song[p].singerName}}
                                        </a>
                                </div>

                            </div>

                        </div>
                        <span v-if="setNumber(v)" class="iconfont">&#xe6c2;&nbsp;{{number}}</span>

                    </div>

                </div>

            </div>



            <!--后退按钮-->
            <div class="up-page checkedSyle"
                 @click="clickPage('up')"
                 v-if="pages.length>1"
            >
                <span class="iconfont icon-jiantou3"></span>
            </div>
            <!--前进按钮-->
            <div class="next-page checkedSyle"
                 @click="clickPage('next')"
                 v-if="pages.length>1"
            >
                <span class="iconfont icon-jiantouyouxi"></span>
            </div>
            <!--导航按钮-->
            <ul class="slide-index"
                v-if="pages.length>1"
            >
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
       /*
            使用props定义接收来自父组件的slideList和index
        */
        props:{
            slideList: {
                type: Array,
                required: true
            },
            index:{
              type: Number,
                required: true
            }
        },
        data(){
            return{
                n:0,
                interId:null,
                upToPage:null,
                nextToPage:null,
                p:0,
                title:null,
                content:null,
                subtitle:null,
                number:null,
                rankList:null
            }
        },
        methods:{
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
                    if (this.n == Math.floor(this.slideList.length/this.p)){
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
            //设置轮播图页数
            setPage(index){
                switch (index){
                    case 0:
                        this.p=5
                        break
                    case 1:
                        this.p=9
                        break
                    case 2:
                        this.p=10
                        break
                    case 3:
                        this.p=5
                        break
                    case 4:
                        this.p=10
                        break
                }
                 },
            //设置标题
            setTitle(v){
                switch (this.index){
                    case 0:
                        this.subtitle = null
                        break
                    case 1:
                    case 2:

                        this.subtitle = v.subtitle

                }
                if (!this.subtitle){
                    this.title = v.title
                }else {
                    this.title=v.title+this.subtitle
                }


                // console.log(v)
            },
            //设置文字
            setContent(v){
                if (this.index==0){
                    // this.content='播放量: '+this.numToTenThousand(v.listen_num)
                    this.content='播放量: '+this.numToTenThousand(v.listen_num)
                }
                else if (this.index==1 || this.index==2){
                    this.content=v.username
                        // console.log(content)
                }
                else if (this.index==3){
                    /*         debugger
                             console.log(v)*/
                    // this.content=v.song[0]
                    // +this.numToTenThousand(v.listen_num)
                    this.isRank(v)
                }
                else if (this.index==4){
           /*         debugger
                    console.log(v)*/
                    this.content=v.username
                        // +this.numToTenThousand(v.listen_num)

                }
                // debugger
            /*    if (!v.listen_num){
                    console.log(v)
                }*/

            },
            //设置播放量数字
            setNumber(v){
                if (this.index==4){
                    // debugger
                    this.number=this.numToTenThousand(v.listen_num)
                    // console.log(this.number)
                    return true
                }
                return false
            },
            //判读排行
            isRank(res){

                // console.log(this.apiGetList)
                // console.log(res)
   /*             if (!res.song){
                    return false
                }*/
                this.rankList = res.song.map(item=>({
                    rank:item.rank,
                    singerName:item.singerName,
                    songId:item.songId,
                    title:item.title,
                }))
         /*       console.log(this.songList.map(item=>item))
                return true*/
            },


        },
        //mounted 在页面加载完成后执行的函数
        mounted() {
            // this.go()
            // this.setWord(this.index)
        },
        computed:{
            //页数
            pages () {
                // debugger
                const pages = []
                this.setPage(this.index)
                //savePage为保留页数,只保留slideList为5倍数的页数
                const savePage = Math.floor(this.slideList.length/this.p)
                this.slideList.forEach((item, index) => {
                    // debugger
                    //Math.floor() 返回小于或等于一个给定数字的最大整数
                    const page = Math.floor(index / this.p)
                    //page是页数,5是每页可完整显示的数据,如果index是5,说明有6条数据,剩下的一条将被放在下一张轮播图中

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

