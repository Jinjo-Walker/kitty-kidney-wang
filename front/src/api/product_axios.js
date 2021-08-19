import Vue from 'vue';

function pro(info) {
    return new Promise((reslove, reject) => {
        Vue.prototype.axios.get(`/menu/menu_info`,info).then(res => {
            reslove(res.data);
        });
    })
}

export {
    pro
};

