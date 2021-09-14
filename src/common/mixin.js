import {debounce} from "@/common/utils";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      newRefresh: null,
    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh, 500)

    this.itemImgListener = () => {
      this.newRefresh()
    }
    console.log('我是混入');
    //  监听goodsitem中图片加载完成事件 注意 main.js 中的配置
    this.$bus.$on('itemImgLoad', this.itemImgListener)
  }
}


import BackTop from "@/components/content/backTop/BackTop";
import {BACKTOP_DISTANCE} from "@/common/const";

export const backTopMixin = {
  components: {
    BackTop,
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    // 返回到頂部
    backTop() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    listenShowBackTop(positoinY) {
      this.isShowBackTop = positoinY > BACKTOP_DISTANCE
    },
  },
}
