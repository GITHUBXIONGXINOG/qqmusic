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
            <div class="song-info" v-if="songData">
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
                        <li @click="clickPlaying(item.mid)">
                            <i class="iconfont ">
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

            </div>
        </div>
    </div>
</template>

<script>
    // import Bus from "@/assets/js/bus";
    export default {
        props:{

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
            //点击传值给兄弟组件playerbar
            clickPlaying(clickMid){
                let clickFlag =this.clickFlag
                let clickInfo = {clickFlag,clickMid}
                 this.$bus.$emit('clickPlaying',clickInfo)
                this.clickFlag=!this.clickFlag
             },

        },

        created() {
          /*  //$route存储当前路由所有信息
            // 路由设置里面 path: '/player/:songId',所以params里面有songId
            //第一次加载时拿到当前路由匹配的id,派发请求
          // this.$store.dispatch('queryDataA',this.$route.params.songId)*/
          //   debugger
            this.$store.dispatch('queryDataA',this.$route.params.songId)
            // this.songData()
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
                clickFlag:false,
            }
        },
        watch:{

        },

    }
</script>



