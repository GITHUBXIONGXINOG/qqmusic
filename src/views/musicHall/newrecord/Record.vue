<template>
    <div class="record">
        <!--分类-->
        <!--绑定函数albumsInfo,获取子组件派发的数据到albumsInfo函数中-->
        <new-record-show
            @albumsInfo="albumsInfo"
        />
        <!--显示-->
        <!--绑定属性,传递albumsList的值给子组件-->
        <new-record-content
            :albums-list="albumsList"
        />

    </div>
</template>

<script>
import NewRecordShow from "@/components/main/newrecord/NewRecordShow";
import NewRecordContent from "@/components/main/newrecord/NewRecordContent";
import '@/assets/css/newrecord.scss'
export default {
    components:{
        NewRecordShow,
        NewRecordContent
    },
    data(){
        return{
            albumsList:[]
        }
    },
    methods:{
        albumsInfo(albums){
            this.albumsList=albums
            // console.log(this.albumsList);
        }
    }
}
</script>
