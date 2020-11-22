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
        />

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
              songPlayerUrl:'',
            }
        },
        methods:{
          async fetchPlayerApi(){
              //歌曲播放url
              let url = '/api/song/urls?id='+this.songId
              const res = await this.$http.get(url)
              this.songPlayerUrl = res.data.data
              this.songPlayerUrl = (Object.values(this.songPlayerUrl))[0]

          }

        },
        created() {
           this.fetchPlayerApi()

        },
        watch:{
            songI:{
                handler:function () {
                    this.fetchPlayerApi()
                },
                deep:true
            }
        },
        components:{
            PlayerList,//播放列表
            PlayerNow,//正在播放
            PlayerBar,//播放控制组件
        }
    }
</script>
