<template>
    <div class="player-page">
<!--        播放: {{songId}}-->
        <router-link to="/homepage" class="back-home">
            <span class="iconfont icon-cuowu"></span>
        </router-link>
        <div class="pageInfo">
            <!--播放列表-->
            <player-list
                :pausedSign="pausedSign"
            />
            <!--正在播放-->
            <player-now
              :songId="songId"
              :durationTime="durationTime"
            />
        </div>

        <!-- 播放控制组件-->
        <player-bar
            @durationTime="setDurationTime"
            @getPausedSign="PausedSign"
        />
        <div class="background-picture"  v-if="songData">
            <img :src="songData.songPic" alt="" @click.prevent>
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
                songInfoUrl:'',//歌曲信息
                albumName:'',//专辑名
                songLyric:'',//歌词
                currentTime:0,//当前播放的时间
                durationTime:0,//总时间
                pausedSign:true,//暂停信号
            }
        },
        methods:{
          async fetchPlayerApi(){
              //歌曲播放url

              //歌曲信息
              let songInfoUrl = '/api/song?songmid='+this.songId
              const resOfSongInfo = await this.$http.get(songInfoUrl)
              this.songInfoUrl = resOfSongInfo.data.data
              this.albumName = this.songInfoUrl.track_info.album.name





          },
            //当前时间
      /*      setCurrentTime(val){
              this.currentTime = val
            },*/
            //总时间
            setDurationTime(val){
              this.durationTime=val
            },
            //暂停信号
            PausedSign(val){
              //原先是是否可以暂停,现在是暂停信号,取反
              this.pausedSign=!val
            }

        },
        created() {
           this.fetchPlayerApi()
            //$route存储当前路由所有信息
            // 路由设置里面 path: '/player/:songId',所以params里面有songId
            //第一次加载时拿到当前路由匹配的id,派发请求
            // this.$store.dispatch('queryDataA',this.$route.params.songId)
            // console.log(this.$route)
            // debugger
            let regSong = /songmid=/
            let regSongList = /content_id=/
            let regAlbums = /albummid=/
            let idInfo = ''
            if (this.$route.params.songId.match(regSong)){
                 idInfo=this.$route.params.songId.replace(regSong,'')
                this.$store.dispatch('queryDataSong',idInfo)
            }else if (this.$route.params.songId.match(regSongList)){
                idInfo=this.$route.params.songId.replace(regSongList,'')
                this.$store.dispatch('queryDataASongList',idInfo)
            }else {
                idInfo=this.$route.params.songId.replace(regSongList,'')

            }



        },
        computed:{
            songData(){
                const {cur,playList}=this.$store.state
                return playList.find(item=>{
                    return item.mid===cur
                }) || null
            }
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
            //to 跳转的页面 to和$route一样,存储当前路由的信息
            // $route(to,from){
            //     console.log(to)
            //     debugger
            //     console.log(to)
            //     this.$store.dispatch('queryDataA',to.params.songId)
            //
            // },
            //监听路由


        },
        components:{
            PlayerList,//播放列表
            PlayerNow,//正在播放
            PlayerBar,//播放控制组件
        }
    }
</script>
