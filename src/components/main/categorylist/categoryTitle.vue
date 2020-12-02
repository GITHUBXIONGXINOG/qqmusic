<template>
    <div class="category-title">
<!--        {{ titleListAll }}-->
        <div class="title-wrap">
            <ul class="title-ul-wrap" v-for="(item,index) in titleList" :key="index" >
                <div class="title-center">
                    <i class="title-type">{{item.type}}</i>
                    <ul class="title-ul" :class="`title-ul-${index}`">

                        <li class="title-li" v-for="(v,i) in showList[index]" :key="i">
                            <i class="title-name" :class="{'select-title':v.id==activeIndex.category}"
                                @click="selectTitle(v.id,v.name)"
                            >
                                <a href="javascript:;">{{v.name}}</a>
                            </i>
                        </li>

                        <li @click.stop="clickShow(index)" v-if="index!=3" class="show-more"
                            :class="{'select-title': moreIndex[index]}"
                        >
                            <a href="javascript:;">{{ moreInfo[index] }}</a>

                            <svg class="icon jiantouxia" aria-hidden="true" v-show="!moreIndex[index]">
                                <use xlink:href="#icon-jiantouxia"></use>
                            </svg>
                            <svg class="icon jiantoushang" aria-hidden="true" v-show="moreIndex[index]">
                                <use xlink:href="#icon-jiantoushang"></use>
                            </svg>

                        </li>
                        <div class="more-title" v-show="showIndex==index" id="contextMenuBox">
                            <div class="title-name" v-for="(k,t) in moreList[index]" :key="t"
                                 @click="selectTitleMore(k.id,k.name,index)"
                                 :class="{'select-title': k.id==activeIndex.category}"
                            >
                                <a href="javascript:;">{{k.name}}</a>
                            </div>
                        </div>
                    </ul>
                </div>
            </ul>
        </div>
        <div class="title-select-show">
            <div v-if="activeIndex.category==10000000" class="title-select-default">
                {{word}}
            </div>
            <!--显示当前选中-->
            <div v-else class="title-select-info">
                {{word}}
                <div class="delete-select" @click="deleteSelect">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-cuowu"></use>
                    </svg>
                </div>
            </div>
            <div class="title-select-order">
                <a href="javascript:;" class="order-recommend"
                    @click="selectTitleOrder"
                   :class="{'select-order':orderSelect}"
                >
                    推荐
                </a>

                <a href="javascript:;" class="order-new"
                   @click="selectTitleOrder"
                   :class="{'select-order':!orderSelect}"
                >
                    最新
                </a>


            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            changePageInfo:{
                type: Number
            }
        },
        data(){
            return{
                titleListAll:[],//所有标题,包括热门
                titleList:[],//所有标题,不包括热门
                activeIndex:{
                    category:10000000,//分类id
                    sort:5,//5推荐,2最新
                    pageNo:1,//页码
                    pageSize:20//每页
                },//活动点击传递
                showIndex:-1,//显示隐藏更多展示
                moreList:[{}],//更多展示里面的数据
                showList:[[]],//普通展示的数据
                contentList:[],//图片内容数据
                moreIndex:[false,false,false,false,false],//存储该更多是否被点击,true为被点击
                moreInfo:['更多','更多','更多','','更多'],//存储'更多'位置上显示的数据,点击后可以动态更新
                saveSelectName:'全部歌单',//保存点击的名字,在外部输出
                orderSelect:true,

            }
        },
        methods: {
            //获取api数据
            async fetchCategory(params) {
                // debugger
                //往本地存储读取数据
                let titleListAll = localStorage.getItem('titleListAll')
                // console.log(titleListAll);
                //如果存在数据,拿走
                if (titleListAll){
                    //将拿取到的数据进行解析
                    titleListAll = JSON.parse(titleListAll)
                     //时间判断
                       //new Date().getTime() 当前时间
                       //titleListAll.time    数据存储时间
                    if (new Date().getTime()-titleListAll.time < 30*60*1000){
                        this.titleListAll = titleListAll.data
                        // return
                    }else {
                        //如果不存在,发送请求
                        //标签
                        let urlTitle = '/api/songlist/category'
                        let res = await this.$http.get(urlTitle)
                        // debugger

                        // console.log(res)
                        // console.log(res.data.result)
                        //==100代表服务器响应成功,拿到数据
                        if (parseInt(res.data.result)===100){
                            //将服务器拿到的数据存储到titleListAll
                            this.titleListAll = res.data.data
                            //本地存储数据 JSON格式字符串
                            localStorage.setItem(
                              'titleListAll',
                              JSON.stringify({
                                  time:new Date().getTime(),
                                  data:res.data.data
                              }))
                        }
                    }
                }else {
                    //如果不存在,发送请求
                    //标签
                    let urlTitle = '/api/songlist/category'
                    let res = await this.$http.get(urlTitle)
                    // debugger

                    // console.log(res)
                    // console.log(res.data.result)
                    //==100代表服务器响应成功,拿到数据
                    if (parseInt(res.data.result)===100){
                        //将服务器拿到的数据存储到titleListAll
                        this.titleListAll = res.data.data
                        //本地存储数据 JSON格式字符串
                        localStorage.setItem(
                          'titleListAll',
                          JSON.stringify({
                              time:new Date().getTime(),
                              data:res.data.data
                          }))
                    }
                }



                // this.titleListAll = res.data.data

                //内容

                let urlContent = '/api/songlist/list'
                const resContent = await this.$http.get(urlContent,{params})
                this.contentList = resContent.data.data.list.map(item=>({
                    img:item.imgurl,
                    title:item.dissname,
                    singers:item.creator.name,
                    listennum:item.listennum,
                    id:item.dissid,
                    content_id:'content_id='+item.dissid
                }))
                // console.log(this.contentList)

                // debugger
                //默认显示的长度
                let len = [5,8,8,9,8]
                let l =this.titleListAll.length-1
                this.titleList=this.titleListAll.slice(1)
                // console.log(this.titleList)
                //循环类别
                for (let i = 0 ; i < l ;i++) {
                    this.showList[i]=new Array()
                    this.moreList[i]=new Object()
                    for (let j = 0 ,m= this.titleList[i].list.length ; j < m; j++) {

                        if (j<len[i]){
                            this.showList[i][j]=(this.titleList[i].list[j])
                        }else {
                            this.moreList[i][j]=(this.titleList[i].list[j])
                        }
                    }
                }
                //派发
                this.$emit('contentList',this.contentList)
            },

            //点击函数
            selectTitle(id,name){
                //index,类别 ,key具体项
                // debugger
                this.activeIndex['category']=id
                this.fetchCategory(this.activeIndex)
                //清空更多上的样式
                this.moreIndex=[false,false,false,false,false]
                this.moreInfo=['更多','更多','更多','','更多']
                //保存点击的名字
                this.saveSelectName = name
                // console.log(this.saveSelectName)
            },
            selectTitleMore(id,name,index){
                //index,类别 ,key具体项
                // debugger
                this.activeIndex['category']=id
                this.moreInfo=['更多','更多','更多','','更多']
                this.moreInfo[index]=name
                //颜色赋值
                //清零
                this.moreIndex=[false,false,false,false,false]
                //赋值数据
                this.moreIndex[index] = true
                this.fetchCategory(this.activeIndex)
                this.showIndex=-1
                const contextMenuBox =document.getElementById('contextMenuBox')
                if (contextMenuBox){
                    contextMenuBox.style.display='none'
                }
                //保存点击的名字
                this.saveSelectName = name
            },
            //删除选中
            deleteSelect(){
              this.activeIndex.category=10000000
              this.moreIndex=[false,false,false,false,false]
              this.moreInfo=['更多','更多','更多','','更多']
              this.fetchCategory()
            },
            //更改排序
            selectTitleOrder(){
               if ( this.activeIndex.sort==5){
                   this.activeIndex.sort=2
               }else{
                   this.activeIndex.sort=5
               }
                this.orderSelect=!this.orderSelect
                this.fetchCategory(this.activeIndex)
            }
        },
        created() {
            this.fetchCategory()
        },
        mounted() {
            //给所有元素添加点击事件,点击更多展示之外的地方就把showIndex置为-1,达到隐藏展示的效果
            document.addEventListener('click',e=>{
                const contextMenuBox = document.getElementById('contextMenuBox')
                if (contextMenuBox){
                    if (!contextMenuBox.contains(e.target)){

                        this.showIndex=-1

                    }
                }
            })
        },
        computed:{
            // word:function () {
            //     // debugger
            //     // this.showAll.forEach((item,index)=>{
            //     //     if (this.showAll[index]==false){
            //     //         return '展开全部'
            //     //     }else {
            //     //         return '收起'
            //     //     }
            //     // })
            //
            // }
            //显示隐藏
            // showList(list,index) {
            //     // debugger
            //     // console.log(list)
            //     //设置显示个数
            //     let len = 0
            //     switch (index){
            //         case 0:
            //             len = 5
            //             break
            //         case 1:
            //         case 2:
            //         case 4:
            //             len = 8
            //             break
            //         default:
            //             len = 9
            //             break
            //     }
            //
            //     if (this.showAll[index] == false) {
            //         let showList = []
            //         for (let i = 0; i < len; i++) {
            //             showList.push(list[i])
            //         }
            //         // console.log(showList)
            //
            //         return showList
            //     } else {
            //         this.moreList = []
            //         for (let i = len; i < list.length; i++) {
            //             this.moreList.push(list[i])
            //         }
            //         // debugger
            //         console.log(this.moreList)
            //         return this.moreList
            //
            //     }
            // },
            //显示
            // showList(){
            //     return function (list,index){
            //         // debugger
            //         // console.log(list)
            //         //设置显示个数
            //         let len = 0
            //         switch (index){
            //             case 0:
            //                 len = 5
            //                 break
            //             case 1:
            //             case 2:
            //             case 4:
            //                 len = 8
            //                 break
            //             default:
            //                 len = 9
            //                 break
            //         }
            //         let showList = []
            //         for (let i = 0; i < len; i++) {
            //             showList.push(list[i])
            //         }
            //         this.moreList = []
            //         for (let i = len; i < list.length; i++) {
            //             this.moreList.push(list[i])
            //         }
            // /*        if (this.showAll[index] != false) {
            //             console.log(showList)
            //             this.moreList = []
            //             for (let i = len; i < list.length; i++) {
            //                 this.moreList.push(list[i])
            //             }
            //         }*/
            //         // if (this.showAll!==index){
            //         //     console.log(this.showAll)
            //         //     // this.showAll = index
            //         // }
            //         return showList
            //         }
            //     },
            clickShow(){
                return function (index){
                    // debugger
                    // console.log(this.showIndex);
                    if (index==this.showIndex){
                        this.showIndex=-1
                    }else{
                        //设置为显示点击所在的index
                        this.showIndex=index
                    }
                    //设置为显示点击所在的index
                    // this.showIndex=index
                    //更多 数据操作
                    //存储数据
                    // let tempIndex = !this.moreIndex[index]
                    // let tempIndex = this.moreIndex[index]
                    // //清零
                    // this.moreIndex=[false,false,false,false,false]
                    // //赋值数据
                    // this.moreIndex[index] = tempIndex
                    // console.log(this.showIndex)
                }
            },
            word:function (){
                if (this.activeIndex.category==10000000){
                    return '全部歌单'
                }else{
                    // debugger
                    // console.log(this.$refs.vName.value)
                    return this.saveSelectName
                }
            },
        },

        watch:{
            changePageInfo(page){
                this.activeIndex.pageNo=page
                this.fetchCategory(this.activeIndex)
            },
            //监听路由切换 如果路由改变
            $route(){
                this.$nextTick(()=>{
                    this.fetchCategory()

                })
            }
        },


    }
</script>
