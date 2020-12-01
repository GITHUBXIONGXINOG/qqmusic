<template>
    <div class="mv-player">
        <div class="mv-video-wrap" v-if="MvList">
            <video :src="mvUrl"  ref="video"></video>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

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
            }
        },
        created() {
            // debugger
            let idInfo=this.vid.replace(/vid=/,'')
            this.$store.dispatch('queryDataMvPlayer',idInfo)

        },
        mounted() {
            // let width = 0
   /*         window.onload=function () {
              debugger
                console.log(document.body.clientWidth)
                width=document.body.clientWidth*90
            }*/


        },
        computed:{
            ...mapGetters([
              'MvList'
            ]),
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

            video{
                width: 1200px;
            }
        }

    }
</style>
