<template>
    <div class="rotation-pic">
        <div class="imgShowStation">
            <div class="imgList-wrap  " v-for="(item,index) in imgList" :key="item.id"
                 :class="`imgList-${index}`"
                 ref="imgList"
            >
                <div class="imgList-inner" v-for="(v,i) in item" :key="i"
                     :class="`slide-img-${i}`"
                >
                    <!--图片-->
                    <picture-show :imgUrl="v.img"/>
                    <!--图片标题内容-->
                    <div class="text-info" >
                        <a href="javascript:;">{{v.title}}</a>

                        <!--歌单推荐-->
                        <div v-if="numberPart==0">
                            <span>播放量:</span>
                            {{numToTenThousand(v.listen_num)}}
                        </div>
                        <!--新歌/碟首发-->
                        <div v-else-if="numberPart==1||numberPart==2">
                            {{v.singer}}
                        </div>

                        <!--排行榜-->
                     <!--   <div v-else-if="numberPart==3">
                            <div class="isRank">
                                <div v-for="(n,p) in v.song" :key="p" class="rank-wrap">
                                    <div class="rank-title-wrap">
                                        <span class="rank-number">
                                            {{v.song[p].rank}}
                                        </span>
                                        <a class="rank-title" href="javascript:;">
                                            &lt;!&ndash;                                            {{v.song[p].title}}&ndash;&gt;
                                            {{v.song[p].title.length>10
                                          ? v.song[p].title.slice(0,9)+'...'
                                          : v.song[p].title}}
                                        </a>
                                    </div>
                                    &lt;!&ndash;隐藏超出的文字&ndash;&gt;
                                    <a class="rank-singerName" href="javascript:;" >
                                        {{v.song[p].singerName.length>18
                                      ? v.song[p].singerName.slice(0,17)+'...'
                                      : v.song[p].singerName}}
                                    </a>
                                </div>

                            </div>
                        </div>-->

                        <!--mv-->
                        <div v-else>
                            <a href="javascript:;">{{v.singer}}</a>
                            <!--播放图标-->
                            <div>
                                <span v-if="numberPart==4" class="iconfont">&#xe6c2;&nbsp;</span>
                                <span>{{numToTenThousand(v.listen_num)}}</span>
                            </div>

                        </div>

                    </div>


                </div>


            </div>
        </div>



        <!--后退按钮-->
        <div class="up-page checked"
             @click="clickPage('up')"
             v-if="pageLen>3"
        >
            <span class="iconfont icon-jiantou3"></span>
        </div>
        <!--前进按钮-->
        <div class="next-page checked"
             @click="clickPage('next')"
             v-if="pageLen>3"
        >
            <span class="iconfont icon-jiantouyouxi"></span>
        </div>
        <!--导航按钮-->
        <ul class="slide-index"
            v-if="pageLen>3"
        >

            <li v-for="(v,i) in pageLen" :key="i"
                class=" checked"
                @click="clickNav(i)"

            >
                <svg class="icon" aria-hidden="true" v-show="i>0&&i<pageLen-1">
<!--                    <use :xlink:href="[ activeIndex == i ? '#icon-nav-middle-deep' : '#icon-nav-shallow'] ">-->
                    <use :xlink:href="setNav(i)">

                    </use>
                </svg>
            </li>
        </ul>

    </div>
