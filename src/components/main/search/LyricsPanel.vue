<template>
    <div class="lyrics-panel">
         <!--歌词-->
        <div class="lyrics-info" v-html="setLyricsContent"
             :class="{'moreFold':isMoreShow}"
        ></div>

        <!--展开/复制歌词-->
        <div class="moreInfo">
            <div class="unFold" @click="clickShowChange">
                <span class="iconfont icon-plus"></span>
                <i>{{isMoreShow ? '收起' : '更多'}}</i>
            </div>
            <div class="copying" @click="clickCopy">
                <span class="iconfont icon-fuzhi"></span>
                <i>复制歌词</i>
            </div>
            <input type="text" v-model="msg" :id="`lyricsContent-${index}`"
                   style="opacity: 0" readonly
            >
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            setLyricsContent:{
                type: String,
                require: true
            },
            index:{
                type: Number,
                require: true
            }
        },
        data(){
                return{
                    isMoreShow:false,//是否显示更多
                    msg:'',
                }
        },
        methods:{
            //展示内容多少切换
            clickShowChange(){
                this.isMoreShow= !this.isMoreShow
            },
            lyricsFormat(){
                this.msg=''
                this.msg = this.setLyricsContent
            },
            //复制歌词
            clickCopy(){
                // debugger
                let e = document.getElementById(`lyricsContent-${this.index}`)
                e.select()
                document.execCommand("Copy")
                // alert("复制成功");
            },

        },
        created() {
            this.lyricsFormat()
        },
        watch:{

        }
    }
</script>

<style lang="scss">
.lyrics-panel{
    //歌词内容
    .lyrics-info{
        //border: 1px solid gray;
        display: flex;
        line-height: 30px;
        color: #999999;
        height: 200px;
        overflow: hidden;
    }
    //更多展示
    .moreFold{
        height: 100%;
    }
    //更多操作
    .moreInfo{
        //border: 1px solid blue;
        display: flex;
        padding: 15px 0;
        .unFold,.copying{
            border: 1px solid #c9c9c9;
            border-radius: 3px;
            height: 36px;
            //width: 95px;
            padding: 0 23px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 10px 0 0;
            span{
                color: #999999;
            }
            &:hover{
                background: rgba(0,0,0,.1);
                cursor:pointer;

            }
        }

    }
}

</style>
