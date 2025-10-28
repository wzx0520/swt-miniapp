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
                        <input type="number" v-model.number="age" placeholder="请输入年龄" @input="handleAgeChange">
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
                        <!-- 学历形式选择 -->
                        <view class="db-question">
                            <picker mode="selector" :range="educationFormOptions" @change="handleEduFormChange"
                                class="picker"
                                :disabled="education === 'highSchool' || education === 'master' || education === 'doctor'">
                                <view class="picker-text">
                                    {{ eduType || '学历形式' }}
                                </view>
                            </picker>
                        </view>
                        <!-- 学历形式选择 -->
                        <view class="db-question">
                            <picker mode="selector" :range="educationCityOptions" @change="handleEduCityChange"
                                :disabled="education === 'highSchool' || eduType === '全日制' || education === 'master' || education === 'doctor'"
                                class="picker">
                                <view class="picker-text">
                                    {{ eduCity || '报考城市' }}
                                </view>
                            </picker>
                        </view>
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
                        <view class="sub-title">上海市上年度职工平均工资</view>
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
                        @input="handleSocialYearNumChange" class="input-field small" placeholder="请输入缴纳年数">
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

                    <!-- 紧缺急需专业 -->
                    <view class="question-item">
                        <view class="q-title">5、紧缺急需专业</view>
                        <radio-group class="radio-group" @change="handleShortSupplyChange">
                            <label class="radio-label">
                                <radio value="no" :checked="shortSupply === 'no'" />
                                <view class="radio-text">否</view>
                            </label>
                            <label class="radio-label">
                                <radio value="yes" :checked="shortSupply === 'yes'" />
                                <view class="radio-text">是</view>
                            </label>
                        </radio-group>
                    </view>

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
                                placeholder="请输入纳税总额（万元）" @input="handleInvestNumChange">
                            <input type="number" v-model.number="investRatio" class="input-field small"
                                @input="handleInvestNumChange" placeholder="请输入占股百分比">
                            <input type="number" v-model.number="investEmployees" class="input-field small"
                                @input="handleInvestNumChange" placeholder="请输入聘用上海户籍人数">
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
                            class="input-field small" placeholder="请输入工作年数" @input="handlePublicServiceYearsChange">
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
                            class="input-field small" placeholder="请输入居住年数" @input="handleRemoteAreaYearsChange">
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
                    <view class="question-item ">
                        <view class="q-title">11、您在上海工作期间是否获得表彰奖励（最高110分）</view>
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
                            <label class="radio-label">
                                <radio value="province" :checked="award === 'province'" />
                                <view class="radio-text">获得过省部级及以上表彰奖励</view>
                            </label>
                        </radio-group>
                    </view>

                    <view class="question-item last-item">
                        <view class="q-title">12、配偶为本市户籍人员</view>
                        <radio-group class="radio-group" @change="handleSpouseCityChange">
                            <label class="radio-label">
                                <radio value="no" :checked="spouseCity === 'no'" />
                                <view class="radio-text">否</view>
                            </label>
                            <label class="radio-label">
                                <radio value="yes" :checked="spouseCity === 'yes'" />
                                <view class="radio-text">是，结婚已满{{ spouseCityYears }}年</view>
                            </label>
                        </radio-group>
                        <input v-if="spouseCity === 'yes'" type="number" v-model.number="spouseCityYears"
                            class="input-field small" placeholder="请输入居住年数" @input="handleSpouseCityYearsChange">
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
    <view class="popup-mask" v-if="popModalShow" @click="handleMaskClick">
        <view class="popup-con"> <!-- 积分进度区：环形进度 + 目标分/当前分 -->
            <view class="progress-section">
                <view class="progress-circle">
                    <view class="progress-inner">
                        <text class="progress-text">您的积分模拟结果为</text>
                        <text class="score-text">{{ totalScore }}分</text>
                    </view>
                </view>
            </view>

            <!-- 未达标提示区：文字 + 圆点装饰 -->
            <view class="hint-section" v-if="totalScore < 120">
                <view class="dot"></view>
                <text class="hint-text">很遗憾，您的积分未达标</text>
                <view class="dot"></view>
            </view>

            <!-- 联系老师区：文字信息 + 二维码 + 按钮 -->
            <view class="contact-section">
                <view class="contact-info">
                    <text class="teacher-title">政策老师：x老师</text>
                    <text class="contact-way">联系方式：xxxxxxxxx</text>
                    <button class="add-btn" open-type="share">长按识别 添加老师</button>
                </view>
                <image class="qr-code" :src="qrCodeUrl" mode="widthFix"></image>
            </view>

            <!-- 各项得分区：标题 + 表格列表 -->
            <view class="score-list-section">
                <view class="list-title">各项得分</view>
                <view class="score-table">
                    <view class="table-row" v-for="(item, index) in scoreItems" :key="index">
                        <text class="table-label">{{ item.label }}</text>
                        <text class="table-value">{{ $data[item.value] }}分</text>
                    </view>
                </view>
            </view>
            <!-- 加分指标 -->
            <view class="score-list-section">
                <view class="list-title">加分指标及分值</view>
                <view class="score-table">
                    <view class="table-row" v-for="(item, index) in secondItems" :key="index">
                        <text class="table-label">{{ item.name }}</text>
                        <text class="table-value">{{ $data[item.value] }}分</text>
                    </view>
                </view>
            </view>
            <!-- 减分指标 -->
            <view class="score-list-section">
                <view class="list-title">减分指标及分值</view>
                <view class="score-table">
                    <view class="table-row" v-for="(item, index) in thirdItems" :key="index">
                        <text class="table-label">{{ item.name }}</text>
                        <text class="table-value">{{ $data[item.value] }}分</text>
                    </view>
                </view>
            </view>
            <view class="bottom-btn">
                <view class="res-btn" @click="handleRestart">重新计算</view>
                <view class="save-btn">关闭</view>
            </view>
        </view>
    </view>
    <my-tabbar></my-tabbar>
