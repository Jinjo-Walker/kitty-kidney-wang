import Vue from 'vue';
function coupon_recive(info1,info2) {
    return new Promise((reslove, reject) => {
        Vue.prototype.axios.get(`/user/coupon_recive?couponid=${info1}&id=${info2}`).then(res => {
            reslove(res.data);
        });
    })
}
function coupon_search2(info3) {
    return new Promise((reslove, reject) => {
        Vue.prototype.axios.get('/user/coupon_search').then(res => {
            reslove(res.data);
        });
    })
}
export {
    coupon_recive,
    coupon_search2
};
