<template>
    <div class="singer-list-show">
        <div class="tags">
            <ul v-for="(item,index) in tags" :key="index" class="tags-ul">
                <li v-for="(v,i) in item" :key="i" class="tags-li"
                >
                    <a
                        :class="{'singer-active': activeIndex[index]===i}"
                        @click="categoryClick(index,i)"
                    >
                        <i class="select">{{v.name}}</i>
                    </a>
                </li>
            </ul>
        </div>
        <div class="singer-list">
                <div class="singer-out-wrap" v-for="(item,index) in SingerList" :key="index"
                    :class="{'img-show':index<10}"
                >
                    <div class="singer-wrap">
                        <a href="javascript:;">
                            <img :src="item.singer_pic" alt="" v-if="index<10"
                                 class="singer-cover">
                        </a>

                            <a href="javascript:;">
                                <span>{{item.singer_name}}</span>
                            </a>
                    </div>
                 </div>
        </div>
    </div>
</template>

<script>
    export default {
    data(){
      return{
          SingerList:[],
          SingerListIndex:0,
          tags:[],
          activeIndex:{//活动样式
             area:0,
             genre:0,
             index:0,
             sex:0
          },

      }
    },
     methods:{
         async fetchApiInfo(params){
             // debugger
             /*每次传入数据先清空一下*/
             this.SingerList=''
             const res = await this.$http.get('http://localhost:3200/getSingerList', {params})
             // console.log(res)
             this.tags=res.data.response.singerList.data.tags
             // console.log(res.data.response.singerList.data.singerlist)
             this.SingerList=res.data.response.singerList.data.singerlist

         },
         /*点击函数 传入key(类别) index(具体点击)*/
         categoryClick(key,index){
             // 设置点击项,把活动样式activeIndex的该类别的数值设置为点击的index
             this.activeIndex[key] = index
             // console.log(this.activeIndex)
             // console.log( this.tags)
             /*设置params存储类别的id*/
             const params={}
             /*tags是生成的标签,循环它*/
             for (let item in this.tags) {
                 // 经查找 api要求传入的是id,而this.tags[key][0].id 存储的是类别选项的id属性
                 //console.log(this.tags[key][0].id);
                 //this.tags[item][this.activeIndex[item]]是
                 //点击的类别,如点击在地区里,输出所有地区 内地 港台 欧美 ...
                     // console.log(this.tags[item])
                 //该类别具体的点击项,如点击了内地,就输出{id:200,name:"内地"}
                     // console.log(this.tags[item][this.activeIndex[item]])
                 params[item] = this.tags[item][this.activeIndex[item]].id
             }
             this.fetchApiInfo(params)
         }
     },
     created() {
         this.fetchApiInfo()
     }

    }
</script>


<!--
area=200&genre=-100&index=-100&sex=-100


-->
