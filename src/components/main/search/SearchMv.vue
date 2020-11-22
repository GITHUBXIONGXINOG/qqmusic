<template>
    <div class="search-mv">
        {{contentList}}
    </div>
</template>

<script>
    export  default {
        props:{
            setContentList:{
                type: Object,
                require: true
            }
        },
        data(){
            return{
                contentList:[]
            }
        },
        watch:{
            setContentList(val){
                debugger
                this.contentList = val
            }
        }

    }
</script>
