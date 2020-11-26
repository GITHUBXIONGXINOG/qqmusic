<template>
    <div class="player-now" >
<!--        {{songData.songPic}}-->
        <div class="songInfo" >

                <div class="songPicture-wrap">
                    <img :src="songData.songPic" alt="" v-if="songData">
                    <i class="img-bg" v-else></i>
                </div>
                <ul class="songCreateInfo"  v-if="songData">
                    <li><span >歌曲名:&nbsp;</span><i>{{songData.title}}</i></li>
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
        tempInfo:[],//缓存信息
    },
    data(){
        return{

        }
    },
    methods:{
        //缓存当前的数据
        getTemp(val){
            // debugger
            if (val){
                this.tempInfo = val
            }
        }
    },
    created(){
        // console.log(this.songDataNow)
        // this.getTemp(this.songData)
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
