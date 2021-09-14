<template>
  <div class="cart-nav-bar">
    <nav-bar>
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import {mapGetters} from "vuex";

export default {
  name: "CartNavBar",
  components: {
    NavBar,
  },
  computed: {
    ...mapGetters(['cartLength']),
    // cartLength() {
    //   // return this.$store.getters.cartLength
    //   return this.$store.state.cartList.length
    // },
  }
}
</script>

<style scoped>
.cart-nav-bar {
  background-color: var(--color-tint);
  color: white;
  font-weight: 700;
}

</style>
