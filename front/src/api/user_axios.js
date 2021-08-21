import Vue from 'vue';

function upload(file) {
    return new Promise((reslove, reject) => {
        Vue.prototype.axios.post('/user/upload', file).then(res => {
            reslove(res.data);
        });
    })
}

function change_info(info) {
    return new Promise((reslove, reject) => {
        Vue.prototype.axios.put('/user/account_change', info).then(res => {
            reslove(res.data);
        });
    })
}

function yzm(info) {
    return new Promise((reslove, reject) => {
        Vue.prototype.axios.get(`/user/yzm?phone=${info}`).then(res => {
            reslove(res.data);
        });
    })
}

function change_private(info) {
    return new Promise((reslove, reject) => {
        Vue.prototype.axios.put('/user/account_private', info).then(res => {
            reslove(res.data);
        });
    })
}

function coupon_search(info) {
    return new Promise((reslove, reject) => {
        Vue.prototype.axios.post('/user/account_coupon', info).then(res => {
            reslove(res.data);
        });
    })
}

export {
    upload,
    change_info,
    yzm,
    change_private,
    coupon_search
};

