<!-- pages/socialCalc/index.vue -->
<template>
    <view class="container">
        <!-- 多倍社保速算模块 -->
        <view class="section">
            <text class="section-title">多倍社保速算</text>

            <!-- 社保基数选择 -->
            <view class="base-tags">
                <text v-for="(item, index) in baseOptions" :key="index" class="base-tag"
                    :class="{ active: selectedBase === item.value }" @click="handleBaseSelect(item.value)">
                    {{ item.label }}
                </text>
            </view>

            <!-- 输入区域 -->
            <view class="input-group">
                <!-- 工资输入 -->
                <view class="input-row">
                    <text class="input-label">工资</text>
                    <input type="number" v-model.number="salary" class="input-field" placeholder="请输入工资">
                    <text class="unit">元</text>
                </view>

                <!-- 时间选择 -->
                <view class="input-row">
                    <text class="input-label">年份</text>
                    <picker mode="selector" :range="yearOptions" @change="handleYearChange" class="picker">
                        <view class="picker-text">{{ selectedYear }}</view>
                    </picker>
                </view>

                <view class="input-row">
                    <text class="input-label">月份</text>
                    <picker mode="selector" :range="monthOptions" @change="handleMonthChange" class="picker">
                        <view class="picker-text">{{ selectedMonth }}月</view>
                    </picker>
                </view>

                <!-- 专项扣除 -->
                <view class="input-row">
                    <text class="input-label">专项扣除</text>
                    <input type="number" v-model.number="specialDeduction" class="input-field" placeholder="请输入专项扣除">
                </view>

                <!-- 社保基数显示 -->
                <view class="input-row">
                    <text class="input-label">社保基数</text>
                    <input type="number" :value="socialBase" class="input-field" disabled>
                </view>

                <!-- 公积金选项 -->
                <view class="input-row">
                    <text class="input-label">是否缴纳公积金</text>
                    <view class="switch-group">
                        <radio :checked="hasHousingFund" @click="hasHousingFund = true" color="#1a8cff" />
                        <text>缴纳</text>
                        <radio :checked="!hasHousingFund" @click="hasHousingFund = false" color="#1a8cff" />
                        <text>未缴纳</text>
                    </view>
                </view>

                <!-- 补充公积金选项 -->
                <view class="input-row">
                    <text class="input-label">住房补充公积金</text>
                    <view class="switch-group">
                        <radio :checked="hasExtraFund" @click="hasExtraFund = true" color="#1a8cff" />
                        <text>缴纳</text>
                        <radio :checked="(!hasExtraFund)" @click="hasExtraFund = false" color="#1a8cff" />
                        <text>未缴</text>
                    </view>
                </view>
                <uni-data-select v-if="hasExtraFund" multiple v-model="extraValue" :localdata="extraRange"
                    @change="extraChange"></uni-data-select>
            </view>

            <!-- 操作按钮 -->
            <view class="btn-group">
                <button class="calc-btn" @click="handleCalculate">计算</button>
                <button class="save-btn" @click="handleSave">保存结果</button>
            </view>
        </view>

        <!-- 计算结果卡片 -->
        <view class="result-card" v-if="showResult">
            <!-- 关键数据汇总 -->
            <view class="summary">
                <view class="summary-item">
                    <text class="summary-label">个人所得税</text>
                    <text class="summary-value">{{ individualTax.toFixed(2) }}元</text>
                </view>
                <view class="summary-item">
                    <text class="summary-label">个人月度支出</text>
                    <text class="summary-value">{{ personalTotal.toFixed(1) }}元</text>
                </view>
                <view class="summary-item">
                    <text class="summary-label">单位月度支出</text>
                    <text class="summary-value">{{ companyTotal.toFixed(1) }}元</text>
                </view>
                <view class="summary-item">
                    <text class="summary-label">总月度支出</text>
                    <text class="summary-value">{{ totalExpense.toFixed(2) }}元</text>
                </view>
            </view>

            <!-- 明细表格 -->
            <view class="detail-section">
                <text class="detail-title">计算明细</text>

                <!-- 个人应缴部分 -->
                <view class="detail-table">
                    <view class="table-header">
                        <text class="table-col">个人应缴部分</text>
                        <text class="table-col">金额(比例)</text>
                    </view>
                    <view v-for="(item, idx) in personalDetails" :key="'personal-' + idx" class="table-row">
                        <text class="table-col">{{ item.name }}</text>
                        <text class="table-col">{{ item.amount.toFixed(1) }}({{ item.rate }}%)</text>
                    </view>
                    <view class="table-row total">
                        <text class="table-col">社保缴纳金</text>
                        <text class="table-col">{{ personalTotal.toFixed(1) }}</text>
                    </view>
                </view>

                <!-- 企业应缴部分 -->
                <view class="detail-table">
                    <view class="table-header">
                        <text class="table-col">企业应缴部分</text>
                        <text class="table-col">金额(比例)</text>
                    </view>
                    <view v-for="(item, idx) in companyDetails" :key="'company-' + idx" class="table-row">
                        <text class="table-col">{{ item.name }}</text>
                        <text class="table-col">{{ item.amount.toFixed(1) }}({{ item.rate }}%)</text>
                    </view>
                    <view class="table-row total">
                        <text class="table-col">单位应缴总额</text>
                        <text class="table-col">{{ companyTotal.toFixed(1) }}</text>
                    </view>
                </view>
            </view>

            <!-- 简洁数据展示 -->
            <view class="simple-data">
                <view class="data-item">
                    <text class="data-label">报税基数</text>
                    <view class="data-bubble">
                        <text class="data-value">{{ taxableBase.toFixed(0) }}</text>
                        <image src="/static/phone-icon.png" class="data-icon" mode="aspectFit" />
                    </view>
                </view>
                <view class="data-item">
                    <text class="data-label">个人所得税</text>
                    <view class="data-bubble">
                        <text class="data-value">{{ individualTax.toFixed(2) }}</text>
                        <image src="/static/add-icon.png" class="data-icon" mode="aspectFit" />
                    </view>
                </view>
                <view class="data-item">
                    <text class="data-label">税后月薪</text>
                    <view class="data-bubble">
                        <text class="data-value">{{ afterTaxSalary.toFixed(0) }}</text>
                    </view>
                </view>
            </view>
        </view>

        <!-- 底部操作栏 -->
        <!-- <view class="footer">
            <view class="footer-btn" @click="handleWechat">
                <image src="/static/wechat-icon.png" class="footer-icon" mode="aspectFit" />
                <text>微信咨询</text>
            </view>
            <view class="footer-btn" @click="handleCall">
                <image src="/static/call-icon.png" class="footer-icon" mode="aspectFit" />
                <text>拨打电话</text>
            </view>
        </view> -->
    </view>
    <my-tabbar></my-tabbar>
    <!-- <row-btn></row-btn> -->
