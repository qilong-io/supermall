<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import * as homeRequest from "@/network/home";

export default {
  name: "Home",
  created() {
    homeRequest.getHomeMultidata().then(result => {
      console.log(result);
    })
  },
  components: {
    NavBar,
  },
}
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #f6f6f6;
}
</style>
