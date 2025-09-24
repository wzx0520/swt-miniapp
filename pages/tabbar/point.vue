<!-- pages/scoreAssessment/index.vue -->
<template>
    <view class="container top-con">
        <!-- 顶部导航栏 -->
        <view class="section-title">2025积分评测</view>
        <view class="tip-text">请在符合您情况的选项内打勾或在文本框中填写相应的数字与内容</view>
        <!-- 参与人数提示 -->
        <view class="participate-tip">
            目前已有*人参与测评
        </view>
        <view class="section-subtitle white">-基础指标和分值-</view>

        <!-- 评测主体内容 -->
        <scroll-view class="assessment-scroll" scroll-y>
            <!-- 2025积分评测模块 -->
            <view class="evaluation-card">

                <!-- 基础指标和分值 -->
                <view class="indicator-section">
                    <!-- 年龄指标 -->
                    <view class="question-item">
                        <view class="q-title">1、您的年龄(最高30分)</view>
                        <input type="number" v-model.number="age" class="input-field" placeholder="请输入年龄（周岁）">
                    </view>

                    <!-- 教育背景 -->
                    <view class="question-item">
                        <view class="q-title">2、教育背景(最高100分)</view>
                        <view class="sub-tip">（学历与职称，只可二选一进行积分）</view>
                        <radio-group class="radio-group" @change="handleEducationChange">
                            <label v-for="(item, index) in educationOptions" :key="index" class="radio-label">
                                <radio :value="item.value" :checked="education === item.value" />
                                <view class="radio-text">{{ item.label }}</view>
                            </label>
                        </radio-group>
                    </view>
                </view>

                <!-- 专业技术职称和技能等级 -->
                <view class="question-item">
                    <view class="q-title">3、专业技术职称和技能等级（最高140分）</view>
                    <view class="sub-tip">（学历与职称，只可二选一进行积分）</view>

                    <radio-group class="radio-group" @change="handleProfessionalChange">
                        <label v-for="(item, index) in professionalOptions" :key="index" class="radio-label">
                            <radio :value="item.value" :checked="professional === item.value" />
                            <view class="radio-text">{{ item.label }}</view>
                        </label>
                    </radio-group>

                    <!-- 技能等级选择 -->
                    <view v-if="professional === 'skill'" class="sub-question">
                        <picker mode="selector" :range="skillLevelOptions" @change="handleSkillLevelChange"
                            class="picker">
                            <view class="picker-text">
                                {{ skillLevel || '请选择技能等级' }}
                            </view>
                        </picker>
                    </view>

                    <!-- 专业技术职称选择 -->
                    <view v-if="professional === 'title'" class="sub-question">
                        <picker mode="selector" :range="titleOptions" @change="handleTitleChange" class="picker">
                            <view class="picker-text">
                                {{ professionalTitle || '请选择职称' }}
                            </view>
                        </picker>
                    </view>

                    <!-- 社保缴费基数 -->
                    <view class="sub-question">
                        <view class="sub-title">最近一年累计6个月的缴纳社会保险费基数</view>
                        <picker mode="selector" :range="socialBaseOptions" @change="handleSocialBaseChange"
                            class="picker">
                            <view class="picker-text">
                                {{ socialBase || '请选择社保缴费基数' }}
                            </view>
                        </picker>
                    </view>

                    <!-- 上海上年度职工平均工资 -->
                    <view class="sub-question">
                        <view class="sub-title">上海市上年度职工平均工资</view>
                        <input type="number" v-model.number="avgSalary" class="input-field" placeholder="请输入平均工资">
                    </view>
                </view>

                <!-- 社保缴纳年限 -->
                <view class="question-item last-item">
                    <view class="q-title">4、在本市工作及缴纳职工社会保险年限（每年积3分）</view>
                    <radio-group class="radio-group" @change="handleSocialYearChange">
                        <label class="radio-label">
                            <radio value="no" :checked="socialYear === 'no'" />
                            <view class="radio-text">未在上海缴纳社会保险</view>
                        </label>
                        <label class="radio-label">
                            <radio value="yes" :checked="socialYear === 'yes'" />
                            <view class="radio-text">缴纳城镇职工社会保险，已缴纳{{ socialYearNum }}年</view>
                        </label>
                    </radio-group>
                    <input v-if="socialYear === 'yes'" type="number" v-model.number="socialYearNum"
                        class="input-field small" placeholder="请输入缴纳年数">
                </view>
            </view>
        </scroll-view>
    </view>
    <view class="container">
        <!-- 评测主体内容 -->
        <scroll-view class="assessment-scroll" scroll-y>
            <!-- 加分指标及分值 -->
            <view class="section-subtitle">- 加分指标及分值 -</view>
            <view class="evaluation-card">
                <view class="indicator-section">
                    <!-- 投资纳税或带动本地就业 -->
                    <view class="question-item">
                        <view class="q-title">6、投资纳税或带动本地就业（最高120分）</view>
                        <radio-group class="radio-group" @change="handleInvestChange">
                            <label class="radio-label">
                                <radio value="no" :checked="investStatus === 'no'" />
                                <view class="radio-text">否</view>
                            </label>
                            <label class="radio-label">
                                <radio value="yes" :checked="investStatus === 'yes'" />
                                <view class="radio-text">是，最近三年纳税总额{{ investAmount }}万元（您的占股百分比{{ investRatio
                                }}%），企业聘用{{ investEmployees }}名上海户籍人员。</view>
                            </label>
                        </radio-group>

                        <view v-if="investStatus === 'yes'" class="sub-inputs">
                            <input type="number" v-model.number="investAmount" class="input-field small"
                                placeholder="请输入纳税总额（万元）">
                            <input type="number" v-model.number="investRatio" class="input-field small"
                                placeholder="请输入占股百分比">
                            <input type="number" v-model.number="investEmployees" class="input-field small"
                                placeholder="请输入聘用上海户籍人数">
                        </view>
                    </view>

                    <!-- 最近连续3年缴纳职工社会保险费基数 -->
                    <view class="question-item">
                        <view class="q-title">7、最近连续3年缴纳职工社会保险费基数</view>
                        <radio-group class="radio-group" @change="handleSocialBaseYearChange">
                            <label v-for="(item, index) in socialBaseYearOptions" :key="index" class="radio-label">
                                <radio :value="item.value" :checked="socialBaseYear === item.value" />
                                <view class="radio-text">{{ item.label }}</view>
                            </label>
                        </radio-group>
                    </view>
                </view>

                <!-- 第8-11题 -->
                <view class="indicator-section">

                    <!-- 特定公共服务领域 -->
                    <view class="question-item">
                        <view class="q-title">8、特定的公共服务领域（5年后，1年积4分）</view>
                        <radio-group class="radio-group" @change="handlePublicServiceChange">
                            <label class="radio-label">
                                <radio value="no" :checked="publicService === 'no'" />
                                <view class="radio-text">否</view>
                            </label>
                            <label class="radio-label">
                                <radio value="yes" :checked="publicService === 'yes'" />
                                <view class="radio-text">是，至今已工作{{ publicServiceYears }}年</view>
                            </label>
                        </radio-group>
                        <input v-if="publicService === 'yes'" type="number" v-model.number="publicServiceYears"
                            class="input-field small" placeholder="请输入工作年数">
                    </view>

                    <!-- 远郊重点区域 -->
                    <view class="question-item">
                        <view class="q-title">9、远郊重点区域（5年后，1年积2分）</view>
                        <radio-group class="radio-group" @change="handleRemoteAreaChange">
                            <label class="radio-label">
                                <radio value="no" :checked="remoteArea === 'no'" />
                                <view class="radio-text">否</view>
                            </label>
                            <label class="radio-label">
                                <radio value="yes" :checked="remoteArea === 'yes'" />
                                <view class="radio-text">是，至今已居住{{ remoteAreaYears }}年</view>
                            </label>
                        </radio-group>
                        <input v-if="remoteArea === 'yes'" type="number" v-model.number="remoteAreaYears"
                            class="input-field small" placeholder="请输入居住年数">
                    </view>

                    <!-- 全日制应届高校毕业生 -->
                    <view class="question-item">
                        <view class="q-title">10、是否全日制应届高校大学毕业生</view>
                        <radio-group class="radio-group" @change="handleFreshGraduateChange">
                            <label class="radio-label">
                                <radio value="no" :checked="freshGraduate === 'no'" />
                                <view class="radio-text">否</view>
                            </label>
                            <label class="radio-label">
                                <radio value="yes" :checked="freshGraduate === 'yes'" />
                                <view class="radio-text">是</view>
                            </label>
                        </radio-group>
                    </view>

                    <!-- 上海工作期间获表彰奖励 -->
                    <view class="question-item last-item">
                        <view class="q-title">11、您在上海工作期间是否获得表彰奖励（110分）</view>
                        <radio-group class="radio-group" @change="handleAwardChange">
                            <label class="radio-label">
                                <radio value="no" :checked="award === 'no'" />
                                <view class="radio-text">否</view>
                            </label>
                            <label class="radio-label">
                                <radio value="special" :checked="award === 'special'" />
                                <view class="radio-text">获得过上海市委办局等市级机关专项性表彰奖励</view>
                            </label>
                            <label class="radio-label">
                                <radio value="comprehensive" :checked="award === 'comprehensive'" />
                                <view class="radio-text">获得过上海市委办局等市级机关综合性表彰奖励</view>
                            </label>
                        </radio-group>
                    </view>
                </view>
            </view>
            <!-- 减分指标及分值 -->
            <view class="section-subtitle">— 减分指标及分值 —</view>
            <view class="evaluation-card">
                <view class="indicator-section">
                    <view class="question-item">
                        <view class="q-title">13、三年内申请积分提供虚假材料</view>
                        <picker mode="selector" :range="falseMaterialOptions" @change="handleFalseMaterialChange"
                            class="picker">
                            <view class="picker-text">
                                {{ falseMaterial || '请选择情况' }}
                            </view>
                        </picker>
                    </view>

                    <view class="question-item">
                        <view class="q-title">14、三年内行政拘留记录</view>
                        <picker mode="selector" :range="administrativeDetentionOptions"
                            @change="handleAdministrativeDetentionChange" class="picker">
                            <view class="picker-text">
                                {{ administrativeDetention || '请选择情况' }}
                            </view>
                        </picker>
                    </view>

                    <view class="question-item last-item">
                        <view class="q-title">15、三年内一般刑事犯罪记录</view>
                        <picker mode="selector" :range="criminalRecordOptions" @change="handleCriminalRecordChange"
                            class="picker">
                            <view class="picker-text">
                                {{ criminalRecord || '请选择情况' }}
                            </view>
                        </picker>
                    </view>
                </view>
            </view>
            <!-- 积分一票否决 -->
            <view class="section-subtitle">— 积分一票否决 —</view>
            <view class="evaluation-card">
                <view class="question-item last-item">
                    <view class="q-title">16、有严重刑事犯罪记录</view>
                    <radio-group class="radio-group" @change="handleBlacklistChange">
                        <label class="radio-label">
                            <radio value="no" :checked="blacklist === 'no'" />
                            <view class="radio-text">否</view>
                        </label>
                        <label class="radio-label">
                            <radio value="yes" :checked="blacklist === 'yes'" />
                            <view class="radio-text">是</view>
                        </label>
                    </radio-group>
                </view>
            </view>
        </scroll-view>

        <!-- 底部提交按钮 -->
        <view class="submit-btn-container">
            <button class="submit-btn" @click="handleSubmit">提交</button>
        </view>
    </view>
    <my-tabbar></my-tabbar>
    <!-- <row-btn></row-btn> -->