</template>

<script>
export default {
    data() {
        return {
            baseOptions: [
                { label: '最低社保基数', value: 0.6 },
                { label: '80%社保基数', value: 0.8 },
                { label: '1倍社保基数', value: 1 },
                { label: '1.5倍社保基数', value: 1.5 },
                { label: '2倍社保基数', value: 2 },
                { label: '3倍社保基数', value: 3 }
            ],
            extraValue: [0.01, 0.02, 0.03, 0.04, 0.05],
            extValue: '',
            extraRange: [{ "value": 0.01, "text": "1%" }, { "value": 0.02, "text": "2%" }, { "value": 0.03, "text": "3%" }, { "value": 0.04, "text": "4%" }, { "value": 0.05, "text": "5%" }],
            selectedBase: 1,
            yearOptions: ['2024年7月-2025年6月', '2023年7月-2024年6月', '2022年7月-2023年6月'],
            selectedYear: '2024年7月-2025年6月',
            monthOptions: Array.from({ length: 12 }, (_, i) => `${i + 1}月`),
            selectedMonth: 1,
            salary: 11396,
            specialDeduction: 0,
            hasHousingFund: true,
            hasExtraFund: false,
            showResult: false,
            personalDetails: [],
            personalTotal: 0,
            companyDetails: [],
            companyTotal: 0,
            taxableBase: 0,
            individualTax: 0,
            afterTaxSalary: 0
        };
    },
    computed: {
        socialBase() {
            const base = 11396; // 2024年上海1倍社保基数
            if (this.selectedBase === 0.6) {
                this.salary = 7384
                return 7384
            }
            this.salary = Math.round(base * this.selectedBase);
            return Math.round(base * this.selectedBase);
        },
        totalExpense() {
            console.log(this.individualTax);

            return this.individualTax + this.personalTotal + this.companyTotal;
        }
    },
    methods: {
        handleBaseSelect(value) {
            this.selectedBase = value;
            this.showResult = false;
        },
        handleYearChange(e) {
            this.selectedYear = this.yearOptions[e.detail.value];
        },
        handleMonthChange(e) {
            this.selectedMonth = e.detail.value + 1;
        },
        extraChange(e) {
            this.extValue = e
            console.log(this.extValue * 100);

        },
        handleCalculate() {
            // 计算个人缴纳部分
            const pension = this.salary * 0.08;
            const medical = this.salary * 0.02;
            const unemployment = this.salary * 0.005;
            const housing = this.hasHousingFund ? this.salary * 0.07 : 0;
            const extraHousing = this.hasExtraFund ? this.salary * 0.05 : 0;

            this.personalDetails = [
                { name: '养老保险金', amount: pension, rate: 8 },
                { name: '医疗保险金', amount: medical, rate: 2 },
                { name: '失业保险金', amount: unemployment, rate: 0.5 },
                { name: '基本住房公积金', amount: housing, rate: 7 },
                { name: '补充住房公积金', amount: this.salary * this.extValue, rate: this.extValue * 100 }
            ];
            this.personalTotal = pension + medical + unemployment + housing + this.salary * this.extValue;

            // 计算企业缴纳部分
            const pensionCompany = this.salary * 0.16;
            const medicalCompany = this.salary * 0.095;
            const unemploymentCompany = this.salary * 0.005;
            const injury = this.salary * 0.002;
            const maternity = this.salary * 0.01;
            const housingCompany = this.hasHousingFund ? this.salary * 0.07 : 0;
            const extraHousingCompany = this.hasExtraFund ? this.salary * this.extValue : 0;

            this.companyDetails = [
                { name: '养老保险金', amount: pensionCompany, rate: 16 },
                { name: '医疗保险金', amount: medicalCompany, rate: 9.5 },
                { name: '失业保险金', amount: unemploymentCompany, rate: 0.5 },
                { name: '工伤保险金', amount: injury, rate: 0.2 },
                { name: '生育保险金', amount: maternity, rate: 1 },
                { name: '基本住房公积金', amount: housingCompany, rate: 7 },
                { name: '补充住房公积金', amount: extraHousingCompany, rate: this.extValue * 100 || 0 }
            ];
            this.companyTotal = pensionCompany + medicalCompany + unemploymentCompany +
                injury + maternity + housingCompany + extraHousingCompany;

            // 计算个税和税后工资
            this.taxableBase = this.salary - this.personalTotal - this.specialDeduction;
            this.individualTax = this.calculateTax(this.taxableBase);
            this.afterTaxSalary = this.salary - this.personalTotal - this.individualTax;

            this.showResult = true;
        },
        calculateTax(income) {
            const threshold = 5000;
            if (income <= threshold) return 0;
            const taxable = income - threshold;
            return taxable * 0.03;
        },
        handleSave() {
            uni.showToast({ title: '结果已保存', icon: 'success' });
        },
        handleWechat() {
            uni.showModal({ title: '微信咨询', content: '请添加客服微信：fhqx_kf' });
        },
        handleCall() {
            uni.makePhoneCall({ phoneNumber: '400-888-9999' });
        }
    },
    mounted() {
        this.handleCalculate();
    }
};
</script>

