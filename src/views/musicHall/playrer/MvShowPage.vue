<template>
    <div class="mv-show-page">
        MvShowPageaaaascacas
        ascasc

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


        },
        computed:{
            ...mapGetters([
              // 'MvList'
            ])
        },
        mounted() {
            // console.log(this.MvList)
        }

    }
</script>
