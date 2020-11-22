<template>
    <div class="song-list">
        <!--用户操作-->
        <ul class="userOpera" v-if="contentType==0">
            <a :href="`${userOperaUrl[index]}`" v-for="(item,index) in userOperating" :key="index"
              >
                <span :class="['iconfont ',`${iconList[index]}`]"></span>
                <span>
                        {{item}}
                    </span>
            </a>
        </ul>
        <div :class="contentType==2||contentType==8 ? 'song-label-three' : 'song-label-four'">
            <ul class="song-label">
                <li v-for="item in labelList">
                    {{item}}
                </li>
            </ul>
            <ul v-for="(item,index) in contentList" :key="index" class="content-info-ul" >

                    <li class="content-info-li">
                     <span class="song-title-wrap"
                      @mouseenter="OperateChange(index)"
                      @mouseleave="OperateChange"
                >
                    <i class="song-title">
                        <div v-if="contentType==0">
                               <a href="javascript:;" >{{item.songname}}</a>

                        </div>
                        <div v-else-if="contentType==8">
                            <img :src="item.albumPic" alt="">
                            <a href="javascript:;">{{item.albumName}}</a>

                        </div>
                          <div v-else-if="contentType==2">
                            <img :src="item.imgurl" alt="">
                            <a href="javascript:;">{{item.dissname}}</a>

                        </div>

                    </i>
                    <i class="song-isonly iconfont icon-dujia" title="独家" v-show="item.isonly"></i>
                    <i class="song-ismv iconfont icon-MV" title="MV" v-show="item.tag==12"></i>
                    <i class="song-isvip iconfont icon-VIP" title="vip" v-show="item.isvip"></i>
                    <!--用户操作选项-->
                    <ul class="song-operating"
                        v-show="songOperatingShow==index"
                    >
                        <li v-for="n in operatingList">
                            <i :class="['iconfont',`icon-${n}`]">
                            </i>
                        </li>
                    </ul>
                </span>
                        <i class="content-singerName">
                                <div v-if="contentType==0">
                                    <a href="javascript:;" v-for="(v,i) in item.singer">
                                        {{v.name}}
                                        <i v-show="i<item.singer.length-1">/</i>
                                    </a>
                                </div>
                            <div v-else-if="contentType==8">
                                <a href="javascript:;" v-html="item.singerName"></a>
                            </div>
                            <div v-else-if="contentType==2&&item.creator.name">
                                <a href="javascript:;" v-html="item.creator.name"></a>
                            </div>

                        </i>
                        <i class="content-albumname" v-html="item.albumname_hilight" v-show="contentType==0"></i>
                        <i class="content-time" v-if="contentType==0">{{songTime(item.interval)}}</i>
                        <i class="content-time" v-else-if="contentType==8">{{item.publicTime}}</i>
                        <i class="content-time" v-else-if="contentType==2">{{numToTenThousand(item.listennum)}}</i>

                    </li>


            </ul>
        </div>
     </div>
</template>

