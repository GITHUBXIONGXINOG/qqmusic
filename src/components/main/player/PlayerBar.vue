<template>
    <div class="player-bar" ref="playerBar">
        <div class="audio-panel">
            <audio  @canplay="getDuration" @timeupdate="updateTime" @ended="endOpera"
                    @playing="setPlaying"
                    :src="playerUrl"  ref="audio"></audio>
            <div class="audio-control">
                <!--控制按钮-->
                <div class="play-btns">
                    <span class="back"><i></i></span>
                    <span class="startAndStop"
                          @click="changeSongStatus()"
                          :class="{stopButton:isCanStop}"
                    ><i></i></span>
                    <span class="next"><i></i></span>
                </div>
                <!--进度条-->
                <div class="progress" >
                    <!--进度条总长度-->
                    <div class="bgSlot" ref="bgSlot" @click="clickProgress()"></div>
                    <!--已播放长度-->
                    <div class="overTime" ref="overTime" @click="clickProgress()"></div>
                    <!--当前进度指示原点-->
                    <div class="currentTime" ref="currentTime"
                         @mousedown="move"
                    ></div>

                    <!--歌曲信息-->
                    <div class="songInfo">
                        <!--歌曲名字和作者-->
                        <div class="songTitle">
                            <span>{{songTitle}}</span>
                            <span>&nbsp;-&nbsp;</span>
                            <span>{{singer}}</span>
                        </div>
                        <!--歌曲时间信息-->
                        <div class="songTime">
                            <!--当前时间-->
                            <span class="currentTimeText">{{currentTime}}</span>
                            <span>&nbsp;/&nbsp;</span>
                            <!--总时间-->
                            <span class="durationTimeText">{{duration}}</span>
                        </div>
                    </div>

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
                    <span class="volumeLog" @click="clickMuted"
                        :class="{'mutedStyle':isMuted}"
                    ><i></i></span>
                    <!--音量条-->
                    <div class="progressVolume">
                        <!--总长度-->
                        <div class="bgSlotVolume" ref="bgSlotVolume" @click="clickProgressVolume"></div>
                        <!--已播放长度-->
                        <div class="overTimeVolume" ref="overTimeVolume" @click="clickProgressVolume"></div>
                        <!--当前进度指示原点-->
                        <div class="currentTimeVolume" ref="currentTimeVolume"
                            @mousedown="moveVolume"
                        ></div>
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
            },
            //歌曲标题
            songTitle:{
                type: String,
                required: true
            },
            //歌手
            singer:{
                type: String,
                required: true
            }


        },
        data(){
            return{
                durationOriginal:0,//总时间初始格式
                currentTimeOriginal:0,//当前时间初始格式
                duration:'00:00',//总时间格式化
                currentTime:'00:00',//当前时间格式化
                bgSlotWidth:0,//当前背景区域的宽度
                isCanStop:false,//是否可以停止
                isStarting:false,//额外处理,刷新后的情况
                dragFlag:false,//拖动flag
                isMuted:false,//是否静音
                volumeLen:0,//音量长度
                progressLen:0//进度条长度
            }
        },

        methods:{
            //拖拽事件
            move(e){
                let el = e.target
                let disX = e.clientX - el.offsetLeft;
                this.dragFlag=true
                e.preventDefault()

                    document.onmousemove = (e)=>{       //鼠标按下并移动的事件
                        if (this.dragFlag){
                            //移动后当前的视口水平位置减去父元素的视口水平位置,就是当前距离父元素的位置
                            let x = e.clientX - disX
                            // console.log(x)
                            // let y = e.clientY - disY
                            //父元素的边界处理
                            if (x<=0){
                                x = 0
                            }else if (x>=this.bgSlotWidth){
                                x = this.bgSlotWidth
                            }
                            if (el.style){
                                this.progressLen=x
                            // console.log(this.progressLen)
                            if (x<=10){
                                el.style.left = 10 + 'px'

                            }else if (x>10&&x<this.bgSlotWidth-10){
                                el.style.left = x + 'px'

                            }else {
                                el.style.left =  (this.bgSlotWidth-10)+ 'px'
                            }
                            this.dragProgress()
                            }

                        }
                    };
                    document.onmouseup = (e) => {
                        e = null
                        el = null
                        disX = null
                        this.dragFlag=false
                    };


            },
            //音量拖拽
            moveVolume(e){
                let el = e.target
                let disX = e.clientX - el.offsetLeft;
                let isGragFlag = true
                e.preventDefault()
                document.onmousemove = (e)=>{
                    if (isGragFlag&&!this.dragFlag){
                        //鼠标按下并移动的事件
                        //移动后当前的视口水平位置减去父元素的视口水平位置,就是当前距离父元素的位置
                        let x = e.clientX - disX
                        // let y = e.clientY - disY
                        //父元素的边界处理
                        if (x<=0){
                            x = 0
                        }else if (x>=70){
                            x = 70
                        }
                        if (el.style){
                           this.volumeLen=x
                            if (x<=60&&x>=5){
                                el.style.left =x + 'px'
                            }else if (x<5){
                                el.style.left =0 + 'px'
                            }else{
                                el.style.left =60 + 'px'
                            }

                            this.currentProgressVolume()
                        }
                    }
                };
                document.onmouseup = (e) => {
                    isGragFlag=false
                };
            },
            //获取总时间
            getDuration() {
              /*  debugger
                console.log(this.$refs.audio.duration); //此时可以获取到duration*/
                this.durationOriginal = this.$refs.audio.duration
                this.duration = this.timeFormat(this.durationOriginal);
                //获取音量
                this.getVolume()
                this.$refs.audio.play()
            },
            //获取当前播放时间
            updateTime(e) {
                // console.log(this.dragFlag)

                // if (!this.dragFlag){
                    this.currentTimeOriginal = e.target.currentTime
                    this.currentTime = this.timeFormat(this.currentTimeOriginal);  //获取audio当前播放时间
                // }

            },
            //结束操作
            endOpera(){
                this.isCanStop=false
            },
            //播放标志
            setPlaying(){
                this.isCanStop=true
            },
            //播放暂停歌曲
            changeSongStatus(){
                let audio =this.$refs.audio//获取audio
                if (audio.paused){//如果暂停状态
                    audio.play()  //调用播放
                    this.isCanStop=true
                }else {             //如果播放状态
                        audio.pause()   //调用暂停
                    this.isCanStop=false

                }
            },
            //当前进度条
            currentProgress(flag){
                if (!flag){
                    let length = (this.currentTimeOriginal/this.durationOriginal)*this.bgSlotWidth
                    let over = this.$refs.overTime
                    over.style.width=length+'px'
                    //指示圆点
                    let currentTime = this.$refs.currentTime
                    currentTime.style.left=length+'px'
                }


            },
            //拖拽进度条
            dragProgress(){
                // debugger
                // console.log(this.progressLen)
                if (this.dragFlag){
                    //走过时间
                    this.$refs.overTime.style.width=this.progressLen+'px'
                    //指示圆点
                    this.$refs.currentTime.style.left = this.progressLen+'px'
                    this.$refs.audio.currentTime=(this.progressLen/this.bgSlotWidth)*this.durationOriginal
                }

            },
            //点击进度条
            clickProgress(event){
                const e = event || window.event
                let through = (e.offsetX/this.bgSlotWidth)*100
                this.$refs.overTime.style.width=e.offsetX+'px'
                this.$refs.currentTime.style.left=(e.offsetX-5)+'px'
                this.$refs.audio.currentTime=(through/100)*this.durationOriginal
                this.$refs.audio.play()
            },
            //进度条初始化
            progressInit(){
                this.bgSlotWidth = (document.body.clientWidth)*.423
                this.$refs.bgSlot.style.width=  this.bgSlotWidth + 'px'

            },
            //音量条初始化
            getVolume(){
                this.$refs.bgSlotVolume.style.width=70+'px';
                this.$refs.overTimeVolume.style.width=this.$refs.audio.volume* 70 + 'px'
                this.$refs.currentTimeVolume.style.left=this.$refs.overTimeVolume.style.width
            },
            //点击音量
            clickProgressVolume(event){
                const e = event || window.event
                this.$refs.overTimeVolume.style.width=e.offsetX+'px'
                this.$refs.currentTimeVolume.style.left=(e.offsetX)+'px'
                this.$refs.audio.volume=e.offsetX/70
            },
            //静音
            clickMuted(){
                if (this.isMuted){
                    this.$refs.audio.muted=false
                    this.isMuted=false
                }else {
                    this.$refs.audio.muted=true
                    this.isMuted=true


                }
            },
            //当前音乐进度条
            currentProgressVolume(){
                // debugger
                this.$refs.overTimeVolume.style.width=this.volumeLen+'px'
                this.$refs.audio.volume=this.volumeLen/70
                if (this.volumeLen==0){
                    this.isMuted = true
                }else {
                    this.isMuted = false

                }
            },


        },
        created() {

        },
        computed:{
            //时间格式化
            timeFormat(){
                return function (val) {
                    // debugger
                    let min = Math.floor(val/60)
                    let s = Math.floor(val%60)
                    min = min<10 ? '0'+min : min
                    s = s<10 ? '0'+s : s
                    return min + ':' + s
                }
            }
        },
        mounted() {
            //进度条初始化
            this.progressInit()
            //监听浏览器的窗口缩放事件window.onresize
            window.onresize = ()=> {
                this.progressInit();
            }

        },
        watch:{
        /*    playerUrl(){
                this.$nextTick(()=>{
                    //通过$refs获取到audio标签,并使用play()进行播放
                    this.$refs.audio.play()
                })
            },*/
            //监视当前时间变化
            currentTime(val){
                // this.$nextTick(item=>{
                if (!this.dragFlag){
                    this.currentProgress()
                }

            },

            progressLen:{
                handler:function () {
                    this.dragProgress()

                },
                deep:true
            }


        },
        components:{
        }
    }
</script>
