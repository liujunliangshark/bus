import request from './request';
export function getTableData(params) {
    return request({
        url: '/api/example',
        method: 'get',
    });
}