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
export {
    upload,
    change_info
};

