import {getVcode,userRegiste,userLogin,reqUserData,reqUserLogout} from '@/api/index'
import {setToken,getToken,removeToken} from '@/utils/token'

const actions = {
    //获取验证码
   async getVcode({commit},phone){
    let result = await getVcode(phone)
    if (result.code == 200) {
        commit('GETVCODE',result.data)
        return 'ok'
    }else{
        return Promise.reject(new Error('fail'))
    }
   },
   //用户注册
   async userRegister({commit},data){
    
    let result = await userRegiste(data)
    console.log(result)
    if(result.code == 200){
        return 'ok'
    }else{
        return Promise.reject(new Error('fail'))
    }
   },
   //用户登录
    async userLogin({commit},data){
       let result = await userLogin(data)
       console.log(result,'USERLOGIN')
       if (result.code == 200) {
           commit('USERLOGIN',result.data)
           return 'ok'
       }else{
           return Promise.reject(new Error('fail'))
       }
   },
   //获取用户信息
    async getUserInfo({commit}){
       let result = await reqUserData()
    //    console.log(result)
       if (result.code == 200) {
           commit('GETUSERINFO',result.data)
           return 'ok'
        //    console.log(result.data)
       }else{
        return Promise.reject(new Error('faile'));
       }
   },
   //用户退出登录
    async userLogout({commit}){
        let result = await reqUserLogout()
        if (result.code == 200) {
            commit('USERLOGOUT')
            return 'ok'
        }else{
            console.log(result)
            return Promise.reject(new Error('fail'))
        }
    }
}
const mutations = {
    GETVCODE(state,code){
        state.vcode = code
    },
    USERLOGIN(state,data){
        state.token = data.token
        setToken(data.token)
    },
    GETUSERINFO(state,info){
        state.userInfo = info
    },
    USERLOGOUT(state){
        state.token = '',
        state.userInfo = {},
        removeToken()
    }
}

const state = {
    vcode:'',
    token:getToken(),
    userInfo:{}
}

const getters = {}

export default {
	state,
	mutations,
	actions,
	getters
}