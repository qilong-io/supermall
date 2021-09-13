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
