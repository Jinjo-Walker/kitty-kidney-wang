import Vue from 'vue';
function order_info(info) {
    return new Promise((reslove, reject) => {
        Vue.prototype.axios.get(`/order/order_info?id=${info}`).then(res => {
            reslove(res.data);
        });
    })
}
function orderMenu_info(info) {
    return new Promise((reslove, reject) => {
        Vue.prototype.axios.get(`/order/orderMenu_info?cid=${info}`).then(res => {
            reslove(res.data);
        });
    })
}
function order_add(info) {
    return new Promise((reslove, reject) => {
        Vue.prototype.axios.post(`/order/order_add`,info).then(res => {
            reslove(res.data);
        });
    })
}
export {
    order_info,
    orderMenu_info,
    order_add
};

