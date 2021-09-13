<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control ref="tabControl1"
                 :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 class="tab-control"
                 v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type='3'
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control ref="tabControl2"
                   :titles="['流行','新款','精选']"
                   @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <!--  .native 在我们需要监听一个组件的原生事件时，必须给对应事件加上.native修饰符，才能进行监听-->
    <back-top @click.native="backTop"
              v-show="showBackTop"/>
  </div>
</template>

<script>
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";

import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";


import * as homeRequest from "@/network/home";
import {itemListenerMixin} from "@/common/mixin";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      // 是否显示 返回顶部按钮
      showBackTop: false,
      // 记录 tabCotrol 所在页面上的位置
      tabOffsetTop: 0,
      // 标记 tabControl是否吸顶
      isTabFixed: false,
      saveY: 0,
      // itemImgListener: null,
    }
  },
  created() {
    // 请求头部部分数据
    this.getHomeMultidata()
    // 请求商品部分数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mixins: [itemListenerMixin],
  mounted() {
    //
    // const refresh = debounce(this.$refs.scroll.refresh, 500)
    //
    // this.itemImgListener = () => {
    //   refresh()
    // }
    //
    // //  监听goodsitem中图片加载完成事件 注意 main.js 中的配置
    // this.$bus.$on('itemImgLoad', this.itemImgListener)
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY)
    this.$refs.scroll.refresh()

  },
  deactivated() {
    // this.saveY = this.$refs.scroll.
    this.saveY = this.$refs.scroll.getScrollY()

    // 取消全局时间监听
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    // 监听轮播图加载完成
    swiperImgLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      // console.log(this.tabOffsetTop);
    },
    // 加载更多
    loadMore() {
      console.log('loadMore');
      this.getHomeGoods(this.currentType)
    },

    // 获取页面滚动的高度
    contentScroll(position) {
      //控制 回到顶部按钮的显示/隐藏
      this.showBackTop = position.y < -1500

      // 决定是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop

    },
    // 返回到頂部
    backTop() {
      this.$refs.scroll.scrollTo(0, 0)
    },

    /**
     * 事件监听
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      if (this.$refs.tabControl1 !== undefined) {
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      }

      if (this.isTabFixed) {
        this.$refs.scroll.scrollTo(0, -this.tabOffsetTop)
      }
    },

    /**
     *  网络请求相关
     */
    getHomeMultidata() {
      homeRequest.getHomeMultidata().then(result => {
        // console.log(result)
        this.banners = result.data.banner.list
        this.recommends = result.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      homeRequest.getHomeGoods(type, page).then(result => {
          // console.log(result);

          const goodsList = result.data.list;
          this.goods[type].list.push(...goodsList)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        }
      )
    },
  },
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
}
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #f6f6f6;

  /*使用浏览器原生滚动时，为了让导航固定位置，使用以下样式*/
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}

/* tab-control 吸顶效果*/
/*.tab-control {*/
/*  position: sticky;  */
/*  top: 44px;*/
/*  z-index: 9;*/
/*}*/

.content {
  /*height: 300px;*/
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
}

/*效果同上*/
/*.content {*/
/*  margin-top: 44px;*/
/*  !*height: calc(100% - 93px);*!*/
/*  height: 300px;*/
/*  overflow: hidden;*/
/*}*/
.tab-control {
  position: relative;
  z-index: 9;
}

</style>
