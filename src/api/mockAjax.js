import axios from "axios";

import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'

const mockRequests = axios.create({
    baseURL:'/mock',
    timeout:5000
})

mockRequests.interceptors.request.use((config)=>{
    //nprogress进度条开始
    nprogress.start()
    return config
})

mockRequests.interceptors.response.use((res)=>{
    //nprogress进度条结束
    nprogress.done()
    return res.data
},(error)=>{
    return Promise.reject(new Error('fail'))})

export default mockRequests