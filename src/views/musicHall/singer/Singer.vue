<template>
  <div class="singer">
    <singer-show

    />
    <singer-list-show

        />
  </div>
</template>

<script>
    import SingerShow from "@/components/main/singer/SingerShow";
    import SingerListShow from "@/components/main/singer/SingerListShow";
    export default {
        components:{
            SingerShow,
            SingerListShow
        }
    }
</script>
