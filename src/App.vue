<template>
  <div id="app">
<!--      <keep-alive>-->
          <router-view></router-view>
<!--      </keep-alive>-->
  </div>
</template>
<script>
    import {mapMutations} from "vuex";

    export default {
        created() {
            this.$router.beforeEach((to, from, next) => {
                this.queryPathFrom(from.path)
                next();
            });
        },
        methods:{
            ...mapMutations([
              "queryPathFrom"
            ])
        },

    }
</script>
