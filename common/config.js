// 环境配置（可根据实际需求扩展）
const ENV = {
  development: {
    baseUrl: "https://tax.bjkc010.com/api", // 本地开发环境
  },
  production: {
    baseUrl: "https://tax.bjkc010.com/api", // 生产环境
  },
};

// 获取当前环境（微信小程序可通过wx.getAccountInfoSync()获取）
const getEnv = () => {
  // #ifdef MP-WEIXIN
  const accountInfo = uni.getAccountInfoSync();
  return accountInfo.miniProgram.envVersion === "develop"
    ? "development"
    : "production";
  // #else
  return "development"; // 非小程序环境默认开发环境
  // #endif
};

// 导出当前环境的配置
export const config = {
  baseUrl: ENV[getEnv()].baseUrl,
  timeout: 10000, // 请求超时时间（ms）
  header: {
    "Content-Type": "application/json", // 默认请求头
  },
};
