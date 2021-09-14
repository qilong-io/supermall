<template>
  <div class="cart">
    <cart-nav-bar></cart-nav-bar>
    <ul>
      <li v-for="item in cartList">{{ item.title }}</li>
    </ul>
  </div>
</template>

<script>
import CartNavBar from "@/views/cart/childComps/CartNavBar";
import {mapGetters} from "vuex";

export default {
  name: "Cart",
  components: {
    CartNavBar,
  },
  computed: {
    ...mapGetters(['cartList']),
    // ...mapGetters({
    //   length: 'cartLength',
    //   cartList: 'cartList',
    // })
  }
}
</script>

<style scoped>

</style>
