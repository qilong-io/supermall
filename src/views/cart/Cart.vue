<template>
  <div class="cart">
    <cart-nav-bar></cart-nav-bar>
    <cart-list></cart-list>
    <CartBottomBar></CartBottomBar>
  </div>
</template>

<script>
import CartNavBar from "@/views/cart/childComps/CartNavBar";
import CartList from "@/views/cart/childComps/CartList";
import Scroll from "@/components/common/scroll/Scroll";
import CartBottomBar from "@/views/cart/childComps/CartBottomBar";

export default {
  name: "Cart",
  components: {
    CartBottomBar,
    Scroll,
    CartList,
    CartNavBar,
  },
  computed: {}
}
</script>

<style scoped>
.cart {
  height: 100vh;
}

</style>
