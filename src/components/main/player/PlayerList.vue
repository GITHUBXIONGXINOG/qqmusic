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
            }
        },

    }
</script>


