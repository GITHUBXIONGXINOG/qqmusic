<template>
  <div class="category-playlist">
      <category-title

      />
      <category-list

      />
  </div>
</template>

<script>
    import categoryList from "@/components/main/categorylist/categoryList.vue";
    import categoryTitle from "@/components/main/categorylist/categoryTitle";
    import  '@/assets/css/ categorylist.scss'
    export default {
        components:{
            categoryList,
            categoryTitle
        }
    }
</script>
