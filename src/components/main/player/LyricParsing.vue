<!--
<template>
    <div class="lyric-parsing">
          <div class="lyric-wrap" ref="lyricWrap" id="lyricWrap" v-if="songData.lyric">
              <span v-for="(item,key,index) in songData.lyric" :key="index"
              :class="classObject(item,key,index)"
               >{{item}}</span>
          </div>

    </div>
</template>

<script>
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
            }
        },
        data(){
            return{
                songLyric:{},//歌词时间对象
                allKeys:[],//所有key
                lyricIndex:0,//当前显示歌词的索引
            }
        },
        methods:{

            //得到所有的Keys
            getALlKeys(lyrArr){
                //将所有的key入栈
                for (let key in lyrArr){
                    this.allKeys.push(key)
                }
                this.songLyric=lyrArr
            },
            //歌词移动
            lyricMove(){
                // debugger
                this.$refs.lyricWrap.style.transform="translateY("+(25-this.lyricIndex*35)+"px)"
            }
        },
        created() {
            // this.fetchLyric()
            // songData.lyric
            this.getALlKeys(this.songData.lyric)
        },
        watch:{
            currentTime(){
                this.lyricMove()
            }
        },
        mounted() {

        },
        computed:{
            classObject() {
                return function (item,key,index) {

                    if (this.currentTime>=key&&this.currentTime<this.allKeys[index+1]){
                        //当前的歌词位置,即行数
                        this.lyricIndex=index
                        return 'currentLyric'
                    }
                }
            },
            songData(){
                const {cur,list}=this.$store.state
                return list.find(item=>{
                    return item.mid===cur
                }) || null
            }
        }

    }
</script>
<style lang="scss">
.lyric-parsing{
    position: relative;
    //border: 1px solid red;
    overflow: hidden;
    height: 110px;
    width: 340px;
    filter: glow(white,10);
    //box-shadow: inset 2px 1px 5px 1px rgba(0, 0, 0, .1);

    //box-shadow:inset 0 0 10px .1px #c9c9c9;
    &::before{
        content: '';
        position: absolute;
        width: 250px;
        height: 20px;
        top: 40px;
        //border: 1px solid red;
    }
    .lyric-wrap{
        //border: 1px solid blue;
        width: 100%;
        height: 100px;
        position: absolute;
        padding: 1px 0 0 0 ;

        transform: translateY(25px);



        span{
            //border: 1px solid black;
            //margin: 6px 0;
            height: 20px;
            width:100%;
            display:block;
            text-overflow:ellipsis;
            white-space:nowrap;
            overflow:hidden;
            text-align: center;
            margin: 15px 0;

        }
     }
    .currentLyric{
        color: #31c27c;
        //position: absolute;



    }
}



</style>
-->
<template>
    <div class="lyric-parsing">
        <div class="lyric-wrap" ref="lyricWrap" id="lyricWrap" v-if="songData">
<!--            {{songLyric}}-->
            <div v-if="nLyric">暂无歌词, 请欣赏歌曲</div>
            <div v-else ref="lyricInner">
                <span v-for="(item,key,index) in songLyric" :key="index"
                      :class="classObject(item,key,index)" class="lyric-text"
                >
                    {{item}}
                </span>
            </div>



        </div>

    </div>
</template>

<script>

