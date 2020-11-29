<template>
    <div class="picture-show"  :style="{'--width':imgWidth,'--height':imgHeight}">

        <div class="img-wrap ">
            <img  class="img-info  checked-style"
                  :src="imgUrl"
            >
            <nav>
                <router-link :to="`/player/`+songId"   class="img_cover_wrap">
                    <img src="../../../../public/img/cover_play@2x.png" alt="" class="img_cover_button">
                </router-link>
            </nav>
        </div>
<!--        {{songId}}-->
    </div>
</template>

<script>
    export default {
        props:{
            //图片地址
            imgUrl:{
                type: String,
                require: true
            },
            //对应的歌曲id
            songId:{
                type: [String,Number],
                require: true
            }
        },
        data(){
            return{
                //图片宽高
                imgWidth:0,
                imgHeight:0,
            }
        },
        methods:{
          getImgInfo(){
              // debugger
              //创建对象
              let img = new Image()
              //改变图片src
              img.src = this.imgUrl
              //设置图片的长宽
              this.imgWidth=img.width+'px'
              this.imgHeight=img.height+'px'
          },
        },
        computed:{

        },
        watch:{
         /*   imgUrl(val){
                this.url = val
            }*/

        },
        created() {
            this.getImgInfo()


        },
        mounted() {

        }
    }
</script>

<style lang="scss">
    .picture-show{
        //border: 1px solid red;
        position: relative;
        width: var(--width);
        height: var(--height);
        overflow: hidden;
        //整个鼠标移入封面样式
        .img-wrap{
            transition: transform 1s;
            //图片本体 大小
            .img-info{
                /* width: 224px;
                 height: 224px;*/
                width: 100%;
                height: 100%;
                transition: transform 1s;
            }
            //点击样式
            .checked-style{
                //为不是a标签的元素设置手指形状
                cursor:pointer;
            }

            //鼠标移入图片播放样式
            .img_cover_wrap{
                position: absolute;
                top: 0;
                left: 0;
                //径向渐变
                background-image: radial-gradient( rgba(0,0,0,0.1),  rgba(0,0,0,0.11));
                /* 浏览器不支持的时候显示 */
                background-color: rgba(0,0,0,0.1);
                font-size: 60px;
                width: 100%;
                height: 100%;
                opacity: 0;
                transition: transform 0.4s,opacity 1s;
                //播放按钮
                .img_cover_button{
                    //border: 1px solid green;
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    color: black;
                    width: 80px;
                    height: 80px;
                    transform: scale(0.6,0.6);
                    transition: transform 0.8s,opacity 0.8s;
                }
            }
            //外层包裹opacity改变,里面按钮缩放和透明度都改变
            &:hover .img_cover_wrap{
                opacity: 1;
            }
            &:hover .img_cover_button{
                opacity: 1;
                transform: scale(0.9,0.9);
            }

        }
        //鼠标移入图片缩放
        &:hover img{
            transform: scale(1.1);
        }

    }
</style>
