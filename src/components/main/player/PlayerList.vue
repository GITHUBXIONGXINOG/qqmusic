<template>
    <div class="player-list">
        <!--用户操作按钮-->
        <ul class="userOpera">
            <a href="javascript:;" v-for="(item,index) in userOperating" :key="index">
                <span class="icon-wrap">
                    <span :class="['iconfont ',`${iconList[index]}`]"></span>
                    <i>{{item}}</i>
                </span>
            </a>
        </ul>
        <div class="rank-wrap">
            <ul class="content-nav-ul">
                <input type="checkbox" class="checkAll">
                <li v-for="(item,index) in contentNav" :key="index"
                    :class="`nav-li-${index}`"
                >
                    {{item}}
                </li>
            </ul>
            <div class="song-info" >
                <ul class="song-info-ul" v-for="(item,index) in songList" :key="index"
                    :class="{'alive-song':songData.mid==item.mid&&pausedSign}"
                    @mouseenter="OperateChange(index)"
                    @mouseleave="OperateChange"
                >
                    <input type="checkbox" class="checkInput">
                    <ul class="bg-bubbles">
                        <li v-for="(i, j) in 3" :key="j"></li>
                    </ul>
                    <li class="song-index" >{{index+1}}</li>
                    <li class="song-title">{{item.title}}</li>
                    <li class="song-singer">{{item.singer[0].name}}</li>
                    <li class="song-interval"   :class="{'operating-hidden':songOperatingShow==index}">{{item.interval}}</li>
                    <!--用户操作选项-->
                    <ul class="song-operating"
                        v-show="songOperatingShow==index"
                    >
                        <li @click="clickPlaying">
                            <i class="iconfont icon-bofang2">
                            </i>
                        </li>
                        <li>
                            <i class="iconfont icon-jia"></i>
                        </li>
                        <li>
                            <i class="iconfont icon-fenxiang"></i>
                        </li>
                        <li>
                            <i class="iconfont icon-lajixiangzizhi"></i>
                        </li>



                    </ul>
                </ul>
          <!--      <ul v-for="(item,index,key) in playSongList" :key="index" class="rank-info-ul" :key="index">
                    {{playSongList[index]}}
                   &lt;!&ndash; <li class="rank-info-li">
                        <i class="rank-num" :class="{'rank-num-top':index<3}">{{item.rank}}</i>
                        &lt;!&ndash;输出排名&ndash;&gt;
                        <span class="rank-value">
                            <i :class="['iconfont',`${rankInfo(item.rankValue)}`]"></i>
                            <i>{{item.rankValue}}</i>
                        </span>
                        <span class="song-title-wrap"
                              @mouseenter="OperateChange(index)"
                              @mouseleave="OperateChange"
                        >
                            <img :src="item.img" alt="">
                            <i class="song-title"><a href="javascript:;">{{item.title}}</a></i>
                            <i class="song-isonly iconfont icon-dujia" title="独家" v-show="item.isonly"></i>
                            <i class="song-ismv iconfont icon-MV" title="MV" v-show="item.ismv"></i>
                            <i class="song-isvip iconfont icon-VIP" title="vip" v-show="item.isvip"></i>
                            &lt;!&ndash;用户操作选项&ndash;&gt;
                            <ul class="song-operating"
                                v-show="songOperatingShow==index"
                            >
                                <li v-for="n in operatingList">
                                   <i :class="['iconfont',`icon-${n}`]">
                                   </i>
                                </li>
                            </ul>
                        </span>
                        <i class="rank-singername"><a href="javascript:;">{{item.singerName}}</a></i>
                        <i class="rank-time">{{songTime(item.interval)}}</i>
                    </li>&ndash;&gt;
                </ul>-->