</template>

<script>
export default {
    data() {
        return {
            popModalShow: false,
            // 基础信息
            age: '',
            // 积分缓存
            ageScore: 0,
            educationScore: '',
            skillScore: 0,
            socialYearScore: 0,
            shortSupplyScore: 0,
            investScore: 0,
            socialBaseYearScore: 0,
            publicServiceScore: 0,
            remoteAreaScore: 0,
            freshGraduateScore: 0,
            awardScore: 0,
            spouseCityScore: 0,
            falseMaterialScore: 0,
            administrativeScore: 0,
            criminalRecordScore: 0,
            totalScore: 0,
            education: '',
            educationOptions: [
                { label: '高中(大专、职校、技校)及以下', value: 'highSchool' },
                { label: '大专(高职)学历', value: 'college' },
                { label: '大学本科学历', value: 'bachelor' },
                { label: '大学本科学历和学士学位', value: 'bachelorWithDegree' },
                { label: '硕士研究生学历学位', value: 'master' },
                { label: '博士研究生学历学位', value: 'doctor' }
            ],
            educationFormOptions: ['全日制', '网络教育', '成人自考', '成人夜大', '函授', '电视开放大学', '其他'],
            eduType: '',
            educationCityOptions: ['上海市', '申请人户籍所在地省份', '非以上情况'],
            eduCity: '',

            // 专业技术职称和技能等级
            professional: '',
            professionalOptions: [
                { label: '无专业技术职称和技术等级', value: 'no' },
                { label: '有技能等级', value: 'skill' },
                { label: '有专业技术职称', value: 'title' },
            ],
            skillLevel: '',
            skillLevelOptions: ['国家职业资格五级', '国家职业资格四级', '国家职业资格三级', '国家职业资格二级（技师）', '国家职业资格一级（高级技师）'],
            professionalTitle: '',
            titleOptions: ['初级职称', '中级职称', '高级职称'],
            socialBase: '',
            socialBaseOptions: [
                '低于',
                '高于等于'
            ],
            avgSalary: '',

            // 社保缴纳年限
            socialYear: '',
            socialYearNum: 0,

            // 加分指标
            shortSupply: '',
            investStatus: '',
            investAmount: '',
            investRatio: '',
            investEmployees: '',
            socialBaseYear: '',
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
            publicService: '',
            publicServiceYears: '',
            remoteArea: '',
            remoteAreaYears: '',
            spouseCityYears: '',
            freshGraduate: '',
            spouseCity: '',
            award: '',

            // 减分指标
            falseMaterial: '无',
            falseMaterialOptions: ['无', '有'],
            administrativeDetention: '无',
            administrativeDetentionOptions: ['无', '有'],
            criminalRecord: '无',
            criminalRecordOptions: ['无', '有'],

            // 一票否决
            blacklist: 'no',
            scoreItems: [
                { label: '1、年龄', value: 'ageScore' },
                { label: '2、教育背景', value: 'educationScore' },
                { label: '3、专业技术职称和技能等级', value: 'skillScore' },
                { label: '4、社保缴费年限', value: 'socialYearScore' }
            ],
            secondItems: [
                { name: '5、紧缺急需专业', value: 'shortSupplyScore' },
                { name: '6、投资纳税或带动本地就业', value: 'investScore' },
                { name: '7、最近连续3年职业社会保险费基数', value: 'socialBaseYearScore' },
                { name: '8、特定的公共服务领域', value: 'publicServiceScore' },
                { name: '9、远郊重点区域', value: 'remoteAreaScore' },
                { name: '10、是否全日制应届高校大学毕业生', value: 'freshGraduateScore' },
                { name: '11、您在上海工作是否获得表彰奖励', value: 'awardScore' },
                { name: '12、配偶为本市户籍人员', value: 'spouseCityScore' },
            ],
            thirdItems: [
                { name: '13、三年内申请积分提供虚假材料', value: 'falseMaterialScore' },
                { name: '14、三年内行政拘留记录', value: 'administrativeScore' },
                { name: '15、三年内一般刑事犯罪记录', value: 'criminalRecordScore' }
            ],
        };
    },
    methods: {
        // 年龄选择积分
        handleAgeChange() {
            if (this.age !== null && !isNaN(this.age)) {
                const age = parseInt(this.age);
                if (age >= 18 && age <= 43) {
                    this.ageScore = 30;
                } else if (age === 44) {
                    this.ageScore = 29;
                } else if (age > 44 && age < 56) {
                    this.ageScore = 29 - 2 * (age - 44);
                } else if (age >= 56 && age <= 60) {
                    this.ageScore = 5;
                } else {
                    // 其他年龄区间暂不加分（可根据需求扩展）
                    this.ageScore = 0;
                }
                console.log(this.ageScore);
            }
        },

        handleEducationChange(e) {
            this.education = e.detail.value
            // 如果选择高中及以下，清空已选的学历形式和城市
            if (this.education === 'highSchool') {
                this.eduType = ''
                this.eduCity = ''
            }
            let educationScore = 0;
            switch (this.education) {
                case 'college':
                    educationScore = 50; // 大专积50分
                    break;
                case 'bachelor':
                    educationScore = 60; // 本科学历积60分
                    break;
                case 'bachelorWithDegree':
                    educationScore = 90; // 本科+学位积90分
                    break;
                case 'master':
                    educationScore = 100; // 研究生积100分
                    break;
                case 'doctor':
                    educationScore = 110; // 博士积110分
                    break;
                default:
                    educationScore = 0;
            }
            this.educationScore = educationScore
            if (this.education === 'master' || this.education === 'doctor') {
                this.eduType = ''
                this.eduCity = ''
                console.log(this.educationScore);
                return
            }

            if (this.eduType !== '全日制') {
                this.educationScore = 0
            }
            console.log(this.educationScore);

        },

        handleEduFormChange(e) {
            this.eduType = this.educationFormOptions[e.detail.value]

            if (e.detail.value === '0') {
                this.eduCity = ''
                let educationScore = 0;
                switch (this.education) {
                    case 'college':
                        educationScore = 50; // 大专积50分
                        break;
                    case 'bachelor':
                        educationScore = 60; // 本科学历积60分
                        break;
                    case 'bachelorWithDegree':
                        educationScore = 90; // 本科+学位积90分
                        break;
                    case 'master':
                        educationScore = 100; // 研究生积100分
                        break;
                    case 'doctor':
                        educationScore = 110; // 博士积110分
                        break;
                    default:
                        educationScore = 0;
                }
                this.educationScore = educationScore
            }
            console.log(this.educationScore);

        },

        handleEduCityChange(e) {
            this.eduCity = this.educationCityOptions[e.detail.value]
            if (e.detail.value === '2') {
                this.educationScore = 0
            } else {
                let educationScore = 0;
                switch (this.education) {
                    case 'college':
                        educationScore = 50; // 大专积50分
                        break;
                    case 'bachelor':
                        educationScore = 60; // 本科学历积60分
                        break;
                    case 'bachelorWithDegree':
                        educationScore = 90; // 本科+学位积90分
                        break;
                    case 'master':
                        educationScore = 100; // 研究生积100分
                        break;
                    case 'doctor':
                        educationScore = 110; // 博士积110分
                        break;
                    default:
                        educationScore = 0;
                }
                this.educationScore = educationScore
            }
            console.log(this.educationScore);
        },

        // 专业技术职称选择
        handleProfessionalChange(e) {
            this.professional = e.detail.value;
        },

        // 技能等级选择
        handleSkillLevelChange(e) {
            this.skillLevel = this.skillLevelOptions[e.detail.value];
            let skillScore = 0;
            switch (e.detail.value) {
                case 0:
                    skillScore = 15; // 持证人取得技能等级五级积15分
                    break;
                case 1:
                    skillScore = 30; // 持证人取得技能等级五级积30分
                    break;
                case 2:
                    skillScore = 60; // 持证人取得技能等级五级积60分
                    break;
                case 3:
                    skillScore = 100; // 持证人取得技能等级五级积100分
                    break;
                case 4:
                    skillScore = 140; // 持证人取得技能等级五级积140分
                    break;
                default:
                    skillScore = 0;
            }
            this.skillScore = skillScore
            console.log(skillScore);

        },

        // 职称选择
        handleTitleChange(e) {
            this.professionalTitle = this.titleOptions[e.detail.value];
            this.educationScore = 0
            let skillScore = 0;
            switch (e.detail.value) {
                case 0:
                    skillScore = 0;
                    break;
                case 1:
                    skillScore = 100;
                    break;
                case 2:
                    skillScore = 140;
                    break;
                default:
                    skillScore = 0;
            }
            this.skillScore = skillScore
            console.log(skillScore);
        },

        // 社保缴费基数选择
        handleSocialBaseChange(e) {
            this.socialBase = this.socialBaseOptions[e.detail.value];
            let skillScore = 0;
            if (e.detail.value === 0) {
                switch (this.skillScore) {
                    case 100:
                        skillScore = 0
                    case 140:
                        skillScore = 0
                    default:
                        skillScore = this.skillScore
                }
            }
            this.skillScore = skillScore
        },

        // 社保缴纳年限选择
        handleSocialYearChange(e) {
            this.socialYear = e.detail.value;
        },

        // 计算社保年限分数
        handleSocialYearNumChange() {
            if (this.socialYearNum >= 1) {
                this.socialYearScore = Math.min(parseInt(this.socialYearNum) * 3, 120)
            } else {
                let socialYearScore = 0
                this.socialYearScore = socialYearScore
            }
            console.log(this.socialYearScore)
        },

        // 紧缺急需专业分数
        handleShortSupplyChange(e) {
            this.shortSupply = e.detail.value;
            this.shortSupplyScore = e.detail.value === 'yes' ? 30 : 0
            console.log(this.shortSupplyScore);

        },

        // 投资纳税选择
        handleInvestChange(e) {
            this.investStatus = e.detail.value;


            console.log(this.investScore);

        },

        handleInvestNumChange() {
            // 1. 计算「最近三年平均每年」的纳税额、聘用户籍人数
            const avgTax = this.investAmount / 3;   // 平均每年纳税额（万元）
            const avgEmployees = this.investEmployees;

            // 2. 纳税积分：每10万元积10分（不足10万不计）
            const taxPoints = avgTax >= 10
                ? Math.floor(avgTax / 10) * 10
                : 0;

            // 3. 聘用户籍积分：每10人积10分（不足10人不计）
            const employeePoints = avgEmployees >= 10
                ? Math.floor(avgEmployees / 10) * 10
                : 0;

            // 4. 总分上限120分
            this.investScore = Math.min(Math.max(taxPoints, employeePoints), 120);
            console.log(this.investScore);
        },

        // 社保基数年份选择
        handleSocialBaseYearChange(e) {
            this.socialBaseYear = e.detail.value;
            let socialBaseYearScore = 0
            switch (e.detail.value) {
                case 'below80':
                    socialBaseYearScore = 0;
                    break;
                case '80-100':
                    socialBaseYearScore = 25;
                    break;
                case '100-200':
                    socialBaseYearScore = 50;
                    break;
                case '200-300':
                    socialBaseYearScore = 100;
                    break;
                default:
                    socialBaseYearScore = 0;
            }
            this.socialBaseYearScore = socialBaseYearScore
            console.log(this.socialBaseYearScore);

        },

        // 特定公共服务领域选择
        handlePublicServiceChange(e) {
            this.publicService = e.detail.value;
            if (e.detail.value === 'no') { this.publicServiceScore = 0; this.publicServiceYears = '' }
            console.log(this.publicServiceScore);

        },

        handlePublicServiceYearsChange() {
            if (this.publicServiceYears > 5) {
                this.publicServiceScore = Math.min((this.publicServiceYears - 5) * 4, 30)
            } else {
                this.publicServiceScore = 0
            }
            console.log(this.publicServiceScore);

        },

        // 远郊重点区域选择
        handleRemoteAreaChange(e) {
            this.remoteArea = e.detail.value;
            if (e.detail.value === 'no') { this.remoteAreaScore = 0; this.remoteAreaYears = '' }
            console.log(this.remoteAreaScore);

        },

        handleRemoteAreaYearsChange() {
            if (this.remoteAreaYears > 5) {
                this.remoteAreaScore = Math.min((this.remoteAreaYears - 5) * 2, 30)
            } else {
                this.remoteAreaScore = 0
            }
            console.log(this.remoteAreaScore);
        },

        // 全日制应届毕业生选择
        handleFreshGraduateChange(e) {
            this.freshGraduate = e.detail.value;
            this.freshGraduateScore = e.detail.value === 'yes' ? 10 : 0
            console.log(this.freshGraduateScore);
        },

        // 表彰奖励选择
        handleAwardChange(e) {
            this.award = e.detail.value;
            let score = 0
            switch (e.detail.value) {
                case 'no':
                    score = 0;
                    break;
                case 'special':
                    score = 30;
                    break;
                case 'comprehensive':
                    score = 60;
                    break;
                case 'province':
                    score = 110;
                    break;
                default:
                    score = 0;
            }
            this.awardScore = score
            console.log(this.awardScore);

        },

        // 配偶为本市选择
        handleSpouseCityChange(e) {
            this.spouseCity = e.detail.value
            if (e.detail.value === 'no') {
                this.spouseCityScore = 0
                this.spouseCityYears = ''
            }
            console.log(this.spouseCityScore);
        },

        handleSpouseCityYearsChange() {
            if (this.spouseCityYears >= 1) {
                this.spouseCityScore = Math.min(this.spouseCityYears * 4, 40)
            } else {
                this.spouseCityScore = 0
            }
            console.log(this.spouseCityScore);

        },

        // 虚假材料选择
        handleFalseMaterialChange(e) {
            this.falseMaterial = this.falseMaterialOptions[e.detail.value];
            let score = 0
            e.detail.value === 0 ? score = 0 : score = -150
            this.falseMaterialScore = score;
        },

        // 行政拘留选择
        handleAdministrativeDetentionChange(e) {
            this.administrativeDetention = this.administrativeDetentionOptions[e.detail.value];
            let score = 0
            e.detail.value === 0 ? score = 0 : score = -150
            this.administrativeScore = score
        },

        // 刑事犯罪记录选择
        handleCriminalRecordChange(e) {
            this.criminalRecord = this.criminalRecordOptions[e.detail.value];
            let score = 0
            e.detail.value === 0 ? score = 0 : score = -150
            this.criminalRecordScore = score
        },

        // 一票否决选择
        handleBlacklistChange(e) {
            this.blacklist = e.detail.value;
        },

        calculateScore() {
            // 将所有评分属性名存入数组
            const scoreFields = [
                'ageScore', 'educationScore', 'skillScore', 'socialYearScore',
                'shortSupplyScore', 'investScore', 'socialBaseYearScore', 'publicServiceScore',
                'remoteAreaScore', 'freshGraduateScore', 'awardScore', 'spouseCityScore',
                'falseMaterialScore', 'administrativeScore', 'criminalRecordScore'
            ];
            if (this.socialYear === 'no') {
                this.restartForm()
            }

            // 计算总分
            this.totalScore = scoreFields.reduce((sum, field) => sum + (this[field] || 0), 0);
            console.log(this.totalScore);

        },

        // 提交表单
        handleSubmit() {
            uni.showLoading({ title: '提交中...' });
            if (this.educationScore > this.skillScore) {
                this.skillScore = 0
            } else {
                this.educationScore = 0
            }




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

            this.calculateScore();




            // 模拟提交成功
            setTimeout(() => {
                uni.hideLoading();
                this.popModalShow = true
            }, 1500);
        },

        restartForm() {
            // 重置表单数据
            let requiredFields = [
                'age', 'education', 'professional', 'socialYear',
                'investStatus', 'shortSupply', 'socialBaseYear', 'publicService',
                'remoteArea', 'freshGraduate', 'award', 'spouseCity'
            ];

            let scoreFields = [
                'ageScore', 'educationScore', 'skillScore', 'socialYearScore',
                'shortSupplyScore', 'investScore', 'socialBaseYearScore', 'publicServiceScore',
                'remoteAreaScore', 'freshGraduateScore', 'awardScore', 'spouseCityScore',
                'falseMaterialScore', 'administrativeScore', 'criminalRecordScore'
            ];
            requiredFields.forEach(field => {
                this[field] = '';
            });
            scoreFields.forEach(field => {
                this[field] = 0;
            });
        },

        handleRestart() {
            // 清空所有表单数据和分数
            this.restartForm();
            this.popModalShow = false
        },

        handleMaskClick() {
            this.popModalShow = false
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

.db-question {
    margin-top: 20rpx;
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

/* 页面容器 */
.popup-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.3s ease;
    background-color: rgba(0, 0, 0, 0.7);
}

.popup-con {
    overflow: scroll;
    background: #fff;
    border-radius: 16rpx;
    padding: 40rpx;
    height: 80vh;
    box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;
    position: relative;
}

/* 积分进度区 */
.progress-section {
    position: relative;
    width: 100%;
    height: 300rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.progress-circle {
    width: 500rpx;
    height: 250rpx;
    /* 上半圆高度 */
    border-radius: 250rpx 250rpx 0 0;
    /* 上半圆造型 */
    background: conic-gradient(#d7ebfe 0%, #d7ebfe 100%);
    /* 进度环（灰色占满，代表0分） */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    /* 隐藏下半部分 */
}

.progress-inner {
    text-align: center;
}

.progress-text {
    font-size: 28rpx;
    color: #333;
}

.score-text {
    font-size: 48rpx;
    color: #333;
    font-weight: bold;
}

.target-score {
    position: absolute;
    top: 20rpx;
    right: 20rpx;
    font-size: 28rpx;
    color: #333;
}

.current-score {
    position: absolute;
    bottom: 20rpx;
    left: 20rpx;
    font-size: 28rpx;
    color: #333;
}

/* 未达标提示区 */
.hint-section {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 40rpx 0;
}

.dot {
    width: 16rpx;
    height: 16rpx;
    border-radius: 50%;
    background-color: #2b85e4;
    /* 蓝色圆点 */
    margin: 0 20rpx;
}

.hint-text {
    font-size: 28rpx;
    color: #333;
}

/* 联系老师区 */
.contact-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20rpx;
    border: 1px solid #3176d1;
    border-radius: 10rpx;
    margin-bottom: 40rpx;
}

.contact-info {
    display: flex;
    flex-direction: column;
}

.teacher-title {
    font-size: 28rpx;
    color: #333;
    margin-bottom: 10rpx;
}

.contact-way {
    font-size: 26rpx;
    color: #666;
    margin-bottom: 20rpx;
}

.add-btn {
    width: 200rpx;
    height: 60rpx;
    line-height: 60rpx;
    text-align: center;
    background-color: #f5f5f5;
    color: #333;
    font-size: 26rpx;
    border-radius: 30rpx;
    padding: 0;
    /* 清除默认按钮内边距 */
}

.qr-code {
    width: 180rpx;
    height: 180rpx;
}

/* 各项得分区 */
.score-list-section {
    margin-top: 40rpx;
}

.list-title {
    font-size: 32rpx;
    color: #fff;
    background-color: #2b85e4;
    /* 蓝色标题栏 */
    padding: 16rpx;
    text-align: center;
    border-radius: 10rpx 10rpx 0 0;
}

.score-table {
    background-color: #f5f5f5;
    border-radius: 0 0 10rpx 10rpx;
    overflow: hidden;
    /* 隐藏内部边框溢出 */
}

.table-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx;
    background-color: #fff;
    border-bottom: 1px solid #eee;
}

.table-row:last-child {
    border-bottom: none;
    /* 最后一行无下边框 */
}

.table-label {
    font-size: 28rpx;
    color: #333;
}

.table-value {
    font-size: 28rpx;
    color: #333;
}

.bottom-btn {
    margin-top: 30rpx;
    display: flex;
    justify-content: space-around;
    color: #fff;
}

.res-btn {
    padding: 20rpx 50rpx;
    background: #2b85e4;
    border-radius: 40rpx;

}

.save-btn {
    padding: 20rpx 50rpx;
    background: #2b85e4;
    border-radius: 40rpx;
}
</style>