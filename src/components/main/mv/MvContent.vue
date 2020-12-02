<template>
    <div class="mv-content">
        <div class="content-wrap">
            <div class="content" v-for="item in contentList">
<!--                {{item}}-->
                <picture-show
                  :imgUrl="item.picurl"
                  :songId="`vid=`+item.vid"
                  :is-mv="true"
                />
                <div class="content-title"><a href="javascript:;" >{{item.title}}</a></div>
                <div class="content-name"><a href="javascript:;" >{{item.singers[0].name}}</a></div>
                <div class="content-more">
                    <span class="iconfont icon-sheyingji"></span>
                    <i>{{numToTenThousand(item.playcnt)}}</i>
                    <i>{{timeConversion(item.pubdate)}}</i>
                </div>

            </div>

        </div>
        <!--
    使用分页组件
    1.传入当前页码currentPage到子组件的page-index
    2.传入页数count
    3.传入每页条数
    3.绑定子组件的change事件,获取来自子组件的数据,并调用pageChange接收该数据
      子组件里用this.$emit('change', 数据内容)进行派发
 -->
        <paging
          :page-index="currentPage"
          :total="total"
          @change="pageChange"
        />
    </div>
</template>

<script>
    import PictureShow from "@/components/main/commont/PictureShow";
    import paging from "@/components/main/commont/paging";
    export default {
        props:{
            contentInfo:{
                type: Array,
                require: true
            }
        },
        data(){
            return{
                contentList: [],//内容列表
                currentPage : 1, //当前页码
                total : 50, //总页数
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
                this.$emit('currentPage',this.currentPage)
            },
        },
        watch:{
            contentInfo:function (val) {
                // debugger
                this.contentList = val
            }
        },
        components:{
            PictureShow,
            paging
        },
        computed:{
            //时间戳转换
            timeConversion(){
                return function (UnixTime) {
                    // debugger
                    let unixTimestamp = new Date( UnixTime * 1000)
                    let Y = unixTimestamp.getFullYear()
                    let M = ((unixTimestamp.getMonth() + 1) >= 10 ? (unixTimestamp.getMonth() + 1) : '0' + (unixTimestamp.getMonth() + 1))
                    let D = (unixTimestamp.getDate() > 10 ? unixTimestamp.getDate() : '0' + unixTimestamp.getDate())
                    let H = (unixTimestamp.getHours() > 10 ? unixTimestamp.getHours() : '0' + unixTimestamp.getHours())
                    let m = (unixTimestamp.getMinutes() > 10 ? unixTimestamp.getMinutes() : '0' + unixTimestamp.getMinutes())
                    return Y + '-' + M+'-'+D
                }
            }
        }

    }
</script>