</template>

<script>
export default {
    data() {
        return {
            // 基础信息
            age: '',
            education: 'highSchool',
            educationOptions: [
                { label: '高中(大专、职校、技校)及以下', value: 'highSchool' },
                { label: '大专(高职)学历', value: 'college' },
                { label: '大学本科学历', value: 'bachelor' },
                { label: '大学本科学历和学士学位', value: 'bachelorWithDegree' },
                { label: '硕士研究生学历学位', value: 'master' },
                { label: '博士研究生学历学位', value: 'doctor' }
            ],

            // 专业技术职称和技能等级
            professional: 'no',
            professionalOptions: [
                { label: '无专业技术职称和技术等级', value: 'no' },
                { label: '有技能等级', value: 'skill' },
                { label: '有专业技术职称', value: 'title' },
                { label: '有国家专业技术类资格', value: 'national' }
            ],
            skillLevel: '',
            skillLevelOptions: ['初级工', '中级工', '高级工', '技师', '高级技师'],
            professionalTitle: '',
            titleOptions: ['初级职称', '中级职称', '副高级职称', '正高级职称'],
            socialBase: '',
            socialBaseOptions: [
                '低于80%',
                '80%-100%',
                '100%-200%',
                '200%-300%',
                '300%以上'
            ],
            avgSalary: '',

            // 社保缴纳年限
            socialYear: 'no',
            socialYearNum: '',

            // 加分指标
            investStatus: 'no',
            investAmount: '',
            investRatio: '',
            investEmployees: '',
            socialBaseYear: 'below80',
            socialBaseYearOptions: [
                {
                    label: '最近4年内累计36个月缴纳职工社会保险费低于上海市上年度职工平均工资80%',
                    value: 'below80'
                },
                {
                    label: '等于及高于80%低于1倍，积25分',
                    value: '80-100'
                },
                {
                    label: '等于及高于1倍低于2倍，积50分',
                    value: '100-200'
                },
                {
                    label: '等于及高于2倍低于3倍，积100分',
                    value: '200-300'
                }
            ],

            // 第8-11题
            publicService: 'no',
            publicServiceYears: '',
            remoteArea: 'no',
            remoteAreaYears: '',
            freshGraduate: 'no',
            award: 'no',

            // 减分指标
            falseMaterial: '无',
            falseMaterialOptions: ['无', '有'],
            administrativeDetention: '无',
            administrativeDetentionOptions: ['无', '有'],
            criminalRecord: '无',
            criminalRecordOptions: ['无', '有'],

            // 一票否决
            blacklist: 'no'
        };
    },
    methods: {
        // 教育背景选择
        handleEducationChange(e) {
            this.education = e.detail.value;
        },

        // 专业技术职称选择
        handleProfessionalChange(e) {
            this.professional = e.detail.value;
        },

        // 技能等级选择
        handleSkillLevelChange(e) {
            this.skillLevel = this.skillLevelOptions[e.detail.value];
        },

        // 职称选择
        handleTitleChange(e) {
            this.professionalTitle = this.titleOptions[e.detail.value];
        },

        // 社保缴费基数选择
        handleSocialBaseChange(e) {
            this.socialBase = this.socialBaseOptions[e.detail.value];
        },

        // 社保缴纳年限选择
        handleSocialYearChange(e) {
            this.socialYear = e.detail.value;
        },

        // 投资纳税选择
        handleInvestChange(e) {
            this.investStatus = e.detail.value;
        },

        // 社保基数年份选择
        handleSocialBaseYearChange(e) {
            this.socialBaseYear = e.detail.value;
        },

        // 特定公共服务领域选择
        handlePublicServiceChange(e) {
            this.publicService = e.detail.value;
        },

        // 远郊重点区域选择
        handleRemoteAreaChange(e) {
            this.remoteArea = e.detail.value;
        },

        // 全日制应届毕业生选择
        handleFreshGraduateChange(e) {
            this.freshGraduate = e.detail.value;
        },

        // 表彰奖励选择
        handleAwardChange(e) {
            this.award = e.detail.value;
        },

        // 虚假材料选择
        handleFalseMaterialChange(e) {
            this.falseMaterial = this.falseMaterialOptions[e.detail.value];
        },

        // 行政拘留选择
        handleAdministrativeDetentionChange(e) {
            this.administrativeDetention = this.administrativeDetentionOptions[e.detail.value];
        },

        // 刑事犯罪记录选择
        handleCriminalRecordChange(e) {
            this.criminalRecord = this.criminalRecordOptions[e.detail.value];
        },

        // 一票否决选择
        handleBlacklistChange(e) {
            this.blacklist = e.detail.value;
        },

        // 提交表单
        handleSubmit() {
            uni.showLoading({ title: '提交中...' });

            // 表单验证逻辑
            const requiredFields = [
                this.age, this.education, this.professional, this.socialYear,
                this.investStatus, this.socialBaseYear, this.publicService,
                this.remoteArea, this.freshGraduate, this.award,
                this.falseMaterial, this.administrativeDetention, this.criminalRecord, this.blacklist
            ];

            if (requiredFields.some(field => !field)) {
                uni.showToast({ title: '请填写完整信息', icon: 'none' });
                uni.hideLoading();
                return;
            }

            // 模拟提交成功
            setTimeout(() => {
                uni.hideLoading();
                uni.showToast({ title: '提交成功', icon: 'success' });
                // 实际开发中可跳转到结果页或重置表单
            }, 1500);
        }
    }
};
</script>

