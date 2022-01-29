import { reqCartList, deleteFromCart,changeCartIschecked } from '@/api'


const actions = {
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
            // console.log(result.data)
        }
    },
    async deletSku({ commit }, id) {
        let result = await deleteFromCart(id)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    async changeCartIschecked({commit},{id,isChecked}){
        
        let result = await changeCartIschecked(id,isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    handleChooseAll(context,ischecked){
        let promiseAll = []
        context.getters.cartInfo.cartInfoList.forEach(element => {
            // console.log(element.isChecked)
            if (!element.isChecked == ischecked) {
                let promise = context.dispatch('changeCartIschecked',{id:element.skuId,isChecked:ischecked})
                promiseAll.push(promise)
            }
        });
        return Promise.all(promiseAll)
    },
    deleteAllCheckedGoods(context){
        let promiseAll = []
        context.getters.cartInfo.cartInfoList.forEach(element => {
            // console.log(element.isChecked)
            if (element.isChecked == '1') {
                console.log(element.skuId,'000')
                let promise = context.dispatch('deletSku',element.skuId)
                promiseAll.push(promise)
            }
        });
        return Promise.all(promiseAll)
    }
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}

const state = {
    cartList: []
}

const getters = {
    cartInfo(state) {
        return state.cartList[0] || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}