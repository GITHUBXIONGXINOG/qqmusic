<template>
    <div class="search-lyrics">
        <div class="content-wrap">
            <div class="content-inner" v-for="(item,index) in contentList" :key="index">
                <!--用户操作选项-->
                <ul class="song-operating"

                >
                    <li v-for="n in operatingList">
                        <i :class="['iconfont',`icon-${n}`]">
                        </i>
                    </li>
                </ul>
                <!--歌曲名字-->
                <div class="lyrics-name">
                    {{item.songname}}
                    <a href="javascript:;" v-for="(v,i) in item.singer">
                        {{v.name}}
                        <i v-show="i<item.singer.length-1">/</i>
                    </a>
                </div>
                <!--专辑名字-->
                <div class="albumName">
                    {{item.albumname}}
                </div>
                <!--歌词内容-->
                <lyrics-panel
                  :setLyricsContent="item.content"
                  :index="index"
                    />
            </div>
        </div>
    </div>
</template>

<script>
    import LyricsPanel from './LyricsPanel'
    export default {
        props:{
            setContentList:{
                type: Array,
                require: true
            }
        },
        data(){
            return{
                contentList:[],//内容
                operatingList:[
                    'bofang2',
                    'jia',
                    'xiazai',
                    'fenxiang'
                ],//用户歌曲操作图标
            }
        },
        methods:{


        },
        computed:{
            //设置页面大小,只先是前5的歌词
          setLyricsSize(){
              return function (val) {
                if (val){
                    const tempLyrics = val.slice(0,5)
                    //进行正则匹配,将\\n替换成br标签
                    for (let i = 0; i < 5; i++) {
                        tempLyrics[i].content=tempLyrics[i].content.replace(/\\n/g,'<br />')
                    }
                    return tempLyrics
                }
              }
          },


        },
        watch:{
            //设置内容
            setContentList(val){
                this.contentList = this.setLyricsSize(val)
            },


        },
        components:{
            LyricsPanel
        }

    }
</script>

<style lang="scss">
.search-lyrics{
    //border: 1px solid red;
    display: flex;
    .content-wrap{
        //border: 1px solid blue;
        margin: 50px 0;
        width: 100%;

        .content-inner{
            //border: 1px solid black;
            position: relative;
            //用户操作
            .song-operating{
                //border: 1px solid red;
                display: flex;
                position: absolute;
                right: 10px;
                top: 15px;
                //background: transparent;
                //z-index: 1;


                & :hover{
                    color: #3fc785;
                    border-color: #3fc785;
                    cursor: pointer;

                }
                li{
                    width: 36px;
                    height: 36px;
                    border-radius: 36px;
                    border: 1px solid #cecece;
                    color: #a2a2a2;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 5px;

                }

            }
            //歌曲名字
            .lyrics-name{
                margin: 10px 0;
            }
            //专辑名字
            .albumName{
                margin: 10px 0;

            }

        }
    }
}
</style>
