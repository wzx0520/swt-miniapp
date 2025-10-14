<template>
    <view class="tabbar-section">
        <view class="tab-item" :class="{ active: tabIndex === 0 }" @click="switchTab(0)">
            <image class="tab-icon" src="https://tax.bjkc010.com/assets/img/1.jpg" mode="widthFix"></image>
            <text class="tab-text">最新资讯</text>
        </view>
        <view class="tab-item" :class="{ active: tabIndex === 1 }" @click="switchTab(1)">
            <image class="tab-icon" src="https://tax.bjkc010.com/assets/img/2.jpg" mode="widthFix"></image>
            <text class="tab-text">积分模拟</text>
        </view>
        <view class="tab-item" :class="{ active: tabIndex === 2 }" @click="switchTab(2)">
            <image class="tab-icon" src="https://tax.bjkc010.com/assets/img/3.jpg" mode="widthFix"></image>
            <text class="tab-text">社保计算</text>
        </view>
    </view>
</template>

<script>
export default {
    name: 'TabBar',
    tabIndex: 0,
    methods: {
        switchTab(index) {
            this.tabIndex = index
            switch (index) {
                case 0:
                    uni.redirectTo({ url: '/pages/tabbar/home' })
                    break;
                case 1:
                    uni.redirectTo({ url: '/pages/tabbar/point' })
                    break
                case 2:
                    uni.redirectTo({ url: '/pages/tabbar/social' })
                    break
                default:
                    break;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
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