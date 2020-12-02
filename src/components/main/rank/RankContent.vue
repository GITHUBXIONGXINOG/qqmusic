<template>
    <div class="rank-content">
        <div class="header-wrap" >
            <nav class="title-wrap">
                <div class="title-info" v-if="contentList.info" >
                    {{contentList.info.title}}
                </div>
                <i class="update-time">{{contentList.update}}</i>
                <div class="title-rule">
                    <i @click.stop="clickListRule">榜单规则</i>
                    <div v-show="ruleActive" class="rule-info" id="ruleShowBox">
                         <i>榜单规则</i>
                        <div v-html="ruleMsg" class="rule-word" >
                        </div>
                    </div>
                </div>
            </nav>
            <!--用户操作按钮-->
            <ul class="userOpera">
                <a :href="`${userOperaUrl[index]}`" v-for="(item,index) in userOperating" :key="index">
                    <span :class="['iconfont ',`${iconList[index]}`]"></span>
                    <span>
                        {{item}}
                        <i v-if="index==4">({{contentList.commenttotal}})</i>
                    </span>
                </a>
            </ul>
        </div>
        <div class="rank-wrap">
            <ul class="content-nav-ul">
                <li v-for="(item,index) in contentNav" :key="index"
                    :class="`nav-li-${index}`"
                >
                    {{item}}
                </li>
            </ul>
            <div class="rank-info" >
                <ul v-for="(item,index) in storageContent" :key="index" class="rank-info-ul" >
                    <li class="rank-info-li">
                        <i class="rank-num" :class="{'rank-num-top':index<3}">{{item.rank}}</i>
                        <!--输出排名-->
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
                            <!--用户操作选项-->
                            <ul class="song-operating"
                                v-show="songOperatingShow==index"
                            >
                                <!--播放-->
                                <router-link :to="`/player/`+item.rankmid" tag="li" >
                                   <i class="iconfont icon-bofang2">
                                   </i>
                                </router-link>

                                 <li v-for="n in operatingList">
                                   <i :class="['iconfont',`icon-${n}`]">
                                   </i>
                                </li>
                            </ul>
                        </span>
                        <i class="rank-singername"><a href="javascript:;">{{item.singerName}}</a></i>
                        <i class="rank-time">{{songTime(item.interval)}}</i>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            contentList:{
                type:Object,
                require:true
            }
        },
        data(){
            return{
                tempContent:[],
                storageContent:[],
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
                contentNav:['歌曲','歌手','时长'],
                operatingList:[
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
            }
        },
        methods:{
            //设置内容
            setContent(){
                // debugger
                // console.log(this.contentList.list);
                this.storageContent = this.tempContent.list.map(item=>({
                   rank:item.rank,//排名
                   rankValue:item.rankValue,//排名变化
                   img: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albumMid}.jpg`,//封面
                   title:item.title,//标题
                   isonly:item.isonly,//是否独家
                   ismv:item.mv.id,//是否mv
                   isvip:item.vip,//是否vip
                   singerName:item.singerName,//歌手名字
                   interval:item.interval,//时长
                   aid:item.aid,
                   album:item.album,
                   file:item.file,
                   fnote:item.fnote,
                   id:item.id,
                   index_album:item.index_album,
                   index_cd:item.index_cd,
                   ksong:item.ksong,
                   label:item.label,
                   language:item.language,
                   mv:item.mv,
                   name:item.name,
                   pay:item.pay,
                   singer:item.singer,
                   singerMid:item.singerMid,
                   songId:item.songId,
                    time_public:item.time_public,
                    rankmid:item.rankmid,
               }))
                // console.log(this.storageContent)
            },
            //榜单规则点击
            clickListRule(){
                // debugger
                this.ruleActive=!this.ruleActive
                this.ruleMsg = this.contentList.info.desc
                // console.log(this.ruleMsg)

            },
            //悬浮显示切换
            OperateChange(index){
                if (index){
                    this.songOperatingShow=index
                }else{
                    this.songOperatingShow=''
                }
            },
        },

        computed:{
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
            //排名计算
            rankInfo(){
                return function (rank){
                    // debugger
                    // console.log(rank)
                    //正则表达式匹配以%结尾的数值
                    const reg = new RegExp('%$')
                    //流行指数榜
                    if (rank.match(reg)){
                        return 'icon-diag_up'
                    }else {//其它样式
                       if (rank<0){
                           return 'icon-jiantouxia1'
                       }else if (rank==0){
                           return 'icon-heng'
                       }else {
                           return 'icon-jiantoushang1'
                       }
                    }
                }
            },

        },
        created() {
            // this.setContent()
        },
        mounted() {
            //点击取消悬浮窗
            document.addEventListener('click',e=>{
                const ruleShowBox =   document.getElementById("ruleShowBox")
                if (ruleShowBox){
                    if (!ruleShowBox.contains(e.target)){
                        this.ruleActive=false
                    }
                }
            })
            //禁止右键
            // document.oncontextmenu=new Function("event.returnValue=false");
            //禁止选中
            // document.onselectstart=new Function("event.returnValue=false");


        },
        watch:{
            //监视contentList
            contentList:function () {
                // debugger
                if (this.contentList){
                    this.tempContent=this.contentList
                    this.setContent()
                }
            }
        }

    }

</script>
