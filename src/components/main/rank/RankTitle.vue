<template>
    <div class="rank-title">
        <div class="title-out-wrap">
            <div v-for="(item,index) in resTitleList" :key="index" class="title-wrap">
                <ul class="title-ul">
                    <i class="title-li-title">{{item.title}}</i>
                    <li class="title-li" v-for="(i,j) in item.list" :key="j">
                        <a href="javascript:;"
                           :class="{'select-title':i.topId==activeIndex.id}"
                           @click="selectTitle(i.topId)"
                        >{{i.label}}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                resTitleList:[],
                activeIndex:{
                    id:4,
                    pageSize:20,
                },
                resContentList:[],
            }
        },
        methods:{
            async fetchApi(params){
                // debugger
                //标题
                let urlTitle = '/api/top/category'
                // console.log(urlTitle)
                const resTitle = await this.$http.get(urlTitle)
                // console.log(resTitle)

                // console.log(resTitle.data.data)
                // let topList = resTitle.response.data.topList
                // console.log(resTitle.data.response.data.topList)
                this.resTitleList = resTitle.data.data.map(item=>({
                    title:item.title,
                    list:item.list
                }))
                // console.log(this.resTitleList)

                //详细
                let urlContent = '/api/top'
                //为空,初始化
                if (!params){
                    params= {id:4,pageSize:20}
                }
                const resContent = await this.$http.get(urlContent,{params})
                // debugger
                // console.log(params)
                // console.log(resContent.data.data)

                // debugger
                this.resContentList = resContent.data.data
                // console.log(this.resContentList)

                //评论
                //获取评论
                let urlComment = `/api/comment?biztype=4&id=${this.activeIndex.id}`
                const CommentList = await this.$http.get(urlComment)
                let commentlist = CommentList.data.data.comment
                // debugger
                // console.log(CommentList.data.data.comment)
                //将评论数传递
                this.resContentList.commenttotal = CommentList.data.data.comment.commenttotal
                // console.log( this.resContentList)
                //派发事件 派发内容
                this.$emit('res-content-list',this.resContentList)
                //派发评论
                this.$emit('res-comment-list',commentlist)
            },
            //点击切换
            selectTitle(id){
                // debugger
                this.activeIndex.id=id
                // console.log(this.activeIndex)
                this.fetchApi(this.activeIndex)
            }
        },
        created() {
            this.fetchApi()
        }

    }
</script>
