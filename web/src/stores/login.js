// stores/counter.js
import {defineStore} from 'pinia';
import {ref} from 'vue';

// export const loginStatusStore = defineStore('loginStatus', {
//     state: () => {
//         return {status: 0};
//     },
//     // 也可以这样定义
//     // state: () => ({ count: 0 })
//     actions: {
//         setStatus(params) {
//             this.status = params;
//         },
//     },
// });

export const useLoginStatusStore = defineStore('loginStatus', () => {
    let status = ref(0);

    function setStatus(params) {
        status.value = params;
    }

    return {status, setStatus};
});