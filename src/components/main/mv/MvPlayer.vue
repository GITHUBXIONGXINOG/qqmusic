<template>
    <div class="mv-player">
        <div class="mv-video-wrap" v-if="MvList">
            <video :src="mvUrl"  ref="video" @canplay="getDuration" @timeupdate="updateTime"></video>
            <div class="video-control">
                <!--控制按钮-->
                <div class="play-btns">
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

                </div>
                <!--歌曲信息-->
                <div class="songInfo">
                    <!--歌曲时间信息-->
                    <div class="songTime">
                        <!--当前时间-->
                        <span class="currentTimeText">{{currentTime}}</span>
                        <span>&nbsp;/&nbsp;</span>
                        <!--总时间-->
                        <span class="durationTimeText">{{duration}}</span>
                    </div>
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


                </div>

                <!--更多操作-->
                <div class="moreOpera">
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
                    <!--列表循环-->
                    <span class="listCycle">
                        <i :class="`song-list-order-${songListOrder}`" @click="clickOrder"></i>
                    </span>
                    <!--全屏-->
                    <span>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-quanping"></use>
                        </svg>
                    </span>

                    <!--取消全屏-->
                    <span>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-quxiaoquanping"></use>
                        </svg>
                    </span>

                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import api from "@/api";
    import Axios from "axios";

    export default {
        props:{
            vid: {
                type:[String,Number],
                require:true
            }
        },
        data(){
            return{
                Clarity:3,//清晰度,0-3,3最高,0最低
                isPlay:false,//播放状态
                songListOrder:0,//当前列表播放模式
                isMuted:false,//是否静音
                currentTimeOriginal:0,//当前时间
                durationOriginal:0,//总时间初始格式
                duration:'00:00',//总时间格式化
                currentTime:'00:00',//当前时间格式化
                bgSlotWidth:1200,//当前背景区域的宽度
                isPaused:true,//是否暂停
                isStarting:false,//额外处理,刷新后的情况
                dragFlag:false,//拖动flag
                volumeLen:0,//音量长度
                progressLen:0,//进度条长度
                clickFlag:'',//点击标志
                clickMid:'',//点击歌曲mid
                timer:null,//定时器
                audio:null,//播放器初始
                isResetAudio:false,//接收playerlist传递的重新获取audio元素请求
            }
        },
        created() {
            // debugger
            let idInfo=this.vid.replace(/vid=/,'')
            this.$store.dispatch('queryDataMvPlayer',idInfo)

        },
        methods:{
            //播放器开始标志
            setStart(){
                // debugger
                this.isPaused=false
                // console.log(this.$store.state)
                // console.log(this.$store.state)

            },
            //拖拽事件
            move(e){
                let el = e.target
                let disX = e.clientX - el.offsetLeft;
                this.dragFlag=true
                e.preventDefault()
                document.onmousemove = (e)=>{
                     //鼠标按下并移动的事件
                    // console.log(this.bgSlotWidth)
                    if (this.dragFlag){
                        //移动后当前的视口水平位置减去父元素的视口水平位置,就是当前距离父元素的位置
                        let x = e.clientX - disX
                        // console.log(x)
                        // let y = e.clientY - disY
                        //父元素的边界处理
                        if (x<=0){
                            x = 0
                        }else if (x>=this.bgSlotWidth-10){
                            x = this.bgSlotWidth-10
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
                let disY = e.clientY - el.offsetTop;
                let isGragFlag = true
                e.preventDefault()
                document.onmousemove = (e)=>{
                    if (isGragFlag&&!this.dragFlag){
                        //鼠标按下并移动的事件
                        //移动后当前的视口水平位置减去父元素的视口水平位置,就是当前距离父元素的位置
                        // let x = e.clientX - disX
                        let y = e.clientY - disY
                        //父元素的边界处理
                        if (y<=5){
                            y = 5
                        }else if (y>=100){
                            y = 100
                        }
                        if (el.style){
                            this.volumeLen=100-y
                          /*  if (y<=90&&y>=5){
                                el.style.top =y + 'px'
                            }else if (y<0){
                                el.style.top =0 + 'px'
                            }else{
                                el.style.top =90 + 'px'
                            }*/
                            if (y>=100){
                                el.style.top =100 + 'px'

                            }else {
                                el.style.top =y + 'px'

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
                  console.log(this.$refs.video.duration); //此时可以获取到duration*/
               // debugger
                if (this.$refs.video){
                    this.durationOriginal = this.$refs.video.duration
                    this.duration = this.timeFormat(this.durationOriginal);
                    // this.$emit('durationTime',this.durationOriginal)
                    //获取音量
                    this.getVolume()
                    this.$refs.video.play()
                }
            },
            //获取当前播放时间
            updateTime(e) {
                if (!this.dragFlag){
                    this.currentTimeOriginal = e.target.currentTime
                    this.currentTime = this.timeFormat(this.currentTimeOriginal);  //获取video当前播放时间
                    // this.$emit('currentTime',this.currentTimeOriginal)
                    if ( this.currentTimeSecond!=(this.currentTimeOriginal)){
                        this.currentTimeSecond=Math.floor(this.currentTimeOriginal)

                    }
                    // this.$bus.$emit('currentTime',this.currentTimeOriginal)
                    this.currentProgress()

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
                        this.video.load()
                        this.video.play()
                    },3000)
                }
            },
            //开始播放
            clickStart(){
                // debugger
                if (!this.video){
                    // debugger
                    this.video = this.$refs.video
                }
                this.video.play()
                this.isPlay=true
                // this.lyricTogglePlay()
            },
            //停止播放
            clickStop(){
                // debugger
                if (!this.video){
                    // debugger
                    this.video = this.$refs.video
                }
                this.video.pause()
                this.isPlay=false

                // this.lyricTogglePlay()
            },
            //切换列表播放顺序
            clickOrder(){
                // debugger
                if (this.songListOrder<1){
                    this.songListOrder++
                }else {
                    this.songListOrder=0
                }
            },
            //当前进度条
            currentProgress(){
                if (this.isPlay){
                    // debugger
                    // console.log(this.bgSlotWidth)
                    let length = (this.currentTimeOriginal/this.durationOriginal)*this.bgSlotWidth
                    let currentTime = this.$refs.currentTime//当前时间
                    let over = this.$refs.overTime//走过时间

                    if (length>=this.bgSlotWidth-10){
                        // debugger
                        currentTime.style.left=(this.bgSlotWidth-10)+'px'
                        // console.log(currentTime.style.left)
                        // over.style.width=length+'px'
                    }else {
                        currentTime.style.left=(length)+'px'
                    }
                    over.style.width=(length)+'px'
                    //指示圆点


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
                    this.currentTime = this.timeFormat((this.progressLen/this.bgSlotWidth)*this.durationOriginal);  //获取video当前播放时间
                    this.$refs.video.currentTime=(this.progressLen/this.bgSlotWidth)*this.durationOriginal

                }

            },
            //点击进度条
            clickProgress(event){
                const e = event || window.event
                let through = (e.offsetX/this.bgSlotWidth)*100
                this.$refs.overTime.style.width=e.offsetX+'px'
                this.$refs.currentTime.style.left=(e.offsetX-5)+'px'
                this.$refs.video.currentTime=(through/100)*this.durationOriginal
            },
            //进度条初始化
  /*          progressInit(){
                debugger
                this.bgSlotWidth = (document.body.clientWidth)
                if (this.$refs.bgSlot)
                    this.$refs.bgSlot.style.width=  this.bgSlotWidth + 'px'

            },*/
            //音量条初始化
            getVolume(){
                this.$refs.bgSlotVolume.style.height=100+'px';
                this.$refs.overTimeVolume.style.height=this.$refs.video.volume* 100 + 'px'
                // this.$refs.currentTimeVolume.style.top=this.$refs.overTimeVolume.style.top
            },
            //点击音量
            clickProgressVolume(event){
                const e = event || window.event
                this.$refs.overTimeVolume.style.height=e.offsetY+'px'
                this.$refs.currentTimeVolume.style.top=(e.offsetY)+'px'
                this.$refs.video.volume=e.offsetY/100
            },
            //静音
            clickMuted(){
                if (this.isMuted){
                    this.$refs.video.muted=false
                    this.isMuted=false
                }else {
                    this.$refs.video.muted=true
                    this.isMuted=true


                }
            },
            //当前音乐进度条
            currentProgressVolume(){
                // debugger

                    this.$refs.overTimeVolume.style.height=(this.volumeLen)+'px'


                this.$refs.video.volume=this.volumeLen/100
                if (this.volumeLen==0){
                    this.isMuted = true
                }else {
                    this.isMuted = false

                }
            },


        },
        mounted() {
            // let width = 0
   /*         window.onload=function () {
              debugger
                console.log(document.body.clientWidth)
                width=document.body.clientWidth*90
            }*/
            // this.progressInit()


        },
        computed:{
            ...mapGetters([
              'MvList'
            ]),
            //mv播放链接
            mvUrl(){
                if (this.MvList.mvUrl&&this.MvList){
                    let reg = /vid=/
                    let key = ''
                    if (this.vid.match(reg)){
                        key = this.vid.replace(reg,'')
                    }else {
                        key = this.vid
                    }
                    return this.MvList.mvUrl[key][this.Clarity]
                }
                return ''
            },
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
        },
        watch:{

        }
    }
</script>

<style lang="scss">
    .mv-player{
        border: 1px solid red;
        display: flex;
        justify-content: center;
        background: #333333;
        .mv-video-wrap{
            border: 1px solid red;
            width: 1200px;
            position: relative;;

            video{
                width: 1200px;
                height: 674px;
                object-fit:cover;
            }
            .video-control{
                width: 1200px;
                height: 68px;
                border: 1px solid blue;
                display: flex;
                align-items: center;
                position: absolute;
                bottom: 0px;
                padding: 20px 0 0 0;
                background: #141414;
                color: white;
                //播放按钮
                .play-btns{
                    //border: 1px solid green;
                    //width: 160px;
                    //height: 100px;
                    //min-width: 160px;
                    width: 50px;
                    height: 45px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    //margin: 0 50px 0 20px ;

                    //background: #000;
                    span{
                        display: flex;
                        align-items: center;
                        i{
                            display: flex;
                            cursor: pointer;
                            opacity: .8;
                            &:hover{
                                color: black;
                                opacity: 1;
                            }
                        }
                    }
                    //开始按钮
                    .startButton,.stopButton{
                        width: 25px;
                        height: 25px;
                        //background: #000;
                        //border: 1px solid red;
                        overflow: hidden;
                        i{
                            width: 22px;
                            height: 30px;
                            background: #000;
                            background: url("../../../assets/img/player@2x.png") no-repeat  4px 3px;
                            background-size:90px 810px;
                        }

                    }
                    //停止按钮
                    .stopButton{
                        i{
                            //border: 1px solid red;
                            background-position:  -17px 4px;
                            background-size:90px 810px;
                        }
                    }


                }
                //进度条
                .progress{
                    //border: 1px solid blue;
                    width: 1200px;
                    height: 2px;
                    //margin:0px 35px 0px 50px ;
                    position: absolute;
                    top: 15px;
                    right: 0;
                    &:hover{
                        cursor: pointer;
                    }
                    //进度条总长度
                    .bgSlot{
                        height: 2px;
                        width: 100%;
                        //background: #000;
                        background: rgba(255,255,255,.3);
                        &::before{
                            content: '';
                            display: flex;
                            border: 4px solid transparent;
                        }

                        &:hover{
                            cursor: pointer;
                        }
                    }
                    //已播放长度
                    .overTime{
                        //border: 1px solid black;
                        //width: 100px;
                        background: #31c27c;
                        height: 2px;
                        position: absolute;
                        top: 0;
                        &:hover{
                            cursor: pointer;
                        }
                    }
                    //当前进度指示原点
                    .currentTime{
                        width: 10px;
                        height: 10px;
                        background: white;
                        position: absolute;
                        top: -4px;
                        //left: -5px;
                        //margin-left: 40px ;
                        border-radius: 50%;
                        &:hover{
                            cursor: pointer;
                        }

                    }
                    //歌曲信息
                    .songInfo{
                        position: absolute;
                        width: 100%;
                        top: -30px;
                        display: flex;
                        justify-content: space-between;
                        color: rgba(225,225,225,.8);
                        //歌曲名字和作者
                        .songTitle{
                            //border: 1px solid red;
                            max-width: 80%;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                            span{
                                &:hover{
                                    color: #bdbdbe;
                                    cursor: pointer;
                                }
                            }
                        }
                        //时间信息
                        .songTime{
                            //border: 1px solid red;
                            display: flex;
                            //当前时间
                            .currentTimeText{

                            }
                            //总时间
                            .durationTimeText{

                            }
                        }
                    }

                }

                //更多操作
                .moreOpera{
                    border: 1px solid red;
                    height: 100%;
                    min-width: 280px;
                    display: flex;
                    justify-content: space-between;
                    margin: 0 0 0 35px;
                    position: absolute;
                    right: 0;
                    padding: 0 10px 0;
                    span{
                        display: flex;
                        align-items: center;
                        i{
                            display: flex;
                            //border: 1px solid red;
                            background: url("../../../assets/img/player@2x.png") no-repeat ;
                            background-size:132px 1000px;
                            opacity: .8;
                            &:hover{
                                cursor: pointer;
                                opacity: 1;
                            }
                        }
                    }
                    //列表循环
                    .listCycle{
                        width: 30px;
                        height: 100%;
                        //border: 1px solid red;
                        i{
                            width: 29px;
                            height: 23px;
                            //height: 27px;
                            //background-position:  0px -204px;
                        }
                        .song-list-order-0{
                            //border: 1px solid blue;
                            background-position:  0px -232px;
                        }
                        .song-list-order-1{
                            //border: 1px solid green;
                            background-position:  0px -205px;
                        }

                    }



                }
                //音量
                .volume{
                    //border: 1px solid red;
                    width: 100px;
                    height: 100%;
                    margin: 0 0 0 15px;
                    display: flex;
                    //background: #000;
                    align-items: center;
                    position: relative;

                    //音量图标
                    .volumeLog{
                        //border: 1px solid red;
                        width: 30px;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        i{
                            //border: 1px solid red;
                            width: 30px;
                            height: 25px;
                            background: url("../../../assets/img/player@2x.png") no-repeat 0px -142px;
                            background-size:132px 1000px;
                            opacity: .8;
                            &:hover{
                                opacity: 1;
                                cursor: pointer;
                            }
                        }
                    }
                    .mutedStyle{
                        i{
                            background-position-y: -180px;
                        }
                    }
                    //音量进度条
                    .progressVolume{
                        //border: 1px solid red;
                        width: 47px;
                        height: 114px;
                        position: absolute;
                        display: flex;
                        justify-content: center;
                        align-items: flex-end;
                        left: -15px;
                        top: -130px;
                        padding: 0 0 5px 0;
                        background: rgba(0,0,0,.7);
                        border-radius: 3px;
                        &:hover{
                            cursor: pointer;
                        }
                        //进度条总长度
                        .bgSlotVolume{
                            width: 3px;
                            height: 100px;
                            position: relative;
                            background: rgba(255,255,255,.3);
                            top: 0px;
                            bottom: 20px;
                            display: flex;
                            justify-content: center;
                        }
                        //已播放长度
                        .overTimeVolume{
                            width:   3px;
                            background: #31c27c;
                            height:  10px;
                            //position: absolute;
                            position: relative;
                            left: -3px;
                            top: 0;
                            //display: flex;
                        }
                        //当前进度指示原点
                        .currentTimeVolume{
                            //border: 1px solid red;
                            width: 10px;
                            height: 10px;
                            background: white;
                            position: absolute;
                            top: 10px;
                            left: 17px;
                            //top: -4px;
                            //left: -5px;
                            //margin-left: 40px ;
                            border-radius: 50%;
                            &:hover{
                                cursor: pointer;
                            }
                        }
                        &::after{
                            display: block;
                            content: '';
                            width: 0px;
                            //height: 50px;
                            //background: #000;
                            border: 10px solid;
                            border-color: rgba(0,0,0,.7) transparent transparent transparent;
                            bottom: -20px;
                            position: absolute;
                        }
                    }


                }
            }

        }

    }
</style>
