<template>
    <div class="category-list">
        <div class="category-wrap">
            <ul class="category-ul">
                <li v-for="(item,index) in contentList" :key="index">
                    <a href="javascript:;"><img :src="item.img" alt="" class="record-img"></a>
                    <nav>
                        <a href="javascript:;" class="img_cover_wrap" >
                            <img src="../../../../public/img/cover_play@2x.png" alt=""  class="record-img-button">
                        </a>
                    </nav>
                    <div class="category-title"><a href="javascript:;" >{{item.title}}</a></div>
                    <div class="category-name"><a href="javascript:;" >{{item.name}}</a></div>
                    <div class="category-singers"><a href="javascript:;" >{{item.singers}}</a></div>
                    <div class="category-listennum"><i>播放量：</i><i>{{numToTenThousand(item.listennum)}}</i></div>

                </li>
            </ul>
        </div>
    </div>
</template>




<script>
    export default {
        props:{
            contentList:{
                type:Array,
                require:true
            }
        },
        data(){
            return{

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
        created() {

        }
    }
</script>

