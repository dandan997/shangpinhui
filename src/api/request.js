import axios from 'axios'
import store from '@/store'

import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'

const requests = axios.create({
    baseURL:'http://39.98.123.211',
    timeout:5000
})

requests.interceptors.request.use((config)=>{
    //nprogress进度条开始
    nprogress.start()
    if(store.state.detail.uuid_token){
        // console.log(store.state.detail.uuid_token)
        config.headers.userTempId = store.state.detail.uuid_token
        
    }
    if(store.state.users.token){
        config.headers.token = store.state.users.token
    }
    return config
})

requests.interceptors.response.use((res)=>{
    //nprogress进度条结束
    nprogress.done()
    return res.data
},(error)=>{
    return Promise.reject(new Error('faile'))})

export default requests