<template>
    <view class="row-btn-container">
        <button class="row-btn" @click="onWeChat">
            <svg viewBox="0 0 24 24" class="icon">
                <!-- 微信图标 SVG -->
                <circle cx="12" cy="12" r="10" fill="#fff" />
                <text x="12" y="16" text-anchor="middle" font-size="10" fill="#07c160">微信咨询</text>
            </svg>
        </button>
        <button class="row-btn" @click="contactService">
            <svg viewBox="0 0 24 24" class="icon">
                <!-- 电话图标 SVG -->
                <circle cx="12" cy="12" r="10" fill="#fff" />
                <text x="12" y="16" text-anchor="middle" font-size="10" fill="#07c160">电</text>
            </svg>
        </button>
    </view>
</template>

<script>
export default {
    data() {
        return {
            isQrCodeShow: false,
        }
    },
    methods: {
        onWeChat() {
            this.isQrCodeShow = !this.isQrCodeShow
        },
        // 联系客服
        contactService() {
            // #ifdef APP-PLUS
            plus.runtime.openURL("tel:18866668888");
            // #endif

            // 微信小程序使用客服会话
            // #ifdef MP-WEIXIN
            wx.openCustomerServiceChat({
                extInfo: { url: "" },
                corpId: "",
                success(res) { },
            });
            // #endif

            // 其他平台使用拨打电话
            uni.makePhoneCall({
                phoneNumber: "18866668888",
            });
        },
    }
}
</script>

<style scoped>
.row-btn-container {
    position: fixed;
    right: 30rpx;
    bottom: 400rpx;
    display: flex;
    flex-direction: column;
    gap: 16px;
    z-index: 1000;
}

.row-btn {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    background: #2196f3;
    border: none;
    box-shadow: 0 2px 8px rgba(33, 150, 243, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: box-shadow 0.2s;
}

.row-btn:hover {
    box-shadow: 0 4px 16px rgba(33, 150, 243, 0.3);
}

.icon {
    width: 64rpx;
    height: 64rpx;
}
</style>