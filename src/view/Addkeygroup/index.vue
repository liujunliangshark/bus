<template>
    <div class='addkeygroup'>
        <main>
            <h1>创建广告组</h1>
            <div class="card">
                <div class="title">
                    <p>广告组设置</p>
                    <p>广告组包含出价和设置，用于确定哪些用户可以看到你的广告。</p>
                </div>
                <div class="content">
                    <div class="lable">
                        <p>广告组名称</p>
                        <input v-model="nameinput" placeholder="" />
                    </div>
                    <div class="lable">
                        <p>默认最高每次点击付费出价
                            <n-popover placement="bottom" trigger="click" @update:show="true">
                                <template #trigger>
                                    <el-icon>
                                        <Warning />
                                    </el-icon>
                                </template>
                                <div class="fuck">
                                    <h5>默认最高每次点击付费出价</h5>
                                    <p>默认最高每次点击付费出价 这是你愿意为每次广告点击支付的最高金额。该出价将应用于此广告组中的所有关键词，除非你设置了单独的关键词出价。</p>
                                    <p><span>提示：</span>从你所知道的平均用户价值入手。例如：如果你能支付 2.50 美元来获取一位用户，并且估计点击广告的用户中有 40% 会下载
                                        app，那么你可以针对每次点击支付 2.50 美元的
                                        40%，也就是支付 1.00 美元。</p>
                                    <h6>建议的默认最高每次点击付费</h6>
                                    <p>出价 这是我们关于出价金额的建议，以提升你的广告在 App Store 相关搜索中的展示几率。此数据基于我们对你的 app 的了解，以及拥有类似 app
                                        的广告主愿意为相同关键词设置的每次点击付费。</p>
                                </div>
                            </n-popover>
                        </p>
                        <input v-model.number="groupinput" class="fufei" placeholder="" @blur="handleBlur" />
                        <span class="error_msg">请输入出价金额。</span>
                    </div>
                    <div class="cell">
                        <span>建议￥<i>{{ jiage }}</i></span>
                        <button @click="yingyong">应用</button>
                    </div>
                    <el-collapse :accordion="false">
                        <el-collapse-item name="1">
                            <template #title>
                                <p>每次转化费用上线（限制展示次数）</p>
                                <n-popover placement="bottom" trigger="hover" @update:show="true">
                                    <template #trigger>
                                        <el-icon class="header-icon">
                                            <Warning />
                                        </el-icon>
                                    </template>
                                    <div class="fuck">
                                        <h5>每次转化费用上限（限制展示次数）</h5>
                                        <p>该可选设置指定了你愿意为每次转化支付的金额，并将为你广告组中所有关键词设置出价上限。</p>
                                        <p>该上限的计算方式如下：每次转化费用上限 x 转化率</p>
                                        <p>如果关键词的最高每次点击付费出价低于上述等式的结果，则系统会应用该最高每次点击付费出价。</p>
                                        <p>例如，如果每次转化费用上限为 5 美元，转化率为 65%，则系统为广告组中所有关键词应用的最高出价为 3.25 美元。如果最高每次点击付费设置为 4
                                            美元，则系统会应用的最高出价仍为 3.25 美元。
                                        </p>
                                        <p>每次转化费⽤上限会限制展示次数和转化次数，你可以自行决定是否进行相关设置。</p>
                                    </div>
                                </n-popover>
                            </template>
                            <div>
                                <input v-model="Upperlimit" type="text" placeholder="Optional">
                            </div>
                        </el-collapse-item>
                        <el-collapse-item name="2">
                            <template #title>
                                <p>每次转化费用上线（限制展示次数）</p>
                            </template>
                            <div>
                                <div class="head">
                                    <p>开始日期</p>
                                    <p>结束日期</p>
                                    <span>亚洲/上海</span>
                                </div>
                                <el-date-picker v-model="range" type="datetimerange" range-separator="至"
                                    start-placeholder="开始日期" :disabled-date="disabledStartDate"
                                    end-placeholder="结束日期" />
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
            <div class="card">
                <div class="title">
                    <p>关键词</p>
                    <p>关键词是用户在搜索你这类 app 时可能使用的相关词或短语。关键词可以让用户快速找到你的 app，有利于提高 app 安装量。</p>
                </div>
                <div class="content">
                    <div class="lable">
                        <p>广告组关键词
                            <n-popover placement="bottom" trigger="click" @update:show="true">
                                <template #trigger>
                                    <el-icon>
                                        <Warning />
                                    </el-icon>
                                </template>
                                <div class="fuck">
                                    <h5>关键词定位</h5>
                                    <p>可选功能，让你能够添加关键词至你的广告系列。关键词是用户在搜索你这类 app
                                        时可能使用的相关词或短语。你可以对任何关键词单独出价，以优化投资回报。广泛匹配将自动包含同义词和含该术语的短语等变体，以及常见的拼写错误和复数形式，因此你无需添加这些。
                                    </p>
                                    <p><span>提示：使用搜索匹配</span>使用搜索匹配，即使你选择添加自己的关键词。这是一个发掘相关关键词的好方法，这些关键词会为你的 app
                                        增加展示次数、点击次数和转化次数，所以你不必考虑所有的可能性。</p>
                                </div>
                            </n-popover>
                        </p>
                    </div>
                    <div class="card_body">
                        <div class="top">
                            <div class="left">
                                <svg width="128px" height="128px" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 128 128">
                                    <title>Illustration Add Keywords</title>
                                    <g id="a73cc142-7bc1-4cfb-a034-496e581444a5" data-name="Illustration Add Keywords">
                                        <rect width="128" height="128" fill="none"></rect>
                                        <path d="M111,52a1,1,0,0,0,0-2H79c0,.33,0,.67,0,1s0,.67,0,1Z" fill="#999">
                                        </path>
                                        <path
                                            d="M112,70a1,1,0,0,0-1-1H73c-.52.69-1.06,1.36-1.64,2H111A1,1,0,0,0,112,70Z"
                                            fill="#999"></path>
                                        <path
                                            d="M45,90h3v3a1,1,0,0,0,2,0V90h3a1,1,0,0,0,0-2H50V85a1,1,0,0,0-2,0v3H45a1,1,0,0,0,0,2Z"
                                            fill="#999"></path>
                                        <path d="M61,90h50a1,1,0,0,0,0-2H61a1,1,0,0,0,0,2Z" fill="#999"></path>
                                        <path
                                            d="M116,38H76c.32.65.61,1.32.88,2H116a2,2,0,0,1,2,2V98a2,2,0,0,1-2,2H40a2,2,0,0,1-2-2V78.92c-.68-.27-1.35-.56-2-.88V98a4,4,0,0,0,4,4h76a4,4,0,0,0,4-4V42A4,4,0,0,0,116,38Z"
                                            fill="#999"></path>
                                        <path
                                            d="M53,69H50V66a1,1,0,0,0-2,0v3H45a1,1,0,0,0,0,2h3v3a1,1,0,0,0,2,0V71h3a1,1,0,0,0,0-2Z">
                                        </path>
                                        <path
                                            d="M53,50H50V47a1,1,0,0,0-2,0v3H45a1,1,0,0,0,0,2h3v3a1,1,0,0,0,2,0V52h3a1,1,0,0,0,0-2Z">
                                        </path>
                                        <path
                                            d="M49,21A30,30,0,0,0,26.62,71L4.29,93.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L28,72.41A30,30,0,1,0,49,21ZM36,42V75.79A28.15,28.15,0,0,1,29.42,71c-.48-.46-.94-.95-1.38-1.45A28,28,0,1,1,73.79,38H40A4,4,0,0,0,36,42ZM70.43,69H61a1,1,0,0,0,0,2h7.57A27.92,27.92,0,0,1,38,76.74V42a2,2,0,0,1,2-2H74.75A27.59,27.59,0,0,1,77,50H61a1,1,0,0,0,0,2H77A27.79,27.79,0,0,1,70.43,69Z">
                                        </path>
                                    </g>
                                </svg>
                            </div>
                            <div class="right">添加与 app 和类型相关的关键词。我们将通过分享额外的建议和关键词热度来提供帮助。</div>
                        </div>
                        <div class="bottom">
                            <span>为广告组添加关键词</span>
                        </div>
                    </div>
                    <div class="lable">
                        <p>广告组否定关键词 (可选)
                            <span>添加</span>
                            <n-popover placement="bottom" trigger="click" @update:show="true">
                                <template #trigger>
                                    <el-icon>
                                        <Warning />
                                    </el-icon>
                                </template>
                                <div class="fuck">
                                    <h5>默认最高每次点击付费出价</h5>
                                    <p>否定关键词可防止你的广告在这些词的搜索结果中显示。例如，如果你添加“免费”作为否定关键词，则你的广告不会出现在使用“免费”这个词执行的搜索中。你添加的否定关键词仅适用于此广告组。在广告系列级别设置否定关键词，以将其应用于所有广告组。
                                    </p>
                                </div>
                            </n-popover>
                        </p>
                    </div>
                </div>
            </div>
        </main>
        <footer>
            <button @click="$router.go(-1)">取消</button>
            <button>保存</button>
        </footer>
    </div>
</template>
<script setup lang='ts'>
import { Warning, ArrowRight } from '@element-plus/icons-vue';
import { ref } from 'vue';
const nameinput = ref('');
const groupinput = ref('');
const jiage = ref('10.99');
const Upperlimit = ref('');
const range = ref<[]>([])
const handleBlur = (val: any) => {
    const fufei: Element | null = document.querySelector('.fufei')
    const error_msg: Element | null = document.querySelector('.error_msg')
    if (fufei && error_msg) {
        if (groupinput.value == '') {
            fufei.style.borderColor = 'red'
            fufei.style.background = '#fde5e5'
            error_msg.style.display = 'block'
        } else {
            fufei.style.borderColor = '#ccc'
            fufei.style.background = ''
            error_msg.style.display = 'none'
            groupinput.value = '￥' + groupinput.value
        }
    }
}

function yingyong() {
    groupinput.value = '￥' + jiage.value
}
function disabledStartDate(time: Date) {
    return time.getTime() < Date.now();
}
</script>


<style scoped>
@import url('./style/index.scss');
</style>