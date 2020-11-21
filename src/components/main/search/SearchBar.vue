<template>
    <div  class="search-bar" id="searchBar">
        <transition name="fade">
            <!--顶部搜索-->
            <div :class="['topSearch',{'topSearchFixed':isFixed}]" v-show="isFixed">
                <input type="text" placeholder="搜索音乐、MV、歌单、用户"
                       @focus="isShowHot=true"
                       @click.stop="fetchApi()"
                       v-model="inputSearch"
                       @keyup.enter="searchSong(inputSearch)"
                >
                <!--搜索按钮-->
                <span class="iconfont icon-sousuo"
                      @mousedown.stop="searchSong(inputSearch)"
                ></span>

            </div>
        </transition>

        <!--主页搜索-->
        <div class="searchAndIcon"    id="mainInput"
          :class="[{'changeWidth':false}]">
            <input type="text" placeholder="搜索音乐、MV、歌单、用户"
                   @focus="isShowHot=true"
                   @click.stop="fetchApi()"
                   v-model="inputSearch"
                   @keyup.enter="searchSong(inputSearch)"

            >
            <!--搜索按钮-->
            <span class="iconfont icon-sousuo"
                  @mousedown.stop="searchSong(inputSearch)"
            ></span>

        </div>
        <div class="searchPanel" v-show="isShowHot">
            <!--热搜-->
            <ul class="hotSearch-ul">
                <li v-for="(item,index) in hotSearch" v-show="index<5" :key="index"
                    class="hotSearch-li"
                    @click.stop="searchSong(item.name)"
                >

                    <i class="hotSearch-rank">{{index+1}}</i>
                    <span class="hotSearch-name">
                                  <a href="javascript:;">{{item.name}}</a>
                              </span>
                    <span class="hotSearch-number">
                                   {{item.number}}
                              </span>


                </li>
            </ul>
            <!--搜索历史-->
            <div class="searchHistory">
                <nav class="history-title">
                    <i class="content">搜索历史</i>
                    <a href="javascript:;" class="iconfont icon-lajixiangzizhi"
                       @click="deleteAll"
                    ></a>
                </nav>
                <div v-for="(item,index) in searchHistory" :key="index" class="history-list"
                     @click="searchSong(item)"
                >
                    <i>{{item}}</i>
                    <span class="iconfont icon-cuowu" @click="deleteOne(index)"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
          return{
              isShowHot:false,//展示热搜词
              hotSearch:[],//热搜词列表
              inputSearch:'',//搜索
              searchHistory:[],//搜索历史
              isFixed:false,//搜索框是否定位
          }
        },
        methods:{
            isActive(path){
                let reg = new RegExp('^'+path+'/')
                if (this.$route.path.match(reg)){
                    return true
                }
                if (path === this.$route.path ){
                    return true
                }
                if (path === '/homepage' && this.$route.path === '/'){
                    return true
                }
                return false
            },
            async fetchApi(){
                let urlHot =  '/api/search/hot'
                const resHot = await this.$http.get(urlHot)
                // debugger
                // console.log(resHot.data.data)
                this.hotSearch = resHot.data.data.map(item=>({
                    name:item.k,
                    number:this.numToTenThousand(item.n)
                }))
                // console.log(this.hotSearch)

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
            //搜索
            searchSong(item){
                // debugger
                //通过传入的数据作为输入数据
                if ( this.inputSearch!=item){
                    // console.log(item)
                    this.inputSearch=item
                }
                //通过双向数据绑定inputSearch获取搜索数据
                // 正则表达式,存在的历史不再次记录
                const reg = new RegExp(`^${this.inputSearch}$`)
                let flag = true;
                this.searchHistory.forEach(item=>{
                    if (item.match(reg)){
                        flag = false
                    }
                })
                if (flag&&this.inputSearch){
                    this.searchHistory.push(this.inputSearch)
                }
                //只保留最新的5个记录
                if ( this.searchHistory.length>5){
                    this.deleteOne(0)
                }
                // debugger
                this.isShowHot=false
                this.$router.push({
                    path:"/search",
                    query:{
                        inputSearch: this.inputSearch
                    }
                })
            },
            //删除一项
            deleteOne(index){
                this.searchHistory.splice(index,1)
            },
            //删除所有历史记录
            deleteAll(){
                this.searchHistory=[]
            },
            //滚动事件
            handleScroll(){
                //条件判断 获取到dom元素才执行
                if (document.querySelector("#searchBar")){
                    let scrollTop = window.pageYOffset || document.documentElement.scrollTop
                    let offsetTop = document.querySelector("#searchBar").offsetTop//242
                    let mainInput = document.querySelector('#mainInput')

                    // debugger
                    // console.log(offsetTop)
                    // console.log(scrollTop);
                    if (scrollTop>=offsetTop){
                        this.isFixed = true
                        mainInput.style.width=880+'px'
                    }else {
                        this.isFixed = false
                        mainInput.style.width=''
                    }
                }



            },
        },
        mounted() {
            document.addEventListener('click',e=>{
                const searchBox = document.getElementById('searchInput')
                if (searchBox){
                    if (!searchBox.contains(e.target)){
                        this.isShowHot=false
                    }
                }
            })
            //滚动监听事件
            document.addEventListener('scroll',this.handleScroll)
        },
        destroyed () {
            //离开页面移除监听事件
            window.removeEventListener('scroll', this.handleScroll)
        },
    }
</script>

