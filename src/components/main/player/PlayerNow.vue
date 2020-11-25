<template>
    <div class="player-now"  v-if="songData">
<!--        {{songData.songPic}}-->
        <div class="songInfo">
            <div class="songPicture-wrap">
                <img :src="songData.songPic" alt="">
            </div>
            <ul class="songCreateInfo">
                <li><span>歌曲名:&nbsp;</span><i>{{songData.title}}</i></li>
                <li><span>歌手名:&nbsp;</span><i>{{songData.singer[0].name}}</i></li>
                <li><span>专辑名:&nbsp;</span><i>{{songData.album.title}}</i></li>
            </ul>
        </div>
        <div class="songLyric">
            <lyric-parsing
                :songId="songId"
                :currentTime="currentTime"
                :durationTime="durationTime"
            />
        </div>
    </div>
</template>

<script>
import LyricParsing from './LyricParsing'
export default {
    props:{

        songId:{
            type: String,
            required: true
        },
        currentTime:{
            type: Number,
            required: true
        },
        durationTime:{
            type: Number,
            required: true
        },

    },
    data(){
        return{

        }
    },
    methods:{

    },
    created() {
        // console.log(this.songDataNow)
    },
    computed:{
        songData(){
            // debugger
            const {cur,list}=this.$store.state
            // console.log(list)
            return list.find(item=>{
                return item.mid===cur
            }) || null
        },
    },
    watch:{

    },
    components:{
        LyricParsing
    }
}

</script>
