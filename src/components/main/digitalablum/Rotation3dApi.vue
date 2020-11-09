<template>
    <div class="retation3d-api">
        <!--
            v-bind传递值apiGetList和index到子组件rotation-show对应的值中,rotation-show使用props接收
        -->
        <rotation3d-show
            :slide-list="apiGetList"
        />


    </div>
</template>

<script>
import Rotation3dShow from "@/components/main/digitalablum/Rotation3dShow";
export default {
    props:{
        apiSetList:{
            type: Object,
            require:true,
        }
    },
    data(){
        return {
            apiGetList: [],
            contentList:[]
        }
    },
    components:{
        Rotation3dShow,
    },
    methods:{
        //apiSet 初始化 默认地址

        //默认初始化输出
        async fetchRecommendSwiper(){

           // console.log(this.apiSetList)
            //console.log(this.apiSetList.path)
            const res = await this.$http.get(this.apiSetList.path)
            // console.log(res)
                this.apiGetList = res.data.response.data.banner.map(item => ({
                    img:item.picurl,
                    title:item.album_name,
                    username:item.intro,
                    id:item.album_id,
                    type:item.type
                }))
            this.contentList = res.data.response.data.content
            // console.log(this.contentList)

            // console.log(this.apiGetList )
            this.$emit('fetch-recommend-swiper',this.contentList )

        },



    },
    created() {
        this.fetchRecommendSwiper()
    },

}
</script>
