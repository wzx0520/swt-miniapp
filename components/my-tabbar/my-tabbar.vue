<template>
    <view class="tabbar-section">
        <view class="navigator">
            <view ref='warpper' class="warpper">
                <view ref="navItem" class="navigator-item" v-for="(item, index) in tabList" :key="item.pagePath"
                    @click="switchTab(item, index)" :data-index='index'>
                    <image class="icon" src="/static/news.jpg">
                    </image>
                    <!-- <image class="icon" :src="$jointImage(item.selectedIconType)" v-else></image> -->
                    <text :class="['item-text', { 'text-active': selectedIndex === index }]">{{ item.text
                        }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            name: 'TabBar',
            tabIndex: 0,
            tabList: [],
        }
    },
    mounted() {
        this.alliconSet()
        console.log(this.tabList);

    },
    methods: {
        alliconSet() {
            this.tabList = [{
                pagePath: '/pages/tabbar/home',
                text: '最新资讯',
                iconPath: '/static/news.jpg'
            }, {
                pagePath: '/pages/tabbar/point',
                text: '积分模拟',
                iconPath: '/static/point.jpg'
            }, {
                pagePath: '/pages/tabbar/social',
                text: '社保速算',
                iconPath: '/static/calc.jpg'
            }]
        },
        switchTab(items, indexs) {
            if (this.selectedIndex === indexs) return;
            uni.redirectTo({
                url: `${this.tabList[indexs].pagePath}`
            });
            this.tabList.forEach((v, i) => {
                if (items.pagePath === v.pagePath) {
                    uni.setStorageSync('selectedIndex', indexs);
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.tabbar-section {
    position: fixed;
    bottom: 0;
    margin: 0 auto;
    left: 0;
    right: 0;
    width: 90%;
    height: 80rpx;
    padding: 20rpx 40rpx;
    z-index: 999;
    /* 顶部分割线 */
}

.warpper {
    display: flex;
    justify-content: space-between;
    width: auto;
    transition-timing-function: ease-out;
}

.navigator-item {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100rpx;
    height: 100%;
}

.item-text {
    margin-top: 6rpx;
    color: #777E86;
    font-size: 24rpx;
}

.text-active {
    color: #00F7FF !important;
}

.icon {
    width: 48rpx;
    height: 48rpx;
}
</style>