<style lang="scss">
.container {
    padding: 30rpx 30rpx 80rpx 30rpx;
    min-height: 100vh;
    background-color: #f7f7f7;
}

.top-con {
    background: linear-gradient(135deg, #3176d1, #fff);
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20rpx 0;
    margin-bottom: 20rpx;

    .nav-left,
    .nav-right {
        width: 80rpx;
    }

    .back-icon {
        font-size: 40rpx;
        color: #333;
    }

    .title {
        font-size: 36rpx;
        font-weight: 600;
        color: #333;
    }

    .contact-icon {
        width: 40rpx;
        height: 40rpx;
        font-size: 28rpx;
        color: #333;
    }
}

.participate-tip {
    font-size: 28rpx;
    color: #000;
    text-align: center;
    margin-bottom: 40rpx;
}

.section-title {
    font-size: 40rpx;
    width: 60%;
    font-weight: 600;
    color: #d2d6e0;
    display: block;
    background: #2079cc;
    text-align: center;
    letter-spacing: 3rpx;
    margin: 30rpx auto;
    border-radius: 30rpx;
}


.section-subtitle {
    font-size: 30rpx;
    font-weight: 600;
    color: #333;
    margin: 30rpx 0 20rpx;
    display: block;
    text-align: center;
}

.white {
    color: #fff;
}

.evaluation-card {
    background: white;
    border-radius: 16rpx;
    padding: 30rpx 20rpx;
    margin-bottom: 20rpx;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}

.tip-text {
    font-size: 26rpx;
    color: #fff;
    margin-bottom: 30rpx;
    display: block;
    text-align: center;
}

.question-item {
    padding: 40rpx 20rpx;
    border-bottom: 1rpx solid rgba(0, 0, 0, 0.2);

    .q-title {
        font-size: 30rpx;
        color: #3176d1;
        margin-bottom: 20rpx;
        display: block;
    }

    .sub-tip {
        font-size: 26rpx;
        color: #999;
        margin-bottom: 20rpx;
        display: block;
    }
}

.last-item {
    border-bottom: none;
}

.radio-group {
    display: flex;
    flex-direction: column;
    gap: 20rpx;

    .radio-label {
        display: flex;
        align-items: center;
        gap: 20rpx;

        .radio-text {
            font-size: 30rpx;
            color: #333;
        }
    }
}

.input-field {
    height: 80rpx;
    border: 2rpx solid #eee;
    border-radius: 12rpx;
    padding: 0 20rpx;
    font-size: 30rpx;
    color: #333;

    &.small {
        height: 70rpx;
        font-size: 28rpx;
    }

    &:focus {
        border-color: #1a8cff;
        outline: none;
    }
}

.picker {
    width: 100%;

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

.sub-question {
    margin-top: 20rpx;
    margin-bottom: 40rpx;
}

.sub-inputs {
    display: flex;
    flex-direction: column;
    gap: 20rpx;
    margin-top: 20rpx;
}

.submit-btn-container {
    padding: 20rpx;
    box-shadow: 0 -4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.submit-btn {
    background: #1a8cff;
    color: white;
    height: 90rpx;
    line-height: 90rpx;
    border-radius: 16rpx;
    font-size: 32rpx;
    font-weight: 500;
    border: none;
    padding: 0 40rpx;

    &:active {
        background: #0066cc;
    }
}
</style>