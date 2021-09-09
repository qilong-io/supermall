<template>
  <div>
    <tab-bar>
      <tab-bar-item path="/home" activeColor='red'>
        <img src="~assets/img/tabbar/home.svg" alt="" slot="item-icon">
        <img src="~assets/img/tabbar/home_active.svg" alt="" slot="item-icon-active">
        <div slot="item-name">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category" activeColor='red'>
        <img src="~assets/img/tabbar/category.svg" alt="" slot="item-icon">
        <img src="~assets/img/tabbar/category_active.svg" alt="" slot="item-icon-active">
        <div slot="item-name">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart" activeColor='red'>
        <img src="~assets/img/tabbar/cart.svg" alt="" slot="item-icon">
        <img src="~assets/img/tabbar/cart_active.svg" alt="" slot="item-icon-active">
        <div slot="item-name">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile" activeColor='red'>
        <img src="~assets/img/tabbar/profile.svg" alt="" slot="item-icon">
        <img src="~assets/img/tabbar/profile_active.svg" alt="" slot="item-icon-active">
        <div slot="item-name">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "@/components/common/tabbar/TabBar";
import TabBarItem from "@/components/common/tabbar/TabBarItem";

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem,
  }
}
</script>

<style scoped>

</style>
