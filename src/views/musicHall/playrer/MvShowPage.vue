<template>
    <div class="mv-show-page">
        MvShowPageaaaascacas
        ascasc
{{MvList}}
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        props:{
            vid: {
                type:[String,Number],
                require:true
            }
        },
        data(){
                return{

                }
        },
        created() {
            debugger
            let idInfo=this.vid.replace(/vid=/,'')
            this.$store.dispatch('queryDataMvPlayer',idInfo)

        },
        computed:{
            ...mapGetters([
              'MvList'
            ])
        },
        mounted() {
            console.log(this.MvList)
        },


    }
</script>
