<template>
    <div class="player-list">
<!--        {{songList}}-->
        <!--用户操作按钮-->
        <ul class="userOpera">
<!--            <a href="javascript:;" v-for="(item,index) in userOperating" :key="index" ref="userOperating">
                <span class="icon-wrap">
                    <span :class="iconList[0]"></span>
                    <i>{{item}}</i>
                </span>
            </a>-->
            <ul class="icon-wrap">
                <li class="">
                    <span :class="iconList[0]"></span>
                    <i>{{userOperating[0]}}</i>
                </li>
                <li class="">
                    <span :class="iconList[1]"></span>
                    <i>{{userOperating[1]}}</i>
                </li>
                <li class="">
                    <span :class="iconList[2]"></span>
                    <i>{{userOperating[2]}}</i>
                </li>
                <li @click="checkBox.length>0 ? deletePanelFlag=1 : setNullDeletePanel()">
                    <span :class="iconList[3]"></span>
                    <i>{{userOperating[3]}}</i>
                </li>
                <li @click="deletePanelFlag=2">
                    <span :class="iconList[4]"></span>
                    <i>{{userOperating[4]}}</i>
                </li>
            </ul>

            <!--删除面板-->
            <div class="delete-panel" v-show="deletePanelFlag">
                <nav class="delete-panel-title-wrap">
                    <nav class="delete-panel-title">QQ音乐</nav>
                    <span class="iconfont icon-cuowu" @click="deletePanelFlag=false"></span>
                </nav>

                <div class="content-wrap">
                    <span class="iconfont icon-qietucopy"></span>
                    <span class="delete-panel-content">
                        <i v-if="deletePanelFlag===1">确定要删除歌曲？</i>
                        <i v-else-if="deletePanelFlag===2">确定要清空列表?</i>
                    </span>
                </div>
                <div class="confirm-select">

                    <span class="delete-panel-confirm" @click="deleteConfirm(deletePanelFlag)">确定</span>

                    <span class="delete-panel-cancel" @click="deletePanelFlag=false">取消</span>
                </div>

            </div>
            <!--空选中删除-->
            <div class="null-delete-panel" v-show="ShowCheckedNull">
                <span class="iconfont icon-jinggao"></span>
                <span class="null-err-info">请选择操作的单曲</span>
            </div>
        </ul>
        <div class="rank-wrap">
            <ul class="content-nav-ul">
                <input type="checkbox" class="checkAll" v-model="checked" @click="selectAll">
                <li v-for="(item,index) in contentNav" :key="index"
                    :class="`nav-li-${index}`"
                >
                    {{item}}
                </li>
            </ul>
            <div class="song-info" v-if="songData">
                <ul class="song-info-ul" v-for="(item,index) in songList" :key="index"
                    :class="{'alive-song':songData.mid==item.mid&&pausedSign}"
                    @mouseenter="OperateChange(index)"
                    @mouseleave="OperateChange"
                >
                    <!--勾选框-->
                    <input type="checkbox" class="checkInput"
                           v-model="item.checked"
                           :value="item.mid"
                           @click="checkOne(item)"
                    >
                    <!--动态图标-->
                    <ul class="bg-bubbles">
                        <li v-for="(i, j) in 3" :key="j"></li>
                    </ul>
                    <!--歌曲标题-->
                    <div class="index-title">
                        <li class="song-index" >{{index+1}}</li>
                        <li class="song-title">{{item.title||item.songname}}</li>
                    </div>
                    <!--歌手名字-->
                    <li class="song-singer">
                        {{item.singer[0].name}}
                    </li>
                    <!--歌曲时间-->
                    <li class="song-interval"
                        :class="{'operating-hidden':songOperatingShow==index}">
                        {{item.interval}}
                    </li>
                    <!--用户操作选项-->
                    <ul class="song-operating"
                        v-show="songOperatingShow==index"
                    >
                      <!--  &lt;!&ndash;播放&ndash;&gt;
                        <li @click="clickPlaying(item.mid)">
                            <i class="iconfont ">
                            </i>
                        </li>-->
                        <!--开始按钮-->
                        <span class="startButton"
                              @click="clickStart(item.mid)"
                              v-show="!isPlay||item.mid!=cur"
                        ><i></i></span>
                        <!--停止按钮-->
                        <span class="stopButton"
                              @click="clickStop()"
                              v-show="isPlay&&item.mid===cur"
                        ><i></i></span>
                        <li>
                            <i class="iconfont icon-jia"></i>
                        </li>

                        <!--删除-->
                        <li @click="deleteSong(item.mid)">
                            <i class="iconfont icon-lajixiangzizhi"></i>
                        </li>
                        <li>
                            <i class="iconfont icon-fenxiang"></i>
                        </li>



                    </ul>
                </ul>

            </div>
        </div>
    </div>
</template>

<script>