<!--                {{ songData }}-->
<!--                {{// playSongList}}-->
            </div>
        </div>
    </div>
</template>

<script>
    import Bus from "@/assets/js/bus";
    export default {
        props:{
            //播放列表
            playSongList:{
                type: Object,
                require:true
            },
            //暂停信号
            pausedSign:{
                type: Boolean,
                require:true
            }
        },

        computed:{
            songData(){
                // debugger
                const {cur,list}=this.$store.state
                this.songList=list
                // console.log(list)
                return list.find(item=>{
                    return item.mid===cur
                }) || null
            },

        },
        methods:{
            //悬浮显示切换
            OperateChange(index){
                if (index){
                    this.songOperatingShow=index
                }else{
                    this.songOperatingShow=''
                }
            },
            clickPlaying(){
                debugger
                Bus.$emit('clickPlaying',!this.pausedSign)
             }
        },

        created() {
          /*  //$route存储当前路由所有信息
            // 路由设置里面 path: '/player/:songId',所以params里面有songId
            //第一次加载时拿到当前路由匹配的id,派发请求
          // this.$store.dispatch('queryDataA',this.$route.params.songId)*/
          //   debugger
            this.$store.dispatch('queryDataA',this.$route.params.songId)
            this.songData()
        },
        data(){
            return{
                userOperating:['收藏','添加到','下载','删除','清空列表'],//用户操作
                iconList:[
                    'icon-shoucang',
                    'icon-jiatianjiakuangxuanduoxuan-8',
                    'icon-xiazai',
                    'icon-lajixiangzizhi',
                    'icon-qingkong'
                ],//操作对应的图标
                contentNav:['歌曲','歌手','时长'],
                songList:[],
                operatingList:[
                    'bofang2',
                    'jia',
                    'fenxiang',
                    'lajixiangzizhi',
                ],//用户歌曲操作图标
                songOperatingShow:'',//显示操作标识

            }
        },
        watch:{
            /*//to 跳转的页面 to和$route一样,存储当前路由的信息
            $route(to){
                console.log(to)
                this.$store.dispatch('queryDataA',to.params.songId)

            },*/
            playSongList:{
                handler:function () {
                    // debugger
                    // console.log(this.playSongList)
                },
                deep:true
            }
        },

    }
</script>
<style lang="scss">
.player-list{
    .rank-wrap{
        .song-info{
            .song-info-ul{
                //border: 1px solid red;
                display: flex;
                padding: 0 0 0 44px;
                margin: 15px 0;
                color: #E1E1E1CC;
                position: relative;
                height: 50px;
                align-items: center;
                .checkInput{
                    position: absolute;
                    left: -5px;
                }

                li{
                    //border: 1px solid red;
                    height: 100%;
                    display: flex;
                    align-items: center;

                }
                .song-index{
                    //margin: 0 10px;
                    margin: 0 5px 0 0;
                }
                .song-title{
                    width: 500px;
                }
                .song-singer{
                    width: 216px;

                }
                .song-interval{
                    width: 50px;

                }
                .song-operating{
                    position: absolute;
                    display: flex;
                    right: 370px;
                    li{
                        border: 1px solid rgba(225,225,225,.2);
                        border-radius: 50%;
                        width: 38px;
                        height: 38px;
                        margin: 0 5px;
                        display: flex;
                        justify-content: center;
                        color: #bdbdbe;
                        i{
                            font-size: 20px;
                        }
                        &:hover{
                            border-color: rgba(225,225,225,.8);
                            color: rgba(225,225,225,.8);
                            cursor: pointer;
                        }
                    }
                    li:nth-child(1){
                        font-size: 19px;
                        padding-left: 5px;
                    }
                    li:nth-child(4){
                        position: absolute;
                        right: -265px;

                    }

                }
                .operating-hidden{
                    opacity: 0;
                }
            }
        }
        .alive-song{
            color: #FFFFFF!important;
            .song-index{
                opacity: 0;
            }
            //动态图标
            .bg-bubbles{
                position: absolute;
                //border: 1px solid red;
                width: 12px;
                height: 15px;
                left: 40px;
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                li{
                    //border: 1px solid white;
                    width: 20%;
                    background-color: rgba(225,225,225,.8);
                    //content: '';
                    //display: block;
                    height: 10px;
                    bottom: 0;

                }
                li:nth-child(1){
                    animation: square 1s infinite ease-in;
                    //animation-delay:.1s;

                }
                li:nth-child(2){
                    animation: square 1s infinite ease-in;
                    animation-delay:.2s;
                }
                li:nth-child(3){
                    animation: square 1s infinite ease-in;
                    animation-delay:.4s;
                }
            }
        }
        @keyframes square {
            0%{
                height: 0px;
            }
            25%{
                height: 5px;
            }
            50%{
                height: 10px;
            }
            75%{
                height: 5px;
            }
            100%{
                height: 0px;
            }
        }
    }
}
</style>


