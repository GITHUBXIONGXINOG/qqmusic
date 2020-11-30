<template>
    <div class="song-info-page">

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
        created() {

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
        },
        destroyed() {
            // window.location.reload();
        }

    }
</script>
