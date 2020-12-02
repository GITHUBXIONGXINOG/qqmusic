<template>
    <div class="singer-info-page">
        <div class="singer-info-wrap">
<!--            {{singermid}}-->
            <div class="singer-pic">
                <img :src="`http://y.gtimg.cn/music/photo_new/T001R300x300M000${singermid}.webp`" alt="">
            </div>
            <div class="singer-info-text" v-show="basicList">
                <div class="singer-name">{{singerName}}</div>
                <div class="singer-info">
                    <div class="singer-Introduction">
                        <div class="text-info">
                            {{basicInfo}}
                        </div>
                        <span class="more-op" @click.stop="clickMorepanel">[更多]</span>
                        <div class="more-panel" v-show="showMoreInfo" id="singer-more-info">
                            <div class="desc" >
                                {{ desc}}
                            </div>
                        </div>

                    </div>

                </div>
                <div class="song-info" >
                    <div class="single-num"><span>单曲<i>{{songTotal}}</i></span> </div>
                    <div class="album-num"><span>专辑 <i>{{albumTotal}}</i></span></div>
                    <div class="mv-num"><span>MV<i>{{mvTotal}}</i> </span></div>
                </div>
                <div class="play-op">
                    <div class="player-hot-song">
                        <span class="iconfont icon-bofang2"></span>
                        播放歌手热门歌曲
                    </div>
                    <div class="attention">
                        <span class="iconfont icon-jia"></span>
                        关注{{followers}}
                    </div>
                </div>
            </div>
        </div>
