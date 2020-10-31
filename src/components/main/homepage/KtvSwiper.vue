<template>
    <div class="ktv-swiper">
        <div v-swiper:mySwiper="swiperOption" class="my-swiper swiper-container">
            <div class="swiper-wrapper wrap">
                <div class="swiper-slide swiperStyle" v-for="(page,index) in pages" :key="index">
                    <div class="swiperPageImgList" v-for="item in page" :key="item.id">
                        <div class="img_show">
                            <img :src="item.img" class="img">
                            <a href="javascript:;" class="img_cover_wrap">
                                <img src="../../../../public/img/cover_play@2x.png" alt="" class="img_cover">
                            </a>
                        </div>


                        <div class="ablumInfo">
                            <div class="ablumTitle">{{ item.title }}</div>
                            <div class="listen_num">播放量:&nbsp;&nbsp;{{ numToTenThousand(item.listen_num) }}万</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="wrap-prev">
                <div class="swiper-button-prev" @click="changePage"></div>
            </div>

            <div class="wrap-next">
                <div class="swiper-button-next" @click="changePage"></div>
            </div>


        </div>
    </div>
</template>


<script>


export default {

    props: {
        recommendList: {
            type: Array,
            required: true
        },
        swiperOption: {
            type: Object,
            required: true
        }
    },
    computed: {
        pages() {
            const pages = []
            this.recommendList.forEach((item, index) => {
                //Math.floor() 返回小于或等于一个给定数字的最大整数
                const page = Math.floor(index / 5)
                //page是页数,5是每页可完整显示的数据,如果index是5,说明有6条数据,剩下的一条将被放在下一张轮播图中
                //固定只显示两页

                if (!pages[page]) {
                    pages[page] = []
                }
                pages[page].push(item)

                //进行判断
                //如果page是0,给pages添加一个下标为0的数组,即5条数据
                //forEach循环,0-4经过Math.floor后都为0,即page为0
                //再把对应的item入栈push到pages[0]里面
                //5-9 经过Math.floor后都为1,即page为1
                //再把对应的item入栈push到pages[1]里面
            })
            return pages
        },

    },
    methods: {
        changePage() {

            let cssText = document.querySelector('.swiper-wrapper').style.transform
            let a = "translate3d(0px, 0px, 0px)"
            let b = "translate3d(-1549px, 0px, 0px)"
            let c = "translate3d(-3098px, 0px, 0px)"
            let d = "translate3d(-4647px, 0px, 0px)"
            if (cssText == a) {
                document.querySelector('.swiper-wrapper').style.transform = "translate3d(-1549px, 0px, 0px)";
                return
            }
            if (cssText == b) {
                document.querySelector('.swiper-wrapper').style.transform = "translate3d(-3098px, 0px, 0px)";
                return
            }
            if (cssText == c) {
                document.querySelector('.swiper-wrapper').style.transform = "translate3d(-4647px, 0px, 0px)";
                return
            }
            if (cssText == d) {
                document.querySelector('.swiper-wrapper').style.transform = "translate3d(0px, 0px, 0px)";
                return
            }
            else {
                document.querySelector('.swiper-wrapper').style.transform = "translate3d(0px, 0px, 0px)";
                return
            }

        },
        numToTenThousand(num) {
            let res = num / 10000
            //  toFixed 四舍五入 保留指定小数位数
            return res.toFixed(1)
        }
    }
}
</script>
