export function getDateTime(period) {
    const today = new Date();
    let startDate, endDate;

    const adjustDate = (date, days) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        return newDate;
    };

    switch (period) {
        case 'today':
            startDate = endDate = today;
            break;
        case 'yesterday':
            startDate = endDate = adjustDate(today, -1);
            break;
        case 'last7Days':
            startDate = adjustDate(today, -6);
            endDate = today;
            break;
        case 'lastWeek':
            endDate = adjustDate(today, -today.getDay());
            startDate = adjustDate(endDate, -6);
            break;
        case 'last30Days':
            startDate = adjustDate(today, -29);
            endDate = today;
            break;
        case 'last4Weeks':
            endDate = adjustDate(today, -today.getDay());
            startDate = adjustDate(endDate, -27); // 4 weeks = 28 days - 1 day (for the end date itself)
            break;
        case 'last12Weeks':
            endDate = adjustDate(today, -today.getDay());
            startDate = adjustDate(endDate, -83); // 12 weeks = 84 days - 1 day (for the end date itself)
            break;
        case 'thisMonth':
            startDate = new Date(today.getFullYear(), today.getMonth(), 1);
            endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            break;
        case 'lastCalendarMonth':
            startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
            endDate = new Date(today.getFullYear(), today.getMonth(), 0);
            break;
        case 'last3CalendarMonths':
            startDate = new Date(today.getFullYear(), today.getMonth() - 3, 1);
            endDate = new Date(today.getFullYear(), today.getMonth(), 0);
            break;
        default:
            startDate = endDate = today;
            break;
    }

    // Ensure that the dates are set to the beginning and end of the day to avoid timezone issues
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    const selectedRange = {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
    };
    return selectedRange;
}
export function convertTimestamps(timestamps) {
    return timestamps.map(timestamp => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，所以要加1
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}'年${month}'月${day}'日`;
    });
}

