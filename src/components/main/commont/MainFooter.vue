<template>
    <div class="main-footer">
        <div class="main-footer-wrap">
            <div v-for="(item,index) in title"
                 class="main-footer-title-comment"
                 :key="index"
                 :class="`main-footer-title-${index}`"
            >
                <div class="main-title">
                      <span><i>{{item}}</i></span>
                      <a href="javascript:;"
                         v-for="(v,i) in contentList[index]" :key="i"
                         class="content-list"
                      >
                          <i v-if="index<2&&i<4" class="title-img">
                              <img :src="require('@/assets/img/footer@2x.jpg')" alt=""
                                    :class="`img-index-${i}`"
                              >
                          </i>
                          <i>
                              {{v}}
                          </i>
                      </a>
                </div>

            </div>
        </div>

        <div class="footer-wrap">
                <div class="about">
                    <a href="javascript:;"
                       v-for="(item,index) in aboutList" :key="index"
                    >
                        <i v-if="index < 9">{{item}}&nbsp;|</i>
                        <i v-else>{{item}}&nbsp;</i>
                    </a>
                </div>
       <!--         <div class="Reserved">
                    <i>{{ReservedList[0]}}</i>
                    <a href="javascript:;"><i>{{ReservedList[1]}}</i></a>
                </div>-->
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                title:[
                  '下载QQ音乐客户端',
                  '特色产品',
                  '合作链接',
                  '开放平台',
                  'TME集团官网'
              ],
                contentList:[
                    [
                        'PC版',
                        'Mac版',
                        'Android版',
                        'iPhone版'
                    ],
                    [
                        '全民K歌',
                        'Super Sound',
                        'QPlay',
                        'Fan直播伴侣',
                        '车载互联',
                        'QQ演出'
                    ],
                    [
                        'CJ ENM',
                        '腾讯视频',
                        '手机QQ空间',
                        '最新版QQ',
                        '腾讯社交广告',
                        '电脑管家',
                        'QQ浏览器',
                        '腾讯微云',
                        '腾讯云',
                        '企鹅FM',
                        '智能电视网',
                        '当贝市场',
                    ],
                    [
                        'QQ音乐开放平台',
                        '腾讯音乐人'
                    ],
                    [
                        '腾讯音乐'
                    ]
                ],
                aboutList:[
                    '关于腾讯',
                    'About Tencent',
                    '服务条款',
                    '用户服务协议',
                    '隐私政策',
                    '权利声明',
                    '广告服务',
                    '腾讯招聘',
                    '客服中心',
                    '网站导航',
                ],
        /*        ReservedList:[
                    'Copyright © 1998 - 2020 Tencent. ',
                    'All Rights Reserved.'
                ]*/
            }
        },

    }
</script>
