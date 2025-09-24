import { createSSRApp } from "vue";
import App from "./App.vue";
import { req } from "./common/req.js";
import Common from "./common/common.js";

// 创建应用实例
export function createApp() {
  const app = createSSRApp(App);
  const baseUrl = "https://tax.bjkc010.com";

  // 挂载到全局（Vue2用Vue.prototype，Vue3用app.config.globalProperties）
  // #ifdef VUE3
  app.config.globalProperties.$req = req;
  // app.config.globalProperties.$common = Common;
  // #endif
  // #ifdef VUE2
  app.prototype.$req = req;
  app.prototype.$common = Common;
  // #endif
  app.config.globalProperties.$baseUrl = baseUrl;

  // 添加请求拦截器（示例：自动添加Token）
  req.useRequestInterceptor((config) => {
    const token = uni.getStorageSync("token");
    if (token) {
      config.header.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // 添加响应拦截器（示例：统一处理加载提示）
  let loadingInstance = null;
  req.useResponseInterceptor((res) => {
    // 隐藏加载提示（若有）
    if (loadingInstance) {
      uni.hideLoading();
      loadingInstance = null;
    }
    return res;
  });

  return { app };
}
