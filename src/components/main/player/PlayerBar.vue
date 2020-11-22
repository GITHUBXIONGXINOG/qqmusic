<template>
    <div class="player-bar">
        <div class="audio-panel">
            <audio  @canplay="getDuration" @timeupdate="updateTime"  :src="playerUrl"  ref="audio"></audio>
            <div class="audio-control">
                <!--控制按钮-->
                <div class="play-btns">
                    <span class="back"><i></i></span>
                    <span class="startAndStop"><i></i></span>
                    <span class="next"><i></i></span>
                </div>
                <!--进度条-->
                <div class="progress">
                    <!--进度条总长度-->
                    <div class="bgSlot"></div>
                    <!--已播放长度-->
                    <div class="overTime"></div>
                    <!--当前进度指示原点-->
                    <div class="currentTime"></div>
                </div>
                <!--更多操作-->
                <div class="moreOpera">
                    <!--列表循环-->
                    <span class="listCycle"><i></i></span>
                    <!--喜欢-->
                    <span class="loveSelect"><i></i></span>
                    <!--下载-->
                    <span class="downloadSelect"><i></i></span>
                    <!--评论-->
                    <span class="commentSelect"><i></i></span>
                    <!--纯净-->
                    <span class="openPure"><i></i></span>
                </div>
                <!--音量-->
                <div class="volume">
                    <!--音量图标-->
                    <span class="volumeLog"><i></i></span>
                    <!--进度条-->
                    <div class="progress">
                        <!--进度条总长度-->
                        <div class="bgSlot"></div>
                        <!--已播放长度-->
                        <div class="overTime"></div>
                        <!--当前进度指示原点-->
                        <div class="currentTime"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            //设置歌曲播放地址
            playerUrl:{
                type: String,
                required: true
            }
        },
        data(){
            return{

            }
        },
        methods:{
            //获取总时间
            getDuration() {
              /*  debugger
                console.log(this.$refs.audio.duration); //此时可以获取到duration*/
                this.duration = this.$refs.audio.duration;
            },
            //获取当前播放时间
            updateTime(e) {
                this.currentTime = e.target.currentTime;  //获取audio当前播放时间
            },
        },
        created() {

        },
        mounted() {

        },
        watch:{
            playerUrl(){
                this.$nextTick(()=>{
                    //通过$refs获取到audio标签,并使用play()进行播放
                    this.$refs.audio.play()
                })


            }

        },
    }
</script>
