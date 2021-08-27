import Vue from 'vue';
function shop_login(info) {
    return new Promise((reslove, reject) => {
        Vue.prototype.axios.post(`/shop/login`,info).then(res => {
            reslove(res.data);
        });
    })
}
function shop_info(info) {
    return new Promise((reslove, reject) => {
        Vue.prototype.axios.post(`/shop/order_info`,info).then(res => {
            reslove(res.data);
        });
    })
}
export {
    shop_info,
    shop_login
};

