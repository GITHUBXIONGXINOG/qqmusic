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
                    :class="{'alive-song':songData.mid==item.mid}"
                    @mouseenter="OperateChange(index)"
                    @mouseleave="OperateChange"
                >
                    <input type="checkbox" class="checkInput">
                    <li class="song-index">{{index+1}}</li>
                    <li class="song-title">{{item.title}}</li>
                    <li class="song-singer">{{item.singer[0].name}}</li>
                    <li class="song-interval">{{item.interval}}</li>
                    <!--用户操作选项-->
                    <ul class="song-operating"
                        v-show="true"
                    >
<!--                                                v-show="songOperatingShow==index"
-->
                        <li v-for="n in operatingList">
                            <i :class="['iconfont',`icon-${n}`]">
                            </i>
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
    export default {
        props:{
            //播放列表
            playSongList:{
                type: Object,
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
                    'xiazai',
                    'fenxiang'
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
                border: 1px solid red;
                display: flex;
                padding: 0 0 0 44px;
                margin: 15px 0;
                color: #E1E1E1CC;
                position: relative;
                height: 50px;
                align-items: center;
                .checkInput{
                    position: absolute;
                    left: 0;
                }
                li{
                    border: 1px solid red;
                    height: 100%;
                    display: flex;
                    align-items: center;

                }
                .song-index{
                    //margin: 0 10px;
                    margin: 0 5px 0 0;
                }
                .song-title{
                    width: 497.98px;
                }
                .song-singer{
                    width: 215px;

                }
                .song-interval{
                    width: 50px;

                }
                .song-operating{
                    position: absolute;
                    display: flex;
                    right: 400px;
                }

            }
        }
        .alive-song{
            color: #FFFFFF!important;
        }
    }
}
</style>


