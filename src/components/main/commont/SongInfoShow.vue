<template>
    <div class="song-info-show">
        <div class="song-info-heard-wrap">
            <div class="song-img">
                <img :src="songInfoPage.imgUrl" alt="" v-show="songInfoPage.imgUrl">
            </div>
            <div class="text-info-wrap">
                <div class="song-title">
                    {{songInfoPage.title}}
                </div>
                <div class="text-info">
                    <div class="singer-info">
                        <span class="iconfont icon-ren"></span>
                        {{singerName}}
                    </div>
                    <div class="song-type">
                        <div class="album-name">
                            <i>专辑:</i>
                            {{songInfoPage.album}}
                        </div>
                        <div class="lan">
                            <i>语种:</i>
                            {{songInfoPage.lan}}
                        </div>
                        <div class="school" v-if="songInfoPage.genre">
                            <i>流派:</i>
                            {{songInfoPage.genre.content[0].value}}
                        </div>
                        <div class="company">
                            <i>唱片公司:</i>
                            {{songInfoPage.company}}
                        </div>
                        <div class="public-time">
                            <i>发行时间:</i>
                            {{songInfoPage.pub_time}}
                        </div>
                    </div>
                </div>
                <div class="operating">
                    <div class="playing">
                        <span class="iconfont icon-bofang1"></span>
                        <i>播放</i>
                    </div>
                    <div class="playing">
                        <span class="iconfont icon-shoucang"></span>
                        <i>收藏</i>
                    </div>
                    <div class="playing">
                        <span class="iconfont icon-pinglun2"></span>
                        <i>评论</i>
                    </div>
                    <div class="playing">
                        <span class="iconfont icon-gengduo"></span>
                        <i>更多</i>
                    </div>
                </div>
            </div>
        </div>
        <div class="song-info-left-part">
            <div class="lyric-wrap">
                <span class="lyric-title">歌词</span>
                <lyrics-panel
                  :setLyricsContent="songInfoPage.lyric"
                />
            </div>
            <div class="comment-wrap">
                <rank-comment
                  :commentList="songInfoPage.commend.data.comment"
                  @change="setCommendPageChange"
                />
            </div>
        </div>

    </div>
</template>

<script>
import {mapGetters} from "vuex";
import LyricsPanel from "@/components/main/search/LyricsPanel";
import RankComment from "@/components/main/rank/RankComment";
import {songInfoPage} from "@/store/getters";
    export default {
        data(){
            return{

            }
        },
        components:{
            LyricsPanel,//歌词组件
            RankComment,//评论组件
        },
        created() {
          debugger
          console.log(this.songInfoPage.commend)
        },
        computed:{
            ...mapGetters([
                'songInfoPage',//详细页面信息
            ]),
            //歌手名字
            singerName(){
                // debugger
                let len = this.songInfoPage.singer.length
                if (len===1){
                    return  this.songInfoPage.singer[0].name
                }else {
                    let singerNames = ''
                    this.songInfoPage.singer.map((item,index)=>{
                        if (index<len-1){
                            singerNames += item.name+' / '
                        }else {
                            singerNames += item.name
                        }
                    })
                    return singerNames
                }
            },

        },
        methods:{
            setCommendPageChange(page){
                debugger
                this.$store.dispatch('queryDataSongInfoCommendPage',page)
            }
        },

    }
</script>
