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
                    :class="{'img-show':index<10&&currentPage==1&&activeIndex.index==0}"
                >
                    <div class="singer-wrap">
                        <a href="javascript:;"  v-if="index<10&&currentPage==1&&activeIndex.index==0">
                            <img :src="item.singer_pic" alt=""
                                 class="singer-cover">
                        </a>

                            <a href="javascript:;">
                                <span>{{item.singer_name}}</span>
                            </a>
                    </div>
                 </div>
        </div>

        <!--
            使用分页组件
            1.传入当前页码currentPage到子组件的page-index
            2.传入页数count
            3.传入每页条数
            3.绑定子组件的change事件,获取来自子组件的数据,并调用pageChange接收该数据
              子组件里用this.$emit('change', 数据内容)进行派发
         -->
        <paging
            :page-index="currentPage"
            :total="count"
            @change="pageChange"
        />
    </div>
</template>

<script>
    import paging from "@/components/main/commont/paging";
    export default {
        components:{
            paging
        },
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
          tagIndex:298,
          currentPage : 1, //当前页码
          count : 298, //总记录数
          items : [],

      }
    },
     methods:{
         async fetchApiInfo(params){
             // debugger
             /*每次传入数据先清空一下*/
             this.SingerList=''
             //在url中添加当前页面的页码数
             let url=`http://81.70.93.91:3200/getSingerList?page=${this.currentPage}`
             //通过传入params对象进行类别选项
             const res = await this.$http.get(url, {params})
             debugger
             console.log(res)
             this.tags=res.data.response.singerList.data.tags
             // console.log(res.data.response.singerList.data.singerlist)
             this.SingerList=res.data.response.singerList.data.singerlist

         },
         //从page组件传递过来的当前page
         pageChange (page) {
             /*修改当前的页面为接受的page*/
             this.currentPage = page
             /*调用数据获取函数*/
             this.fetchApiInfo()
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
             // debugger
             // console.log(this.tags)
             // console.log(params)
             this.fetchApiInfo(params)
         }
         /*渲染*/
     },
     created() {
         this.fetchApiInfo()
     },
     computed:{
        /*计算当前显示的页数范围*/
         pageCount(){
             // debugger
           switch (this.tagIndex){
               case 1:
               case 2:
               case 297:
               case 298:
                   return 4
               case 3:
               case 296:
                   return 5
               case 4:
               case 295:
                   return 6
               default:
                   return 7
           }
         },
     },

    }
</script>


