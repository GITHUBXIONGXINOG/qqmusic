<template>
    <div class="mv-title">
        <div class="title-area-wrap">
            <span class="area-tit">区域</span>
      <!--      <div class="title-area">
                <a href="javascript:;" v-for="item in area" :key="item.id"
                    :class="{'select-title':activeParams.area==item.id}"
                >
                    <i>{{item.name}}</i>
                </a>
            </div>-->
            <categories :setTypeList="area"
                        :setTypeId="activeParams.area"
                        @getTypeInfo="getArea"
            />
        </div>

        <div class="title-version-wrap">
            <span class="version-tit">版本</span>
           <!-- <div class="title-version">
                <a href="javascript:;" v-for="item in version" :key="item.id"
                   :class="{'select-title':activeParams.version==item.id}"
                >
                    <i>{{item.name}}</i>
                </a>
            </div>-->
            <categories :setTypeList="version"
                        :setTypeId="activeParams.version"
                        @getTypeInfo="getVersion"
            />
        </div>

        <!--显示当前选中-->
        <div class="title-select-show">
            <div v-if="activeParams.area==15&&activeParams.version==7" class="title-select-default">
                {{word}}
            </div>
            <!--显示当前选中-->
            <div v-else class="title-select-wrap">
                <div class="title-select-info" v-if="activeParams.area!=15">
                    {{areaName}}
                    <div class="delete-select" @click="deleteSelect(0)">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-cuowu"></use>
                        </svg>
                    </div>
                </div>
                <div class="title-select-info" v-if="activeParams.version!=7">
                    {{versionName}}
                    <div class="delete-select" @click="deleteSelect(1)">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-cuowu"></use>
                        </svg>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    import Categories  from "@/components/main/commont/Categories"
    export default {
        components:{
            Categories,
        },
        props:{
            currentPage:{
                type: Number,
                default: 1,
            }
        },
        data(){
            return{
                area:[],//区域
                version:[],//版本
                //活动信息
                activeParams:{
                    area:15,//地区,默认15全部
                    version:7,//类型,默认7全部
                    pageNo:1,//页数
                    pageSize:20,//页面大小
                },
                areaName:'',
                versionName:'',
                orderSelect:true,
                word:'全部歌单',
                contentList:[],//图片列表
            }
        },

        methods:{
            async fetchApi (){
                let url = '/api/mv/category'
                const res = await this.$http.get(url)
                this.area=res.data.data.area
                this.version=res.data.data.version

                let urlContent = '/api/mv/list'
                let params = this.activeParams
                const resContent = await this.$http.get(urlContent,{params})
                this.contentList = resContent.data.data
                // debugger
                // console.log(this.contentList)
                //派发
                this.$emit('getContent',this.contentList)

            },
            //得到返回的区域
            getArea(val){
                // debugger
                this.activeParams.area=val.id
                this.areaName=val.name
                this.fetchApi()

            },

            //得到返回的版本
            getVersion(val){
                this.activeParams.version=val.id
                this.versionName=val.name
                this.fetchApi()
            },

            //删除选中
            deleteSelect(type){
                if (type==0){
                    this.activeParams.area=15
                }else {
                    this.activeParams.version=7
                }
            },


        },

        created() {
            this.fetchApi()
        },
        watch:{
            currentPage(val){
                this.activeParams.pageNo=val
                this.fetchApi()
            }
        }
    }
</script>
