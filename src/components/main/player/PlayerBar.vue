<template>
    <div class="player-bar" ref="playerBar"  >
        <div class="audio-panel">
            <audio  @canplay="getDuration" @timeupdate="updateTime" @ended="endOpera"
                    @playing="setStart" v-if="songData"
                    :src="songData.playerUrl"  ref="audio"></audio>
            <div class="audio-control">
                <!--控制按钮-->
                <div class="play-btns">
                    <!--上一首歌-->
                    <span class="back" @click="clickBack"><i></i></span>
                    <!--开始按钮-->
                    <span class="startButton"
                          @click="clickStart()"
                          v-show="!isPlay"
                    ><i></i></span>
                    <!--停止按钮-->
                    <span class="stopButton"
                          @click="clickStop()"
                          v-show="isPlay"
                    ><i></i></span>
                    <span class="next" @click="clickNext"><i></i></span>
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
                        <div class="songTitle" v-if="songData">
                            <span>{{songData.title}}</span>
                            <span>&nbsp;-&nbsp;</span>
                            <span>{{songData.singerName}}</span>
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
                    <span class="listCycle">
                        <i :class="`song-list-order-${songListOrder}`" @click="clickOrder"></i>
                    </span>
                    <!--喜欢-->
                    <span class="loveSelect"><i></i></span>
                    <!--下载-->
                    <span class="downloadSelect" @click.prevent="downSongs(songData)"><i></i></span>
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
import {mapGetters, mapMutations} from "vuex"
import {audio, cur} from "@/store/getters";
import api from "@/api";
import Axios from "axios";

    export default {
        props:{

        },
        data(){
            return{
                durationOriginal:0,//总时间初始格式
                currentTimeOriginal:0,//当前时间初始格式
                duration:'00:00',//总时间格式化
                currentTime:'00:00',//当前时间格式化
                bgSlotWidth:0,//当前背景区域的宽度
                isPaused:true,//是否暂停
                isStarting:false,//额外处理,刷新后的情况
                dragFlag:false,//拖动flag
                isMuted:false,//是否静音
                volumeLen:0,//音量长度
                progressLen:0,//进度条长度
                clickFlag:'',//点击标志
                clickMid:'',//点击歌曲mid
                timer:null,//定时器
                audio:null,//播放器初始
                isResetAudio:false,//接收playerlist传递的重新获取audio元素请求
                currentTimeSecond:0,//当前时间
                songListOrder:0,//当前列表播放模式
            }
        },

        methods:{
            //播放器开始标志
            setStart(){
                // debugger
                this.isPaused=false
                // console.log(this.$store.state)
                this.isPlayMutation(true)
                // console.log(this.$store.state)
                if (this.currentLyric) {
                    this.currentLyric.play()
                }
            },
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
                if (this.$refs.audio){
                    this.durationOriginal = this.$refs.audio.duration
                    this.duration = this.timeFormat(this.durationOriginal);
                    this.$emit('durationTime',this.durationOriginal)
                    //获取音量
                    this.getVolume()
                    this.$refs.audio.play()
                }
            },
            //获取当前播放时间
            updateTime(e) {

                if (!this.dragFlag){
                    this.currentTimeOriginal = e.target.currentTime
                    this.currentTime = this.timeFormat(this.currentTimeOriginal);  //获取audio当前播放时间
                    // this.$emit('currentTime',this.currentTimeOriginal)
                    if ( this.currentTimeSecond!=(this.currentTimeOriginal))
                     this.currentTimeSecond=Math.floor(this.currentTimeOriginal)
                        // this.$bus.$emit('currentTime',this.currentTimeOriginal)


                    // console.log('bar的时间:'+Math.floor(this.currentTimeOriginal))
                }
            },
            //结束操作
            endOpera(){
                this.isPaused=false
                this.nextSong(this.songListOrder)
                //单曲循环
                if (this.songListOrder===2){
                    setTimeout(()=>{
                        this.audio.load()
                        this.audio.play()
                    },3000)
                }
            },
            //开始播放
            clickStart(){
                // debugger
                this.isPlayMutation(!this.isPlay)
                if (!this.audio){
                    // debugger
                    this.audio = this.$refs.audio
                    this.getAudio(this.audio)
                }
                this.audio.play()
                // this.lyricTogglePlay()
            },
            //停止播放
            clickStop(){
                // debugger
                this.isPlayMutation(!this.isPlay)
                if (!this.audio){
                    // debugger
                    this.audio = this.$refs.audio
                    this.getAudio(this.audio)
                }
                this.audio.pause()
                // this.lyricTogglePlay()
            },
            //上一首歌
            clickBack(){
                this.preSong(this.songListOrder)
                //单曲循环
                if (this.songListOrder===2){
                    setTimeout(()=>{
                        this.audio.load()
                        this.audio.play()
                    },1000)
                }
            },
            //下一首歌
            clickNext(){
                debugger
                this.nextSong(this.songListOrder)
                //单曲循环
                if (this.songListOrder===2){
                    setTimeout(()=>{
                        this.audio.load()
                        this.audio.play()
                    },1000)
                }
            },
            //切换列表播放顺序
            clickOrder(){
                // debugger
                if (this.songListOrder<3){
                    this.songListOrder++
                }else {
                    this.songListOrder=0
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
                    this.currentTime = this.timeFormat((this.progressLen/this.bgSlotWidth)*this.durationOriginal);  //获取audio当前播放时间
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
            },
            //进度条初始化
            progressInit(){
                this.bgSlotWidth = (document.body.clientWidth)*.423
                if (this.$refs.bgSlot)
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
            //下载链接获取
            async downSongs(item){
                let res = await api.downSongs(item.mid)
                if (res.data.result===100){
                    this.downloadItem(res.data.data,item.name||item.title)
                }
            },
            //下载
            downloadItem (url,name) {
                Axios.get(url, { responseType: 'blob' })
                  .then(({ data }) => {
                      // 为了简单起见这里blob的mime类型 固定写死了
                      let blob = new Blob([data], { type: 'application/vnd.ms-excel' })
                      let link = document.createElement('a')
                      link.href = window.URL.createObjectURL(blob)
                      link.download = name+'.mp3'
                      this.$nextTick(()=>{
                          this.downName=name
                      })
                      link.click()
                  })
            },
            //mapMutations 提交 this.$store.commit('getAudio',payload)
            ...mapMutations([
                "getAudio",//获取audio,存入
                "isPlayMutation",//设置播放状态,存入
                "setCurrentMid",//当前的歌曲id,存入
                "preSong",//前一首歌
                "nextSong",//后一首歌

            ])

        },
        created() {

          /*  this.$bus.$on('clickPlaying',clickInfo=>{
                // this.isPaused=!this.isPaused
                // this.changeSongStatus()
                let {clickFlag,clickMid} = clickInfo

                // 如果点击的id是当前歌曲的id 暂停
                if (this.songData.mid==clickMid){
                    this.clickFlag=clickFlag
                }else {//如果不是进行切换
                    this.$store.dispatch('queryDataSong',clickMid)
                }

            }),*/
              this.currentTimeOriginal=0

            this.progressInit()



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
            },
            songData(){
                // debugger
                const {cur,playList}=this.$store.state
                // console.log(list)
                return playList.find(item=>{
                    return item.mid===cur
                }) || null
            },
            //得到store的数据,在getters.js中处理后,返回值
            ...mapGetters([
                "isPlay",//播放状态,读取
              "currentLyric",//歌词元素,读取
            ])
        },
        mounted() {
            this.$nextTick(()=>{
                this.audio = this.$refs.audio
                this.getAudio(this.audio)
            })
            this.$nextTick(()=>{
                this.$bus.$on('resetAudioInfo',item=>{
                    this.isResetAudio=item
                })
            })
            //进度条初始化
            this.progressInit()
            //监听浏览器的窗口缩放事件window.onresize
            window.onresize = ()=> {
                this.progressInit();
            }
            this.$nextTick(()=>{
                if (this.$refs.audio){
                    // debugger
                    this.getAudio(this.$refs.audio)
                }
            })
            // console.log(this.$store.state);

        },
        watch:{

            //监视当前时间变化
            currentTime(val){
                // this.$nextTick(item=>{
                if (!this.dragFlag){
                    this.currentProgress()
                }

            },
            //监视PlayerList的点击
            clickFlag(val){
                this.changeSongStatus()
            },
            progressLen:{
                handler:function () {
                    this.dragProgress()
                },
                deep:true
            },
            //重置audio
            isResetAudio(val){
                if (val){
                    this.$nextTick(()=>{
                        // debugger
                        this.audio = this.$refs.audio
                        this.getAudio(this.audio)
                        this.audio.pause()
                    })
                }
                this.isResetAudio=false

            },
            //监视秒变化
            currentTimeSecond:{
                handler(oldVal,newVal){
                    // debugger
                    if (oldVal!=newVal){
                        this.$bus.$emit('currentTime',oldVal)
                    }
                }

            }

        },
        components:{
        },
        destroyed(){
            this.$bus.$off('clickPlaying')
            this.$bus.$off('resetAudioInfo')
            this.audio.paused()
        }
    }
</script>
