import { req } from "../common/req.js";

// 获取新闻数据
export const getNewsData = (params) => {
  const { pageNum, pageSize } = params;
  return req.get(
    `/article/selectArticleList?list_rows=${pageSize}&page=${pageNum}`
  );
};

// 获取新闻详情
export const getNewsDetail = (params) => {
  const { id } = params;
  return req.get(`/article/infoArticle?id=${id}`);
};