<!--        <singer-info-show />-->
        <div class="rank-title">热门歌曲</div>
        <div class="rank-wrap">
            <ul class="content-nav-ul">
                <li v-for="(item,index) in contentNav" :key="index"
                    :class="`nav-li-${index}`"
                >
                    {{item}}
                </li>
            </ul>
            <div class="rank-info" >
                <ul v-for="(item,index) in hotSongs" :key="index" class="rank-info-ul" >
                    <li class="rank-info-li"
                        @mouseenter="OperateChange(index)"
                        @mouseleave="OperateChange">
                        <!--输出排名-->
                        <span class="rank-value">
                            <i>{{index+1}}</i>
                        </span>
                        <span class="song-title-wrap"
                        >
                            <i class="song-title"><a href="javascript:;">{{item.title}}</a></i>
                            <i class="song-isonly iconfont icon-dujia" title="独家" v-show="item.isonly"></i>
                            <i class="song-ismv iconfont icon-MV" title="MV" v-show="item.ismv"></i>
                            <i class="song-isvip iconfont icon-VIP" title="vip" v-show="item.isvip"></i>
                            <!--用户操作选项-->
                            <ul class="song-operating"
                                v-show="songOperatingShow==index"
                            >
                                <router-link :to="`/player/songmid=`+item.mid" tag="li">
                                    <i class="iconfont icon-bofang2">
                                    </i>
                                </router-link>
                          <!--      <li v-for="n in operatingList">
                                   <i :class="['iconfont',`icon-${n}`]">
                                   </i>
                                </li>-->
                            </ul>
                        </span>
                        <i class="rank-singername"><a href="javascript:;">{{item.album.title}}</a></i>
                        <i class="rank-time">{{songTime(item.interval)}}</i>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import SingerInfoShow from "@/components/main/singer/SingerInfoShow";
    import '@/assets/css/singerinfopage.scss'
    import api from "@/api";
    export default {
        props:{
            singermid:{
                type:[String,Number],
                require:true
            }
        },
        data(){
            return{
                desc:"",//介绍
                basicList:[],//基本信息
                otherList:[],//其它信息
                singerid:0,//歌手id
                followers:'',//关注人数
                hotSongs:[],//热门歌曲
                albumList:[],//专辑
                singerName:'',//歌手名字
                mvList:[],//mv
                songTotal:0,//总共歌曲
                albumTotal:0,//总共专辑
                mvTotal:0,//总共mv
                simSinger:[],//相似歌手
                contentNav:['歌曲','专辑','时长'],
                ruleActive:false,
                ruleMsg:'',
                userOperating:['播放全部','添加到','下载','批量操作','评论'],//用户操作
                iconList:[
                    'icon-bofang2',
                    'icon-jiatianjiakuangxuanduoxuan-8',
                    'icon-xiazai',
                    'icon-piliangxiugai',
                    'icon-pinglun'
                ],//操作对应的图标
                operatingList:[
                    'bofang2',
                    'jia',
                    'xiazai',
                    'fenxiang'
                ],//用户歌曲操作图标
                userOperaUrl:[
                    'javascript:;',
                    'javascript:;',
                    'javascript:;',
                    'javascript:;',
                    '#rank-comment',
                ],//操作对应的链接
                songOperatingShow:'',//显示操作标识
                showMoreInfo:false,//显示更多信息
            }
        },
        methods:{
          async fetchSingerInfo(){
              let res = await api.SingerIntroduction(this.singermid)
              let resOfFollowers = await api.SingerFollowers(this.singermid)
              let resOfHot = await api.SingerHotSong(this.singermid)
              let resOfAlbum = await api.SingerAlbum(this.singermid)
              let resOfMv = await api.SingerMv(this.singermid)
              let resOfSim = await api.SingerSimilar(this.singermid)
              // debugger
              // console.log(res)
              if (res&&resOfFollowers){
                  this.desc = res.data.data.desc//介绍
                  this.basicList = res.data.data.basic.item//基本信息
                  this.otherList = res.data.data.other.item//其它信息
                  this.singerid = res.data.data.id//歌手id
                  this.followers = this.numToTenThousand(resOfFollowers.data.response.num)//关注人数
                  this.hotSongs = resOfHot.data.data.list//热门歌曲
                  this.songTotal = resOfHot.data.data.total//歌曲总数
                  this.albumList = resOfAlbum.data.data.list//专辑
                  this.albumTotal = resOfAlbum.data.data.total//专辑总数
                  this.singerName = resOfAlbum.data.data.name//歌手名字
                  this.mvList = resOfMv.data.data.list//mv
                  this.mvTotal =resOfMv.data.data.total//mv总数
                  this.simSinger = resOfSim.data.data.list//相似歌手
              }
          } ,
            //转换位数
            numToTenThousand(num){
                if (num < 10000){
                    return num
                }
                let res = num / 10000
                //  toFixed 四舍五入 保留指定小数位数
                return res.toFixed(1)+'万'
            },
            //悬浮显示切换
            OperateChange(index){
                if (index){
                    this.songOperatingShow=index
                }else{
                    this.songOperatingShow=''
                }
            },
            //显示更多
            clickMorepanel(){
              this.showMoreInfo = !this.showMoreInfo
            },
        },
        computed:{
            basicInfo(){
                if (this.basicList){
                    let res = ''
                    // debugger
                    this.basicList.forEach(item=>{
                        res += item.key + `: `+item.value+' '
                    })
                    // console.log(res)
                    return res
                }
                return ''
            },
            //时间计算
            songTime(){
                return function (interval) {
                    //分
                    let m = Math.floor(interval/60)
                    //秒
                    let s = interval%60
                    //将变量转换为字符串
                    m += ''
                    s += ''
                    //如果只有一位数,前面增加一个0
                    m = (m.length==1) ? '0'+m : m
                    s = (s.length==1) ? '0'+s : s
                    return m+':'+s
                }
            },
        },
        created() {
            this.fetchSingerInfo()
        },
        components:{
            SingerInfoShow
        },
        mounted() {
            //给所有元素添加点击事件,点击更多展示之外的地方就把showIndex置为-1,达到隐藏展示的效果
            document.addEventListener('click',e=>{
                const contextMenuBox = document.getElementById('singer-more-info')
                if (contextMenuBox){
                    if (!contextMenuBox.contains(e.target)){

                        this.showMoreInfo=false

                    }
                }
            })
        }

    }

</script>
