<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"
                    @titleClick="titleClick"
                    ref="detailNavBar">
    </detail-nav-bar>
    <scroll class="content"
            ref="scroll"
            :probeType="3"
            @scroll="scrollListener">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <detail-recommend-info :recommend-list="recommends" ref="recommend"></detail-recommend-info>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>

    <back-top v-show="isShowBackTop" @click.native="backTop"></back-top>

    <!--    <Toast :message="message" :show="show"></Toast>-->
  </div>
</template>

<script>

import Scroll from "@/components/common/scroll/Scroll";

import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import DetailRecommendInfo from "@/views/detail/childComps/DetailRecommendInfo";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";

import {getGoodsDetail, getRecommend, GoodsParam, Goods, Shop} from "@/network/detail";

import {backTopMixin, itemListenerMixin} from "@/common/mixin";
import {debounce} from "@/common/utils";

import {mapActions} from "vuex";
// import Toast from "@/components/common/toast/Toast";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      // itemImgListener: null,
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      // message: '',
      // show: false,
    }
  },
  methods: {
    ...mapActions(['addCart']),
    imgLoad() {
      this.newRefresh()
      this.getThemeTopY()
    },
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 0)
    },
    scrollListener(pos) {

      // // 方法1:
      // const topY = pos.y
      // const topY0 = -this.themeTopYs[0]
      // const topY1 = -this.themeTopYs[1]
      // const topY2 = -this.themeTopYs[2]
      // const topY3 = -this.themeTopYs[3]
      // if (topY < topY0 && topY > topY1) {
      //   this.$refs.detailNavBar.setCurrentindex(0)
      // } else if (topY < topY1 && topY > topY2) {
      //   this.$refs.detailNavBar.setCurrentindex(1)
      // } else if (topY < topY2 && topY > topY3) {
      //   this.$refs.detailNavBar.setCurrentindex(2)
      // } else if (topY < topY3) {
      //   this.$refs.detailNavBar.setCurrentindex(3)
      // }


      // 方法2:
      const positoinY = -pos.y
      const length = this.themeTopYs.length
      // // 判断方式1
      // for (let index = 0; index < length; index++) {
      //   if (this.currentIndex != index && ((index < length - 1 && positoinY >= this.themeTopYs[index] && positoinY < this.themeTopYs[index + 1]) || (index === length - 1 && positoinY > this.themeTopYs[index]))) {
      //     this.currentIndex = index
      //     this.$refs.detailNavBar.currentIndex = this.currentIndex
      //     console.log(this.currentIndex);
      //   }
      // }

      // 判断方式2 注意这个方法需要在 this.themeTopYs中最后加一个 比较大的值
      for (let index = 0; index < length - 1; index++) {
        if (this.currentIndex !== index && (positoinY >= this.themeTopYs[index] && positoinY < this.themeTopYs[index + 1])) {
          this.currentIndex = index
          this.$refs.detailNavBar.currentIndex = this.currentIndex
          console.log(this.currentIndex);
        }
      }
      this.listenShowBackTop(positoinY)
    },
    addToCart() {
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.nowPrice
      product.iid = this.iid

      // this.$store.commit('addCart', product) //commit 调用  mutations 中方法
      //dispatch 调用  actions 中的方法
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // })
      // 通过 mapActions 映射过来的方法
      this.addCart(product).then(res => {
        console.log(res);

        this.$toast.show(res)
        // this.show = true
        // this.message = res
        // setTimeout(() => {
        //   this.show = false
        // }, 1500)
      })
    }
  },
  mixins: [itemListenerMixin, backTopMixin],
  created() {
    // 保存传过来的 iid
    this.iid = this.$route.params.iid
    getGoodsDetail(this.iid).then(result => {
      console.log(result);
      // 1.获取数据
      const data = result.result;

      // 2.获取顶部信息
      this.topImages = data.itemInfo.topImages;

      // 3.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

      // 4.创建店铺信息对象
      this.shop = new Shop(data.shopInfo)

      // 5.展示商品的详情数据
      this.detailInfo = data.detailInfo

      // 6.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 7.取出评论信息
      if (data.rate.cRate != 0) {
        this.commentInfo = data.rate.list[0]
      }

    })

    getRecommend().then(res => {
      console.log(res);
      this.recommends = res.data.list

      // // 1.第一次在这里获取 ->不对 没有渲染完成
      // this.themeTopYs = []
      // this.themeTopYs.push(0)
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

      // // 页面渲染完成以后回调
      // // 2.第二次尝试 在这里获取-> 不对，图片没有加载完成
      // this.$nextTick(() => {
      //
      //   this.themeTopYs = []
      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      //   console.log(this.themeTopYs);
      // })
    })

    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(9000000) // 为了 scrollListener 方法中的 判断
      console.log(this.themeTopYs);
    }, 500)


  },
  mounted() {
  },
  destroyed() {
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailBottomBar,
    // Toast,
  }
}
</script>

<style scoped>


#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 93px);
}
</style>
