<template>
    <div class="mv-show-page">

        <div class="mv-video-wrap">
            <mv-player
                   :vid="vid"
             />
        </div>


    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import MvPlayer from '@/components/main/mv/MvPlayer'
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
            // debugger


        },
        computed:{
            ...mapGetters([
              'MvList'
            ]),

   /*         mvUrl(){
                if (this.MvList.mvUrl&&this.MvList){
                    let key = this.vid.replace(/vid=/,'')
                    return this.MvList.mvUrl[key][this.Clarity]
                }
                return ''
            },*/
        },
        mounted() {
            // console.log(this.MvList)
        },

        components:{
            MvPlayer,
        }

    }
</script>
