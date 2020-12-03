<template>
    <div class="search-title">
        <search-bar
            @getHotSearch="getHotSearch"
            :setSearchWord="clickWord"
        />
        <div class="hotSearch">
            <i class="hotSearch-title">热门搜索:</i>
            <ul class="hotSearch-ul">
                <li v-for="item in hotSearchList" @click="clickHot(item.name)">
                    {{item.name}}
                </li>
            </ul>
        </div>

    </div>
</template>
<script>
    import SearchBar from './SearchBar'
    export default {
        components:{
            SearchBar
        },
        data(){
            return{
                hotSearchList:[],//热搜列表
                clickWord:'',//点击的热搜名字
            }
        },
        methods:{
            //得到热搜
            getHotSearch(val){
                this.hotSearchList=val
            },
            clickHot(val){
                this.clickWord=val
            }
        }

    }
</script>
