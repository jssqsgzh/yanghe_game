import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'
import {ElMessage} from 'element-plus'

const URL = 'https://portal-k8s-dev.kiwiar.com/crm'

const basic_static='https://website-cdn.kiwiar.com/kiwi-games/2024/0603-yanghe/golden_eggs/';//静态资源

const RequestEnums = {
    TIMEOUT: 20000,
    OVERDUE: -1, // 登录失效
    FAIL: 500,  //请求失败
    SUCCESS: '00000'  //请求成功
}

const config = {
    baseURL: URL,
    timeout: RequestEnums.TIMEOUT,
    withCredentials:true  // 跨域时允许携带凭证
}

class RequestHttp {
    service;
    constructor(config){
        
        this.service = axios.create(config);
        // 请求拦截
        this.service.interceptors.request.use(
            (config) => {
                return {
                    ...config,
                    headers:{
                        // 'Tq-Token':'Bearer ' + token
                    }
                }
            },
            (error) => {
                // Promise.reject(error)
            }
        )
        // 响应拦截
        this.service.interceptors.response.use(
            (response) => {
                const {data, config} = response
                if(data.code === RequestEnums.OVERDUE){ //登录失效
                    return
                }
                if(data.code && data.code !== RequestEnums.SUCCESS){
                    ElMessage.error(data.msg);
                    return
                }
                return data
            },
            (error) => {
                const {response} = error
                if(response){
                    this.handleCode(response.status)
                }
                if(!window.navigator.onLine){
                    ElMessage.error('网络连接失败')
                }
            }
        )
    }

    handleCode(code){
        switch(code) {
            case 401:
                // ElMessage.error();
                break;
            default:
                // ElMessage.error();
                break
        }
    }
    // 常用方法封装
    get(url, params, config){
        return this.service.get(url, {params},);
    }
    post(url, params,config) {
        return this.service.post(url, params,config);
    }
    put(url, params) {
        return this.service.put(url, params);
    }
    delete(url, params) {
        return this.service.delete(url, {params});
    }
    
}

export default new RequestHttp(config)