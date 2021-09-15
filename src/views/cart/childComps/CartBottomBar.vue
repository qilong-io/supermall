<template>
  <div class="bottom-bar">
    <div class="check-content">
      <CheckButton class="check-button"
                   :is-checked="isSelectAll"
                   @checkClick="selectAll"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计:{{ totalPrice }}
    </div>

    <div class="calculate" @click="calcClick">
      去计算({{ checkLength }})
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
import {mapGetters} from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  methods: {
    selectAll() {
      if (this.isSelectAll) {
        this.cartList.forEach(item => item.checked = false)
      } else {
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show('请选择要购买的商品')
      }
    },
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false

      // 下边三种方式 都可以

      // 方式1
      // for (let item of this.cartList) {
      //   if (!item.checked) return false
      // }
      // return true

      // 方式2
      // return !(this.cartList.filter(item => !item.checked).length)

      // 方式3
      return !this.cartList.find(item => !item.checked)

    },
  }
}
</script>

<style scoped>

.bottom-bar {
  position: relative;
  display: flex;

  height: 40px;
  line-height: 40px;

  background-color: #eee;

  font-size: 14px;
}

.check-content {
  margin-left: 10px;
  width: 60px;

  display: flex;
  align-items: center;
}

.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.price {
  margin-left: 40px;
  flex: 1;
}

.calculate {
  width: 80px;
  background-color: var(--color-tint);
  color: white;

  text-align: center;
}


</style>
