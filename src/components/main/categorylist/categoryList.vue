<template>
    <div class="category-list">
        <div class="category-wrap">
            <ul class="category-ul">
                <li v-for="(item,index) in contentList" :key="index">
<!--                    {{item}}-->
                    <a href="javascript:;"><img :src="item.img" alt="" class="record-img"></a>
                    <nav>
                        <router-link :to="`/player/`+item.content_id" class="img_cover_wrap" >
                            <img src="../../../../public/img/cover_play@2x.png" alt=""  class="record-img-button">
                        </router-link>
                    </nav>
                    <div class="category-title"><a href="javascript:;" >{{item.title}}</a></div>
                    <div class="category-name"><a href="javascript:;" >{{item.name}}</a></div>
                    <div class="category-singers"><a href="javascript:;" >{{item.singers}}</a></div>
                    <div class="category-listennum"><i>播放量：</i><i>{{numToTenThousand(item.listennum)}}</i></div>

                </li>
            </ul>
        </div>
        <paging
            :pageIndex="currentPage"
            :total="total"
            @change="pageChange"
        />
    </div>
</template>




<script>
    import paging from "@/components/main/commont/paging";
    export default {
        props:{
            contentList:{
                type:Array,
                require:true
            },

        },
        components:{
            paging
        },
        data(){
            return{
                currentPage:1,//当前页
                total:50,//总页数
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
            //从page组件传递过来的当前page
            pageChange (page) {
                /*修改当前的页面为接受的page*/
                this.currentPage = page
                //派发
                this.$emit('changePage',this.currentPage)
            },

        },
        created() {

        }
    }
</script>

