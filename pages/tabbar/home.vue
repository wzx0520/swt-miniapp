<template>
    <!-- 页面容器 -->
    <view class="page">
        <!-- 1. 自定义导航栏 -->
        <view class="custom-nav">
            <view class="nav-left">
                <!-- 头像图标（替换为实际图片路径） -->
                <image class="nav-avatar" src="/static/avatar.png" mode="aspectFill"></image>
            </view>
            <view class="nav-title">非沪籍事务通</view>
            <view class="nav-right">
                <!-- 更多菜单图标 -->
                <image class="nav-more" src="/static/more.png" mode="aspectFill"></image>
                <!-- 分享图标 -->
                <image class="nav-share" src="/static/share.png" mode="aspectFill"></image>
            </view>
        </view>

        <!-- 2. 搜索区域 -->
        <view class="search-section">
            <!-- 搜索框 -->
            <view class="search-box">
                <uni-icons type="search" size="18" color="#999"></uni-icons>
                <input class="search-input" placeholder="搜索热门文章" />
            </view>
        </view>

        <!-- 3. 横幅广告 -->
        <!-- <view class="banner-section">
            <image class="banner-img" src="/static/banner.png" mode="widthFix"></image>
        </view> -->

        <!-- 4. 功能菜单（两行图标+文字） -->
        <view class="menu-section">
            <!-- 第一行菜单 -->
            <view class="menu-row">
                <view class="menu-item" v-for="(item, index) in menuList1" :key="index" @click="handleMenuClick(item)">
                    <image class="menu-icon" :src="item.icon" mode="aspectFill"></image>
                    <text class="menu-text">{{ item.text }}</text>
                </view>
            </view>
            <!-- 第二行菜单 -->
            <!-- <view class="menu-row">
                <view class="menu-item" v-for="(item, index) in menuList2" :key="index" @click="handleMenuClick(item)">
                    <image class="menu-icon" :src="item.icon" mode="aspectFill"></image>
                    <text class="menu-text">{{ item.text }}</text>
                </view>
            </view> -->
        </view>

        <!-- 5. 公告栏 -->
        <view class="notice-section">
            <!-- 公告头（标题+工具按钮） -->
            <view class="notice-header">
                <text class="notice-title">2025年9月上海居转户公示名单</text>
                <view class="notice-tools">
                    <view class="tool-item wechat">微信咨询</view>
                    <view class="tool-item call">拨打电话</view>
                </view>
            </view>
            <!-- 公告内容+元数据 -->
            <view class="notice-content">
                <text class="content-text">2025年9月第一批居转户完整公示名单：共20成功落户上海！</text>
                <view class="content-meta">
                    <text class="meta-views">👀 1039</text>
                    <text class="meta-comments">💬 43</text>
                    <text class="meta-time">2025-09-16 14:50:43</text>
                </view>
            </view>
        </view>

        <!-- 6. 底部TabBar -->
        <view class="tabbar-section">
            <view class="tab-item" :class="{ active: tabIndex === 0 }" @click="switchTab(0)">
                <image class="tab-icon" src="/static/tab1.png" mode="aspectFill"></image>
                <text class="tab-text">最新资讯</text>
            </view>
            <view class="tab-item" :class="{ active: tabIndex === 1 }" @click="switchTab(1)">
                <image class="tab-icon" src="/static/tab2.png" mode="aspectFill"></image>
                <text class="tab-text">政策普及</text>
            </view>
            <view class="tab-item" :class="{ active: tabIndex === 2 }" @click="switchTab(2)">
                <image class="tab-icon" src="/static/tab3.png" mode="aspectFill"></image>
                <text class="tab-text">查询工具</text>
            </view>
            <view class="tab-item" :class="{ active: tabIndex === 3 }" @click="switchTab(3)">
                <image class="tab-icon" src="/static/tab4.png" mode="aspectFill"></image>
                <text class="tab-text">条件提升</text>
            </view>
            <view class="tab-item" :class="{ active: tabIndex === 4 }" @click="switchTab(4)">
                <image class="tab-icon" src="/static/tab5.png" mode="aspectFill"></image>
                <text class="tab-text">办理地址</text>
            </view>
        </view>
    </view>
</template>

<script>
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
            tabIndex: 0
        }
    },
    methods: {
        // 功能菜单点击事件（可根据需求跳转页面）
        handleMenuClick(item) {
            uni.navigateTo({
                url: item.path,
            });

        },
        // TabBar 切换事件（可根据需求跳转页面）
        switchTab(index) {
            this.tabIndex = index
            uni.showToast({ title: `切换到${this.tabBarList[index].text}`, icon: 'none' })
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
    justify-content: space-between;
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
    padding: 12px 16px;
    background-color: #fff;
    border-radius: 0 0 8px 8px;
}

.content-text {
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 8px;
    display: block;
}

.content-meta {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #999;
}

.meta-views,
.meta-comments {
    margin-right: 16px;
}

/* ========== 6. 底部TabBar ========== */
.tabbar-section {
    position: fixed;
    /* 固定在底部 */
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-top: 1px solid #eee;
    /* 顶部分割线 */
}

.tab-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.tab-icon {
    width: 24px;
    height: 24px;
    margin-bottom: 2px;
}

.tab-text {
    font-size: 12px;
    color: #999;
}

.tab-item.active .tab-text {
    color: #409eff;
    /* 激活态文字色 */
}
</style>