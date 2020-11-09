<template>
    <div class="rotation3d-show">
        <!--图片-->
        <div class="slide-out-wrap">
            <ul class="img-out-wrap" ref="imgOutWrap">
                <li v-for="(item,index) in slideList" :key="index"
                    :class="`list-${index}`" ref="imgWrap"
                    @mouseenter="stopGo"
                    @mouseleave="startGo"
                >
                    <img :src="item.img" alt="" class="select">
                </li>
            </ul>

            <!--导航按钮-->
            <div class="nav-out-wrap" ref="navOutWrap">
                <span v-for="(v,i) in slideList.length" :key="i" ref="navInfo"
                      @click="clickNav(i)" class="select"
                      @mouseenter="stopGo"
                      @mouseleave="startGo"
                >

                </span>
            </div>


        </div>
        <!--后退按钮-->
        <div class="up-page checkedSyle"
             @click="clickPage('up')"
             ref="upPage"
             @mouseenter="stopGo"
             @mouseleave="startGo"
        >
            <span class="iconfont icon-jiantou3"></span>
        </div>
        <!--前进按钮-->
        <div class="next-page checkedSyle"
             @click="clickPage('next')"
             @mouseenter="stopGo"
             @mouseleave="startGo"
        >
            <span class="iconfont icon-jiantouyouxi"></span>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
        slideList:{
                type: Array,
                require:true
            }
        },
        data(){
            return{
                //样式数组
                aListName : ["list-0","list-1","list-2","list-3","list-4","list-5"],
                //当前图片索引
                index:0,
                //点击表示,防止频繁点击
                clickFlag:0,
                //绑定定时器
                interId:null
            }
        },
        methods:{
            /*导航栏渲染样式*/
            setNavLine() {
                /*
                   navInfo绑定导航栏的span
                   等价于js里面的querySelectAll("span")
                   先循环,所有的都设置为浅色
                   再把当前图片索引值this.index位置上的span设置为深色背景
                 */
              for (let i = 0,len=this.$refs.navInfo.length; i < len; i++) {
                      this.$refs.navInfo[i].style.background="#e5e5e5"
                 }
                 this.$refs.navInfo[this.index].style.background="#b2b2b2"
            },

             /*导航栏点击*/
            clickNav(index){
                /*
                   点击后传入点击span的index位置,比较this.index图片索引和点击的位置
                   进行循环知道两者相等
                */
                if (this.index<index){
                    for (let i = 0; this.index<index; i++) {
                        this.aListName.unshift(this.aListName[5])
                        this.aListName.pop()
                        this.index++
                    }
                }
                if (this.index>index){
                    for (let i = 0; this.index >index ; i++) {
                        this.aListName.push(this.aListName[0])
                        this.aListName.shift()
                        this.index--
                    }
                }
                //setAttribute 设置class属性
                for (let i=0,len=this.$refs.imgWrap.length;i<len;i++){
                    this.$refs.imgWrap[i].setAttribute("class",this.aListName[i])
                }
                //渲染导航栏颜色
                this.setNavLine()
            },

            /*翻页按钮*/
            clickPage(dir){
                if (dir=='up'){
                    if (this.clickFlag==0){
                        /*利用clcikFlag防止多次重复点击*/
                        this.clickFlag=1
                        /*push把第一个入栈到队尾,shift移出第一个*/
                        this.aListName.push(this.aListName[0])
                        this.aListName.shift()
                        this.index = this.index>0 ? this.index-1 : 5
                        setTimeout( ()=> {
                          this.clickFlag=0
                        },500)
                    }

                }
                if (dir=='next'){
                    if (this.clickFlag==0) {
                        this.clickFlag=1
                        /*unshif把第5个入栈到队头,pop移除最后一个*/
                        this.aListName.unshift(this.aListName[5])
                        this.aListName.pop()
                        // debugger
                        this.index = this.index < 5 ? this.index + 1 : 0
                        // console.log(this.index)
                        setTimeout(()=>{
                            this.clickFlag=0
                        },500)
                    }
                }
                /*重新设置类名*/
                for (let i=0,len=this.$refs.imgWrap.length;i<len;i++){
                    this.$refs.imgWrap[i].setAttribute("class",this.aListName[i])
                }

                this.setNavLine()
            },

            /*定时器*/
            startGo(){
              this.interId = setInterval(()=>{
                  this.clickPage('next')
              },15000)
            },
            /*清除定时器*/
            stopGo(){
                clearInterval(this.interId)
            }

        },
        created() {

        },
        mounted() {
            this.startGo()
        }
    }
</script>
