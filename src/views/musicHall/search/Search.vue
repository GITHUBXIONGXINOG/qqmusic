<template>
    <div class="search">
        Search.vue
        {{inputSearch}}
    </div>
</template>

<script>
    export default {
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
                        console.log(  this.inputSearch )
                    }
                },
                // 深度观察监听
                deep: true
            }

        }
    }
</script>
