<template>
    <div class="song-info-show">
        <div class="song-info-heard-wrap">
            <div class="song-img"  v-if="songInfoPage">
                <img :src="songInfoPage.imgUrl" alt="">
            </div>
            <div class="text-info-wrap" v-if="songInfoPage&&songInfoPage.title">
                <div class="song-title" >
                    {{songInfoPage.title}}
                </div>
                <div class="text-info" >
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
                    <router-link :to="`/player/songmid=` + songInfoPage.songId" tag="a" class="playing">
                        <span class="iconfont icon-bofang1"></span>
                        <i>播放</i>
                    </router-link>
                    <a class="playing">
                        <span class="iconfont icon-shoucang"></span>
                        <i>收藏</i>
                    </a>
                    <a href="#rankComment" class="playing">
                        <span class="iconfont icon-pinglun2"></span>
                        <i>评论</i>
                        <i>({{songInfoPage.commend.data.comment.commenttotal}})</i>
                    </a>
                    <a class="playing">
                        <span class="iconfont icon-gengduo"></span>
                        <i>更多</i>
                    </a>
                </div>
            </div>
        </div>
        <div class="song-info-main-part">
            <div class="song-info-left-part">
                <div class="lyric-wrap" v-if="songInfoPage&&songInfoPage.lyric">
                    <span class="lyric-title">歌词</span>
                    <lyrics-panel
                      :setLyricsContent="songInfoPage.lyric"
                    />
                </div>
                <div class="comment-wrap">
                    <rank-comment v-if="songInfoPage&&songInfoPage.commend" id="rankComment"
                                  :commentList="songInfoPage.commend.data.comment"
                                  @change="setCommendPageChange"
                    />
                </div>
            </div>
            <div class="related-part">
                <div class="related-hotSongList" v-if="songInfoPage&&songInfoPage.RelatedSongList">
                    <span class="hosSong-title">相关热门歌单</span>
                    <div class="hotSong-wrap" >
                        <div class="hotSong-list" v-for="item in songInfoPage.RelatedSongList">
                            <img :src="item.imgurl" alt="">
                            <span class="hotSong-info">{{item.dissname}}</span>
                            <span class="hotSong-creator">{{item.creator}}</span>
                        </div>
                    </div>
                </div>
                <div class="related-mv" v-if="songInfoPage&&songInfoPage.RelatedMV[0]">
                    <span class="related-mv-title">相关mv</span>
                    <div class="mv-wrap">
                        <img :src="songInfoPage.RelatedMV[0].picurl" alt="">
                        <span class="mv-title">{{songInfoPage.RelatedMV[0].title}}</span>
                        <span class="mv-singers">{{singerName}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import LyricsPanel from "@/components/main/search/LyricsPanel";
import RankComment from "@/components/main/rank/RankComment";
// import {songInfoPage} from "@/store/getters";
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