<style lang="scss">
    .search-bar{
        //border: 1px solid red;
        width: 554px;
        height: 50px;
        position: relative;

        //搜索框和图标
        .searchAndIcon{
            //border: 1px solid red;
            width: 100%;
            height: 100%;
            position: relative;
            z-index: 10;
            transition: width .6s;

            //搜索框
            input{
                border: 1px solid #c9c9c9;
                width: 100%;
                height: 100%;
                border-radius: 3px;
                padding: 0 50px 0 20px;

            }
            //搜索按钮
            span{
                //border: 1px solid red;
                position: absolute;
                right: 0%;
                top: 0;
                width: 8%;
                height: 100%;
                padding: 10px;
                //padding: 13px 12px  12px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #999999;
                font-weight: 700;
                &:hover{
                    color: #31c27c;
                    cursor:pointer;
                }
            }
        }
        //搜索面报
        .searchPanel{
            border: 1px solid #c9c9c9;
            border-top: none;
            position: absolute;
            top: 49px;
            //left: -1px;
            width: 100%;
            //width: 220px;
            //height: 238px;
            z-index: 1;
            color: black;
            background: white;
            font-size: 14px;
            //热搜面报ul
            .hotSearch-ul{
                //border: 1px solid red;
                //margin: 15px 0;
                //热搜li
                .hotSearch-li{
                    //border: 1px solid black;
                    margin: 10px 0;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 10px 0 0;
                    cursor: pointer;
                    &:hover{
                        background: #31c27c;
                        i,a,span{
                            color: white;
                        }
                    }
                    //热搜排名
                    .hotSearch-rank{
                        color: red;
                        margin: 10px;
                    }
                    //热搜名字
                    .hotSearch-name{
                        //border: 1px solid black;
                        flex: 1;
                    }
                    //热搜量
                    .hotSearch-number{
                        color: #999999;
                    }

                }


            }
            //搜索历史
            .searchHistory{
                padding: 0 0px 8px ;
                .history-title{
                    color: #999999;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 8px 10px;
                    .content{

                    }
                }
                //历史列表
                .history-list{
                    //border: 1px solid red;
                    cursor: pointer;
                    padding:0 6px 0 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    //padding: 0px 10px;
                    &:hover{
                        background: #31c27c;
                        i,span{
                            color: white;
                        }
                    }
                    //历史记录列表文字
                    i{
                        height: 30px;
                        //padding: 10px 10px;
                        //margin: 20px 0;
                        //display: flex;
                        line-height: 30px;
                        padding: 0 0 0 10px;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;

                    }
                    //删除
                    span{
                        font-size: 14px;
                        //line-height: 30px;
                        width: 22px;
                        height: 22px;
                        //border: 1px solid red;
                        cursor:pointer;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        &:hover{
                            background: rgba(0,0,0,.05);
                            border-radius:50% ;
                        }
                    }
                }
            }
        }
        //顶部搜索
        .topSearch{
            position: fixed;
            top: 0;
            //border: 1px solid red;
            height: 67px;
            width: 100%;
            left: 0;
            display: flex;
            background-color: #fff;
            border-bottom: 1px solid #dddbdb;
            box-shadow: 0 0 10px rgba(183,183,183,.65);
            z-index: 99;
            overflow: hidden;
            line-height: 999px;
            input{
                padding: 0 160px;
                font-size: 18px;
                //width: 85%;
                width: 63.7%;
                border: none;
            }
            //修改placeholder属性
            input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
                color: #666;
                font-size: 18px;
            }
            input:-ms-input-placeholder, textarea:-ms-input-placeholder {
                color: #666;
                font-size: 18px;
            }
            input::-moz-placeholder, textarea::-moz-placeholder {
                color: #666;
                font-size: 18px;
            }
            input:-moz-placeholder, textarea:-moz-placeholder {
                color: #666;
                font-size: 18px;
            }


            span{
                //border: 1px solid red;
                border-top:none ;
                height: 100%;
                width: 4.5%;
                padding: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
                background: #31c27c;
                color: white;
                font-size: 24px;
                &:hover{
                    color: white;
                    background: #2caf6f;
                }

            }
        }
        .topSearchFixed{
/*            position: fixed;
            top: 0;
            border: 1px solid red;
            height: 67px;
            left: 0;
            display: flex;
            background-color: #fff;
            border-bottom: 1px solid #dddbdb;
            box-shadow: 0 0 10px rgba(183,183,183,.65);
            z-index: 99;
            overflow: hidden;
            line-height: 999px;
                   input{
           padding: 0 160px;
           font-size: 18px;
           width: 71%;
           border: none;
           transition: width 3s;

       }
       //修改placeholder属性
       input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
           color: #666;
           font-size: 18px;
       }
       input:-ms-input-placeholder, textarea:-ms-input-placeholder {
           color: #666;
           font-size: 18px;
       }
       input::-moz-placeholder, textarea::-moz-placeholder {
           color: #666;
           font-size: 18px;
       }
       input:-moz-placeholder, textarea:-moz-placeholder {
           color: #666;
           font-size: 18px;
       }


       span{
           //border: 1px solid red;
           border-top:none ;
           height: 100%;
           width: 4.5%;
           padding: 10px;
           display: flex;
           justify-content: center;
           align-items: center;
           background: #31c27c;
           color: white;
           font-size: 24px;
           &:hover{
               color: white;
               background: #2caf6f;
           }

       }*/
            width: 120%;

        }
        .fade-enter-active {
            transition: width .5s;
            opacity: 1;
        }
        .fade-enter {
            width:100%;
        }
        .fade-leave-active{
            opacity: 0;
        }
    }
</style>