<script>
    export default {
        props:{
            //设置数据
            setContentList:{
                type: Array,
                require: true
            },
            //设置标题
            setContentType:{
                type: Number,
                require: true
            }
        },
        data(){
            return{
                contentList:[],//数据列表
                contentType:0,//标题种类
                contentTitle:[],//标题列表
                songOperatingShow:'',//显示操作标识
                userOperating:['播放全部','添加到','下载','批量操作'],//用户操作
                userOperaUrl:[
                    'javascript:;',
                    'javascript:;',
                    'javascript:;',
                    'javascript:;',
                ],//操作对应的链接
                iconList:[
                    'icon-bofang2',
                    'icon-jiatianjiakuangxuanduoxuan-8',
                    'icon-xiazai',
                    'icon-piliangxiugai',
                ],//操作对应的图标
                activeIndex:{
                    key:'',//关键词
                    pageNo:1,//页码
                    pageSize:20,//一页返回数量
                    t:0//搜索类型
                },//当前活动种类
                operatingList:[
                    'bofang2',
                    'jia',
                    'xiazai',
                    'fenxiang'
                ],//用户歌曲操作图标
                labelList:[],//歌曲页面总标题
                labelListOfSong:[
                    '歌曲',
                    '歌手',
                    '专辑',
                    '时长'
                ],//歌曲页面总标题-单曲
                labelListOfAlbum:[
                    '专辑',
                    '歌手',
                    '发行时间'
                ],//歌曲页面总标题-专辑
                labelListOfSongList:[
                    '歌单',
                    '创建人',
                    '收听'
                ],//歌曲页面总标题-歌单
            }
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
            //设置页面标题
            setPageLabel(type){
                // debugger
                if (type==0){
                    //歌曲
                    this.labelList = this.labelListOfSong
                }else if (type==8){
                    //专辑
                    this.labelList = this.labelListOfAlbum
                }else if(type==2){
                    //歌单
                    this.labelList = this.labelListOfSongList
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
        },
        watch:{
            setContentList(val){
                // debugger
                this.contentType = this.setContentType
                this.contentList = val
                this.setPageLabel(this.contentType)
            },
            setContentType(val){
                this.contentType = val
            },

        }
    }
</script>

<style lang="scss">
.song-list{
    //border: 1px solid red;
    font-size: 14px;
    //margin: -50px 0 50px ;
    //用户操作
    .userOpera{
        //border: 1px solid red;
        width: 100%;
        height: 38px;
        display: flex;
        margin: 30px 0 20px;
        a{
            border: 1px solid #ddd;
            padding: 0px 23px;
            margin-right: 6px;
            background: white;
            border-radius: 2px;
            line-height: 38px;
            cursor: pointer;
            &:hover{
                background-color: #ededed;
                color: #000;
            }
        }

    }
    .content-info-ul{
        //border: 1px solid red;
        height: 50px;
        &:nth-child(odd){
            background: #f7f7f7;
            .song-operating{
                background: #f7f7f7;
            }
        }
        &:nth-child(even){
            background: white;
            .song-operating{
                background: white;
            }
        }

        .content-info-li{
            //border: 1px solid red;
            height: 100%;
            display: flex;
            //align-items: center;
            padding: 0 30px 0 20px;

            //歌曲信息
            .song-title-wrap{
                //flex: 1;
                width: 502px;
                display: flex;
                align-items: center;
                position: relative;
                //border: 1px solid red;

                //歌曲名字
                .song-title{
                    //border: 1px solid red;
                    margin: 0 5px 0 0 ;
                }
                .song-isonly{
                    color: #31c27c;
                    //border: 1px solid red;
                    margin: 0 3px;
                }
                .song-ismv{
                    color: #31c27c;
                    font-size: 30px;
                    top: 10px;
                    //border: 1px solid red;

                }
                //用户操作
                .song-operating{
                    //border: 1px solid red;
                    display: flex;
                    position: absolute;
                    right: 10px;
                    //background: transparent;
                    //z-index: 1;


                    & :hover{
                        color: #3fc785;
                        border-color: #3fc785;
                        cursor: pointer;

                    }
                    li{
                        width: 36px;
                        height: 36px;
                        border-radius: 36px;
                        border: 1px solid #cecece;
                        color: #a2a2a2;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin: 0 5px;

                    }

                }
            }

            //歌手名字专辑
            .content-singerName,.content-albumname{
                //border: 1px solid red;
                width: 269.5px;
                padding-left: 15px;
                line-height: 50px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
            .content-singerName{
                a{
                    margin: 0 2px;
                }
            }

            //时长
            .content-time{
                //border: 1px solid red;
                width: 50px;
                padding-left: 15px;
                color: #999999;
                //margin: 0 10px 0;
            }
        }
    }
    //内容标题
    .song-label{
        display: flex;
        //border: 1px solid red;
        width: 100%;
        height: 50px;
        background: #f7f7f7;
        padding: 0 72px 0 20px;
        li{
            //border: 1px solid red;
            line-height: 50px;
            color: #999999;
            width: 100%;
            &:first-child{
                //border: 1px solid red;
                width: 504.5px;
            }
            &:nth-child(2),&:nth-child(3){
                //border: 1px solid red;
                width: 270px;
                padding-left: 15px;
            }
            &:nth-child(4){
                //border: 1px solid red;
                width: 50px;
                padding-left: 15px;

            }
        }
    }

    //高亮文本
    .c_tx_highlight{
        color: #31c27c;
    }
    .song-label-three{
        margin: 30px 0 50px ;

        .song-label{
            padding: 0;

            li{
                //border: 1px solid red;
                &:first-child{
                    //border: 1px solid red;
                    width: 704.5px;
                    padding: 0 0 0 20px;
                }
                &:nth-child(2){
                    //border: 1px solid red;
                    width: 380px;
                    padding-left: 15px;
                }
                &:nth-child(3){
                    width: 110px;
                    display: flex;
                    justify-content: flex-end;
                    padding: 0 20px 0 0;
                }

            }
        }
        .content-info-ul{
            height: 70px;
            //border: 1px solid black;
            .content-info-li{
                padding-right: 0;
                .song-title-wrap{
                    width: 683.5px;
                }
            }
            .song-title-wrap{
                //border: 1px solid red;

                div{

                    display: flex;
                    align-items: center;
                    img{
                        width: 50px;
                        cursor: pointer;
                    }
                    a{
                        margin: 0 10px;
                        text-overflow:ellipsis;
                        white-space:nowrap;
                        overflow:hidden;
                        //border: 1px solid red;
                        width: 500px;
                    }
                }
            }
            .content-singerName{
                //border: 1px solid red;
                width: 380px;
                line-height: 70px;
            }
            .content-time{
                //border: 1px solid red;
                width: 110px;
                line-height: 70px;
                display: flex;
                justify-content: flex-end;
            }
        }
    }
}
</style>
