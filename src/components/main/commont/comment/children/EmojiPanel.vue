<!--表情面报-->
<template>
  <div class="emoji-panel-wrap">
    <!--调用emoji子组件-->
    <!--循环表情名字列表-->
    <!--每次循环将当前项传入子组件中-->
    <!--每次循环,输入当前的表情名字,子组件组件获取表情名字后添加对应的class,形成对应的一个表情-->
    <!--循环完成后形成整个表情面报-->
    <!--添加点击事件handleEmojiClick-->
    <emoji
      v-for="(item,index) in emojis"
      :text="item"
      v-bind:key="index"
      @onClick="handleEmojiClick"
    ></emoji>
  </div>
</template>
<script>
import Emoji from "./Emoji.vue";
export default {
  data() {
    return {
      //表情名字列表
      emojis: [
        "angry",
        "anguished",
        "astonished",
        "blush",
        "cold_sweat",
        "confounded",
        "confused",
        "cry",
        "disappointed",
        "disappointed_relieved",
        "dizzy_face",
        "expressionless",
        "fearful",
        "flushed",
        "frowning",
        "grimacing",
        "grin",
        "grinning",
        "heart_eyes",
        "hushed",
        "innocent",
        "joy",
        "kissing_closed_eyes",
        "kissing_heart",
        "laughing",
        "neutral_face",
        "no_mouth",
        "open_mouth",
        "pensive",
        "persevere",
        "relaxed",
        "relieved",
        "sleepy",
        "smile",
        "smiley",
        "smirk",
        "sob",
        "stuck_out_tongue",
        "sunglasses",
        "sweat",
        "sweat_smile",
        "scream",
        "wink",
        "unamused",
        "satisfied",
        "worried",
        "stuck_out_tongue_closed_eyes",
        "weary",
        "yum",
        "tired_face",
        "triumph",
        "stuck_out_tongue_winking_eye"
      ]
    };
  },
  components: {
    Emoji
  },
  methods: {
    //将该点击的具体emoji表情派发出去
    //a为点击的表情名字
    handleEmojiClick(a) {
      this.$emit("emojiClick", a);
    }
  }
};
</script>
<style scoped>
.emoji-panel-wrap {
  box-sizing: border-box;
  border: 1px solid #cccccc;
  border-radius: 5px;
  background-color: #ffffff;
  width: 490px;
  height: 180px;
  position: absolute;
  right: 0;
  top: 40px;
  box-shadow: 0 0 10px rgba(0,0,0,.3);
  padding: 10px;
  z-index: 2;
}
</style>
