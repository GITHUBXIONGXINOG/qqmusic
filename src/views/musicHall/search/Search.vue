<template>
    <div class="search">
        <search-title

        />
        <search-content
            :setSearchWord="inputSearch"
        />
    </div>
</template>

<script>
    import '@/assets/css/search.scss'
    import SearchTitle from '@/components/main/search/SearchTitle'
    import SearchContent from '@/components/main/search/SearchContent'

    export default {
        components:{
            SearchTitle,
            SearchContent
        },
        data(){
            return{
                inputSearch:'',//搜索词

            }
        },
        created() {
            this.getRouterData()
        },
        methods:{
            getRouterData(){

                if (this.$route.query)
                   this.inputSearch = this.$route.query.inputSearch

            },



        },
        watch:{
             //监听路由
            $route:{
                handler: function(val, oldVal){
                    // debugger
                    if (val.path=='/search'){
                        this.inputSearch = val.query.inputSearch
                        // console.log(  this.inputSearch )
                    }
                },
                // 深度观察监听
                deep: true
            },




        }
    }
</script>
