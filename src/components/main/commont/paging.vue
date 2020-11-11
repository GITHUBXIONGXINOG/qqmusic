<template>
    <ul class="paging">
        <!--
            prev上一页
            paging-item li的通用默认样式
            paging-item-change 前进后退的样式
            v-show="index != 1" 当当前的页数不等于1时,显示前进,等于1时则隐藏
            @click="prev" 绑定点击事件 this.index-1 到达上一页
         -->
        <li
            class="paging-item paging-item-change"
            v-show="index != 1"
            @click="prev">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jiantou3"></use>
            </svg>
        </li>

        <!--
            first 第一页 点击后直接跳转到第1页
            v-show="index > 3" 当前的页码为1-3时,隐藏该跳转按钮,此时直接为页码输出1-5
                               当前的页码为4之后,不会显示自带的1,此时的1为按钮1

        -->
        <li
            class="paging-item"
            v-show="index > 3"
            @click="first">1</li>
        <!--
            显示前面隐藏标记
            showPrevMore 默认为false,在函数pagers里进行条件判断,符合条件就显示
        -->
        <li
            class="paging-item"
            v-if="showPrevMore">...</li>
        <!--
            显示页码
            paging-item--current 当前的页码样式,pager为pagers的具体项,当当前的页码index等于该数组的pager时就true
            @click="go(pager)" 添加点击样式,点击页码后进行跳转
        -->
        <li
            :class="['paging-item', {'paging-item--current' : index === pager}]"
            v-for="pager in pagers"
            @click="go(pager)">{{ pager }}</li>
        <!--显示后面隐藏标记-->
        <li
            class="paging-item"
            v-if="showNextMore">...</li>

        <!--
            last 最后一页
            当为index<total-2即小于298-2=296时显示跳转到最后一页的按钮,该按钮显示最后一页的页数
            当大于295时,该按钮隐藏,此时页码循环出最后一页的页数298
            两者显示是一样的,都是298,但实际上是不同的两个东西
        -->
        <li
            class="paging-item"
            v-show="index<total-2"
            @click="last">{{total}}</li>

        <!--
            next 下一页
            v-show="index != total" 当不是最后的一页,就显示点击下一页的按钮,是最后一页就隐藏
        -->
        <li
            class="paging-item  paging-item-change"
            v-show="index != total"
            @click="next">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jiantouyouxi"></use>
            </svg>
        </li>
    </ul>
</template>

<script>


export default {
    //通过props来接受从父组件传递过来的值
    props : {

        //页面中的可见页码，其他的以...替代, 必须是奇数
        perPages : {
            type : Number,
            default : 5
        },

        //当前页码
        pageIndex : {
            type : Number,
            default : 1
        },

/*        //每页显示条数
        pageSize : {
            type : Number,
            default : 10
        },*/

        //总记录数
        total : {
            type : Number,
            default : 1
        },

    },
    methods : {
        /*上一页*/
        prev(){
            if (this.index > 1) {
                this.go(this.index - 1)
            }
        },
        /*下一页*/
        next(){
            if (this.index < this.total) {
              this.go(this.index + 1)
            }
        },
        /*第一页*/
        first(){
            if (this.index !== 1) {
              this.go(1)
            }
        },
        /*末页*/
        last(){
            if (this.index != this.pages) {
                this.go(this.total)
            }
        },
        /*页面执行*/
        go (page) {
            /*
                go函数执行页面跳转的操作,一切点击都会调用该函数
                this.index是当前的页面,page是点击后传入的页面,当两者不同时就说明要发生跳转
            */
            if (this.index !== page) {
                //将当前的页码设置为点击传入的page页码
                this.index = page
                //通过$emit将数据派发出去,派发函数为change,派发内容为this.index
                //父组件通过绑定@change方法来获取当前的页码this.index
                this.$emit('change', this.index)
            }
        }
    },
    computed : {

        /*        //计算总页码
                pages(){
                     return Math.ceil(this.size / this.limit)
                },*/

        //计算页码，当count等变化时自动计算
        pagers () {
            /*array存储显示的几个页码数*/
            const array = []
            /*可见页码 5*/
            const perPages = this.perPages
            /*总共页码 298*/
            const pageCount = this.total
            /*当前页码*/
            let current = this.index
            /*前后的位置,可以页码为5的话,前后都为2*/
            const _offset = (perPages - 1) / 2

            /*
                开始页数 start :当前页码-前面的页数
                结束页数 end: 当前页码+后面的页数
            */
            const offset = {
                start : current - _offset,
                end   : current + _offset
            }

            //-1, 3
            /*
                如果开始为1,则offset.star为-1,offset.end为3
                结束页码为offset.end  = 3+(1- (-1))=5
                如果开始为2,则offset.star为0,offset.end为4
                结束页码为offset.end  = 4+(1- 0)=5
                设置offset.end = 4,即在页码为1,2时,固定结束的页码为4
            */
            if (offset.start < 1) {
                // offset.end = offset.end + (1 - offset.start)
                offset.start = 1
                offset.end = 4
            }
            /*
                如果结束页码大于总页码
                297
                offset.end=297+2=299>298
                offset.start=297-2=295
                offset.start = 295-(299-298)=294

                offset.start = offset.start - (offset.end - pageCount)
                是计算边界条件的等式,但结合官网的对比,另外设置start固定显示范围

                offset.start = pageCount-3 设置固定的start为298-3=295,即当前显示295到298

            */
            if (offset.end > pageCount) {
                offset.start = offset.start - (offset.end - pageCount)
                offset.end = pageCount
                offset.start = pageCount-3
            }
            //将offset.start小于1的页码开始都置为1
            if (offset.start < 1) {
                offset.start = 1
            }
            /*
                进行判断,如果offset.start 大于1,说明有上一页,showPrevMore就为true,就可以点击显示
                        如果offset.end 小于总页数,说明有下一页,showNextMore就为true,就可以点击显示
             */
            this.showPrevMore = (offset.start > 2)
            this.showNextMore = (offset.end < pageCount-1)

            /* 将offset的start和end为条件循环入栈 */
            for (let i = offset.start; i <= offset.end; i++) {
                 array.push(i)
            }
            /*返回函数*/
            return array
        }
    },
    data () {
        return {
            index : this.pageIndex, //当前页码
            // limit : this.pageSize, //每页显示条数
            // size : this.total || 1, //总记录数
            showPrevMore : false,
            showNextMore : false
        }
    },
    // watch，它可以用来监测Vue实例上的数据变动
    watch : {
        /*
           pageIndex是props父组件传入的当前页码,
           利用watch监视,当它发生改变时,说明父组件调用传入当前页码数据,
           就将本组件的this.index当前页码数置为传入的数据,如果为空,就设置为1
           total同理
        */
        pageIndex(val) {
             this.index = val || 1
        },
        // pageSize(val) {
        //      this.limit = val || 10
        // },
        total(val) {
              this.size = val || 1
        }
    }
}
</script>