</template>
<script>
    import PictureShow from "@/components/main/commont/PictureShow";
    export default {
        components:{
            PictureShow
        },
        props:{
            //接收图片列表
            setImgList:{
              type: Array,
              require: true
          },
            //接收每页显示图片个数
            setPageSize:{
              type: Number,
              require: true
            },
            numberPart:{
                type: Number
            },//页面的部分序号
        },
        data(){
            return{
                imgList:[],//图片列表
                pageSize:1,//每页显示图片个数
                pageLen:1,//页数
                activeIndex:1,//当前活动
                aListName:[],//class集合
                clickFlag:false,//点击标识
            }
        },
        watch:{
            setImgList:{
                immediate:true,
                handler:function (val) {
                    // debugger
                    this.imgList=val
                    this.pageSize=this.setPageSize
                    this.pages()
                    // console.log(this.imgList)
                }
            },

        },
        methods:{
            //点击按钮
            clickPage(str){
          /*      debugger
                if (this.aListName.length!=this.pageLen){
                    this.pageLen = this.aListName.length
                }*/
                if (str === 'up'){
                    if (this.clickFlag==false){
                        /*利用clcikFlag防止多次重复点击*/
                        this.clickFlag=true
                        this.aListName.push(this.aListName[0])
                        this.aListName.shift()
                        this.activeIndex = this.activeIndex>0 ? this.activeIndex-1 : this.pageLen-2
                        setTimeout( ()=> {
                            this.clickFlag=0
                        },500)
                    }
                }
                if (str === 'next'){
                    if (this.clickFlag==0){
                        /*利用clcikFlag防止多次重复点击*/
                        this.clickFlag=1
                        this.aListName.unshift(this.aListName[this.pageLen-1])
                        this.aListName.pop()
                        this.activeIndex = this.activeIndex<this.pageLen-1 ? this.activeIndex+1 : 1
                        setTimeout( ()=> {
                            this.clickFlag=0
                        },500)
                    }
                }

                /*重新设置类名*/
                for (let i=0,len=this.$refs.imgList.length;i<len;i++){
                    this.$refs.imgList[i].setAttribute("class",`imgList-wrap ${this.aListName[i]}`)
                }
            },
            //点击导航
            clickNav(index){
                //活动点击比点击的大,前进
                if (this.activeIndex>index){
                    for (let i = 0; this.activeIndex >index ; i++) {
                        this.aListName.push(this.aListName[0])
                        this.aListName.shift()
                        this.activeIndex--
                    }
                }
                if (this.activeIndex<index){
                    for (let i = 0; this.activeIndex<index; i++) {
                        this.aListName.unshift(this.aListName[this.pageLen-1])
                        this.aListName.pop()
                        this.activeIndex++
                    }
                }


                /*重新设置类名*/
                for (let i=0,len=this.$refs.imgList.length;i<len;i++){
                    this.$refs.imgList[i].setAttribute("class",`imgList-wrap ${this.aListName[i]}`)
                }
             },
            //页数
            pages () {
                // debugger
                const pages = []
                const pageLen = Math.floor(this.imgList.length/this.pageSize)
                this.imgList.forEach((item, index) => {
                    // debugger
                    //Math.floor() 返回小于或等于一个给定数字的最大整数
                    const page = Math.floor(index / this.pageSize)

                    // debugger
                    if (!pages[page]  && page<pageLen) {
                        pages[page] = []
                    }
                    if (pages[page]){
                        pages[page].push(item)
                    }
                })
                //无缝轮播 为第一页前插入最后一页,为最后一页后插入第一页
                pages.unshift(pages[pageLen-1])
                pages.push(pages[1])
                this.imgList =  pages
                this.pageLen = pageLen+2
                this.aListName=[]
                for (let i = 0; i < pageLen+2; i++) {
                    this.aListName.push(`imgList-${i}`)
                }
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
            //设置导航
            setNav(i){

            // <use :xlink:href="[ activeIndex == i ? '#icon-nav-middle-deep' : '#icon-nav-shallow'] ">
             if (this.activeIndex == i){
                 return '#icon-nav-middle-deep'
             }else if (this.activeIndex==0 && i==this.pageLen-2){
                 this.activeIndex=i
                 return '#icon-nav-middle-deep'

             }else if (this.activeIndex==this.pageLen-1&&i==1){
                 this.activeIndex=i
                 return '#icon-nav-middle-deep'

             }

             else {
                 return '#icon-nav-shallow'
             }
            }
        }
    }

</script>

<style lang="scss">

//margin居中
.margin_center{
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
//轮播图
.rotation-pic{
    //border: 1px solid red;
    height: 369px;
    @extend .margin_center;
    top: 0px;
    //overflow: hidden;
    //width: 1200px;
    display: flex;
    flex-wrap: nowrap;
    //position: absolute;
    justify-content: center;
    font-size: 14px;
    //展示窗口
    .imgShowStation{
        //border: 1px solid blue;
        width: 1200px;
        overflow: hidden;
        position: relative;
        //background: #000;
        //轮播图外框
        .imgList-wrap{
            //border: 1px solid black;
            display: flex;
            //flex: 0 0 1200px;
            //justify-content: space-between;
            margin: 0 20px;
            position: absolute;
            width: 1200px;
            transition:  .2s ease-out;
            overflow: hidden;
            //轮播图内框
            .imgList-inner{
                //border: 1px solid blue;
                //display: flex;
                width: 224px;
                .picture-show{
                    width: 224px;
                    height: 224px;
                }
                .text-info{
                    font-size: 14px;
                    margin-top: 15px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    a{
                        //border: 1px solid deepskyblue;
                        line-height:22px;
                        height: 23.2px;
                        width: 10px;
                    }
                    div{
                        //border: 1px solid black;
                        width: 224px;
                        height: 22px;
                        font-weight:400;
                        color: #999999;
                    }
                }
            }
        }
    }

    //后退按钮
    .up-page{
        //border: 1px solid red;
        width: 80px;
        height: 110px;
        position: absolute;
        //top: 48px;
        background: rgba(71,71,71,0.1);
        opacity: 1;
        overflow: hidden;
        left: -100px;
        top: 0;
        bottom: 0;
        margin: auto 0;
        z-index: 3;
        span{
            //border: 1px solid green;
            position: absolute;
            width: 40px;
            height: 40px;
            font-size: 40px;
            @extend .margin_center;
        }
        transition: left 0.8s,background 0.8s;
        &:hover {
            background: rgba(71,71,71,0.2);

        }
    }
    //前进按钮
    .next-page{
        //border: 1px solid red;
        width: 80px;
        height: 110px;
        position: absolute;
        //top: 48px;
        top: 0;
        bottom: 0;
        margin: auto 0;
        right: -100px;
        //background: rgb(236, 236, 236);
        background: rgba(71,71,71,0.1);
        opacity: 1;
        z-index: 3;
        span{
            //border: 1px solid green;
            position: absolute;
            width: 40px;
            height: 40px;
            font-size: 40px;
            @extend .margin_center;
        }
        transition: right 0.8s,background 0.8s;
        &:hover {
            background: rgba(71,71,71,0.2);
        }

    }

    &:hover .up-page{
        left: 0;
    }
    &:hover .next-page{
        right: 0;
    }

    //导航按钮
    .slide-index{
        //border: 1px solid red;
        position: absolute;
        width: 150px;
        height: 20px;
        right: 0;
        left: 0;
        bottom: 23px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        z-index: 3;
        li{
            //border: 1px solid blue;
            font-size: 9px;
            padding: 0 10px;
        }
    }

    //选中
    .checked{
        cursor: pointer;
    }
}
.imgList-0{
    transform: translateX(-1220px);
}
.imgList-1{
    transform: translateX(-20px);
    z-index: 3;

}
.imgList-2{
    transform: translateX(1220px);

}
@for $i from 3 through 20{
    .imgList-#{$i}{
        transform: translateX((1200px * $i)-1200px);
        //opacity: 0;
    }
}




</style>
