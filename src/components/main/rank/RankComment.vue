<template>
    <div class="rank-comment">
        <div class="user-comment">
            <div class="user-comment-title">
                 <span class="comment-head">评论</span>
                 <span class="comment-total">共{{commentTotal}}条评论</span>
            </div>
            <div class="user-comment-op">
                <textarea name="comment" class="comment-textarea"
                          cols="100" rows="4"  maxlength="300"
                          @input="descInput" v-model="desc"
                          placeholder="期待你的神评论..."
                ></textarea>
                <span class="remaining-word">
                    <i>剩余</i>
                    <i class="rem-word">{{remWord}}</i>
                    <i>字</i>
                </span>
                <div class="comment-submit-wrap">
                    <a href="javscript:;" class="comment-submit">
                        <i>发表评论</i>
                    </a>
                    <span class="iconfont icon-biaoqing1"></span>
                </div>
            </div>

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
                        <span class="comment-content">{{item.rootcommentcontent}}</span>
                        <!--更多-->
                        <div class="comment-more">
                            <span>{{timeConversion(item.time)}}</span>
                            <div class="operating">
                                <a class="comment-report" v-show="index==isReportShow">举报</a>
                                <span class="comment-like">
                                       <a href="javascript:;">
                                           <svg class="icon" aria-hidden="true">
                                                <use xlink:href="#icon-zan"></use>
                                           </svg>
                                       </a>
                                       <i>{{item.praisenum}}</i>
                                </span>

                                <a href="javascript:;">
                                    <span class="iconfont icon-pinglun1"></span>
                                </a>
                            </div>

                        </div>
                    </div>

                </li>
            </ul>
        </div>
    </div>
</template>

<script>
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
                desc:'',
            }
        },
        methods:{
            descInput(){
              let txtVal = this.desc.length
              this.remWord = 300 - txtVal
            },
            //悬浮显示切换
            reportShow(index){
                if (index){
                    this.isReportShow=index
                }else{
                    this.isReportShow=''
                }
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
                    /*.map(item=>({
                    avatarurl:item.avatarurl,
                    commentid:item.commentid,
                    commit_state:item.commit_state,
                    enable_delete:item.enable_delete,
                    encrypt_rootcommentuin:item.encrypt_rootcommentuin,
                    encrypt_uin:item.encrypt_uin,
                    identity_pic:item.identity_pic,
                    is_hot:item.is_hot,
                    is_hot_cmt:item.is_hot_cmt,
                    nick:item.nick,
                    permission:item.permission,
                    rootcommentcontent:item.rootcommentcontent,
                    rootcommentid:item.rootcommentid,
                    rootcommentnick:item.rootcommentnick,
                    score:item.score,
                    time:item.time,
                    user_type:item.user_type,
                    vipicon:item.vipicon,
                }))*/
                // console.log(this.commentTotal)
                // console.log(this.comments)
            }
        }
    }
</script>
