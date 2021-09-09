import {request} from "@/network/request";

const multiData = '/home/multidata'
const homeData = '/home/data'

export function getHomeMultidata() {
  return request({
    url: multiData,
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: homeData,
    params: {
      type: type,
      page: page,
    },
  })
}

