<template>
    <div class='content'>
        <div class="yushe" v-show="show">
            <div class="cell" v-for="item in dateCell" :key="item.text" @click="handleChange(item.date, item.text)">{{
                item.text }}
            </div>
        </div>
        <div class="dingyi" v-show="!show">
            <n-date-picker v-model:value="range" type="daterange" clearable :on-update:show="handleShowUpdate">

            </n-date-picker>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { ref, watchEffect } from 'vue';
import { getDateTime, convertTimestamps } from '../../../js/getDateTime';
const actions = ref([
    'clear', '1'
])
const dateCell = ref([
    { date: 'today', text: '今天' },
    { date: 'yesterday', text: '昨天' },
    { date: 'last7Days', text: '最近7天' },
    { date: 'lastWeek', text: '上周' },
    { date: 'last30Days', text: '最近30天' },
    { date: 'last4Weeks', text: '最近4周' },
    { date: 'last12Weeks', text: '最近12周' },
    { date: 'thisMonth', text: '本月' },
    { date: 'lastCalendarMonth', text: '上个月' },
    { date: 'last3CalendarMonths', text: '最近3个月' }])
const range = ref<[number, number]>([Date.now(), Date.now()])
const show = ref(true)
const props = defineProps({
    btnActive: {
        type: Number,
        default: 0
    }
})
watchEffect(() => {
    if (props.btnActive === 0) {
        show.value = true
    } else {
        show.value = false
    }
})
const $emits = defineEmits(['handleChangeDates', 'ShowUpdate'])
const handleChange = (date: string, text: string) => {
    const Times = getDateTime(date)

    $emits('handleChangeDates', text)
}
const handleShowUpdate = (show: boolean) => {
    if (range.value && !show) {
        const date = convertTimestamps(range.value)
        console.log(date);
    }

    $emits('ShowUpdate', show)
}
</script>


<style lang='scss' scoped>
.content {
    .yushe {

        .cell {
            display: flex;
            align-items: center;
            padding: 5px 15px;
            height: 30px;
            color: #000;
            font-size: 12px;
            cursor: pointer;

            &:hover {
                background-color: #096ffa;
                color: #fff;
            }
        }
    }
}
</style>