<template>
  <div>
    <tab-bar>
      <tab-bar-item path="/home" activeColor='lightskyblue'>
        <img src="~assets/img/tabbar/tab_qg_n.png" alt="" slot="item-icon">
        <img src="~assets/img/tabbar/tab_qg_s.png" alt="" slot="item-icon-active">
        <div slot="item-name">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category" activeColor='lightskyblue'>
        <img src="~assets/img/tabbar/tab_wd_n.png" alt="" slot="item-icon">
        <img src="~assets/img/tabbar/tab_wd_s.png" alt="" slot="item-icon-active">
        <div slot="item-name">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart" activeColor='lightskyblue'>
        <img src="~assets/img/tabbar/tab_xm_n.png" alt="" slot="item-icon">
        <img src="~assets/img/tabbar/tab_xm_s.png" alt="" slot="item-icon-active">
        <div slot="item-name">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile" activeColor='lightskyblue'>
        <img src="~assets/img/tabbar/tab_wd_n.png" alt="" slot="item-icon">
        <img src="~assets/img/tabbar/tab_wd_s.png" alt="" slot="item-icon-active">
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
