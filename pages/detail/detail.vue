<template>
    <view class="detail-container">
        <view class="title">{{ news.title }}</view>
        <view class="meta">
            <text>{{ news.createtime }}</text>
        </view>
        <view class="content" v-html="news.content"></view>
        <image class="news-img" :src="$baseUrl + news.cover_img" mode="widthFix" />
    </view>
</template>

<script>
import { getNewsDetail } from '../../api/api';
export default {
    data() {
        return {
            news: {}
        }
    },
    onLoad(options) {
        // 可根据 options.id 请求新闻详情
        // 示例：this.fetchNewsDetail(options.id)
        this.fetchNewsDetail(options.id)
    },
    methods: {
        // fetchNewsDetail(id) {
        //   // 请求接口获取新闻详情
        // }
        async fetchNewsDetail(id) {
            try {
                const res = await getNewsDetail({ id: id })
                this.news = res.data
            }
            catch (err) {
                console.log(err);
            }
        }
    }
}
</script>

<style scoped>
.detail-container {
    padding: 24rpx;
    background: #fff;
}

.title {
    font-size: 36rpx;
    font-weight: bold;
    margin-bottom: 16rpx;
}

.meta {
    color: #888;
    font-size: 24rpx;
    margin-bottom: 24rpx;
    display: flex;
    gap: 24rpx;
}

.content {
    font-size: 28rpx;
    line-height: 1.8;
}
</style>