export default {
    props:{
     /*   songId:{
            type: String,
            required: true
        },*/
    /*    currentTime:{
            type: Number,
            required: true
        },*/
        durationTime:{
            type: Number,
            required: true
        }
    },
    data(){
        return{
            songLyric:{},//歌词时间对象
            allKeys:[],//所有key
            lyricIndex:0,//当前显示歌词的索引
            currentTime:0,//当前时间
            nLyric:false,//没有歌词
        }
    },
    methods:{
       /* async fetchLyric(){
            debugger
            console.log(this.songId)
            //歌词
            // let songLyricUrl = '/api/lyric?songmid='+this.songId
            if (this.songId){
                let resOfSongLyric = await this.api.songLyric(this.songId)
                console.log(resOfSongLyric)
                let lyrics = resOfSongLyric.data.data.lyric.split("\n")
                // console.log(resOfSongLyric)
                // debugger
                //歌词对象
                let lyrArr = {}
                //!* 贪婪匹配,有多少匹配多少
                let reg = /\[\d*:\d*\.\d*]/g
                for (let i = 0; i < lyrics.length; i++) {
                    let timerRegExpArr = lyrics[i].match(reg)
                    if (!timerRegExpArr) continue
                    let t = timerRegExpArr[0] //数值格式,取出数据
                    //取出分钟
                    let min = Number(t.match(/\[\d*!/).toString().slice(1))
                    //取出秒
                    let second = Number(t.match(/:\d*!/).toString().slice(1))
                    //歌词文本
                    let content = lyrics[i].replace(timerRegExpArr,"")
                    //处理版权问题,比如官方翻译无法获取到
                    if (content){
                        //计算时间
                        let time = min*60+second
                        //时间对应文本
                        lyrArr[time] = content
                    }

                }
                this.songLyric = lyrArr
                this.getALlKeys(lyrArr)
                // console.log(lyrArr)
            }

        },*/
        async fetchLyric(){
            // debugger
            //歌词
            let songLyricUrl = '/api/lyric?songmid='+this.songId
            const resOfSongLyric = await this.$http.get(songLyricUrl)
            let lyrics = resOfSongLyric.data.data.lyric.split("\n")
            // console.log(resOfSongLyric)
            // debugger
            //歌词对象
            let lyrArr = {}
            //* 贪婪匹配,有多少匹配多少
            let reg = /\[\d*:\d*\.\d*]/g
            for (let i = 0; i < lyrics.length; i++) {
                let timerRegExpArr = lyrics[i].match(reg)
                if (!timerRegExpArr) continue
                let t = timerRegExpArr[0] //数值格式,取出数据
                //取出分钟
                let min = Number(t.match(/\[\d*/).toString().slice(1))
                //取出秒
                let second = Number(t.match(/:\d*/).toString().slice(1))
                //歌词文本
                let content = lyrics[i].replace(timerRegExpArr,"")
                //处理版权问题,比如官方翻译无法获取到
                if (content){
                    //计算时间
                    let time = min*60+second
                    //时间对应文本
                    lyrArr[time] = content
                }

            }
            this.songLyric = lyrArr
            this.getALlKeys(lyrArr)
            // console.log(lyrArr)
        },
        //得到所有的Keys
        getALlKeys(lyrArr){
            //将所有的key入栈
            for (let key in lyrArr){
                this.allKeys.push(key)
            }
        },
        // //歌词移动
        // lyricMove(){
        //     // debugger
        //     this.$refs.lyricWrap.style.transform="translateY("+(26-this.lyricIndex*35)+"px)"
        // },


    },
    created() {
        // this.fetchLyric()



    },
    watch:{

        currentTime(){
            // debugger
            // this.delayer()
            // this.lyricMove()

        },
      /*  songId(){
            this.fetchLyric()
        }*/
    },
    mounted() {
        this.$bus.$on('currentTime',currentTime=>{

            this.currentTime=currentTime

            // debugger
        })
    },
    computed:{
        //类对象 设置歌词
        classObject() {

            return function (item,key,index) {

                if (this.currentTime>=key&&this.currentTime<this.allKeys[index+1]){
                    // debugger
                    // console.log('currentTime:'+this.currentTime)
                    // console.log('key:'+key+'歌词:'+this.songLyric[key])
                    // console.log('index:'+index)
                    // console.log('next:'+this.allKeys[index+1])
                    // console.log('歌词:'+this.songLyric[index])
                    //当前的歌词位置,即行数
                    // this.lyricIndex=0
                    this.lyricIndex=index
                    // console.log(this.lyricIndex)

                        // console.log(this.currentTime)
                        this.$nextTick(()=>{
                            this.$refs.lyricInner.setAttribute('class', ' lyric-move-class-'+index)
                        })


                   // return true
                    return 'currentLyric'
                }
            }
        },
        //获取数据
        songData(){
            const {cur,playList}=this.$store.state
            // debugger
            // console.log(playList)
            return playList.find(item=>{
                if (item.mid===cur){
                    this.songId=item.mid
                    if (item.lyric){
                        this.songLyric = item.lyric
                        if (!this.songLyric){
                            this.nLyric=true
                        }
                    }else{
                        this.fetchLyric()
                    }
                    this.getALlKeys(item.lyric)
                    this.lyricIndex=0
                    this.currentTime=0
                }

                return item.mid===cur
            }) || null
        },

    },
    destroyed() {
        this.$bus.$off('currentTime')
    }

}
</script>
<style lang="scss">
.lyric-parsing{
    position: relative;
    //border: 1px solid red;
    overflow: hidden;
    height: 110px;
    width: 340px;
    filter: glow(white,10);
    //box-shadow: inset 2px 1px 5px 1px rgba(0, 0, 0, .1);

    //box-shadow:inset 0 0 10px .1px #c9c9c9;
    &::before{
        content: '';
        position: absolute;
        width: 250px;
        height: 20px;
        top: 40px;
        //border: 1px solid red;



    }
    .lyric-wrap{
        //border: 1px solid blue;
        width: 100%;
        height: 100px;
        position: absolute;
        padding: 1px 0 0 0 ;

        transform: translateY(30px);



        .lyric-text{
            //border: 1px solid black;
            //margin: 6px 0;
            height: 20px;
            width:100%;
            display:block;
            text-overflow:ellipsis;
            white-space:nowrap;
            overflow:hidden;
            text-align: center;
            margin: 15px 0;

        }
    }
    .currentLyric{
        color: #31c27c;
        //position: absolute;

    }
    @for $i from 0 to 100{
        .lyric-move-class-#{$i}{
            transform: translateY(-$i*35px);
        }
    }
}



</style>
