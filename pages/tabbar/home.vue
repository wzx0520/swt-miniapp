<template>
    <!-- 页面容器 -->
    <view class="page">
        <!-- 1. 自定义导航栏 -->
        <view class="custom-nav">
            <view class="nav-title">留沪帮</view>
        </view>

        <!-- 2. 搜索区域 -->
        <view class="search-section">
            <!-- 搜索框 -->
            <!-- <view class="search-box">
                <uni-icons type="search" size="18" color="#999"></uni-icons>
                <input class="search-input" placeholder="搜索热门文章" />
            </view> -->
        </view>


        <!-- 5. 公告栏 -->
        <view class="notice-section">
            <!-- 公告头（标题+工具按钮） -->
            <!-- <view class="notice-header">
                <text class="notice-title">2025年9月上海居转户公示名单</text>
                <view class="notice-tools">
                    <view class="tool-item wechat">微信咨询</view>
                    <view class="tool-item call">拨打电话</view>
                </view>
            </view> -->
            <!-- 公告内容+元数据 -->
            <view class="notice-content" v-for="item in newsData" :key="item.id" @click="toDetail(item.id)">
                <view class="content-left">
                    <text class="content-title">{{ item.title }}</text>
                    <view class="content-con">{{ item.sub_title }}</view>
                    <view class="content-meta">
                        <text class="meta-time">{{ item.createtime }}</text>
                    </view>
                </view>
                <view class="content-right">
                    <image class="news-img" :src="$baseUrl + item.cover_img" mode="widthFix" lazy-load="false"
                        binderror="" bindload="" />
                </view>
            </view>
        </view>
        <my-tabbar></my-tabbar>
        <!-- <row-btn></row-btn> -->
    </view>
</template>

<script>
import { getNewsData } from '@/api/api';

export default {
    data() {
        return {
            // 功能菜单数据（第一行）
            menuList1: [
                { icon: '/static/menu1.png', text: '积分模拟', path: '/pages/tabbar/point' },
                { icon: '/static/menu2.png', text: '社保计算', path: '/pages/tabbar/social' },
            ],
            // 功能菜单数据（第二行）
            menuList2: [
                { icon: '/static/menu6.png', text: '留学落户' },
                { icon: '/static/menu7.png', text: '子女入学' },
                { icon: '/static/menu8.png', text: '社保相关' },
                { icon: '/static/menu9.png', text: '个税相关' },
                { icon: '/static/menu10.png', text: '更多' }
            ],
            // TabBar 当前激活索引
            newsData: []
        }
    },
    onLoad() {
        this.fetchNewsData()
    },
    methods: {
        async fetchNewsData() {
            const res = await getNewsData({ pageNum: 1, pageSize: 10 })
            this.newsData = res.data.data

        },
        // 功能菜单点击事件（可根据需求跳转页面）
        handleMenuClick(item) {
            uni.navigateTo({
                url: item.path,
            });

        },
        // TabBar 切换事件（可根据需求跳转页面）
        switchTab(index) {
            switch (index) {
                case 0:
                    uni.redirectTo({ url: '/pages/tabbar/home' })
                    break
                case 1:
                    uni.redirectTo({ url: '/pages/tabbar/point' })
                    break
                case 2:
                    uni.redirectTo({ url: '/pages/tabbar/social' })
            }
        },
        // 跳转详情
        toDetail(id) {
            uni.navigateTo({
                url: `/pages/detail/detail?id=${id}`,
            })
        }
    }
}
</script>

<style scoped>
/* 页面基础样式 */
.page {
    background-color: #fff;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

/* ========== 1. 自定义导航栏 ========== */
.custom-nav {
    height: 44px;
    background-color: #409eff;
    /* 导航栏背景色 */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 16px;
    color: #fff;
}

.nav-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    /* 圆形头像 */
}

.nav-title {
    font-size: 18px;
    font-weight: bold;
}

.nav-right {
    display: flex;
    align-items: center;
}

.nav-more,
.nav-share {
    width: 24px;
    height: 24px;
    margin-left: 16px;
}

/* ========== 2. 搜索区域 ========== */
.search-section {
    background-color: #f5f5f5;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.search-box {
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 16px;
    /* 圆角 */
    padding: 4px 12px;
    width: 70%;
}

.search-input {
    flex: 1;
    margin-left: 8px;
    font-size: 14px;
    height: 32rpx;
    /* rpx 适配移动端 */
}

.share-section {
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 16px;
    padding: 4px 12px;
    width: 25%;
    justify-content: space-between;
}

.share-btn {
    font-size: 14px;
    color: #333;
}

.close-btn {
    font-size: 20px;
    color: #999;
}

/* ========== 3. 横幅广告 ========== */
.banner-section {
    width: 100%;
    background-color: #fff;
    padding: 8px 0;
}

.banner-img {
    width: 100%;
    border-radius: 8px;
    /* 图片圆角 */
}

/* ========== 4. 功能菜单 ========== */
.menu-section {
    padding: 16px;
    background-color: #fff;
}

.menu-row {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 16px;
}

.menu-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20%;
    /* 一行5个，占比20% */
}

.menu-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    /* 图标圆角 */
    margin-bottom: 4px;
}

.menu-text {
    font-size: 14px;
    color: #333;
}

/* ========== 5. 公告栏 ========== */
.notice-section {
    background-color: #fff;
    margin: 8px 0;
    border-radius: 8px;
    overflow: hidden;
    /* 裁剪圆角外的内容 */
}

.notice-header {
    background-color: #ffa500;
    /* 橙色背景 */
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #000;
}

.notice-title {
    font-size: 16px;
    font-weight: bold;
}

.notice-tools {
    display: flex;
}

.tool-item {
    font-size: 14px;
    margin-left: 16px;
    padding: 4px 8px;
    border-radius: 16px;
}

.wechat {
    background-color: #1aad19;
    /* 微信绿 */
    color: #fff;
}

.call {
    background-color: #2196f3;
    /* 电话蓝 */
    color: #fff;
}

.notice-content {
    display: flex;
    justify-content: space-between;
    padding: 30rpx;
    background-color: #fff;
    border-radius: 0 0 8px 8px;
    border-bottom: 1rpx solid #eee;
}

.content-title {
    font-size: 26rpx;
    font-weight: bold;
    line-height: 1.5;
    margin-bottom: 10rpx;
    display: block;
}

.content-meta {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #999;
}

.news-img {
    width: 120rpx;
}

.meta-views,
.meta-comments {
    margin-right: 16px;
}
</style>