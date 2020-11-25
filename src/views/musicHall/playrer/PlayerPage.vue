<template>
    <div class="player-page">
<!--        播放: {{songId}}-->
        <div class="pageInfo">
            <!--播放列表-->
            <player-list
                :playSongList="playSongList"
            />
            <!--正在播放-->
            <player-now
              :songPicture="songPicture"
              :songTitle="songTitle"
              :singer="singer"
              :albumName="albumName"
              :songId="songId"
              :currentTime="currentTime"
              :durationTime="durationTime"
            />
        </div>

        <!-- 播放控制组件-->
        <player-bar
            :playerUrl="songPlayerUrl"
            :songTitle="songTitle"
            :singer="singer"
            @currentTime="setCurrentTime"
            @durationTime="setDurationTime"
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
                albumName:'',//专辑名
                songLyric:'',//歌词
                currentTime:0,//当前播放的时间
                durationTime:0,//总时间
                playSongList:{},//播放歌曲列表
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
              this.albumName = this.songInfoUrl.track_info.album.name

              // console.log(this.playSongList)
              //键值对标记
              let flag = true
              //循环遍历,查看是否存储
              for (let key in this.playSongList){
                  if (key==this.songId){
                      flag = false
                  }
              }
              if (flag){
                  this.playSongList[this.songId]=this.songInfoUrl.track_info
              }
              console.log(this.playSongList)



          },
            //当前时间
            setCurrentTime(val){
              this.currentTime = val
            },
            //总时间
            setDurationTime(val){
              this.durationTime=val
            }

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
