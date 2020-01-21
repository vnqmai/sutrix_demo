export const getStaffInfo = (staffInfo, staffHistories) => {
    return {
        type: 'GET_STAFF_INFO',
        staffInfo,
        staffHistories
    }
}