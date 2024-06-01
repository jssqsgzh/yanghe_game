import { defineStore } from 'pinia'


const useBaseStore = defineStore('base', {
    persist: {
        key: 'lottery',// 修改存储中使用的键名称，默认为当前 Store的 id
        // storage: window.sessionStorage,// 修改为 sessionStorage，默认为 localStorage
    },
    state: () => ({
        basic_static:'https://website-cdn.kiwiar.com/kiwi-games/2024/0603-yanghe/golden_eggs/',
    }),
    getters:{
    },
    actions:{
    }
})

export default useBaseStore