import {mapMutations, mapGetters} from "vuex"
    export default {
        props:{

            //暂停信号
            pausedSign:{
                type: Boolean,
                require:true
            }
        },
        data(){
            return{
                userOperating:['收藏','添加到','下载','删除','清空列表'],//用户操作
                iconList:[
                    'iconfont icon-shoucang',
                    'iconfont icon-jiatianjiakuangxuanduoxuan-8',
                    'iconfont icon-xiazai',
                    'iconfont icon-lajixiangzizhi',
                    'iconfont icon-qingkong'
                ],//操作对应的图标
                contentNav:['歌曲','歌手','时长'],
                songList:[],
                operatingList:[
                    'bofang2',
                    'jia',
                    'fenxiang',
                    'lajixiangzizhi',
                ],//用户歌曲操作图标
                songOperatingShow:'',//显示操作标识
                clickFlag:false,//点击标记
                deletePanelFlag:false,//清空列表标记
                checkBox:[],//选中列表
                checked:"",//全选框
                ShowCheckedNull:false,
            }
        },

        computed:{
            //vuex数据
            songData(){
                // debugger
                const {cur,playList}=this.$store.state
                this.songList=playList
                // console.log(this.songList)
                // console.log(list)
                return playList.find(item=>{
                    return item.mid===cur
                }) || null
            },
            ...mapGetters([
              "isPlay",//获取播放状态
              "audio",//获取audio标签
              "cur",//当前mid
              // "currentLyric",//歌词元素,读取

            ]),




        },
        methods:{
            ...mapMutations([
              'isPlayMutation',//提交播放状态
              'queryDataMDelete',//删除点击歌曲
              'deleteAllSongList',//删除所有歌曲
              'deleteSelectSong',//删除选中歌曲
            ]),
            //悬浮显示切换
            OperateChange(index){
                if (index){
                    this.songOperatingShow=index
                }else{
                    this.songOperatingShow=''
                }
            },

            //开始播放
            clickStart(clickMid){
                // debugger
                this.isPlayMutation(!this.isPlay)
                if (clickMid==this.cur){//当前歌曲恢复播放
                    if (this.audio){
                        this.audio.play()
                    }
                    // this.lyricTogglePlay()
                }else {//点击的其它歌曲
                    if (this.audio){
                        this.audio.pause()
                    }
                    // if (this.currentLyric) {
                    //     this.currentLyric.stop()
                    // }
                    this.$store.dispatch('queryDataSong',clickMid)
                        // this.lyricPlay()
                }
            },
            //停止播放
            clickStop(){
                // debugger
                this.isPlayMutation(!this.isPlay)
               if (!this.audio){
                   // debugger
                   this.$bus.$emit('resetAudioInfo',true)
               }else {
                   this.audio.pause()

               }

               // this.lyricTogglePlay()


           },

            //删除歌曲
            deleteSong(clickMid){
                this.queryDataMDelete(clickMid)
                // this.$store.dispatch('queryDataADelete',clickMid)

            },
            //删除列表
            deleteList(){
                this.deleteAllSongList()
                this.deletePanelFlag=false
            },
            //总勾选框
            selectAll(){
                this.checked = !this.checked;
                // debugger
                if(this.checked){
                    this.songList.forEach( (item)=> {
                        this.checkBox.push(item.mid)
                        item.checked=this.checked;
                    })
                }else{
                    this.checkBox=[];
                    this.songList.forEach( (item)=> {
                        item.checked=this.checked;
                    })
                }
            },
            //单勾选
            checkOne(item){
                // debugger
                item.checked = !item.checked
                //如果点击后为选中,入栈
                if (item.checked){
                    this.checkBox.push(item.mid)
                }else{//不选中
                    let index = this.checkBox.findIndex(order=>order===item.mid)
                    this.checkBox.splice(index,1)
                }

                this.$nextTick(()=>{
                    //如果选中表长度和列表长度相同
                    if (this.checkBox.length==this.songList.length){
                        this.checked = true
                    }else {
                        this.checked = false
                    }
                })

            },
            //删除函数判断
            deleteConfirm(index){
                //删除选中
                if (index===1){
                    this.deleteSelectSong(this.checkBox)
                }else if (index===2){
                    //清空列表
                    this.deleteList()
                }
                //隐藏面板
                this.deletePanelFlag=false
            },
            //空选中删除
            setNullDeletePanel(){
                debugger
                this.ShowCheckedNull=true
                //1.5秒后关闭
                setTimeout(item=>{
                    this.ShowCheckedNull=false
                },1500)
            }

        },

        created() {
          /*  //$route存储当前路由所有信息
            // 路由设置里面 path: '/player/:songId',所以params里面有songId
            //第一次加载时拿到当前路由匹配的id,派发请求
          // this.$store.dispatch('queryDataA',this.$route.params.songId)*/
          //   debugger
          //   this.$store.dispatch('queryDataA',this.$route.params.songId)
            // this.songData()
        },
        mounted() {
            // if (!this.<span class="icon-wrap">audio){
            //     debugger
            //     this.$bus.$emit('resetAudioInfo',true)
            // }
            //初始化列表,将所有的mid存入checkbox,并且设置对应的checked为false
            // this.$nextTick(()=>{
            //     this.songList.forEach( (item)=> {
            //         this.checkBox.push(item.mid)
            //         item.checked=false;
            //     })
            // })

        },
        updated() {

        },

        watch:{

        },

    }
</script>



