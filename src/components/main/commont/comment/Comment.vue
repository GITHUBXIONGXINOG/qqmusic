<template>
    <!--评论外边框-->
  <div class="comment-wrap">
     <!-- 文本输入框 用v-model 双向数据绑定到content上面  -->
    <textarea class="comment-input"
              :placeholder="replyName"
              id="textpanel" v-model="content"
              cols="100" rows="4"  maxlength="300"
              @input="contentInput"
    >

    </textarea>
    <!--剩余字数-->
    <span class="remaining-word">
                    <i>剩余</i>
                    <i class="rem-word">{{remWord}}</i>
                    <i>字</i>
    </span>

    <!--操作显示 表情选择 发布评论-->
    <div class="opration">
        <!--表情选择-->
        <!--添加表情图标面报点击事件-->
        <!--添加保存评论点击事件-->
      <div class="comment-submit-wrap">
        <span class="iconfont icon-biaoqing1" @click.stop="showEmojiPanel"></span>
        <a href="javscript:;" class="comment-submit">
          <i>{{ submitButton }}</i>
        </a>
        <a href="javscript:;"
           v-if="isShowDeleteReply"
           class="comment-cancel"
           @click="commentCancel"
        >
           取消
        </a>
      </div>
        <!--表情面报-->
        <!--调用子组件-->
        <!--接收派发事件emojiClick的数据,传入到appendEmoji函数中,并根据isShowEmojiPanel判断表情面板是否存在-->
        <emoji-panel @emojiClick="appendEmoji" v-if="isShowEmojiPanel" id="emoji-panel"></emoji-panel>
    </div>

  </div>
</template>
<script>
import EmojiPanel from "./children/EmojiPanel";
export default {
  data() {
    return {
      content: "",//文本输入框内容
      flag: false,
      isShowEmojiPanel: false,
      comments: [],//评论列表
      remWord:300,//剩余文字
      replyName:"期待你的神评论...",
      isShowDeleteReply:false,//删除评论框
      submitButton:"发表评论"
    }
  },
  props:{
    name:{
      type: String,
      default: "期待你的神评论..."
    }
  },
  components: {
    EmojiPanel
  },
  methods: {
      /*保存评论*/
    saveComment() {
      /*
         1.将评论内容content入栈
         2.replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
           content是通过v-model双向绑定的文本域,点击表情,content里面会得到类似于 :angry: 的字符串,
           通过replace进行匹配正则表达式
              . 匹配除换行符 \n 之外的任何单字符
              * 匹配前面的子表达式零次或多次
              ? 匹配前面的子表达式零次或一次
              g 全局匹配
           匹配到后调用emoji方法
      */
      this.comments.push(this.content.replace(/:.*?:/g, this.emoji)); // 替换":"符号包含的字符串,通过emoji方法生成表情<span></span>
      this.content = "";
      this.isShowEmojiPanel = false;
    },

    /*是否展示表情面报*/
    showEmojiPanel() {
      //隐藏 -> 展示 -> 隐藏
      this.isShowEmojiPanel = !this.isShowEmojiPanel;
    },

   //emoji方法,对传入该方法的word进行处理,最后返回表情
    emoji(word) {
      // 生成html
      //substring() 方法返回字符串的子字符串。
      // 通过该方法去除掉匹配的前后两个冒号 如果 :angry: 转换为 angry
      const type = word.substring(1, word.length - 1);
      //通过匹配对应的class样式,显示不同的表情
      return `<span class="emoji-item-common emoji-${type} emoji-size-small" ></span>`;
    },

    //添加表情
    //text为子组件EmojiPanel传入的表情名字
    appendEmoji(text) {
      //根据id获取文本域
      const el = document.getElementById("textpanel");
      //将得到的表情名字追加到文本域中
      this.content = el.value + ":" + text + ":";
    },

    //剩余字数
    contentInput(){
      let txtVal = this.content.length
      this.remWord = 300 - txtVal
    },

    //取消回复
    commentCancel(){
      this.$emit('commentCancel',-1)
    }

  },
  mounted() {
    document.addEventListener('click',e=>{
      const emoji = document.getElementById("emoji-panel")
      if (emoji){
        if (!emoji.contains(e.target)){
            this.isShowEmojiPanel=false
        }
      }
    })
  },
  watch:{
    name: {
      immediate:true,
      handler:function (val){
        if (val!=this.replyName){
          this.replyName="回复@"+val
          this.isShowDeleteReply=true
          this.submitButton="回复"
        }

      }
    }
  }
};
</script>

<style lang="scss">
// 注意 这里因为v-html的原因 不能使用scoped 不然样式不能失效
/*最外层边框*/
.comment-wrap {
  left: 0;
  right: 0;
  position: relative;
  //margin: 0 auto;
  //每个表情通用的样式
  //背景图片为所有表情形成的雪碧图
  .emoji-item-common {
    background: url("../../../../assets/img/emoji_sprite.png");
    display: inline-block;
    &:hover {
      cursor: pointer;
    }
  }
  .emoji-size-small {
    // 表情大小
    zoom: 0.3;
  }
  .emoji-size-large {
    zoom: 0.5; // emojipanel表情大小
    margin: 4px;
  }

  //文本域样式
  .comment-input {
    resize: none;
    border-color: #ececec;
    padding: 10px;
    font-size: 19px;
    line-height: 1.5;
    background: #f5f5f5;
    //height: 100px;
    border-radius: 5px;
    &:focus {
      outline: none;
    }
  }
  //剩余字数样式
  .remaining-word{
    //border: 1px solid red;
    position: absolute;
    right: 0;
    bottom: 50px;
    text-align:right;
    margin: 10px;
    .rem-word{
      color: #31c27c;
    }
  }

  //操作样式 表情面板图标,发表评论
  .opration {
    //border: 1px solid red;
    display: flex;
    justify-content: flex-end;
    position: relative;
    //发表评论
    .comment-submit-wrap{
      //border: 1px solid red;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin: 10px 0;
      span{
        font-size: 20px;
        color: #31c27c;
        cursor: pointer;
      }
      a{
        //border: 1px solid red;
        background: #31c27c;
        color: white;
        padding: 0px 8px;
        font-size: 14px;
        border-radius: 2px;
        width: 80px;
        line-height: 27px;
        height: 27px;
        text-align: center;
        margin-left: 8px;
        &:hover{
          background: #2caf6f;
        }
      }
      .comment-cancel{
        background: white;
        color: black;
        border: 1px solid #c9c9c9;;
        &:hover{
          background: #ededed;
        }
      }
    }
  }
}
// 导入精灵图样式 各种表情对应位置信息
@import "../../../../assets/css/emoji.css";
</style>

