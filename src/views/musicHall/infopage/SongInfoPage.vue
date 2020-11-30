<template>
    <div class="song-info-page">
<!--        {{songId}}-->
<!--        <img :src="songInfoPage.imgUrl" alt="">-->
<!--        {{songInfoPage.title}}-->
<!--        {{songInfoPage.singer}}-->
        <song-info-show />
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import '@/assets/css/songinfopage.scss'
    import SongInfoShow from "@/components/main/commont/SongInfoShow";
    export default {
        props:{
            songId: {
                type:[String,Number],
                require: true
            }
        },
        data(){
            return{

            }
        },
        methods:{
        },
        computed:{
            ...mapGetters([
                'songInfoPage',//详细页面信息
            ])
        },
        mounted() {
            // debugger
            this.$store.dispatch('queryDataSongInfo',this.songId)
            // console.log(this.$store.state)
        },
        components:{
            SongInfoShow,
        }
    }
</script>
