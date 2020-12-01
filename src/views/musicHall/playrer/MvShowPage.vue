<template>
    <div class="mv-show-page">
        <!--mv播放-->
        <div class="mv-video-wrap">
            <!--mv播放-->
            <mv-player
                   :vid="vid"
             />
            <!--mv信息-->
            <div class="mv-info-wrap" v-if="MvList">
                <div class="mv-info-inner">
                    <span class="mv-title">
                        {{MvList.title}}
                        <i> - </i>

                    </span>
                    <span class="player-num">
                        <span>播放量: </span>
                        {{MvList.listen_num}}
                    </span>
                </div>
            </div>
        </div>
        <!--mv简介-->
        <div class="mv-Introduction-wrap" v-if="MvList">
            <div class="mv-Introduction-inner">
                <div class="mv-introduce-title">视频简介</div>
                <div class="mv-introduce-info">
                    <span class="singer-name">{{singerName}}</span>
                    <span>发行时间:</span>
                    <span class="public-time">{{MvList.time}}</span>
                    <p class="info-content">
                        {{infoContent}}
                    </p>
                </div>
            </div>
        </div>
        <!--评论-->
        <div class="comment-wrap">
            <rank-comment v-if="songInfoPage&&songInfoPage.commend"
                          :commentList="songInfoPage.commend.data.comment"
                          @change="setCommendPageChange"
            />
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import MvPlayer from '@/components/main/mv/MvPlayer'
    import '@/assets/css/mvshowpage.scss'
    export default {
        props:{
            vid: {
                type:[String,Number],
                require:true
            }
        },
        data(){
            return{

            }
        },
        created() {
            // debugger


        },
        methods:{

        },
        computed:{
            ...mapGetters([
              'MvList'
            ]),
            //歌手名字
            singerName(){
                // debugger
                let len = this.MvList.singer.length
                if (len===1){
                    return  this.MvList.singer[0].name
                }else {
                    let singerNames = ''
                    this.MvList.singer.map((item,index)=>{
                        if (index<len-1){
                            singerNames += item.name+' / '
                        }else {
                            singerNames += item.name
                        }
                    })
                    return singerNames
                }
            },
            //视频简介
            infoContent(){
                if (this.MvList.desc){
                    return this.MvList.desc
                }
                return '暂无视频简介'
            }

   /*         mvUrl(){
                if (this.MvList.mvUrl&&this.MvList){
                    let key = this.vid.replace(/vid=/,'')
                    return this.MvList.mvUrl[key][this.Clarity]
                }
                return ''
            },*/
        },
        mounted() {
            // console.log(this.MvList)
        },

        components:{
            MvPlayer,
        }

    }
</script>

