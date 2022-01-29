import {reqTradeInfo,reqAddressInfo} from '@/api'

const actions = {
    //获取订单信息
   async getTradeInfo({commit}){
       let result = await reqTradeInfo()
       console.log(result,'获取订单信息')
       if (result.code == 200) {
           commit('REQTRADEINFO',result.data)
           return 'ok'
       }else{
           return Promise.reject(new Error('fail'))
       }
   },
   //获取地址信息
   async getAddressInfo({commit}){
       let result = await reqAddressInfo()
       if(result.code == 200){
           commit('REQADDRESSINFO',result.data)
       }
   }
}
const mutations = {
    REQTRADEINFO(state,data){
        state.tradeInfo = data
    },
    REQADDRESSINFO(state,data){
        // console.log(data)
        state.address = data
    }
}

const state = {
    tradeInfo:{},
    address:[]
}

const getters = {}

export default {
	state,
	mutations,
	actions,
	getters
}