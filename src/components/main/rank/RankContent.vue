<template>
    <div class="rank-content">
        <div class="header-wrap" >
            <nav class="title-wrap">
                <div class="title-info">
                    {{contentList.info.title}}
                </div>
                <i class="update-time">{{contentList.update}}</i>
                <div class="title-rule">
                    <i @click.stop="clickListRule">榜单规则</i>
                    <div v-show="ruleActive" class="rule-info" id="ruleShowBox">
                         <i>榜单规则</i>
                        <div v-html="ruleMsg" class="rule-word" >
                        </div>
                    </div>
                </div>
            </nav>
            <ul class="userOpera">
                <li v-for="(item,index) in userOperating" :key="index">
                    <span :class="['iconfont ',`${iconList[index]}`]"></span>
                    <span>
                        {{item}}
                        <i v-if="index==4">({{contentList.commenttotal}})</i>
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            contentList:{
                type:Object,
                require:true
            }
        },
        data(){
            return{
                title:'',
                storageContent:[],
                ruleActive:false,
                ruleMsg:'',
                userOperating:['播放全部','添加到','下载','批量操作','评论'],
                iconList:[
                    'icon-bofang2',
                    'icon-jiatianjiakuangxuanduoxuan-8',
                    'icon-xiazai',
                    'icon-piliangxiugai',
                    'icon-pinglun'
                ]
            }
        },
        methods:{
            //设置内容
            setContent(){
                // debugger
               this.storageContent = this.contentList.list
            },
            //榜单点击
            clickListRule(){
                // debugger
                this.ruleActive=!this.ruleActive
                this.ruleMsg = this.contentList.info.desc
                // console.log(this.ruleMsg)

            },

        },

        computed:{
            // ruleWord:function () {
            //     this.ruleMsg = this.contentList.info.desc
            //     // let ruleOne =  this.contentList.info.desc
            // }


        },
        created() {
            this.setContent()
        },
        mounted() {
            document.addEventListener('click',e=>{
                const ruleShowBox =   document.getElementById("ruleShowBox")
                if (ruleShowBox){
                    if (!ruleShowBox.contains(e.target)){
                        this.ruleActive=false
                    }
                }
            })
        }

    }

</script>
