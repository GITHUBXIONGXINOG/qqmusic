<template>
    <div class="rank-comment" id="rank-comment">
        <div class="user-comment">
            <div class="user-comment-title">
                 <span class="comment-head">评论</span>
                 <span class="comment-total">共{{commentTotal}}条评论</span>
            </div>
            <Comment />
        </div>
        <div class="comment-new-wrap">
            <div class="comment-new-title">
                最新评论({{commentTotal}})
            </div>
            <ul class="comment-info-ul">
                <li class="comment-info-li" v-for="(item,index) in comments" :key="index"
                    @mouseenter="reportShow(index)"
                    @mouseleave="reportShow()"
                >
                    <img :src="item.avatarurl" alt="" class="comment-user-img">
                    <div class="comment-user-about">
                        <!--名字-->
                        <span class="nick"><a href="javascript:;" >{{item.nick}}</a></span>
                        <!--评论-->
                        <div class="comment-content">
                           <span v-if="item.middlecommentcontent==null">
                                {{item.rootcommentcontent}}
                           </span>
                            <span v-else class="comment-reply">
                                <i>回复
                                    <a href="javascript:;">{{item.middlecommentcontent[0].replyednick}}</a>:&nbsp;
                                </i>
                                <i>{{item.middlecommentcontent[0].subcommentcontent}}</i>
                                <br>
                                <i class="comment-source">{{item.rootcommentcontent}}</i>
                            </span>
                        </div>
                        <!--更多-->
                        <div class="comment-more">
                            <span>{{timeConversion(item.time)}}</span>
                            <div class="operating">
                                <a class="comment-report" v-show="index+1==isReportShow">举报</a>
                                <div class="comment-like">
                                    <a href="javascript:;"  class="iconfont icon-zan"></a>
                                       <i>{{item.praisenum}}</i>
                                </div>

                                <a href="javascript:;">
                                    <span class="iconfont icon-pinglun1" @click="ReplyButton(index)">
                                    </span>
                                </a>

                            </div>

                        </div>
                        <Comment v-if="isReply==index" :name="item.nick" @commentCancel="commentCancel"/>

                    </div>

                </li>
            </ul>

        </div>
        <!--分页-->
        <paging
            :pageIndex="pageIndex"
            :totalAll="commentTotal"
            :pageSize="pageSize"
            @change="changeIndex"
        />
    </div>
</template>

<script>
    import paging from "@/components/main/commont/paging";
    import Comment from "@/components/main/commont/comment/Comment";
    export default {
        props:{
            commentList:{
                type:Object,
                require:true
            },
        },
        data(){
            return{
                commentTotal:0,//评论总数
                comments:[],//评论列表
                remWord:300,//剩余文字
                isReportShow:'',//显示举报
                pageIndex:1,//当前页数
                pageSize:25,//每页显示条数
                isReply:-1,//回复
            }
        },
        methods:{

            //悬浮显示切换
            reportShow(index){
                // 加1 避免传入index为0时进行错误判断
                if (index+1){
                    this.isReportShow=index+1
                }else{
                    this.isReportShow=''
                }
            },
            //改变页数
            changeIndex(val){
                // debugger
                this.pageIndex=val
                this.$emit('change',this.pageIndex)
            },
            //回复
            ReplyButton(index){
              this.isReply=index
            },
            //取消回复
            commentCancel(val){
              this.isReply=val
            }
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
                    return M+'月'+D+'日'+' '+H+':'+m
                }
            }
        },
        watch:{
            commentList:function(){
                // debugger
                // console.log(this.commentList)
                this.commentTotal=this.commentList.commenttotal
                this.comments=this.commentList.commentlist
            },

        },
        components:{
            paging,
            Comment
        },
        mounted() {

        }
    }
</script>
