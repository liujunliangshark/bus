<template>
    <div class="information">
        <div class="designation">徽商期货有限责任公司</div>
        <div class="titles">
            <div class="logo"><img
                    src="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/7c/a2/70/7ca27033-38b5-1644-58fc-93f73bfae19e/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/88x88.png"
                    alt=""></div>
            <div class="name">徽商期货</div>
        </div>
        <div class="nav">
            <ul>
                <li v-for="item in list" :key="item.id" :class="tabActive === item.id ? 'active' : ''"
                    @click="handleNavClick(item.id)">
                    {{
                        item.name
                    }}</li>
            </ul>
        </div>
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick" v-show="tabActive === 1">
            <el-tab-pane label="关键词" :name="1"></el-tab-pane>
            <el-tab-pane label="搜索词" :name="2"></el-tab-pane>
            <el-tab-pane label="否定关键词" :name="3"></el-tab-pane>
        </el-tabs>
        <div class="searchNav">
            <div class="search_Title">{{ names }}</div>
            <div class="advertisement">
                <el-input v-model="advertisements" @input="OnInput" placeholder="搜索广告组" />
            </div>
            <div class="dateInput">
                <el-popover placement="bottom" :visible="visible" :teleported="false" :hide-after="0" trigger="click">
                    <div class="popover_content">
                        <div class="headbtns">
                            <button v-for="item in headbtns" :key="item.id" :class="{ active: item.id == btnActive }"
                                @click="btnActive = item.id">{{
                                    item.text }}</button>
                        </div>
                        <DateAsync :btnActive="btnActive" @handleChangeDates="handleChangeDate"
                            @ShowUpdate="ShowUpdate" />
                    </div>
                    <template #reference>
                        <el-button class="dateBtn" @click="visible = true">
                            <span>
                                {{ DateNum }}
                            </span>
                            <el-icon>
                                <Calendar />
                            </el-icon>
                        </el-button>
                    </template>
                </el-popover>
            </div>
        </div>
        <div class="Controls">
            <button class="btn_control" @click="BtnControl(btn_control)" v-show="activeName !== 2">{{ btn_control
                }}</button>
            <el-dropdown trigger="click" :teleported="false" @command="handleCommand">
                <span class="el-dropdown-link">
                    操作
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="1">
                            <el-icon>
                                <SuccessFilled />
                            </el-icon>
                            <span>启动</span>
                        </el-dropdown-item>
                        <el-dropdown-item command="2">
                            <el-icon>
                                <VideoPause />
                            </el-icon>
                            <span>暂停</span>
                        </el-dropdown-item>
                        <el-dropdown-item command="3">
                            <el-icon>
                                <RemoveFilled />
                            </el-icon>
                            <span>删除</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <div class="controls_lie" @click="showModalFunc">编辑列</div>
        </div>
        <el-table :data="filteredTableData" border :show-summary="true" @selection-change="handleSelectionChange"
            :summary-method="getSummaries" style="width: 100%;max-height: 600px">
            <el-table-column type="selection" width="80" />
            <el-table-column prop="AdvertisingName" fixed label="广告组名称" width="150" />
            <el-table-column prop="status" fixed label="状态" width="150">
                <template #default="scope">
                    <span :class="getStatusClass(scope.row.status).class">{{ getStatusClass(scope.row.status).text
                        }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="startTime" label="开始日期" width="150" />
            <el-table-column prop="ConversionOverhead" label="每次转化费用上限" width="150" />
            <el-table-column prop="Redownloadtimes" label="重新下载次数" width="150" />
            <el-table-column prop="disburse" label="支出" width="150" />
            <el-table-column prop="ConversionRate" label="转化率" width="150" />
            <el-table-column prop="AveragePayPerClick" label="平均每次点击付费" width="150" />
            <el-table-column prop="AverageCostPerConversion" label="平均每次转化费用" width="150" />
            <el-table-column prop="NumberOfInstallations" label="安装次数" width="150" />
            <el-table-column prop="EndTime" label="结束日期" width="150" />
            <el-table-column prop="NewDownloads" label="新下载次数" width="150" />
            <el-table-column prop="AdvertisingID" label="广告组ID" width="150" />
            <el-table-column prop="SearchMatch" label="搜索匹配" width="150" />
            <el-table-column prop="DefaultMaximumPay" label="默认最高每次点击付费出价" width="150" />
            <el-table-column prop="NumberOfPresentations" label="展示次数" width="150" />
            <el-table-column prop="clicks" label="点击次数" width="150" />
            <el-table-column prop="ClickRate" label="点击率" width="150" />
        </el-table>
    </div>
    <el-dialog v-model="showModal" :show-close="false" align-center>
        <template #header>
            <div class="title-wrap">
                <h2 class="title">修改列</h2>
            </div>
        </template>
        <template #default>
            <div class="content">
                <div class="Hiddens">
                    <div class="title">隐藏</div>
                    <VueDraggable v-if="Hiddenlist.length > 0" class="main" v-model="Hiddenlist" :animation="150"
                        group="people" ghostClass="ghost" @end="updateColumns" @add="addColumns">
                        <div v-for="item in Hiddenlist" :key="item.id" class="list_Box">
                            <el-icon>
                                <Plus />
                            </el-icon>
                            <div class="listtitle">{{ item.title }}</div>
                            <el-icon>
                                <Grid />
                            </el-icon>
                        </div>
                    </VueDraggable>
                    <div class="hiden_empty" v-else>所有列均已添加</div>
                </div>
                <div class="reveal">
                    <div class="title">已显示</div>
                    <div class="top">
                        <div class="top_head">
                            <span>已锁定：<i>{{ Locklist.length }}</i></span>
                            <span>最多 6</span>
                        </div>
                        <VueDraggable class="top_main" v-model="Locklist" :animation="150" group="people"
                            filter=".default_li" draggable=".list_Box" @end="updateColumns">
                            <div v-for="item in Locklist" :key="item.id" class="list_Box" :class="item.class">
                                <el-icon>
                                    <CloseBold />
                                </el-icon>
                                <div class="listtitle">{{ item.title }}</div>
                                <el-icon>
                                    <Grid />
                                </el-icon>
                            </div>
                        </VueDraggable>
                    </div>
                    <div class="bottom">
                        <div class="bottom_head">
                            <span>已添加：<i>16</i></span>
                        </div>
                        <VueDraggable class="bottom_main" v-model="Addlist" :animation="150" ghostClass="ghost"
                            group="people" @end="updateColumns">
                            <div v-for="item in Addlist" :key="item.id" class="list_Box">
                                <el-icon>
                                    <CloseBold />
                                </el-icon>
                                <div class="listtitle">{{ item.title }}</div>
                                <el-icon>
                                    <Grid />
                                </el-icon>
                            </div>
                        </VueDraggable>
                    </div>
                </div>
            </div>
        </template>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="cancelChanges">取消</el-button>
                <el-button type="primary" @click="confirmChanges">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup lang='ts'>
import { ref, watchEffect, defineAsyncComponent, onMounted, computed, Ref } from 'vue';
import { Calendar, ArrowDown, SuccessFilled, VideoPause, RemoveFilled, Plus, Grid, CloseBold } from '@element-plus/icons-vue';
import type { TabsPaneContext, TableColumnCtx } from 'element-plus';
import { ElMessage } from 'element-plus';
import { VueDraggable } from 'vue-draggable-plus';
import { useRouter } from 'vue-router';
import { debounce } from '../../js/debounce';
import axios from 'axios';
const DateAsync = defineAsyncComponent(() => import('./components/Date.vue'));
const $router = useRouter();
const list = [{ name: '广告组', id: 0 }, { name: '所有关键词', id: 1 }];
const tabActive = ref(0);
const activeName = ref(1);
const names = ref('');
const btn_control = ref('');
const advertisements = ref('');//搜索广告组
const DateNum = ref('今天');
const headbtns = [
    {
        text: '预设',
        id: 0,
    },
    {
        text: '自定义',
        id: 1,
    }
];
const visible = ref(false);
const btnActive = ref(0);
const showModal = ref(false);

const Hiddenlist = ref([
    {
        name: 'startTime',
        title: '开始日期',
        id: 0,
    },
    {
        name: 'ConversionOverhead',
        title: '每次转化费用上限',
        id: 1,
    },
    {
        name: 'Redownloadtimes',
        title: '重新下载次数',
        id: 2,
    },
    {
        name: 'disburse',
        title: '支出',
        id: 3,
    },
    {
        name: 'ConversionRate',
        title: '转化率',
        id: 4,
    },
    {
        name: 'AveragePayPerClick',
        title: '平均每次点击付费',
        id: 5,
    },
    {
        name: 'AverageCostPerConversion',
        title: '平均每次转化费用',
        id: 6,
    },
    {
        name: 'NumberOfInstallations',
        title: '安装次数',
        id: 7,
    },
    {
        name: 'EndTime',
        title: '结束日期',
        id: 8,
    },
    {
        name: 'NewDownloads',
        title: '新下载次数',
        id: 9,
    },
    {
        name: 'AdvertisingID',
        title: '广告组ID',
        id: 10,
    },
    {
        name: 'SearchMatch',
        title: '搜索匹配',
        id: 11,
    },
    {
        name: 'DefaultMaximumPay',
        title: '默认最高每次点击付费出价',
        id: 12,
    },
    {
        name: 'NumberOfPresentations',
        title: '展示次数',
        id: 13,
    },
    {
        name: 'clicks',
        title: '点击次数',
        id: 14,
    },
    {
        name: 'ClickRate',
        title: '点击率',
        id: 15,
    }
]);
const Locklist = ref([
    { id: 0, name: 'AdvertisingName', title: '广告系列名称', class: 'default_li' },
    { id: 1, name: 'status', title: '状态', class: 'default_li' }]);
const Addlist = ref([]);
const tableData = ref([])
//获取表格数据
async function getTableDatas() {
    try {
        const response = await axios.get('/api/example');
        tableData.value = response.data.data.tableData;

    } catch (error) {
        console.error('Failed to fetch table data:', error);
    }
}
onMounted(() => {
    getTableDatas()
})
//过滤关键词
const filteredKeyword = ref('');
//创建过滤关键词计算属性
const filteredTableData = computed(() => {
    if (filteredKeyword.value) {
        return tableData.value.filter((row: any) =>
            row.advertisements.toLowerCase().includes(filteredKeyword.value.toLowerCase())
        );
    }
    return tableData.value;
});
//输入框防抖
const debouncedFilter = debounce(() => {
    filteredKeyword.value = advertisements.value;
}, 600);
//监听输入框
const OnInput = () => {
    debouncedFilter();
}
const handleNavClick = (val: any) => {
    tabActive.value = val;
}
const handleClick = (tab: TabsPaneContext) => {
    console.log(tab.props)
    if (tab.props.name === 1) {
        names.value = '管理关键词'
        btn_control.value = '添加关键词'
    } else if (tab.props.name === 2) {
        names.value = '管理搜索词'
    } else if (tab.props.name === 3) {
        names.value = '管理你的否定关键词'
        btn_control.value = '添加否定关键词'
    }
}
//监听tab栏变化
watchEffect(() => {
    if (tabActive.value === 0) {
        names.value = '管理广告组'
        btn_control.value = '创建广告组'
    } else if (tabActive.value === 1) {
        names.value = '管理关键词'
        btn_control.value = '添加关键词'
    }
})
const BtnControl = (val: any) => {
    if (val === '创建广告组') {
        $router.push({
            name: 'Addkeygroup'
        })
    }
}
const showModalFunc = () => {
    showModal.value = true
    let localHiddenlist = JSON.parse(localStorage.getItem('Hiddenlist') || '[]')
    let localLocklist = JSON.parse(localStorage.getItem('Locklist') || '[]')
    let localAddlist = JSON.parse(localStorage.getItem('Addlist') || '[]')
    if (localHiddenlist) {
        Hiddenlist.value = localHiddenlist
    }
    if (localLocklist) {
        Locklist.value = localLocklist
    }
    if (localAddlist) {
        Addlist.value = localAddlist
    }
}
//点击预设按钮
const handleChangeDate = (val: string) => {
    visible.value = false
    DateNum.value = val
}
//点击自定义按钮
const ShowUpdate = (val: any) => {
    visible.value = val
}
const SelectionChangeList = ref([])
//点击全选按钮
const handleSelectionChange = (val: any) => {
    SelectionChangeList.value = val
}
const handleCommand = async (command: string | number | object) => {
    let res = await axios.post('/api/updateStatus', {
        list: SelectionChangeList.value,
        status: command
    })
    if (res.data.status === 200) {
        ElMessage({
            message: res.data.message,
            type: 'success',
        })
        tableData.value = res.data.data
    }
}
const getStatusClass = (status: any) => {
    let statusText = '';
    let statusClass = '';
    if (status === '1') {
        statusText = '正在投放';
        statusClass = 'status-active';
    } else if (status === '2') {
        statusText = '已暂停';
        statusClass = 'status-paused';
    } else if (status === '3') {
        statusText = '已删除';
        statusClass = 'status-deleted';
    }

    return { text: statusText, class: statusClass };
}
interface Product {
    AdvertisingName: string;
    status: string;
    startTime: string;
    ConversionOverhead: string;
    Redownloadtimes: string;
    disburse: string;
    ConversionRate: string;
    AveragePayPerClick: string;
    AverageCostPerConversion: string;
    NumberOfInstallations: string;
    EndTime: string;
    NewDownloads: string;
    AdvertisingID: string;
    SearchMatch: string;
    DefaultMaximumPay: string;
    NumberOfPresentations: string;
    clicks: string;
    ClickRate: string;
}

interface SummaryMethodProps<T = Product> {
    columns: TableColumnCtx<T>[]
    data: T[]
}
const getSummaries = (param: SummaryMethodProps) => {
    const { columns, data } = param
    const sums: any[] = []
    columns.forEach((column, index) => {
        if (index === 0) {
            sums[index] = '总计'
            return
        }
        if (column.property === 'status') {
            sums[index] = ''
            return
        }

    })


    return sums
}
//编辑列的取消按钮
const cancelChanges = () => {
    showModal.value = false
};
//编辑列的确认按钮
const confirmChanges = () => {
    localStorage.setItem('Hiddenlist', JSON.stringify(Hiddenlist.value));
    localStorage.setItem('Locklist', JSON.stringify(Locklist.value));
    localStorage.setItem('Addlist', JSON.stringify(Addlist.value));
    showModal.value = false
    console.log(Addlist.value);

};
//拖拽列更新后
const updateColumns = (val: any) => {
    // console.log('Hiddenlist:', Hiddenlist.value);
    // console.log('Locklist', Locklist.value);
    // console.log('Addlist', Addlist.value);
};
const addColumns = (val) => {
}

</script>


<style lang='scss' scoped>
@import url('./style/index.scss');

.designation {
    box-sizing: border-box;
    height: 40px;
    margin: 0;
    display: flex;
    align-items: center;
    box-shadow: inset 0 -1px #ebebeb;
    font-size: 16px;
}

.titles {
    display: flex;
    align-items: center;
    padding: 30px 0;

    .logo {
        width: 40px;
        height: 40px;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .name {
        font-size: 2rem;
        font-weight: bolder;
    }
}

.nav {
    border-bottom: 1px solid #ebebeb;

    ul {
        display: flex;
        align-items: center;

        li {
            padding: 10px 0;
            font-size: 18px;
            cursor: pointer;
            margin-right: 40px;
            position: relative;
        }

        .active {
            font-weight: 600;

            &::after {
                content: '';
                position: absolute;
                bottom: -1px;
                left: 50%;
                transform: translateX(-50%);
                width: 100%;
                height: 1px;
                background-color: #000;
            }
        }
    }
}
</style>