import {request} from "@/network/request";

const multidata = '/home/multidata'

export function getHomeMultidata() {
  return request({
    url: multidata,
  })
}

