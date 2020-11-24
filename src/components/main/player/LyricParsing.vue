<template>
    <div class="lyric-parsing">
          <div class="lyric-wrap" ref="lyricWrap">
              <p v-for="(item,key,index) in songLyric" :key="index"
                :class="{'currentLyric':currentTime>key&&currentTime<allKeys[index+1]}"
              >{{item}}</p>
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
            }
        },
        methods:{
            async fetchLyric(){

                //歌词
                let songLyricUrl = '/api/lyric?songmid='+this.songId
                const resOfSongLyric = await this.$http.get(songLyricUrl)
                let lyrics = resOfSongLyric.data.data.lyric.split("\n")
                // console.log(this.songLyric)
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
                    //计算时间
                    let time = min*60+second
                    //时间对应文本
                    lyrArr[time] = content
                }
                this.songLyric = lyrArr
                this.getALlKeys(lyrArr)
            },
            //得到所有的Keys
            getALlKeys(lyrArr){
                //将所有的key入栈
                for (let key in lyrArr){
                    this.allKeys.push(key)
                }
            },
            //歌词移动
            lyricMove(){
                this.$refs.lyricWrap.style.transform="translateY("+100+")"
            }
        },
        created() {
            this.fetchLyric()

        },
        watch:{
            currentTime(){
                this.lyricMove()
            }
        },
        mounted() {

        }

    }
</script>
<style lang="scss">
.lyric-parsing{
    position: relative;
    border: 1px solid red;
    //overflow: hidden;
    height: 110px;
    .lyric-wrap{
        border: 1px solid red;
        height: 110px;
        //overflow: hidden;
        position: absolute;
        transform: translateY(50px);
     }
    .currentLyric{
        color: #31c27c;
        //position: absolute;

    }
}

</style>
