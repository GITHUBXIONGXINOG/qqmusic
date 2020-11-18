<template>
  <div class="radio-station-content">
        <div class="content-wrap" v-for="(item,index) in contentList" :key="index"
            :id="idList[index]"
        >
            <i class="content-wrap-title">{{ item.title }}</i>
            <div class="content-info" v-for="(i,j) in item.list" :key="j" v-show="i.listenNum">
                    <a href="javascript:;" class="content-img">
                        <picture-show
                          :img-url="i.pic_url"
                        />
                    </a>
                    <a href="javscript:;" class="content-title">{{i.title}}</a>
                    <span class="content-listenNum">播放量: <i>{{numToTenThousand(i.listenNum)}}</i></span>
            </div>

        </div>
  </div>
</template>

<script>
    import PictureShow from "@/components/main/commont/PictureShow";
    export default {
        props:{
            //接收内容
            storeContent:{
                type: Array,
                require: true
            }
        },
        components:{
            PictureShow
        },
        data(){
            return{
                contentList:[],//内容
                idList:[
                  'hot',
                  'theme',
                  'mood',
                  'scenes',
                  'genre',
                  'language',
                  'crowd',
                  'instrument'
                ],//id列表

            }
        },
        methods:{
            //转换位数
            numToTenThousand(num){
                if (num < 10000){
                    return num
                }
                let res = num / 10000
                //  toFixed 四舍五入 保留指定小数位数
                return res.toFixed(1)+'万'
            },

        },
        watch:{
            storeContent(val){
                this.contentList = val
            }
        },

    }

</script>
