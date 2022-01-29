import {reqDetailInfo,reqAddtoCart} from '@/api'
import getUuid from '@/utils/uuid_token'


const actions = {
   async detailInfo({commit},id){
    let result = await reqDetailInfo(id)
    if(result.code==200){
        commit('DETAILINFO',result.data)
      //   console.log(result.data)
    }
   },

   async addtoCart({commit},{skuId,skuNum}){
      let result = await reqAddtoCart(skuId,skuNum)
      // console.log(result)
      if(result.code==200){
         return 'ok'
     }else{
        return Promise.reject(new Error('fail'))
     }
   }
}
const mutations = {
   DETAILINFO(state,detailinfo){
        state.detailInfo = detailinfo
   }
}

const state = {
   detailInfo : {},
   uuid_token:getUuid()
}

const getters = {
   categoryView(state){
      return state.detailInfo.categoryView || {}
   },
   skuInfo(state){
      return state.detailInfo.skuInfo || {}
   },
   spuSaleAttrList(state){
      return state.detailInfo.spuSaleAttrList||[]
   }
}

export default {
	state,
	mutations,
	actions,
	getters
}