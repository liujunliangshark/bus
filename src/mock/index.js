import Mock from 'mockjs';

// Mock an example API endpoint
let tableData = JSON.parse(localStorage.getItem('tableData')) || [
    {
        AdvertisingName: '品牌词',      //广告组名称
        status: '1',                     //状态,1为启用,2为暂停,3为删除
        startTime: '2022年12月30日',     //开始日期
        ConversionOverhead: '',           //每次转化费用上限
        Redownloadtimes: '0',            //重新下载次数
        disburse: '46.53',                      //支出
        ConversionRate: '50%',                //转化率
        AveragePayPerClick: '23.27',          //平均每次点击付费
        AverageCostPerConversion: '46.53',    //平均每次转化费用
        NumberOfInstallations: '1',          //安装次数
        EndTime: '',                     //结束日期
        NewDownloads: '1',                   //新下载次数
        AdvertisingID: '1254545990',                //广告组ID
        SearchMatch: '',                 //搜索匹配
        DefaultMaximumPay: '',                  //默认最高每次点击付费出价
        NumberOfPresentations: '212',            //展示次数
        clicks: '2',                        //点击次数
        ClickRate: '0.94%',                    //点击率
    },
    {
        AdvertisingName: '品牌词',      //广告系列名称
        status: '3',                     //状态,1为启用,2为暂停,3为删除
        startTime: '2022年12月30日',     //开始日期
        ConversionOverhead: '',           //每次转化费用上限
        Redownloadtimes: '0',            //重新下载次数
        disburse: '46.53',                      //支出
        ConversionRate: '50%',                //转化率
        AveragePayPerClick: '23.27',          //平均每次点击付费
        AverageCostPerConversion: '46.53',    //平均每次转化费用
        NumberOfInstallations: '1',          //安装次数
        EndTime: '',                     //结束日期
        NewDownloads: '1',                   //新下载次数
        AdvertisingID: '1254545993',                //广告组ID
        SearchMatch: '',                 //搜索匹配
        DefaultMaximumPay: '',                  //默认最高每次点击付费出价
        NumberOfPresentations: '212',            //展示次数
        clicks: '2',                        //点击次数
        ClickRate: '0.94%',                    //点击率
    },
    {
        AdvertisingName: '品牌词',      //广告系列名称
        status: '2',                     //状态,1为启用,2为暂停,3为删除
        startTime: '2022年12月30日',     //开始日期
        ConversionOverhead: '',           //每次转化费用上限
        Redownloadtimes: '0',            //重新下载次数
        disburse: '46.53',                      //支出
        ConversionRate: '50%',                //转化率
        AveragePayPerClick: '23.27',          //平均每次点击付费
        AverageCostPerConversion: '46.53',    //平均每次转化费用
        NumberOfInstallations: '1',          //安装次数
        EndTime: '',                     //结束日期
        NewDownloads: '1',                   //新下载次数
        AdvertisingID: '1254545910',                //广告组ID
        SearchMatch: '',                 //搜索匹配
        DefaultMaximumPay: '',                  //默认最高每次点击付费出价
        NumberOfPresentations: '212',            //展示次数
        clicks: '2',                        //点击次数
        ClickRate: '0.94%',                    //点击率
    },
];
Mock.mock('/api/example', 'get', {
    status: 200,
    message: 'success',
    data: {
        tableData
    }
});
Mock.mock('/api/updateStatus', 'post', (options) => {
    const updatedData = JSON.parse(options.body);
    const updatedRows = updatedData.list; // 提取 list 数组
    if (updatedData.status === '3') {
        // 删除操作
        updatedRows.forEach(updatedRow => {
            const index = tableData.findIndex(item => item.AdvertisingID === updatedRow.AdvertisingID);
            if (index !== -1) {
                tableData.splice(index, 1);
            }
        });
    } else {
        updatedRows.forEach(updatedRow => {
            const index = tableData.findIndex(item => item.AdvertisingID === updatedRow.AdvertisingID);
            if (index !== -1) {
                tableData[index] = { ...tableData[index], ...updatedRow, status: updatedData.status };
            }
        });
    }
    localStorage.setItem('tableData', JSON.stringify(tableData));
    return {
        status: 200,
        message: '状态修改成功',
        data: tableData
    };
});