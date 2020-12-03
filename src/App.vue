<template>
  <div id="app">
          <router-view></router-view>
  </div>
</template>
<script>
    import {mapMutations} from "vuex";

    export default {
        created() {
            this.$router.beforeEach((to, from, next) => {
                this.queryPathFrom(from.fullPath)
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
