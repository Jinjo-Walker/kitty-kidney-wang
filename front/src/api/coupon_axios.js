import Vue from 'vue';
function coupon_recive(info1,info2,info3) {
    return new Promise((reslove, reject) => {
        Vue.prototype.axios.get(`/user/coupon_recive?couponid=${info1}&id=${info2}&money=${info3}`).then(res => {
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

function coupon_use(info) {
    return new Promise((reslove, reject) => {
        Vue.prototype.axios.post('/user/coupon_use',info).then(res => {
            reslove(res.data);
        });
    })
}

export {
    coupon_recive,
    coupon_search2,
    coupon_use
};