<style lang="scss">
.container {
    padding: 30rpx 20rpx;
    background-color: #f7f7f7;
    min-height: 100vh;
}

.section {
    border-radius: 16rpx;
    padding: 30rpx 10rpx;
    margin-bottom: 20rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);

    .section-title {
        font-size: 32rpx;
        font-weight: 600;
        color: #333;
        margin-bottom: 30rpx;
        display: block;
    }
}

.base-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 20rpx;
    margin-bottom: 30rpx;

    .base-tag {
        padding: 12rpx 24rpx;
        background: #f5f5f5;
        border-radius: 40rpx;
        font-size: 28rpx;
        color: #666;
        transition: all 0.3s;

        &.active {
            background: #1a8cff;
            color: white;
            box-shadow: 0 4rpx 12rpx rgba(26, 140, 255, 0.2);
        }
    }
}

.input-group {
    .input-row {
        display: flex;
        align-items: center;
        margin-bottom: 30rpx;

        .input-label {
            width: 160rpx;
            font-size: 30rpx;
            color: #666;
        }

        .input-field {
            flex: 1;
            height: 80rpx;
            border: 2rpx solid #eee;
            border-radius: 12rpx;
            padding: 0 20rpx;
            font-size: 30rpx;
            color: #333;

            &:focus {
                border-color: #1a8cff;
                outline: none;
            }
        }

        .unit {
            font-size: 30rpx;
            color: #666;
            margin-left: 20rpx;
        }

        .picker {
            flex: 1;

            .picker-text {
                height: 80rpx;
                line-height: 80rpx;
                border: 2rpx solid #eee;
                border-radius: 12rpx;
                padding: 0 20rpx;
                font-size: 30rpx;
                color: #333;
            }
        }

        .switch-group {
            display: flex;
            align-items: center;
            gap: 40rpx;
            flex: 1;

            radio {
                transform: scale(0.8);

                &::before {
                    border-color: #ccc;
                }

                &:checked::before {
                    border-color: #1a8cff;
                }

                &:checked::after {
                    background: #1a8cff;
                }
            }

            text {
                font-size: 30rpx;
                color: #333;
            }
        }
    }
}

