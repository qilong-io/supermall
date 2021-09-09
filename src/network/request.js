import axios from "axios";
const baseURL = 'http://152.136.185.210:7878/api/m5'

export function request(config) {
  const instance = axios.create({
    baseURL: baseURL,
    timeout: 5000
  })
  // 请求拦截
  // axios.interceptors.request.use 请求拦截  全局拦截器
  // 使用场景：1.config 不符合服务器要求，可进行拦截调整config信息
  // 2.比如每次发送网络请求时，都希望在界面中显示一个网络请求的图标
  // 3.某些网络请求（比如登录（token）），必须携带一些特殊信息
  instance.interceptors.request.use(
    config => {
      // console.log(config);
      //显示加载动画
      return config
    },
    error => {
      console.log(error);
    })
  //响应拦截
  instance.interceptors.response.use(
    result => {
      // console.log(result);
      // 隐藏加载动画
      return result.data
    },
    error => {
      console.log(error);
    })
  return instance(config)
}

