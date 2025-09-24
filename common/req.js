import { config } from "./config";

class Req {
  constructor() {
    this.baseUrl = config.baseUrl;
    this.timeout = config.timeout;
    this.header = config.header;
    // 请求拦截器数组（可外部扩展）
    this.requestInterceptors = [];
    // 响应拦截器数组（可外部扩展）
    this.responseInterceptors = [];
  }

  // 添加请求拦截器
  useRequestInterceptor(interceptor) {
    this.requestInterceptors.push(interceptor);
  }

  // 添加响应拦截器
  useResponseInterceptor(interceptor) {
    this.responseInterceptors.push(interceptor);
  }

  // 发起请求
  request(options = {}) {
    const { url, method = "GET", data = {}, header = {} } = options;

    // 合并默认配置与自定义配置
    const requestOptions = {
      url: this.baseUrl + url,
      method,
      data,
      header: { ...this.header, ...header },
      timeout: this.timeout,
    };

    // 执行请求拦截器
    this.requestInterceptors.forEach((interceptor) => {
      interceptor(requestOptions);
    });

    return new Promise((resolve, reject) => {
      uni.request({
        ...requestOptions,
        success: (res) => {
          // 执行响应拦截器
          let processedRes = res;
          this.responseInterceptors.forEach((interceptor) => {
            processedRes = interceptor(processedRes);
          });

          // 根据状态码处理结果
          if (processedRes.statusCode >= 200 && processedRes.statusCode < 300) {
            resolve(processedRes.data); // 成功返回数据
          } else if (processedRes.statusCode === 401) {
            // Token失效，跳转登录页
            this.handleUnauthorized();
            reject(new Error("未登录或登录已过期"));
          } else {
            // 其他错误（如404、500）
            uni.showToast({
              title: processedRes.data?.msg || "请求失败",
              icon: "none",
              duration: 2000,
            });
            reject(new Error(processedRes.data?.msg || "请求失败"));
          }
        },
        fail: (err) => {
          // 网络错误处理
          uni.showToast({
            title: "网络异常，请检查网络连接",
            icon: "none",
            duration: 2000,
          });
          reject(new Error("网络异常"));
        },
      });
    });
  }

  // 处理未授权（跳转登录页）
  handleUnauthorized() {
    uni.removeStorageSync("token"); // 清除本地Token
    setTimeout(() => {
      uni.reLaunch({
        url: "/pages/login/index", // 跳转至登录页
      });
    }, 1500);
  }

  // 快捷方法（GET/POST/PUT/DELETE）
  get(url, data = {}, header = {}) {
    return this.request({ url, method: "GET", data, header });
  }

  post(url, data = {}, header = {}) {
    return this.request({ url, method: "POST", data, header });
  }

  put(url, data = {}, header = {}) {
    return this.request({ url, method: "PUT", data, header });
  }

  delete(url, data = {}, header = {}) {
    return this.request({ url, method: "DELETE", data, header });
  }
}

// 导出单例
export const req = new Req();