.btn-group {
    display: flex;
    gap: 20rpx;
    margin-top: 40rpx;

    button {
        flex: 1;
        height: 90rpx;
        line-height: 90rpx;
        border-radius: 16rpx;
        font-size: 32rpx;
        font-weight: 500;
        border: none;
        transition: all 0.3s;

        &::after {
            border: none;
        }
    }

    .calc-btn {
        background: #1a8cff;
        color: white;
        box-shadow: 0 4rpx 12rpx rgba(26, 140, 255, 0.2);

        &:active {
            background: #0066cc;
        }
    }

    .save-btn {
        background: #f5f5f5;
        color: #333;

        &:active {
            background: #eee;
        }
    }
}

.result-card {
    background: white;
    border-radius: 16rpx;
    padding: 30rpx 20rpx;
    margin-bottom: 20rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);

    .summary {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20rpx;
        margin-bottom: 30rpx;

        .summary-item {
            background: #f9f9f9;
            padding: 20rpx;
            border-radius: 12rpx;

            .summary-label {
                font-size: 28rpx;
                color: #666;
                margin-bottom: 10rpx;
                display: block;
            }

            .summary-value {
                font-size: 32rpx;
                font-weight: 600;
                color: #333;
            }
        }
    }

    .detail-section {
        .detail-title {
            font-size: 32rpx;
            font-weight: 600;
            color: #333;
            margin-bottom: 20rpx;
            display: block;
        }

        .detail-table {
            background: white;
            border-radius: 12rpx;
            margin-bottom: 20rpx;
            overflow: hidden;

            .table-header {
                display: flex;
                background: #f0f8ff;
                padding: 20rpx;

                .table-col {
                    flex: 1;
                    font-size: 28rpx;
                    font-weight: 500;
                    color: #333;
                }
            }

            .table-row {
                display: flex;
                padding: 20rpx;
                border-bottom: 2rpx solid #f5f5f5;

                &:last-child {
                    border-bottom: none;
                }

                .table-col {
                    flex: 1;
                    font-size: 28rpx;
                    color: #666;

                    &:last-child {
                        color: #333;
                        font-weight: 500;
                    }
                }

                &.total {
                    background: #f9f9f9;

                    .table-col {
                        color: #333;
                        font-weight: 600;
                    }
                }
            }
        }
    }

    .simple-data {
        margin-top: 30rpx;

        .data-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20rpx;

            .data-label {
                font-size: 30rpx;
                color: #666;
                width: 160rpx;
            }

            .data-bubble {
                flex: 1;
                background: #e6f2ff;
                padding: 16rpx 24rpx;
                border-radius: 24rpx;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .data-value {
                    font-size: 32rpx;
                    font-weight: 600;
                    color: #1a8cff;
                }

                .data-icon {
                    width: 40rpx;
                    height: 40rpx;
                    margin-left: 16rpx;
                }
            }
        }
    }
}

.footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    display: flex;
    padding: 20rpx;
    box-shadow: 0 -4rpx 12rpx rgba(0, 0, 0, 0.05);

    .footer-btn {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8rpx;

        .footer-icon {
            width: 48rpx;
            height: 48rpx;
        }

        text {
            font-size: 26rpx;
            color: #333;
        }
    }
}
</style>