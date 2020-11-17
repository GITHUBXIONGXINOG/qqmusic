<!--表情子组件-->
<template>
  <!--
      传入表情的名字text,合并得到对应的class,里面有表情对应的位置信息,有了该class,就可以显示对应的表情
   -->
  <span class="emoji-item-common"
        :class="['emoji-'+text,'emoji-size-large']"
        @click="emojiClick">
  </span>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {},
  props: ["text", "isInput"],
  methods: {
    //点击后,派发该点击的表情名字text
    emojiClick() {
      this.$emit("onClick", this.text);
    }
  }
};
</script>
