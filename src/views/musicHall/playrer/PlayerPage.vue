<template>
    <div class="player-page">
<!--        播放: {{songId}}-->
        <!--播放列表-->
        <player-list />
        <!--正在播放-->
        <player-now />
        <!-- 播放控制组件-->
        <player-bar
            :playerUrl="songPlayerUrl"
            :songTitle="songTitle"
            :singer="singer"
        />
        <div class="background-picture">
            <img :src="songPicture" alt="" @click.prevent>
        </div>

    </div>
</template>

<script>
    import '@/assets/css/player.scss'
    import PlayerList from '@/components/main/player/PlayerList'
    import PlayerNow from '@/components/main/player/PlayerNow'
    import PlayerBar from '@/components/main/player/PlayerBar'
    export default {
        props:{
            songId: {
                type:[String,Number],
                require: true
            }
        },
        data(){
            return{
                songPlayerUrl:'',//歌曲播放
                songInfoUrl:'',//歌曲信息
                songPicture:'',//歌曲图片
                songTitle:'',//歌曲标题
                singer:'',//歌手
            }
        },
        methods:{
          async fetchPlayerApi(){
              //歌曲播放url
              let playerUrl = '/api/song/urls?id='+this.songId
              const resOfPlayer = await this.$http.get(playerUrl)
              this.songPlayerUrl = resOfPlayer.data.data
              this.songPlayerUrl = (Object.values(this.songPlayerUrl))[0]

              //歌曲信息
              let songInfoUrl = '/api/song?songmid='+this.songId
              const resOfSongInfo = await this.$http.get(songInfoUrl)
              this.songInfoUrl = resOfSongInfo.data.data
              this.songPicture =  `https://y.gtimg.cn/music/photo_new/T002R300x300M000${this.songInfoUrl.track_info.album.mid}.jpg`
              this.songTitle =  this.songInfoUrl.track_info.title
              this.singer =  this.songInfoUrl.track_info.singer[0].name
          },


        },
        created() {
           this.fetchPlayerApi()

        },

        mounted() {

        },

        watch:{
            songId:{
                handler:function () {
                    this.fetchPlayerApi()
                },
                deep:true
            },

        },
        components:{
            PlayerList,//播放列表
            PlayerNow,//正在播放
            PlayerBar,//播放控制组件
        }
    }
</script>
