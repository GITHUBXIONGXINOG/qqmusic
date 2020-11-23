<template>
    <div class="player-bar" ref="playerBar">
        <div class="audio-panel">
            <audio  @canplay="getDuration" @timeupdate="updateTime"  :src="playerUrl"  ref="audio"></audio>
            <div class="audio-control">
                <!--控制按钮-->
                <div class="play-btns">
                    <span class="back"><i></i></span>
                    <span class="startAndStop"
                          @click="changeSongStatus()"
                          :class="{stopButton:isStop}"
                    ><i></i></span>
                    <span class="next"><i></i></span>
                </div>
                <!--进度条-->
                <div class="progress" @click="clickProgress()">
                    <!--进度条总长度-->
                    <div class="bgSlot" ref="bgSlot" @click="clickProgress()"></div>
                    <!--已播放长度-->
                    <div class="overTime" ref="overTime" @click="clickProgress()"></div>
                    <!--当前进度指示原点-->
                    <div class="currentTime" ref="currentTime"  v-drag="{data:bgSlotWidth,set:ChangeWidth}"

                    ></div>
<!--                    v-drag="{data:bgSlotWidth}"-->
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
                    <span class="volumeLog"><i></i></span>
                    <!--进度条-->
                    <div class="progressVolume">
                        <!--进度条总长度-->
                        <div class="bgSlotVolume"></div>
                        <!--已播放长度-->
                        <div class="overTime"></div>
                        <!--当前进度指示原点-->
                        <div class="currentTimeVolume" v-drag="{data:70,set:ChangeVolume}"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ProgressMain from './ProgressMain'
    export default {
        //局部注册指令
        directives:{
            // 拖拽指令
            drag:{

                update(el,binding){
                    let isDragStart = false//拖拽标识符
                    let disX = 0
                    // let disY = 0
                    el.addEventListener('mousedown',e =>{
                        //e.clientX 鼠标点击的视口水平方向位置
                        //el.offsetLeft 鼠标点击的距离父元素的水平位置
                        //disx 视口位置-父元素位置 = 父元素左侧距离视口左侧的距离
                        disX = e.clientX - el.offsetLeft
                        // disY = e.clientY - el.offsetTop

                        isDragStart = true
                        e.preventDefault()
                    })

                    document.addEventListener('mousemove',e =>{
                        if (isDragStart){
                                //移动后当前的视口水平位置减去父元素的视口水平位置,就是当前距离父元素的位置
                                let x = e.clientX - disX
                                // let y = e.clientY - disY
                                //父元素的边界处理
                                if (x<=0){
                                    x = 0
                                }else if (x>=binding.value.data){
                                    x = binding.value.data
                                }
                                el.style.left = x + 'px'
                                // el.style.top = y + 'px'
                                binding.value.set(x)

                        }
                    })

                    document.addEventListener('mouseup',e=>{
                        isDragStart = false
                    })

                },

            }

        },
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
                isStop:false,//是否可以停止
            }
        },

        methods:{
            //获取总时间
            getDuration() {
              /*  debugger
                console.log(this.$refs.audio.duration); //此时可以获取到duration*/
                this.durationOriginal = this.$refs.audio.duration
                this.duration = this.timeFormat(this.durationOriginal);
                this.isStop=true
            },
            //获取当前播放时间
            updateTime(e) {
                this.currentTimeOriginal = e.target.currentTime
                this.currentTime = this.timeFormat(this.currentTimeOriginal);  //获取audio当前播放时间
            },
            //播放暂停歌曲
            changeSongStatus(){
                let audio =this.$refs.audio//获取audio
                if (audio.paused){//如果暂停状态
                    audio.play()  //调用播放
                    this.isStop=true
                }else {             //如果播放状态
                        audio.pause()   //调用暂停
                    this.isStop=false

                }
            },
            //当前进度条
            currentProgress(){
                // debugger
                //走过长度
                let length = (this.currentTimeOriginal/this.durationOriginal)*this.bgSlotWidth
                let over = this.$refs.overTime
                    over.style.width=length+'px'
                //指示圆点
                let currentTime = this.$refs.currentTime
                    currentTime.style.left=(length-5)+'px'
            },
            //点击进度条
            clickProgress(event){
                const e = event || window.event
                let through = (e.offsetX/this.bgSlotWidth)*100
                this.$refs.overTime.style.width=e.offsetX+'px'
                this.$refs.currentTime.style.left=(e.offsetX-5)+'px'
              /*  this.$refs.audio.currentTime = (e.offsetX/this.bgSlotWidth)
                debugger
                console.log(this.$refs.audio.currentTime);*/
                this.$refs.audio.currentTime=(through/100)*this.durationOriginal
            },
            //进度条初始化
            progressInit(){
                this.bgSlotWidth = (document.body.clientWidth)*.424
                this.$refs.bgSlot.style.width=  this.bgSlotWidth + 'px'

            },
            //接收自定义组件传递的数据
            ChangeWidth(val){
                // this.$refs.audio.pause()
                // debugger
                // console.log(val)
                this.$refs.overTime.style.width=val+'px'
                this.$refs.audio.currentTime=(val/this.bgSlotWidth)*this.durationOriginal
            },
            //接收自定义组件传递的数据
            ChangeVolume(val){
                // this.$refs.audio.pause()
                // debugger
                // console.log(val)
                this.$refs.overTime.style.width=val+'px'
                this.$refs.audio.currentTime=(val/this.bgSlotWidth)*this.durationOriginal
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
            playerUrl(){
                this.$nextTick(()=>{
                    //通过$refs获取到audio标签,并使用play()进行播放
                    this.$refs.audio.play()
                })
            },
            //监视当前时间变化
            currentTime(val){
                this.$nextTick(item=>{
                    this.currentProgress()
                })
            },
            ChangeWidth(){

            }

        },
        components:{
            ProgressMain
        }
    }
</script>
