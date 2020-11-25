<template>
    <div class="player-now">
<!--        {{songData.title}}-->
        <div class="songInfo">
            <div class="songPicture-wrap">
                <img :src="songPicture" alt="">
            </div>
            <ul class="songCreateInfo" v-if="songDataNow">
                <li><span>歌曲名:&nbsp;</span><i>{{songDataNow.title}}</i></li>
                <li><span>歌手名:&nbsp;</span><i>{{songDataNow.singer[0].name}}</i></li>
                <li><span>专辑名:&nbsp;</span><i>{{songDataNow.album.title}}</i></li>
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
        songPicture:{
            type: String,
            required: true
        },
        songTitle:{
            type: String,
            required: true
        },
        singer:{
            type: String,
            required: true
        },
        albumName:{
            type: String,
            required: true
        },
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

    },
    computed:{
        songDataNow(){
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
