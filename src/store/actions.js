import {
  ADD_COUNTER,
  ADD_TO_CART
} from "@/store/mutations-types";


export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // state.cartList.filter()

      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)


      // 普通方法
      // let oldProduct = null
      // for (let item of state.cartList) {
      //   if (item.iid === payload.iid) {
      //     oldProduct = item
      //   }
      // }

      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量 + 1')
      } else {
        payload.count = 1
        context.commit(ADD_TO_CART, payload)
        resolve('添加到购物车成功')
      }
    })
  }
}
